// import { useMediaQuery } from 'hooks/useMediaQuery';
// import Image from 'COMPONENTS/Image';
// import CalculatorDarkIcon from 'ASSETS/images/common/dark/calculator.svg';
// import CalculatorLightIcon from 'ASSETS/images/common/light/calculator.svg';

const CoinsNames = ({ box, toggleCalculator }) => {
	// const matchMedia = useMediaQuery('(min-width: 960px)');

	return (
		box && box.coin_2 ? (
			<div className='d-flex justify-content-space-between align-items-center pr-1 h-100' style={{ borderRight: '1px solid rgba(var(--common-bg-color-rgb))' }}>
				<p className='font-weight-700'>
					{box.coin_1.name}/{box.coin_2.name}
				</p>
			</div>
		) : (
			<div className='d-flex justify-content-space-between align-items-center pr-1 h-100' style={{ borderRight: '1px solid rgba(var(--common-bg-color-rgb))' }}>
			<p className='font-weight-700'>
				{box.coin_1.name}
			</p>
		</div>
		)
	);
};

export default CoinsNames;
