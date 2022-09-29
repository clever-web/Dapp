const CoinsNames = ({ box, toggleCalculator }) => {

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
