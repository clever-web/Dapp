import USDTTokenIcon from 'ASSETS/images/tokens/usdt.svg';
import BUSDTokenIcon from 'ASSETS/images/tokens/busd.svg';
// import BNBTokenIcon from 'ASSETS/images/tokens/bnb.svg';
import FORMTokenDarkIcon from 'ASSETS/images/tokens/form.svg';
import FORMTokenLightIcon from 'ASSETS/images/tokens/form_dark_bg.svg';

// import FORMTokenDarkIcon from 'ASSETS/images/tokens/form_black.svg';
// import FORMTokenLightIcon from 'ASSETS/images/tokens/form_white.svg';
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts';

export const active_farms = (theme, chainId) => {
	if ([1,4].includes(chainId)) {
		return [
			{
				active: true,
				type: CONTRACTS_TYPE.LP_STABLE_FARMING,
				name: 'LP Stable FARM',
				coin_1: {
					img: USDTTokenIcon,
					name: 'USDT',
				},
			},
			{
				active: true,
				type: CONTRACTS_TYPE.LP_FARMING_V2,
				name: 'V2 FARM',
				coin_1: {
					img:
						theme === 'theme-light'
							? FORMTokenLightIcon
							: FORMTokenDarkIcon,
					name: 'FORM',
				},
				coin_2: {
					img: USDTTokenIcon,
					name: 'USDT',
				},
			},
		]
	} else if ([56,97].includes(chainId)) {
		return [
			{
				active: true,
				type: CONTRACTS_TYPE.LP_STABLE_FARMING,
				name: 'LP Stable FARM',
				coin_1: {
					img: BUSDTokenIcon,
					name: 'BUSD',
				},
			},
			{
				active: true,
				type: CONTRACTS_TYPE.LP_FARMING_V2,
				name: 'V2 FARM',
				coin_1: {
					img:
						theme === 'theme-light'
							? FORMTokenLightIcon
							: FORMTokenDarkIcon,
					name: 'FORM',
				},
				coin_2: {
					img: BUSDTokenIcon,
					name: 'BUSD',
				},
			},
		]
	} else {
		return [];
	}
};

export const AMOUNT_TO_STAKE_LP = ['25', '50', '75', '100'];

export const BOX_EARN_STYLE = {
	DARK: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
	LIGHT: { backgroundColor: '#f3f3f3' },
};

export const BOX_EARN_TEXT_STYLE = {
	DARK: { color: '#fff' },
	LIGHT: { color: '#070618' },
};

export const FARMS_ACTIONS = {
	STAKE: 'STAKE',
	UNSTAKE: 'UNSTAKE',
	HARVEST: 'HARVEST',
	APPROVAL: 'APPROVAL',
};
