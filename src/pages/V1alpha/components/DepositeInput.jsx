import { usdFormatter } from 'utils/formatters';
const DepositeInput = ({
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
	clickMax,
}) => (
	<div className='select-token-with-input__summary v1alpha__alpha__inputSummary'>
		
		<div className='select-token-with-input__summary__max'>
			<button
				style = {{marginRight:'20px', padding:'2px 15px'}}
				onClick = {clickMax}
				type='button'
				className={`select-token-with-input__summary__max__btn ${
					leftSideMaxIcon ? 'flex-order-n1' : ''
				}`}>
				max
			</button>
			<input
				name={name}
				type='text'
				value={inputValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				onChange={onChange}
				disabled={disabled === 'true'?'disabled':''}
				className='select-token-with-input__summary__input'
				step='0.01'
				min='0'
			/>
		</div>
		{withBalance ? (
			<div
				className='txt-right'
				style={{ opacity: 0.5 }}
			>
				<p className='font-size-12 c-white' style={{width: 'max-content', float: 'right'}}>
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

export default DepositeInput;
