// import { useState, useContext } from 'react';
// import { ThemeContext } from 'CONTEXT/theme-context';
// import Image from 'COMPONENTS/Image';
// import Backdrop from 'COMPONENTS/Backdrop';
// import Settings from '../../Settings';
// import RecentTransactions from '../../RecentTransactions';
// import SettingsDarkIcon from 'ASSETS/images/pages/swap/dark/settings.svg';
// import SettingsLightIcon from 'ASSETS/images/pages/swap/light/settings.svg';
// import SettingsActiveIcon from 'ASSETS/images/pages/swap/dark/settings_active.svg';
// import TimerDarkIcon from 'ASSETS/images/pages/swap/dark/timer.svg';
// import TimerLightIcon from 'ASSETS/images/pages/swap/light/timer.svg';
// import TimerActiveIcon from 'ASSETS/images/pages/swap/dark/timer_active.svg';

const Header = () => {
	// const { theme } = useContext(ThemeContext);
	// const [settingsOpen, setSettingsOpen] = useState(false);
	// const [slippage, setSlippage] = useState(0.5);
	// const [recentTransactionsOpen, setRecentTransactionsOpen] = useState(false);

	// const toggleSettings = () => {
	// 	setSettingsOpen((prevState) => !prevState);
	// 	setRecentTransactionsOpen(false);
	// };
	// const handleSlippage = (e) => setSlippage(e.target.value);
	// const renderSettingIcon = () =>
	// 	settingsOpen
	// 		? SettingsActiveIcon
	// 		: theme === 'theme-light'
	// 		? SettingsLightIcon
	// 		: SettingsDarkIcon;
	// const renderTimerIcon = () =>
	// 	recentTransactionsOpen
	// 		? TimerActiveIcon
	// 		: theme === 'theme-light'
	// 		? TimerLightIcon
	// 		: TimerDarkIcon;

	// const toggleRecentTransactions = () => {
	// 	setRecentTransactionsOpen((prevState) => !prevState);
	// 	setSettingsOpen(false);
	// };

	return (
		<div className='swap-tab__header'>
			<p className='font-size-14 font-weight-500'>
				Trade tokens in an instant
			</p>
			{/* <div className='swap-tab__header__actions'>
				<button
					type='button'
					onClick={toggleRecentTransactions}
					className='swap-tab__header__actions__button'
				>
					<Image
						light={renderTimerIcon()}
						dark={renderTimerIcon()}
						alt='Transaction'
						w={recentTransactionsOpen ? '25' : '20'}
						h={recentTransactionsOpen ? '25' : '20'}
					/>
				</button>
				<button
					type='button'
					onClick={toggleSettings}
					className='swap-tab__header__actions__button ml-1'
				>
					<Image
						light={renderSettingIcon()}
						dark={renderSettingIcon()}
						alt='Settings'
						w={settingsOpen ? '25' : '20'}
						h={settingsOpen ? '25' : '20'}
					/>
				</button>

				{settingsOpen && (
					<>
						<Backdrop
							onClick={toggleSettings}
							classes='backdrop--transparent'
						/>
						<Settings
							slippage={slippage}
							handleSlippage={handleSlippage}
						/>
					</>
				)}
				{recentTransactionsOpen && (
					<>
						<Backdrop
							onClick={toggleRecentTransactions}
							classes='backdrop--transparent'
						/>
						<RecentTransactions
							onCancel={toggleRecentTransactions}
						/>
					</>
				)}
			</div> */}
		</div>
	);
};

export default Header;
