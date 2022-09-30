import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "COMPONENTS/Button";
import ButtonClose from "COMPONENTS/ButtonClose";
import Image from "COMPONENTS/Image";
import { AMOUNT_TO_STAKE_LP, FARMS_ACTIONS } from "../../constants";
import BigNumber from "bignumber.js";

const balanceFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 7,
});

const StakeLpModal = ({
  currentPool,
  userTokenBalance,
  onCancel,
  handleStaking,
  handleUnstaking,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(0));
  const history = useHistory();

  const onSelectStakeLp = (amount) => {
    setStakeAmount(new BigNumber(userTokenBalance).multipliedBy(new BigNumber(amount/100)));
  };

  const handleClick = () => history.push("/swap");

  const title =
    type === FARMS_ACTIONS.UNSTAKE ? "Unstake LP token" : "Stake LP token";

  const handleAction = async (event) => {
    event?.stopPropagation();
    onCancel();

    if (type === FARMS_ACTIONS.STAKE) {
      await handleStaking(stakeAmount);
    } else if (type === FARMS_ACTIONS.UNSTAKE) {
      await handleUnstaking(stakeAmount);
    } else {
      console.log("Not supported operation");
    }
    return;
  };

  const changeLPTokenAmount = async (event) => {
    setStakeAmount(new BigNumber(event.target.value));
  }

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__header">
        <p className="font-size-14 font-weight-700">{title}</p>
        <div className="d-flex justify-content-end">
          <ButtonClose onClick={onCancel} />
        </div>
      </div>

      <div className="confirm-modal__summary justify-content-start pl-2 pr-2 pt-2 pb-2">
        <div className="confirm-modal__summary__icon">
          <div className="flex-center">
            <Image
              light={currentPool.coin_1.img}
              dark={currentPool.coin_1.img}
              alt={currentPool.coin_1.name}
              w="30"
              h="30"
            />
          </div>
        </div>
        <div className="ml-1">
          <p className="font-size-14">{title}</p>
          <p className="font-size-24 font-weight-700 txt-uppercase">
            {currentPool.coin_1.name} LP
          </p>
        </div>
      </div>

      <div className="pl-2 pr-2" style = {{marginTop:'10px'}}>
        <div
          className={`farms__stake-modal__input ${
            !userTokenBalance ? "farms__stake-modal__input--invalid" : ""
          }`}
        >
          <div className="txt-left">
            <input type= "number" className="font-size-18 font-weight-700 farms__stablefarm_first" onChange = {changeLPTokenAmount} value = {stakeAmount}/>
            {/* <input
              type='text'
              value={(stakeAmount || 0)?.toString()}
              onChange={changeLPTokenAmount}
              disabled={false}
              className='select-token-with-input__summary__input'
              step='0.01'
              min='0'
            /> */}
          </div>
          <div className="txt-right">
            <span className="font-size-12">
              Balance: {balanceFormatter.format(userTokenBalance)}
            </span>
            {/* <br /> */}
            {/* <span className='font-size-12'>= {usdFormatter.format(formTokenPrice * userTokenBalance)}</span> */}
          </div>
          {!userTokenBalance && (
            <span className="farms__stake-modal__input--message">
              No LP Tokens
            </span>
          )}
        </div>
      </div>

      <div className="farms__stake-amount">
        {AMOUNT_TO_STAKE_LP.map((amount) => (
          <Button
            key={amount}
            type="button"
            text={`${amount === "100" ? "MAX" : `${amount}%`}`}
            name={amount}
            classes="no-underline font-size-14"
            onClick={() => {
              onSelectStakeLp(amount);
            }}
            outlined
          />
        ))}
      </div>

      <div className="flex-center gap-2 pl-2 pr-2 mt-3 mb-3">
        <Button
          type="button"
          text="Cancel"
          outlined
          classes="w-100"
          onClick={onCancel}
        />
        <Button
          type="button"
          text="Confirm"
          value={type}
          green={!isLoading}
          disabled={isLoading || !userTokenBalance}
          classes={`w-100 ${isLoading ? "no-underline" : ""}`}
          onClick={handleAction}
        />
      </div>
      {userTokenBalance && type === FARMS_ACTIONS.UNSTAKE && (
        <div className="farms__stake-modal--info mb-2">
          <p className="font-size-12 txt-left line-height-4">
            For each “Unstake” a 0.30% fee is paid
            <br /> - 0.15% to the Treasury
            <br /> - 0.15% towards FORM buyback and burn
          </p>
        </div>
      )}

      {!userTokenBalance && (
        <div className="txt-center">
          <Button
            type="button"
            text="Get FORM"
            outlinedGreen
            classes="mb-2 pl-2 pr-2"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default StakeLpModal;
