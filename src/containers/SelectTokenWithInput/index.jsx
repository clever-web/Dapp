import SelectToken from './components/SelectToken';
import TokenInput from './components/TokenInput';

const SelectTokenWithInput = ({
  selectedValue,
  icon,
  toggleModal,
  note,
  displaySelect,
  inputValue,
  tokenToName,
  inputToName,
  handleInputChange,
  handleInputChangeMax,
  withMaxIcon = false,
  leftSideMaxIcon = false,
  withBalance,
  userTokenBalance,
  formPrice,
  disabled,
  classes = '',
  userTokenBalanceRaw = null,
  decimals = null,
}) => {
  return (
    <div className={`select-token-with-input ${classes}`}>
      <SelectToken
        name={tokenToName}
        selectedValue={selectedValue}
        onOpen={toggleModal}
        displaySelect={displaySelect}
        icon={icon}
        note={note}
      />
      <TokenInput
        inputValue={inputValue}
        name={inputToName}
        onChange={handleInputChange}
        withMaxIcon={withMaxIcon}
        leftSideMaxIcon={leftSideMaxIcon}
        disabled={disabled}
        withBalance={withBalance}
        userTokenBalance={userTokenBalance}
        formPrice={formPrice}
        handleInputChangeMax={handleInputChangeMax}
        userTokenBalanceRaw={userTokenBalanceRaw}
        decimals={decimals}
      />
    </div>
  );
};

export default SelectTokenWithInput;
