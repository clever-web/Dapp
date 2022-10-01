const AmountToRemove = ({
  value,
  handleChange,
  balance,
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
          {balance ? (
            <div className="txt-right">
              <p className="font-size-12 c-white white-space-nowrap">
                Balance: {balance}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AmountToRemove;
