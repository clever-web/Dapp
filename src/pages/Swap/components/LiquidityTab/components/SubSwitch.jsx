import { useState } from 'react';
// import { ThemeContext } from 'CONTEXT/theme-context';
import Button from 'COMPONENTS/Button';
// import Image from 'COMPONENTS/Image';
// import Backdrop from 'COMPONENTS/Backdrop';
import { SUB_TAB_NAMES } from 'PAGES/Swap/constants';
// import Settings from '../../Settings';
// import RecentTransactions from '../../RecentTransactions';

// import SettingsDarkIcon from 'ASSETS/images/pages/swap/dark/settings.svg';
// import SettingsLightIcon from 'ASSETS/images/pages/swap/light/settings.svg';
// import SettingsActiveIcon from 'ASSETS/images/pages/swap/dark/settings_active.svg';

// import TimerDarkIcon from 'ASSETS/images/pages/swap/dark/timer.svg';
// import TimerLightIcon from 'ASSETS/images/pages/swap/light/timer.svg';
// import TimerActiveIcon from 'ASSETS/images/pages/swap/dark/timer_active.svg';

const SubSwitch = ({ handleSubSwitch }) => {
	// const { theme } = useContext(ThemeContext);
	const [activeBtn, setActiveBtn] = useState(SUB_TAB_NAMES.ADD);
	// const [settingsOpen, setSettingsOpen] = useState(false);
	// const [slippage, setSlippage] = useState(0.5);
	// const [recentTransactionsOpen, setRecentTransactionsOpen] = useState(false);

	// const toggleSettings = () => {
	// 	setSettingsOpen((prevState) => !prevState);
	// 	setRecentTransactionsOpen(false);
	// };
	// const handleSlippage = (e) => setSlippage(e.target.value);

	// const toggleRecentTransactions = () => {
	// 	setRecentTransactionsOpen((prevState) => !prevState);
	// 	setSettingsOpen(false);
	// };

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

	const handleButtonClick = (e) => {
		const name = e.target.name;
		setActiveBtn(name);
		handleSubSwitch(name);
	};

	return (
		<div className='liquidity-tab__sub-switch'>
			<Button
				type='button'
				name={SUB_TAB_NAMES.ADD}
				text='Add'
				classes={`liquidity-tab__sub-switch__btn ${
					activeBtn === SUB_TAB_NAMES.ADD
						? 'liquidity-tab__sub-switch__btn--active font-weight-700'
						: ''
				}`}
				onClick={handleButtonClick}
			/>
			<Button
				type='button'
				name={SUB_TAB_NAMES.REMOVE}
				text='Remove'
				classes={`liquidity-tab__sub-switch__btn ${
					activeBtn === SUB_TAB_NAMES.REMOVE
						? 'liquidity-tab__sub-switch__btn--active font-weight-700'
						: ''
				}`}
				onClick={handleButtonClick}
			/>
			{/* <div className='liquidity-tab__sub-switch__actions__container'>
				<div className='liquidity-tab__sub-switch__actions'>
					<button
						type='button'
						onClick={toggleRecentTransactions}
						className='liquidity-tab__sub-switch__actions__button'
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
						className='liquidity-tab__sub-switch__actions__button ml-1'
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
				</div>
			</div> */}
		</div>
	);
};

export default SubSwitch;
