import { useHistory } from 'react-router-dom';
import Button from 'COMPONENTS/Button';
import ButtonClose from 'COMPONENTS/ButtonClose';
import Image from 'COMPONENTS/Image';
import CalculatorDarkIcon from 'ASSETS/images/common/dark/calculator.svg';
import CalculatorLightIcon from 'ASSETS/images/common/light/calculator.svg';
import BUSDTokenIcon from 'ASSETS/images/tokens/busd.svg';
import FORMTokenIcon from 'ASSETS/images/tokens/form.svg';
import { numberFormatter, usdFormatter } from 'utils/formatters';

const getCalculatorData = (formPrice, currentAPR) => {
	const data = [
		{
			timeframe: '1D',
			roi: numberFormatter.format(currentAPR / 365),
			reward: {
				line1: `${numberFormatter.format(
					(1000 / formPrice) * (currentAPR / 365 / 100)
				)} FORM`,
				line2: `= ${usdFormatter.format(
					(1000 / formPrice) * (currentAPR / 365 / 100) * formPrice
				)}`,
			},
		},
		{
			timeframe: '7D',
			roi: numberFormatter.format((currentAPR / 365) * 7),
			reward: {
				line1: `${numberFormatter.format(
					(1000 / formPrice) * (currentAPR / 365 / 100) * 7
				)} FORM`,
				line2: `= ${usdFormatter.format(
					(1000 / formPrice) *
						(currentAPR / 365 / 100) *
						7 *
						formPrice
				)}`,
			},
		},
		{
			timeframe: '30D',
			roi: numberFormatter.format((currentAPR / 365) * 30),
			reward: {
				line1: `${numberFormatter.format(
					(1000 / formPrice) * (currentAPR / 365 / 100) * 30
				)} FORM`,
				line2: `= ${usdFormatter.format(
					(1000 / formPrice) *
						(currentAPR / 365 / 100) *
						30 *
						formPrice
				)}`,
			},
		},
		{
			timeframe: '1Y',
			roi: numberFormatter.format((currentAPR / 365) * 365),
			reward: {
				line1: `${numberFormatter.format(
					(1000 / formPrice) * (currentAPR / 365 / 100) * 365
				)} FORM`,
				line2: `= ${usdFormatter.format(
					(1000 / formPrice) *
						(currentAPR / 365 / 100) *
						365 *
						formPrice
				)}`,
			},
		},
	];

	return data;
};

const CalculatorModal = ({ onCancel, currentAPR, formPrice }) => {
	const history = useHistory();
	const handleClick = () => history.push('/swap');

	return (
		<div className='calculator-modal'>
			<div className='calculator-modal__header'>
				<div className='d-flex align-items-center'>
					<Image
						dark={CalculatorDarkIcon}
						light={CalculatorLightIcon}
						alt='Calculate'
						w='15'
						h='15'
						classes='farms__calculator'
					/>
					<p className='font-size-14 font-weight-700 line-height-4 ml-1'>
						ROI Estimation
					</p>
				</div>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onCancel} />
				</div>
			</div>

			<div className='calculator-modal__body'>
				<div className='calculator-modal__body__coins'>
					<div className='calculator-modal__body__coins__icon'>
						<Image
							light={FORMTokenIcon}
							dark={FORMTokenIcon}
							alt='FORM'
							w='30'
							h='30'
						/>
					</div>
					<div className='calculator-modal__body__coins__icon ml-n1'>
						<Image
							light={BUSDTokenIcon}
							dark={BUSDTokenIcon}
							alt='USDT'
							w='30'
							h='30'
						/>
					</div>
					{/* <p className='font-size-20 font-weight-700 ml-1'>
						FORM &#47; BUSD
					</p> */}
				</div>
				<div className='calculator-modal__body__table-head mt-2 mb-1'>
					<p className='font-size-14 font-weight-700'>Timeframe</p>
					<p className='font-size-14 font-weight-700'>ROI</p>
					<p className='font-size-14 font-weight-700 txt-right'>
						Rewards per &#36;1000
					</p>
				</div>
				{getCalculatorData(formPrice, currentAPR).map((item) => (
					<div
						className='calculator-modal__body__table-row'
						key={item.timeframe}
					>
						<p className='font-size-14 font-weight-700'>
							{item.timeframe}
						</p>
						<p className='font-size-14 font-weight-700'>
							{item.roi}
						</p>
						<p className='font-size-14 txt-right'>
							<span className='font-weight-700'>
								{item.reward.line1}
							</span>
							<br />
							<span>{item.reward.line2}</span>
						</p>
					</div>
				))}

				<div className='txt-center'>
					<Button
						type='button'
						text='Get FORM'
						outlinedGreen
						classes='mt-2 mb-2 pl-2 pr-2'
						onClick={handleClick}
					/>
				</div>
			</div>

			<div className='calculator-modal__footer'>
				<div className='calculator-modal__footer__bin'>
					<p className='font-size-14 line-height-4'>
						Calculated based on current rates. Compounding 1x daily.
						Rates are estimates provided for your convenience only.
					</p>
				</div>
			</div>
		</div>
	);
};

export default CalculatorModal;
