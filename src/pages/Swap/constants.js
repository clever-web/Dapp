import USDTIcon from 'ASSETS/images/tokens/usdt.svg';
import BUSDIcon from 'ASSETS/images/coins/busd.svg';
// import BNBIcon from 'ASSETS/images/coins/bitcoin.svg';
import FORMIcon from 'ASSETS/images/coins/form_dark.svg';

import USDTTokenIcon from 'ASSETS/images/tokens/usdt.svg';
import BUSDTokenIcon from 'ASSETS/images/tokens/busd.svg';
// import BNBTokenIcon from 'ASSETS/images/tokens/bnb.svg';
import FORMTokenIcon from 'ASSETS/images/tokens/form.svg';

export const TAB_NAMES = { SWAP: 'swap-tab', LIQUID: 'liquidity-tab' };
export const SUB_TAB_NAMES = {
	ADD: 'liquidity-add',
	REMOVE: 'liquidity-remove',
};

export const options = [
	{ name: 'FORM', icon: FORMIcon, width: 20, height: 34 },
	{ name: 'USDT', icon: USDTIcon, width: 30, height: 25 },
	{ name: 'BUSD', icon: BUSDIcon, width: 30, height: 25 },
	// { name: 'BNB', icon: BNBIcon },
];

export const RECENT_TRANSACTIONS = [
	{ title: 'Approve FORM', link: '#' },
	{ title: 'Approve USDT', link: '#' },
	{ title: '0.50', link: '#' },
];

export const tokens = [
	{
		name: 'USDT',
		description: 'Tether USD',
		amount: 5000.08,
		icon: USDTTokenIcon,
		chain: ['ETH'],
	},
	{
		name: 'BUSD',
		description: 'Binance USD',
		amount: 0.8272,
		icon: BUSDTokenIcon,
		chain: ['BSC'],
	},
	// { name: 'BNB', description: 'Binance Coin', amount: 0, icon: BNBTokenIcon },
	{
		name: 'FORM',
		description: 'Formation Fi',
		amount: 0,
		icon: FORMTokenIcon,
		chain: ['ETH', 'BSC'],
	},
];

export const AMOUNT_TO_REMOVE = ['25', '50', '75', '100'];

export const CONFIRM_SWAP_INFO = [
	{ title: 'Price:', tooltip: 'Lorem ipsum', value: '20.7584 USDT / BUSD' },
	{ title: 'Minimum received:', tooltip: 'Lorem ipsum', value: '1.029 USDT' },
	{ title: 'Price Impact:', tooltip: 'Lorem ipsum', value: '0.10%' },
	{
		title: 'Liquidity Provider Fee:',
		tooltip: 'Lorem ipsum',
		value: '0.0001 FORM',
	},
];

export const CONFIRM_LIQUIDITY_INFO = [
	{ title: 'FORM Deposited:', value: '381.885 USDT' },
	{ title: 'USDT Deposited:', value: '90.0815 FORM' },
	{ title: 'Rates:', value: '1 FORM = 0.2359 USDT' },
	{ title: '', value: '1 USDT = 4.239 FORM' },
	{ title: 'Share of Pool:', value: '0.004173%' },
];

export const SWAP_TAB_FOOTER = [
	{
		title: 'Minimum received',
		tip: 'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed',
		value: '38050 FORM',
	},
	{
		title: 'Price impact',
		tip: 'The difference between the market price and estimated price due trade size.',
		value: '0.61%',
	},
	{
		title: 'Liquidity Provider Fee',
		tip: `For each trade a 0.25% fee is paid
        
        - 0.17 to LP token holders
        - 0.03% to the Treasury
        - 0.05% towards FORMbuyback and burn`,
		value: '28.56 USDT',
	},
];

export const CHAIN = {
	ETH: 'ETH',
	BSC: 'BSC',
};

export const SWAP_ACTIONS = {
	APPROVAL: 'APPROVAL',
};

export const getPrice = (baseCurrency = 'FORM', route0, route1) => {
	if (route0?.midPrice && route1?.midPrice) {
		if (baseCurrency === 'FORM') {
			return parseFloat(route0.midPrice.toSignificant(6));
		} else {
			return parseFloat(route1.midPrice.toSignificant(6));
		}
	} else {
		return 0;
	}
};
