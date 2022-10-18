const anyFormTokenAbi = require("utils/abi/anyFormToken.json");
const formTokenAbi = require("utils/abi/formToken.json");
const usdtTokenAbi = require("utils/abi/usdtToken.json");
const busdTokenAbi = require("utils/abi/busdToken.json");
const LPTokenAbi = require("utils/abi/lpToken.json");
const formTokenStakingAbi = require("utils/abi/formTokenStaking.json");
const LPFarmingAbi = require("utils/abi/lpFarming.json");
const uniswapPair = require("utils/abi/uniswap_pair.json");
const uniswap = require("utils/abi/uniswap.json");
const stableVault = require("utils/abi/stableVault.json");
const v1alpha1deposite = require("utils/abi/v1alphadeposite.json");
const v1alphabalance = require("utils/abi/v1alphabalance.json");
const lpStableFarmingAbi = require("utils/abi/lpStableFarming.json");

export const CONTRACTS_TYPE = {
  FORM_TOKEN: "FORM_TOKEN",
  STABLE_TOKEN: "STABLE_TOKEN",
  LP_TOKEN: "LP_TOKEN",
  LP_STABLE_FARMING: "LP_STABLE_FARMING",
  ANY_FORM_TOKEN: "ANY_FORM_TOKEN",
  FORM_TOKEN_STAKING: "FORM_TOKEN_STAKING",
  LP_FARMING_V1: "LP_FARMING_V1",
  LP_FARMING_V2: "LP_FARMING_V2",
  UNISWAP: "UNISWAP",
  UNISWAP_PAIR: "UNISWAP_PAIR",
  LP_STABLE: "LP_STABLE",
  STABLE_VAULT: "STABLE_VAULT",
  V1ALPHA_DEPOSITE:"V1ALPHA_DEPOSITE",
  V1ALPHA_BALANCE:'V1ALPHA_BALANCE',
};

