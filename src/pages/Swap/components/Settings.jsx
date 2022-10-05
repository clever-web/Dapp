import { Tooltip } from 'COMPONENTS/Tooltip';
import Image from 'COMPONENTS/Image';
import QuestionDarkIcon from 'ASSETS/images/actions/dark/question.svg';
import QuestionLightIcon from 'ASSETS/images/actions/light/question.svg';

const SETTINGS_TIP =
	'Your transaction will revert 23 if the price changes unfavorably by more than this percentage';

const Settings = ({ slippage, handleSlippage }) => (
	<div className='swap__settings'>
		<div className='swap__settings__title'>
			<p className='font-size-14 font-weight-700 mr-1'>
				Transaction Settings
			</p>
			<Tooltip content={SETTINGS_TIP} direction='bottom'>
				<Image
					light={QuestionLightIcon}
					dark={QuestionDarkIcon}
					alt='Information'
					w='12'
					h='12'
				/>
			</Tooltip>
		</div>
		<div className='swap__settings__slippage'>
			<p className='font-size-14 mb-1'>Slippage tolerance</p>
			<div className='swap__settings__slippage__container'>
				<input
					name='slippage'
					type='number'
					value={slippage}
					onChange={handleSlippage}
					className='swap__settings__slippage__input'
					step='0.01'
				/>
				<button
					type='button'
					onClick={() => {}}
					className='swap__settings__slippage__btn ml-1'
				>
					Auto
				</button>
			</div>
		</div>
	</div>
);

export default Settings;
