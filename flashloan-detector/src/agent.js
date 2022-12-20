const {
  Finding,
  FindingSeverity,
  FindingType,
  ethers,
  LabelType,
  EntityType,
  getEthersProvider,
} = require("forta-agent");
const { getFlashloans: getFlashloansFn } = require("./flashloan-detector");
const helperModule = require("./helper");

let chainId;
let chain;
let nativeToken;
const ETH_CHAIN_ID = 1;

const PROFIT_THRESHOLD = 500_000;
const PERCENTAGE_THRESHOLD = 2;
const PROFIT_THRESHOLD_WITH_HIGH_PERCENTAGE = 100_000;

function provideInitialize(helper) {
  return async function initialize() {
    ({ chainId, chain, nativeToken } = await helper.init());
  };
}

const transferEventSigs = [
  "event Transfer(address indexed src, address indexed dst, uint wad)",
  "event Withdrawal(address indexed src, uint256 wad)",
];

const transferFunctionSigs = [
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes("transfer(address,uint256)")).substring(0, 10),
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes("transferFrom(address,address,uint256)")).substring(0, 10),
];

function provideHandleTransaction(helper, getFlashloans, provider) {
  return async function handleTransaction(txEvent) {
    const findings = [];
    const initiator = txEvent.from;

    const flashloans = await getFlashloans(txEvent);
    const numOfFlashloans = flashloans.length;
    if (numOfFlashloans === 0) return findings;

    const calledContract = txEvent.to.toLowerCase();
    const transferEvents = txEvent.filterLog(transferEventSigs);
    const { traces } = txEvent;

    let totalTokenProfits = {};
    let totalNativeProfit = helper.zero;
    let totalBorrowed = 0;

    // For each flashloan calculate the token profits and the borrowed amount
    await Promise.all(
      flashloans.map(async (flashloan, flashloanIndex) => {
        const { asset, amount, account } = flashloan;

        if (account !== initiator) {
          const tokenProfits = helper.calculateTokenProfits(transferEvents, account);
          const nativeProfit = helper.calculateNativeProfit(traces, account);

          Object.entries(tokenProfits).forEach(([address, profit]) => {
            if (!totalTokenProfits[address]) totalTokenProfits[address] = helper.zero;
            totalTokenProfits[address] = totalTokenProfits[address].add(profit);
          });
          totalNativeProfit = totalNativeProfit.add(nativeProfit);
        }

        // Only loop through traces if on mainnet Ethereum
        // (other chains don't require enabling traces)
        // or if there are traces returned
        if (chainId === ETH_CHAIN_ID || traces.length > 0) {
          traceLoop: for (let i = traces.length - 1; i >= 0; i--) {
            const { from, to, value, callType, input } = traces[i].action;

            if (value && value !== "0x0" && callType === "call") {
              if (
                (from.toLowerCase() === account || from.toLowerCase() === calledContract) &&
                to.toLowerCase() === initiator
              ) {
                const nativeProfit = helper.calculateNativeProfit(traces, initiator);
                totalNativeProfit = totalNativeProfit.add(nativeProfit);
                break traceLoop;
              } else if (
                (from.toLowerCase() === account || from.toLowerCase() === calledContract) &&
                // Only start looping through Transfers of unknown destination (dst)
                // during the last flashloan to prevent "double counting"
                flashloanIndex === numOfFlashloans - 1
              ) {
                // Only proceed with recipients that are EOAs
                const toCode = await provider.getCode(to);
                if (toCode !== "0x") {
                  continue;
                }

                const nativeProfit = helper.calculateNativeProfit(traces, to.toLowerCase());
                if (nativeProfit === helper.zero) {
                  continue;
                }

                totalNativeProfit = totalNativeProfit.add(nativeProfit);
                break traceLoop;
              }
            } else if (
              value === "0x0" &&
              (input.startsWith(transferFunctionSigs[0]) || input.startsWith(transferFunctionSigs[1])) &&
              (calledContract === from.toLowerCase() || account === from.toLowerCase())
            ) {
              for (let j = transferEvents.length - 1; j >= 0; j--) {
                const { name } = transferEvents[j];
                const { src, dst } = transferEvents[j].args;

                if (
                  name === "Transfer" &&
                  (src.toLowerCase() === calledContract || src.toLowerCase() === account) &&
                  dst.toLowerCase() === initiator
                ) {
                  const tokenProfits = helper.calculateTokenProfits(transferEvents, initiator);
                  const positiveProfits = Object.values(tokenProfits).filter((profit) => profit > helper.zero);
                  if (positiveProfits.length === 0) {
                    continue;
                  }

                  Object.entries(tokenProfits).forEach(([address, profit]) => {
                    if (!totalTokenProfits[address]) totalTokenProfits[address] = helper.zero;
                    totalTokenProfits[address] = totalTokenProfits[address].add(profit);
                  });
                  break traceLoop;
                } else if (
                  name === "Transfer" &&
                  (src.toLowerCase() === calledContract || src.toLowerCase() === account) &&
                  // Only start looping through Transfers of unknown destination (dst)
                  // during the last flashloan to prevent "double counting"
                  flashloanIndex === numOfFlashloans - 1
                ) {
                  // Only proceed with recipients that are EOAs
                  const dstCode = await provider.getCode(dst);
                  if (dstCode !== "0x") {
                    continue;
                  }

                  const tokenProfits = helper.calculateTokenProfits(transferEvents, dst.toLowerCase());
                  const positiveProfits = Object.values(tokenProfits).filter((profit) => profit > helper.zero);
                  if (positiveProfits.length === 0) {
                    continue;
                  }

                  Object.entries(tokenProfits).forEach(([address, profit]) => {
                    if (!totalTokenProfits[address]) totalTokenProfits[address] = helper.zero;
                    totalTokenProfits[address] = totalTokenProfits[address].add(profit);
                  });
                  break traceLoop;
                }
              }
            }
          }
        // Check the profit of the initiator if not on mainnet
        // or if no traces only during the last flashloan
        } else if(flashloanIndex === numOfFlashloans - 1) {
          const tokenProfits = helper.calculateTokenProfits(transferEvents, initiator);
          Object.entries(tokenProfits).forEach(([address, profit]) => {
            if (!totalTokenProfits[address]) totalTokenProfits[address] = helper.zero;
            totalTokenProfits[address] = totalTokenProfits[address].add(profit);
          });

          const nativeProfit = helper.calculateNativeProfit(traces, initiator);
          totalNativeProfit = totalNativeProfit.add(nativeProfit);
        }

        totalBorrowed = await helper.calculateBorrowedAmount(asset, amount, chain);
      })
    );

    // Subtract the tx fee
    const { gasUsed } = await helper.getTransactionReceipt(txEvent.hash);
    const { gasPrice } = txEvent.transaction;
    const txFee = ethers.BigNumber.from(gasUsed).mul(ethers.BigNumber.from(gasPrice));
    totalNativeProfit = totalNativeProfit.sub(txFee);

    let tokensUsdProfit = 0;
    let nativeUsdProfit = 0;

    const tokensArray = Object.keys(totalTokenProfits);

    if (tokensArray.length !== 0) {
      tokensUsdProfit = await helper.calculateTokensUsdProfit(totalTokenProfits, chain);
    }

    if (!totalNativeProfit.isZero()) {
      nativeUsdProfit = await helper.calculateNativeUsdProfit(totalNativeProfit, nativeToken);
    }

    const totalProfit = tokensUsdProfit + nativeUsdProfit;
    const percentage = (totalProfit / totalBorrowed) * 100;

    console.log("Chain     :", chain);
    console.log("TX hash   :", txEvent.hash);
    console.log("Borrowed  :", totalBorrowed.toFixed(2));
    console.log("Profit    :", totalProfit.toFixed(2));
    console.log("Percentage:", percentage.toFixed(2));

    if (percentage > PERCENTAGE_THRESHOLD && totalProfit > PROFIT_THRESHOLD_WITH_HIGH_PERCENTAGE) {
      findings.push(
        Finding.fromObject({
          name: "Flashloan detected",
          description: `${initiator} launched flash loan attack and made profit > $${PROFIT_THRESHOLD_WITH_HIGH_PERCENTAGE}`,
          alertId: "FLASHLOAN-ATTACK-WITH-HIGH-PROFIT",
          severity: FindingSeverity.High,
          type: FindingType.Exploit,
          metadata: {
            profit: totalProfit.toFixed(2),
            tokens: tokensArray,
          },
          labels: [
            {
              entityType: EntityType.Address,
              entity: initiator,
              labelType: LabelType.Attacker,
              confidence: 90,
              customValue: "Initiator of transaction",
            },
          ],
        })
      );
    } else if (percentage > PERCENTAGE_THRESHOLD) {
      findings.push(
        Finding.fromObject({
          name: "Flashloan detected",
          description: `${initiator} launched flash loan attack`,
          alertId: "FLASHLOAN-ATTACK",
          severity: FindingSeverity.Low,
          type: FindingType.Exploit,
          metadata: {
            profit: totalProfit.toFixed(2),
            tokens: tokensArray,
          },
          labels: [
            {
              entityType: EntityType.Address,
              entity: initiator,
              labelType: LabelType.Attacker,
              confidence: 60,
              customValue: "Initiator of transaction",
            },
          ],
        })
      );
    } else if (totalProfit > PROFIT_THRESHOLD) {
      findings.push(
        Finding.fromObject({
          name: "Flashloan detected",
          description: `${initiator} launched flash loan attack and made profit > $${PROFIT_THRESHOLD}`,
          alertId: "FLASHLOAN-ATTACK-WITH-HIGH-PROFIT",
          severity: FindingSeverity.High,
          type: FindingType.Exploit,
          metadata: {
            profit: totalProfit.toFixed(2),
            tokens: tokensArray,
          },
          labels: [
            {
              entityType: EntityType.Address,
              entity: initiator,
              labelType: LabelType.Attacker,
              confidence: 90,
              customValue: "Initiator of transaction",
            },
          ],
        })
      );
    }

    // Clear all cached prices and delete token decimals if the object is too large
    helper.clear();

    return findings;
  };
}

module.exports = {
  provideInitialize,
  initialize: provideInitialize(helperModule),
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(helperModule, getFlashloansFn, getEthersProvider()),
};
