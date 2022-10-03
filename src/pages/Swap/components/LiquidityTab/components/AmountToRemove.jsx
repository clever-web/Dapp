const AmountToRemove = ({
  value,
  handleChange,
  error,
  userTokenBalanceLPToken,
}) => {
  return (
    <div className="swapper__row">
      <div className="liquidity-tab__remove">
        <p className="font-size-14">Amount to Remove:</p>
        <div className="liquidity-tab__remove__input">
          <input
            name="remove-liquidity"
            type="number"
            value={value ?? 0}
            onChange={handleChange}
            className="liquidity-tab__remove__input__number"
            step="0.01"
            min="0"
            max="100"
          />
          {userTokenBalanceLPToken ? (
            <div className="txt-right">
              <p className="font-size-12 c-white white-space-nowrap">
                Balance: {userTokenBalanceLPToken}
              </p>
            </div>
          ) : null}
        </div>
        {/* <div
				className={`liquidity-tab__remove__message ${
					error ? 'invalid' : ''
				}`}
			>
				{error && (
					<span className='error-message'>
						Please enter an amount
					</span>
				)}
			</div> */}
      </div>
    </div>
  );
};

export default AmountToRemove;
