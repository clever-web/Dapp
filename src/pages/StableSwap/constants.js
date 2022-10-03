import USDTIcon from "ASSETS/images/tokens/usdt.svg";
import BUSDIcon from "ASSETS/images/coins/busd.svg";

import USDTTokenIcon from "ASSETS/images/tokens/usdt.svg";
import BUSDTokenIcon from "ASSETS/images/tokens/busd.svg";

export const TAB_NAMES = { SWAP: "swap-tab", LIQUID: "liquidity-tab" };
export const SUB_TAB_NAMES = {
  ADD: "liquidity-add",
  REMOVE: "liquidity-remove",
};

export const options = [
  { name: "USDT", icon: USDTIcon, width: 30, height: 25 },
  { name: "BUSD", icon: BUSDIcon, width: 30, height: 25 },
];

export const RECENT_TRANSACTIONS = [
  { title: "Approve BUSD", link: "#" },
  { title: "Approve USDT", link: "#" },
];

export const tokens = [
  {
    name: "USDT",
    description: "Tether USD",
    icon: USDTTokenIcon,
    chain: ["ETH"],
  },
  {
    name: "BUSD",
    description: "Binance USD",
    icon: BUSDTokenIcon,
    chain: ["BSC"],
  },
];

export const AMOUNT_TO_REMOVE = ["25", "50", "75", "100"];

export const CONFIRM_SWAP_INFO = (tokenFrom, tokenTo, currentFee, gasFee) => [
  { title: "Price:", tooltip: "Lorem ipsum", value: `1 ${tokenFrom.name} / ${tokenTo.name}` },
  { title: "Liquidity Provider Fee:", tooltip: "Lorem ipsum", value: `${currentFee} ${tokenTo.name}` },
  { title: "Standard Network Fee:", tooltip: "Lorem ipsum", value: `${gasFee} ${tokenTo.name}` },
];

export const CONFIRM_LIQUIDITY_INFO = [
  { title: "FORM Deposited:", value: "381.885 USDT" },
  { title: "USDT Deposited:", value: "90.0815 FORM" },
  { title: "Rates:", value: "1 FORM = 0.2359 USDT" },
  { title: "", value: "1 USDT = 4.239 FORM" },
];

export const SWAP_TAB_FOOTER = [
  {
    title: "Minimum received",
    tip: "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed",
    value: "38050 FORM",
  },
  {
    title: "Price impact",
    tip: "The difference between the market price and estimated price due trade size.",
    value: "0.61%",
  },
  {
    title: "Liquidity Provider Fee",
    tip: `For each trade a 0.25% fee is paid
        
        - 0.17 to LP token holders
        - 0.03% to the Treasury
        - 0.05% towards FORMbuyback and burn`,
    value: "28.56 USDT",
  },
];

export const CHAIN = {
  ETH: "ETH",
  BSC: "BSC",
};

export const SWAP_ACTIONS = {
  APPROVAL: "APPROVAL",
};

export const getTokens = (chainId = 4) => {
  if ([1, 4].includes(chainId)) {
    return { from: tokens[0], to: tokens[1] };
  } else if ([56, 97].includes(chainId)) {
    return { from: tokens[1], to: tokens[0] };
  } else {
    return { from: { name: null, icon: null }, to: { name: null, icon: null } };
  }
};

export const getChainIds = (srcChainId) => {
  // test
  if (srcChainId === 4) {
    return { src: 4, dest: 97 };
  } else if (srcChainId === 97) {
    return { src: 97, dest: 4 };
  } 
  // prod
  else if (srcChainId === 56) {
    return { src: 56, dest: 1 };
  } else if (srcChainId === 1) {
    return { src: 1, dest: 56 };
  }
};

const isMainnet = (chainId) => chainId === 1 || chainId === 56;
export const BRIDGE_API_URL = (srcChainId, destChainId) => 
  isMainnet(srcChainId) ? 
  `https://sq5wuxjz3j.execute-api.eu-west-1.amazonaws.com/mainnet/swap/info/${srcChainId}/${destChainId}` : 
  `https://xuv7hnj6j7.execute-api.eu-west-1.amazonaws.com/testnet/swap/info/${srcChainId}/${destChainId}`;