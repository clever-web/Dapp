import { formatUnits } from '@ethersproject/units'
import { parseFromUnit, usdFormatter } from 'utils/formatters'

import { fromWei, toWei } from 'utils/formatters'

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
  userTokenBalanceRaw,
  decimals,
}) => {
  return (
    <div className="select-token-with-input__summary">
      <div className="select-token-with-input__summary__max">
        {withMaxIcon && (
          <button
            type="button"
            className={`select-token-with-input__summary__max__btn ${
              leftSideMaxIcon ? 'flex-order-n1' : ''
            }`}
            onClick={() =>
              handleInputChangeMax(
                name,
                userTokenBalanceRaw
                  ? formatUnits(userTokenBalanceRaw, decimals)
                  : userTokenBalance,
              )
            }
          >
            max
          </button>
        )}

        {!withMaxIcon && (
          <button
            style={{ opacity: '0' }}
            type="button"
            className={`select-token-with-input__summary__max__btn`}
          >
            Max
          </button>
        )}

        <input
          name={name}
          type="number"
          value={(inputValue || 0)?.toString()}
          onChange={onChange}
          disabled={disabled}
          className="select-token-with-input__summary__input"
          step="0.01"
          min="0"
        />
      </div>
      {withBalance ? (
        <div className="txt-right" style={{ minWidth: '100px', opacity: 0.5 }}>
          <p className="font-size-12 c-white">
            Balance:{' '}
            {userTokenBalanceRaw && decimals
              ? fromWei(userTokenBalanceRaw, decimals)
              : userTokenBalance}
          </p>
          <p className="font-size-12 c-white">
            ={' '}
            {usdFormatter.format(
              userTokenBalanceRaw && decimals
                ? fromWei(userTokenBalanceRaw, decimals) * formPrice
                : userTokenBalance * formPrice,
            )}
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default TokenInput
