import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { BscConnector } from '@binance-chain/bsc-connector';
import { ethers } from "ethers";

const POLLING_INTERVAL = 12000;
const CHAIN_IDS = [1, 4, 56, 97];

export const DEFAULT_CHAIN_ID = 1;

export const RPC_URL = {
  1: 'https://apis.ankr.com/07d6d9e39e544222b723433bbf80ba1e/87f9b1b6a1f859c4fbaddc54b491e60e/eth/fast/main', 
  4: 'https://apis.ankr.com/ad4e043332864e34afa50a01bc331435/87f9b1b6a1f859c4fbaddc54b491e60e/eth/fast/rinkeby',
  56: 'https://apis.ankr.com/71032cfb65a24b1996a4de52761ddd38/87f9b1b6a1f859c4fbaddc54b491e60e/binance/full/main',
  97: 'https://apis.ankr.com/c67d625b904f4b189faccb68bb1a1ba8/87f9b1b6a1f859c4fbaddc54b491e60e/binance/full/test'
};

export const SCAN_LINK = {
	1: 'https://etherscan.io/',
	4: 'https://rinkeby.etherscan.io/',
	56: 'https://bscscan.com/',
	97: 'https://testnet.bscscan.com/'
};

export const WalletConnect = (chainId) => {
  return{
    name: 'walletconnect',
    value: new WalletConnectConnector({
      rpc: {[chainId]: RPC_URL[chainId]},
      qrcode: true,
      pollingInterval: POLLING_INTERVAL,
    }) 
  }
}

export const Connectors = {
  Injected: {
    name: "injected",
    value: new InjectedConnector({ supportedChainIds: [...CHAIN_IDS] }),
  },

  WalletConnect: {
    name: 'walletconnect',
    value: new WalletConnectConnector({
      rpc: RPC_URL,
      qrcode: true,
      pollingInterval: POLLING_INTERVAL,
    }) 
  },

  TrustWallet: {
    name: 'trustwallet',
    value: new InjectedConnector({ supportedChainIds: [...CHAIN_IDS] })
  },

  CoinbaseWallet: {
    name: 'walletlink',
    value: new WalletLinkConnector({
      url: RPC_URL,
      appName: 'Formation App',
      appLogoUrl: ''
    })
  },

  BinanceWallet: {
    name: 'bscwallet',
    value: new BscConnector({ supportedChainIds: [...CHAIN_IDS] })
  },

  GnosisSafe: {
    name: 'gnosissafe',
    value: new SafeAppConnector({ supportedChainIds: [...CHAIN_IDS] })
  }

};

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const getConnector = (chainId) =>{
  return{
    [Connectors.Injected.name]: Connectors.Injected.value,
    [WalletConnect(chainId).name]: WalletConnect(chainId).value,
    [Connectors.TrustWallet.name]: Connectors.TrustWallet.value,
    [Connectors.CoinbaseWallet.name]: Connectors.CoinbaseWallet.value,
    [Connectors.BinanceWallet.name]: Connectors.BinanceWallet.value,
    [Connectors.GnosisSafe.name]: Connectors.GnosisSafe.value,
  }
};
