import Image from 'COMPONENTS/Image';
import { Tooltip } from 'COMPONENTS/Tooltip';
// import { SWAP_TAB_FOOTER } from 'PAGES/Swap/constants';
import QuestionDarkIcon from 'ASSETS/images/actions/dark/question.svg';
import QuestionLightIcon from 'ASSETS/images/actions/light/question.svg';

const Footer = () => (
	<div className='swap-tab__footer'>
		{/* <div className='swap-tab__footer__row' key="Minimum received">
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Minimum received</p>
				<Tooltip
					content="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed"
					direction="top"
				>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip>
			</div>
			<p className='font-size-14'>38050 FORM</p>
		</div>
		<div className='swap-tab__footer__row' key="Minimum received">
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Price impact</p>
				<Tooltip
					content="The difference between the market price and estimated price due trade size."
					direction="top"
				>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip>
			</div>
			<p className='font-size-14'>0.61%</p>
		</div> */}
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Slippage tolerance</p>
				<Tooltip
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
				</Tooltip>
			</div>
			<p className='font-size-14'>1%</p>
		</div>
		<div className='swap-tab__footer__row'>
			<div className='swap-tab__footer__row__left-col'>
				<p className='font-size-14 mr-1'>Liquidity Provider Fee</p>
				<Tooltip
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
				</Tooltip>
			</div>
			<p className='font-size-14'>0.3%</p>
		</div>
	</div>
);

export default Footer;
