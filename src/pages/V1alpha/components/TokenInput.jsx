import { usdFormatter } from 'utils/formatters';

const TokenInput = ({
	inputValue,
	name,
	onChange,
	withMaxIcon,
	leftSideMaxIcon,
	withBalance,
	userTokenBalance,
	formPrice,
	handleInputChangeMax,
	disabled,
}) => (
	<div className='select-token-with-input__summary'>
		
		<div className='select-token-with-input__summary__max'>
			{/* <button
				type='button'
				className={`select-token-with-input__summary__max__btn ${
					leftSideMaxIcon ? 'flex-order-n1' : ''
				}`}>
				max
			</button> */}
			<input
				name={name}
				type='text'
				value={inputValue}
				onChange={onChange}
				disabled={disabled}
				className='select-token-with-input__summary__input'
				step='0.01'
				min='0'
			/>
		</div>
		{withBalance ? (
			<div
				className='txt-right'
				style={{ minWidth: '100px', opacity: 0.5 }}
			>
				<p className='font-size-12 c-white'>
					Balance: {userTokenBalance}
				</p>
				<p className='font-size-12 c-white'>
					={' '}
					{usdFormatter.format(
						userTokenBalance * formPrice
					)}
				</p>
			</div>
		) : null}
	</div>
);

export default TokenInput;
