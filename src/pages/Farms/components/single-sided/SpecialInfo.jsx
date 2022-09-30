import { usdFormatter } from "utils/formatters";

const SpecialInfo = ({ currentMultiplier = 1, totalStaked = 0 }) => (
	<div className='farms__box__special-info'>
		<div className='flex-1 d-flex flex-direction-column align-items-center'>
			<div>
				<p className='font-size-12 mb-1'>TVL</p>
				<p className='font-size-12'>Multiplier</p>
			</div>
		</div>
		<div className='flex-1'>
			<p className='font-size-12 font-weight-700 mb-1'>{usdFormatter.format(totalStaked)}</p>
			<p className='font-size-12 font-weight-700'>{currentMultiplier}x</p>
		</div>
	</div>
);

export default SpecialInfo;