export const CONTRACTS = {
  [CONTRACTS_TYPE.LP_STABLE_FARMING]: {
    1: { address: "0xC356eF8082Ea212F4DB7E57F5aa845B69688cBBA", abi: lpStableFarmingAbi, decimals: 18},
    4: { address: "0x4204f3d43734a9e9Def640fd6aa65626b98e49C0", abi: lpStableFarmingAbi, decimals: 18 },
    56: { address: "0xFEd241529249bCB9330e940d480cdAD26B0B5aD0", abi: lpStableFarmingAbi, decimals: 18 },
    97: { address: "0x11d66e2C1dde119Fe883774F70D4d1fAE17Cf55E", abi: lpStableFarmingAbi, decimals: 18 },
  },
  [CONTRACTS_TYPE.LP_STABLE]: {
    1: { address: "0xCb6afDc84e8949DdF49Ab00b5B351a5b0F65a723", abi: LPTokenAbi, decimals: 18 },
    4: { address: "0xD2488CbD4e6D4f41eA480B93341d88E1CaD1B42e", abi: LPTokenAbi, decimals: 18 },
    56: { address: "0xCb6afDc84e8949DdF49Ab00b5B351a5b0F65a723", abi: LPTokenAbi, decimals: 18 },
    97: { address: "0xDDE7A3ae00810E5Da6EdA312a7089028251187a4", abi: LPTokenAbi, decimals: 18 },
  },
  [CONTRACTS_TYPE.STABLE_VAULT]: {
    1: { address: "0xCb6afDc84e8949DdF49Ab00b5B351a5b0F65a723", abi: stableVault },
    4: { address: "0xD2488CbD4e6D4f41eA480B93341d88E1CaD1B42e", abi: stableVault },
    56: { address: "0xCb6afDc84e8949DdF49Ab00b5B351a5b0F65a723", abi: stableVault },
    97: { address: "0xDDE7A3ae00810E5Da6EdA312a7089028251187a4", abi: stableVault },
  },
  [CONTRACTS_TYPE.FORM_TOKEN]: {
    1: { address: "0x21381e026Ad6d8266244f2A583b35F9E4413FA2a", abi: formTokenAbi, decimals: 18 },
    4: { address: "0xbe6d630e263e2266f1e2dc22d112039a283d9a1d", abi: formTokenAbi, decimals: 18 },
    56: { address: "0x25a528af62e56512a19ce8c3cab427807c28cc19", abi: formTokenAbi, decimals: 18 },
    97: { address: "0xcea9a253672eda97dfcd3ba601cb45d98decc58d", abi: formTokenAbi, decimals: 18 },
  },
  [CONTRACTS_TYPE.STABLE_TOKEN]: {
    1: { address: "0xdac17f958d2ee523a2206206994597c13d831ec7", abi: usdtTokenAbi, decimals: 6 },
    4: { address: "0x642f645BF10e7F3FC81E1701C73e4dCe44daa280", abi: usdtTokenAbi, decimals: 6 },
    56: { address: "0xe9e7cea3dedca5984780bafc599bd69add087d56", abi: busdTokenAbi, decimals: 18 },
    97: { address: "0x45c2e76c6ebc437cfbb007321885fe0661f948cc", abi: busdTokenAbi, decimals: 18 },
  },
  [CONTRACTS_TYPE.LP_TOKEN]: {
    1: { address: "0xb058b2612d4cd6e548438b10cb57371bbae13328", abi: LPTokenAbi },
    4: { address: "0x0656a9e67ea59c8bd3ce5f90a80f614ea8ad485a", abi: LPTokenAbi },
    56: { address: "0xcb62482a0f017a648b72a67d43f9b7e200f37ef4", abi: LPTokenAbi },
    97: { address: "0xc58165b623751c87c15f89307514b0d370a92ac3", abi: LPTokenAbi },
  },
  [CONTRACTS_TYPE.FORM_TOKEN_STAKING]: {
    1: { address: "0x5d67e545a2aB04e523005f753408d8Fa5dB71a5d", abi: formTokenStakingAbi },
    4: { address: "0xad9302c9f1b7b75c4b2adca66884e2abddec7ff8", abi: formTokenStakingAbi },
    56: { address: "0xACA29700EDB8FeE30823Db38E5be4D88A3A56d6b", abi: formTokenStakingAbi },
    97: { address: "0xb4b30d490c1a8e39646c74528233661d39a89958", abi: formTokenStakingAbi },
  },
  [CONTRACTS_TYPE.LP_FARMING_V1]: {
    1: { address: "0x259db68C8adafFf7f35DE76A5e4b42e404BbaefE", abi: LPFarmingAbi },
    4: { address: "0x3d6A4E47571848463A24f2e6234012873f285791", abi: LPFarmingAbi },
    56: { address: "0x4f7aE22704475f1f51d38328c38e2eB1cC8228b0", abi: LPFarmingAbi },
    97: { address: "0x8AF520161E1B458e9294E7A6c3b405973Dd80416", abi: LPFarmingAbi },
  },
  [CONTRACTS_TYPE.LP_FARMING_V2]: {
    1: { address: "0x62931dece3411ada1038c09cd01baa11db08334b", abi: LPFarmingAbi },
    4: { address: null, abi: LPFarmingAbi },
    56: { address: "0xe2ee850d72d02b3D827b98847d332aDD0d3f0012", abi: LPFarmingAbi },
    97: { address: null, abi: LPFarmingAbi },
  },
  [CONTRACTS_TYPE.ANY_FORM_TOKEN]: {
    1: { address: null, abi: null },
    4: { address: null, abi: null },
    56: { address: "0x25a528af62e56512a19ce8c3cab427807c28cc19", abi: anyFormTokenAbi },
    97: { address: null, abi: null },
  },
  [CONTRACTS_TYPE.UNISWAP]: {
    1: { address: "0x73F15DDD5b5449631ac11AF84E57aa05bB4d1D64", abi: uniswap },
    4: { address: "0xC0EF308A150a530dBF7E9a43C545Da6eD8f9a037", abi: uniswap },
    56: { address: "0x8fd8879657C4f530F0f84436af3999C560A2168B", abi: uniswap },
    97: { address: "0x6c2525Ce0E516b44F0aff4B48935e088CdB2Eb5b", abi: uniswap },
  },
  [CONTRACTS_TYPE.UNISWAP_PAIR]: {
    1: { address: "0xb058b2612d4cd6e548438b10cb57371bbae13328", abi: uniswapPair },
    4: { address: "0x0656a9e67ea59c8bd3ce5f90a80f614ea8ad485a", abi: uniswapPair },
    56: { address: "0xcb62482a0f017a648b72a67d43f9b7e200f37ef4", abi: uniswapPair },
    97: { address: "0xc58165b623751c87c15f89307514b0d370a92ac3", abi: uniswapPair },
  },
  [CONTRACTS_TYPE.V1ALPHA_DEPOSITE]: {
    1: { address: null, abi: null },
    4: { address: "0x0544820dc2EB0614F1081C127198cAFCC4415706", abi: v1alpha1deposite },
    56: { address: null, abi: null },
    97: { address: null, abi: null },
  },
  [CONTRACTS_TYPE.V1ALPHA_BALANCE]: {
    1: { address: null, abi: null },
    4: { address: "0x95E6Dcb9eFBe0f6a58E9D9AF9f05269C5a44B228", abi: v1alphabalance },
    56: { address: null, abi: null },
    97: { address: 'd511D50fdA7b4AF3D16BB848f719DC3da140904B', abi: v1alphabalance },
  },
};
