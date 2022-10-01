// import Image from 'COMPONENTS/Image';
import Pill from 'COMPONENTS/Pill';
import Button from 'COMPONENTS/Button';
// import CalculatorDarkIcon from 'ASSETS/images/common/dark/calculator.svg';
// import CalculatorLightIcon from 'ASSETS/images/common/light/calculator.svg';
import { numberFormatter, parseFromUnit, usdFormatter } from 'utils/formatters';

const MainBoxHeader = ({
	totalUserStaked,
	totalUserProfit,
	formPrice,
	// toggleCalculator,
	currentAPR,
	toggleClaimModal,
	isDisabled
}) => {
	return (
		<div className='pools__box__header'>
			<div className='pools__box__header__bin'>
				<p className='font-size-14'>FORM staked:</p>
				<p className='font-size-20 font-weight-700'>
					{numberFormatter.format(parseFromUnit(totalUserStaked))}
				</p>
				<p className='font-size-12'>
					={' '}
					{usdFormatter.format(
						parseFromUnit(totalUserStaked) * formPrice
					)}
				</p>
			</div>

			<div className='pools__box__header__bin'>
			<div className='pools__box__header__bin__column pools__box__header__bin__column--left'>
					<p className='font-size-14'>FORM profit:</p>
					<p className='font-size-20 font-weight-700'>
						{numberFormatter.format(parseFromUnit(totalUserProfit))}
					</p>
					<p className='font-size-12'>
						={' '}
						{usdFormatter.format(
							parseFromUnit(totalUserProfit) * formPrice
						)}
					</p>
				</div>
				<div className='pools__box__header__bin__column pools__box__header__bin__column--right'>
					<Button
						type='button'
						text='Claim'
						small
						outlinedGreen
						classes='pl-2 pr-2 font-size-14 font-weight-700'
						onClick={toggleClaimModal}
						disabled={isDisabled}
					/>
				</div>
			</div>
			<div className='d-flex justify-content-space-evenly align-items-center'>
				{/* <button
          type="button"
          className="btn-icon p-0"
          onClick={toggleCalculator}
        >
          <Image
            dark={CalculatorDarkIcon}
            light={CalculatorLightIcon}
            alt="Calculate"
            w="15"
            h="15"
            classes="farms__calculator"
          />
        </button> */}

				<Pill
					title='APR'
					value={`${numberFormatter.format(currentAPR)}%`}
					small
				/>
			</div>
		</div>
	);
};

export default MainBoxHeader;
