const compoundContracts = require("./contracts/compound.json");
const makerContracts = require("./contracts/maker.json");
const pancakeSwapContracts = require("./contracts/pancakeswap.json");
const contractsETHER = [
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0xf406f7a9046793267bc276908778b29563323996",
  "0xca1207647ff814039530d7d35df0e1dd2e91fa84",
  "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
  "0xfFffFffF2ba8F66D4e51811C5190992176930278",
  "0x6f40d4a6237c257fff2db00fa0510deeecd303eb",
  "0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f",
  "0x72b886d09c117654ab7da13a14d603001de0b777",
  "0xa117000000f279D81A1D3cc75430fAA017FA5A2e",
  "0x543ff227f64aa17ea132bf9886cab5db55dcaddf",
  "0xa1d65e8fb6e87b60feccbc582f7f97804b725521",
  "0x321c2fe4446c7c963dc41dd58879af648838f98d",
  "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
  "0xeF9Cd7882c067686691B6fF49e650b43AFBBCC6B",
  "0x584bc13c7d411c00c01a62e8019472de68768430",
  "0x86772b1409b61c639EaAc9Ba0AcfBb6E238e5F83",
  "0x09a3ecafa817268f77be1283176b946c4ff2e608",
  "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2",
  "0xb6ca7399b4f9ca56fc27cbff44f4d2e4eef1fc81",
  "0x87d73e916d7057945c9bcd8cdd94e42a6f47f776",
  "0x383518188c0c6d7730d91b2c03a03c837814a899",
  "0xad32a8e6220741182940c5abf610bde99e737b2d",
  "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
  "0x6123b0049f904d730db3c36a31167d9d4121fa6b",
  "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
  "0x111111111117dc0aa78b770fa6a738034120c302",
  "0x27054b13b1B798B345b591a4d22e6562d47eA75a",
  "0xf99d58e463a2e07e5692127302c20a191861b4d6",
  "0xba100000625a3754423978a60c9317c58a424e3D",
  "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C",
  "0xd533a949740bb3306d119cc777fa900ba034cd52",
  "0xcc80c051057b774cd75067dc48f8987c4eb97a5e",
  "0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd",
  "0xa7f552078dcc247c2684336020c03648500c6d9f",
  "0xB705268213D593B8FD88d3FDEFF93AFF5CbDcfAE",
  "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202",
  "0xcafe001067cdef266afb7eb5a286dcfd277f3de5",
  "0xa1d65e8fb6e87b60feccbc582f7f97804b725521",
  "0xe41d2489571d322189246dafa5ebde1f4699f498",
  "0x6c28aef8977c9b773996d0e8376d2ee379446f2f",
  "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
  "0x0000000000095413afc295d19edeb1ad7b71c952",
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  "0xe41d2489571d322189246dafa5ebde1f4699f498",
  "0x56d811088235F11C8920698a204A5010a788f4b3",
  "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202",
  "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
  "0x408e41876cccdc0f92210600ef50372656052a38",
  "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
  "0x544c42fbb96b39b21df61cf322b5edc285ee7429",
  "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
  "0x888888888889c00c67689029d7856aac1065ec11",
  "0x107c4504cd79c5d2696ea0030a8dd4e92601b82e",
  "0x41e5560054824eA6B0732E656E3Ad64E20e94E45",
  "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
  "0xc00e94cb662c3520282e6f5717214004a7f26888",
  "0x2ba592F78dB6436527729929AAf6c908497cB200",
  "0x4c19596f5aaff459fa38b0f7ed92f11ae6543784",
  "0x92d6c1e31e14520e676a687f0a93788b716beff5",
  "0xfca59cd816ab1ead66534d82bc21e7515ce441cf",
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  "0x0Ae055097C6d159879521C384F1D2123D1f195e6",
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
];
const contractsBSC = [
  "0x404460c6a5ede2d891e8297795264fde62adbb75",
  "0xc748673057861a797275CD8A068AbB95A902e8de",
  "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
  "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
  "0x629d4562033e432B390d0808B54A82B0C4A0896B",
  "0xF8D829C3eB05C078e7911EfB3303C7899c8D2C3A",
  "0x9Fd554CDb6e77D9Aa048A37DCccee41FfFad1a90",
  "0x3A632B713637D837fF3b0e34D093A21DA1EF9fb1",
  "0x15F2FeFcF313d397F9933C1Cb7590ab925d5cb59",
  "0x42867dF3c1ce62613aae3f4238cbcF3d7630880B",
  "0xE06F85862af08c1C5F67F96e41eA663E29639DAe",
  "0xC8051D8A62851ad4b99B46d503Cb0b0b8C92F35d",
  "0x8424D933FbB73665E5a8880de63C7B1366a56EeD",
  "0x82457aDF5f7F1fD22622DF4808f06392b170134D",
  "0x20de22029ab63cf9A7Cf5fEB2b737Ca1eE4c82A6",
  "0xf071dE0E7A6FfCeee252Df25678c725f04A03b80",
  "0x0a7E898e1fAB8639dc3a416fE844662F209de8eD",
  "0x95A2bBCD64E2859d40E2Ad1B5ba49Dc0e1Abc6C2",
  "0xeB76E34834fB0E2c31D92f0284466385bcE5c09A",
  "0x4BB3AeB5Ba75bC6A44177907B54911b19d1cF8f7",
  "0x88C8890505384F4Eb3A281274b1DEdFFf8448147",
  "0x1bf019A44a708FBEBA7ADc79bdaD3D0769fF3a7b",
  "0x154A9F9cbd3449AD22FDaE23044319D6eF2a1Fab",
  "0x3203c9E46cA618C8C1cE5dC67e7e9D75f5da2377",
];
const contractsOPTIMISM = [
  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
  "0x95A6a3f44a70172E7d50a9e28c85Dfd712756B8C",
  "0x308AD16ef90fe7caCb85B784A603CB6E71b1A41a",
  "0x15E7D4972a3E477878A5867A47617122BE2d1fF0",
  "0xbA10526cD8742acC73AedeF5f7Dbb2477Bf86922",
  "0xEbCe9728E2fDdC26C9f4B00df5180BdC5e184953",
  "0xD21969A86Ce5c41aAb2D492a0F802AA3e015cd9A",
  "0x54581A23F62D147AC76d454f0b3eF77F9D766058",
  "0x17628A557d1Fc88D1c35989dcBAC3f3e275E2d2B",
  "0x2A23bc0EA97A89abD91214E8e4d20F02Fe14743f",
  "0x02f7fB66B55e6ca476d126d96f14c5732Eeb4363",
  "0xcdb7D0a946223255d39A6e29B54f08f3291cc118",
  "0x76d2de36936005A0182a1BB61dA501A8A044D477",
  "0xC8E91c926E04BE1cb94e51c5379d14774D51ae6C",
  "0xC0c66470E766AE2026E6695966C56C90741811AA",
  "0xc3Ee42caBD773A608fa9Ec951982c94BD6F33d59",
  "0x7322e8F6cB6c6a7B4e6620C486777fcB9Ea052a4",
  "0x1B9d6cD65dDC981410cb93Af91B097667E0Bc7eE",
  "0x7EF87c14f50CFFe2e73d2C87916C3128c56593A8",
  "0x059681217E9186E007864AA16893b65A0589718B",
  "0xD3739A5F06747e148E716Dcb7147B9BA15b70fcc",
  "0x41140Bf6498a36f2E44eFd49f21dAe3bbb7367c8",
  "0x6e0d26cffc3a63d763F1546f749bf62ebC7d72D8",
  "0x47649022380d182DA8010Ae5d257fea4227b21ff",
  "0x001b7876F567f0b3A639332Ed1e363839c6d85e2",
  "0x4ff54624D5FB61C34c634c3314Ed3BfE4dBB665a",
  "0xEe8804d8Ad10b0C3aD1Bd57AC3737242aD24bB95",
  "0xC51aeDBEC3aCD26650a7E85B6909E8AEc4d0F19e",
  "0xf86048DFf23cF130107dfB4e6386f574231a5C65",
  "0xad44873632840144fFC97b2D1de716f6E2cF0366",
  "0x1228c7D8BBc5bC53DB181bD7B1fcE765aa83bF8A",
  "0xbCB2D435045E16B059b2130b28BE70b5cA47bFE5",
  "0xc704c9AA89d1ca60F67B3075d05fBb92b3B00B3B",
  "0xcF853f7f8F78B2B801095b66F8ba9c5f04dB1640",
  "0x5Af0072617F7f2AEB0e314e2faD1DE0231Ba97cD",
  "0xb147C69BEe211F57290a6cde9d1BAbfD0DCF3Ea3",
  "0x4434f56ddBdE28fab08C4AE71970a06B300F8881",
  "0x8518f879a2B8138405E947A48326F55FF9D5f3aD",
  "0x5eA2544551448cF6DcC1D853aDdd663D480fd8d3",
  "0x5D7569CD81dc7c8E7FA201e66266C9D0c8a3712D",
  "0xC4Be4583bc0307C56CF301975b2B2B1E5f95fcB2",
  "0x0681883084b5De1564FE2706C87affD77F1677D5",
  "0xB16ef128b11e457afA07B09FCE52A01f5B05a937",
  "0x2302D7F7783e2712C48aA684451b9d706e74F299",
  "0xF5d0BFBc617d3969C1AcE93490A76cE80Db1Ed0e",
  "0x91DBC6f587D043FEfbaAD050AB48696B30F13d89",
  "0xC19d27d1dA572d582723C1745650E51AC4Fc877F",
  "0xD1599E478cC818AFa42A4839a6C665D9279C3E50",
  "0x6fd9d7AD17242c41f7131d257212c54A0e816691",
  "0xD81eb3728a631871a7eBBaD631b5f424909f0c77",
  "0x86b4D2636EC473AC4A5dD83Fc2BEDa98845249A7",
  "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  "0x8145eddDf43f50276641b55bd3AD95944510021E",
  "",
];
const contractsPolygon = [
  "0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f",
  "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
  "0x445FE580eF8d70FF569aB36e80c647af338db351",
  "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171",
  "0x19793B454D3AfC7b454F206Ffe95aDE26cA6912c",
  "0x751B1e21756bDbc307CBcC5085c042a0e9AaEf36",
  "0x8096ac61db23291252574D49f036f0f9ed8ab390",
  "0x3FCD5De6A9fC8A99995c406c77DDa3eD7E406f81",
  "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67",
  "0xf8a57c1d3b9629b77b6726a042ca48990A84Fb49",
  "0x92577943c7aC4accb35288aB2CC84D75feC330aF",
  "0x3Fa8ebd5d16445b42e0b6A54678718C94eA99aBC",
  "0xbece5d20A8a104c54183CC316C8286E3F00ffC71",
  "0x92215849c439E1f8612b6646060B4E3E5ef822cC",
  "0xB446BF7b8D6D4276d0c75eC0e3ee8dD7Fe15783A",
  "0x1d8b86e3D88cDb2d34688e87E72F388Cb541B7C8",
  "0x225FB4176f0E20CDb66b4a3DF70CA3063281E855",
  "0x9b3d675FDbe6a0935E8B7d1941bc6f78253549B7",
  "0x4DF7eF55E99a56851187822d96B4E17D98A47DeD",
];
const contractsARBITRUM = [
  "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  "0x5D83f657959F916D72a33DDF53BFb7EcD7Ef1507",
  "0x7f90122BF0700F9E7e1F688fe926940E8839F353",
  "0xbF7E49483881C76487b0989CD7d9A8239B20CA41",
  "0x960ea3e3C7FB317332d990873d354E18d7645590",
  "0x8e0B8c8BB9db49a46697F3a5Bb8A308e744821D2",
  "0xF97c707024ef0DD3E77a0824555a46B622bfB500",
  "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb",
  "0xC2b1DF84112619D190193E48148000e3990Bf627",
  "0xA827a652Ead76c6B0b3D19dba05452E06e25c27e",
  "0x3dFe1324A0ee9d86337d06aEB829dEb4528DB9CA",
  "0x25e2e8d104BC1A70492e2BE32dA7c1f8367F9d2c",
];

module.exports = {
  bucketBlockSize: 5,
  getContractsByChainId: (chainId) => {
    switch (chainId) {
      case 1:
        const compoundContractValues = Object.values(compoundContracts);
        const makerContractValues = Object.values(makerContracts);
        const contractsFinal = [
          ...contractsETHER,
          ...compoundContractValues,
          ...makerContractValues,
        ];
        return contractsFinal;
      case 56:
        const pancakeSwapContactValues = Object.values(pancakeSwapContracts);
        const pancakeSwapContractsFinal = [];
        for (let c of pancakeSwapContactValues) {
          pancakeSwapContractsFinal.push(c.pair_address);
        }
        const contractsFinalBSC = [
          ...contractsBSC,
          ...pancakeSwapContractsFinal,
        ];
        return contractsFinalBSC;
      case 10:
        return contractsOPTIMISM;
      case 137:
        return contractsPolygon;
      case 42161:
        return contractsARBITRUM;
    }
  },
};
