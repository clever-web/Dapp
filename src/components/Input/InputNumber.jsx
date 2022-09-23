export const InputNumber = ({
	name,
	id,
	labelTopLeft,
	labelBottomRight,
	onChange,
	value,
	classes,
}) => {
	return (
		<div className={`${classes ? classes : ''}`}>
			{labelTopLeft && (
				<label
					htmlFor={id}
					className='input__label font-size-12 font-weight-400'
				>
					{labelTopLeft}
				</label>
			)}
			<div className='input__number__container'>
				<input
					name={name}
					type='number'
					value={value}
					onChange={onChange}
					className='input__number'
					step='0.0001'
				/>
			</div>
			{labelBottomRight && (
				<label className='input__label font-size-14 font-weight-400 txt-right txt-underline mt-1'>
					{labelBottomRight}
				</label>
			)}
		</div>
	);
};
