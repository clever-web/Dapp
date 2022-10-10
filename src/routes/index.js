import HomeDark from 'COMPONENTS/Icons/dark/HomeIcon';
import SwapDark from 'COMPONENTS/Icons/dark/SwapIcon';
import FarmsDark from 'COMPONENTS/Icons/dark/FarmsIcon';
// import EarlyAdoptionDark from 'components/Icons/dark/EarlyAdoptionIcon';
import PoolDark from 'COMPONENTS/Icons/dark/PoolIcon';
import BridgeDark from 'COMPONENTS/Icons/dark/BridgeIcon';
import V1alphaDark from 'COMPONENTS/Icons/dark/V1alpha';
import HomeLight from 'COMPONENTS/Icons/light/HomeIcon';
import SwapLight from 'COMPONENTS/Icons/light/SwapIcon';
import FarmsLight from 'COMPONENTS/Icons/light/FarmsIcon';
// import EarlyAdoptionLight from 'COMPONENTS/Icons/light/EarlyAdoptionIcon';
import PoolLight from 'COMPONENTS/Icons/light/PoolIcon';
import BridgeLight from 'COMPONENTS/Icons/light/BridgeIcon';
import V1alphaLight from 'COMPONENTS/Icons/light/V1alpha';

export const routes = (mode) => [
	{
		path: '/',
		name: 'home',
		MenuIcon: mode === 'theme-dark' ? HomeDark : HomeLight,
	},
	{
		path: '/swap',
		name: 'swap',
		MenuIcon: mode === 'theme-dark' ? SwapDark : SwapLight,
	},
	{
		path: '/stable-swap',
		name: 'stable swap',
		MenuIcon: mode === 'theme-dark' ? SwapDark : SwapLight,
	},
	{
		path: '/farms',
		name: 'farms',
		MenuIcon: mode === 'theme-dark' ? FarmsDark : FarmsLight,
	},
	{
		path: '/pools',
		name: 'pools',
		MenuIcon: mode === 'theme-dark' ? PoolDark : PoolLight,
	},
	{
		path: '/bridge',
		name: 'bridge',
		MenuIcon: mode === 'theme-dark' ? BridgeDark : BridgeLight,
	},
	{
		path: '/v1alpha',
		name: 'v1 alpha',
		MenuIcon: mode === 'theme-dark' ? V1alphaDark : V1alphaLight,
	}
	// {
	// 	path: '/early-adoption-program',
	// 	name: 'early adoption program',
	// 	MenuIcon:
	// 		mode === 'theme-dark' ? EarlyAdoptionDark : EarlyAdoptionLight,
	// },
];
