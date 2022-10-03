import { numberFormatter } from 'utils/formatters';

const Footer = ({ gasFee = 0, maxSwapAmount = 0, swapFee = 0, minimumSwapAmount = 0, fromToken = { name: '$' }}) => (
	<div className='swap-tab__footer'>
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Min Swap Amount</p>
				{/* <Tooltip
					content='How much can the final price be different than estimates.'
					direction="top"
				>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip> */}
			</div>
			<p className='font-size-14'>{fromToken.name} {numberFormatter.format(minimumSwapAmount)}</p>
		</div>
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Max Swap Amount</p>
				{/* <Tooltip
					content='How much can the final price be different than estimates.'
					direction="top"
				>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip> */}
			</div>
			<p className='font-size-14'>{fromToken.name} {numberFormatter.format(maxSwapAmount)}</p>
		</div>
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Swap Fee</p>
				{/* <Tooltip
					content={`For each trade a 0.30% Fee is paid. 
					
					-0.25% to LP token holders
					-0.05% to the Treasury`}
					direction="top"
				>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip> */}
			</div>
			<p className='font-size-14'>{(swapFee*100)?.toFixed(2)}%</p>
		</div>
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Standard Network Fee</p>
			</div>
			<p className='font-size-14'>{fromToken.name} {gasFee}</p>
		</div>
	</div>
);

export default Footer;
