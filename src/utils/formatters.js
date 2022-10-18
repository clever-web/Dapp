import { formatUnits, parseUnits } from "ethers/lib/utils";

import BigNumber from 'bignumber.js'

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
});

export const convertToUnit = (amount, decimals = 18) => {
  return parseUnits(amount.toString(), decimals);
};

export const parseFromUnit = (amount, decimals = 18) => {
  if (!amount) {
     return 0;
  }
  return parseInt(formatUnits(amount, decimals - 2)) / 100;
};

export const truncateWalletAddress = (address, startLength = 4, endLength = 4) => {
  if (!address) {
    return null;
  }
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`
}

export const fromWei = (amount, decimals = 18) => {
    if (!amount) {
      return 0;
    }
    return new BigNumber(amount._hex).dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const toWei = (amount, decimals = 18) => {
  if (!amount) {
    return 0;
  }
  return new BigNumber(amount._hex).multipliedBy(new BigNumber(10).pow(decimals)).toNumber()
}