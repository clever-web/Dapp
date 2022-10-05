const SwapperInfo = ({ selectedValue, exchangeRate, percentageOfThePool }) => (
	<div className='swapper__info'>
		<div className='swapper__info__row'>
			<p className='font-size-14'>{exchangeRate.fromPrice} {selectedValue.tokenTo.name} per 1 {selectedValue.tokenFrom.name}</p>
			<p className='font-size-14'>{percentageOfThePool?.toFixed(2) ?? "0"} %</p>
		</div>
		<div className='swapper__info__row'>
			<p className='font-size-14'>{exchangeRate.toPrice} {selectedValue.tokenFrom.name} per 1 {selectedValue.tokenTo.name}</p>
			<p className='font-size-14'>Share of Pool</p>
		</div>
	</div>
);

export default SwapperInfo;
