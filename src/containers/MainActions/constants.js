import EthereumIcon from 'ASSETS/images/coins/ethereum.svg';
import BSCIcon from 'ASSETS/images/tokens/bsc.svg';

import WalletConnectIcon from 'ASSETS/images/wallet/walletconnect.svg';
import MetamaskIcon from 'ASSETS/images/wallet/metamask.svg';
import TrustWalletIcon from 'ASSETS/images/wallet/trustwallet.svg';
import Coin98 from 'ASSETS/images/wallet/coin98.svg';
import CoinbaseWallet from 'ASSETS/images/wallet/coinbasewallet.svg';
import BinanceWallet from 'ASSETS/images/wallet/bscwallet.svg';
import GnosisSafe from 'ASSETS/images/wallet/gnosissafe.svg';
import { Connectors } from 'UTILS/web3';

export const currencies = [
	{
		name: 'Ethereum',
		short: 'ETH',
		img: EthereumIcon,
		height: '32',
		width: '19',
	},
	{ name: 'BSC', short: 'BSC', img: BSCIcon, height: '32', width: '32' },
];

export const wallets = [
	{
		name: 'Metamask',
		icon: MetamaskIcon,
		connectorID: Connectors.Injected.name,
	},
	{
		name: 'Wallet Connect',
		icon: WalletConnectIcon,
		connectorID: 'walletconnect',
	},
	{
		name: 'TrustWallet',
		icon: TrustWalletIcon,
		connectorID: Connectors.TrustWallet.name,
	},
	{
		name: 'Coin 98',
		icon: Coin98,
		connectorID: Connectors.TrustWallet.name,
	},
	{
		name: 'Coinbase Wallet',
		icon: CoinbaseWallet,
		connectorID: Connectors.CoinbaseWallet.name,
	},
	{
		name: 'Binance Wallet',
		icon: BinanceWallet,
		connectorID: Connectors.BinanceWallet.name,
	},
	{
		name: 'Gnosis Safe',
		icon: GnosisSafe,
		connectorID: Connectors.GnosisSafe.name,
	}
];

export const CONNECTOR_LOCAL_STORAGE_KEY = 'connector_id';
