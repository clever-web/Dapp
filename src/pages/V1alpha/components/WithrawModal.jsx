import Button from "COMPONENTS/Button";
import { useEffect, useState, useContext } from 'react';
import ButtonClose from "COMPONENTS/ButtonClose";
import Symbol from "./Symbol";
import Pill from 'COMPONENTS/Pill';
import { usdFormatter, numberFormatter, convertToUnit, parseFromUnit } from 'utils/formatters';
import TokenInput from './TokenInput';

const WithrawModal = ({
  onCancel,
  handleCrossChain,
  buttonDisabled,
  v1alphaTokenBalance,
  userTokenBalance,
  percentWithdraw,
  activeNumber,
}) => {
  const handleFlow = async () => {
    await handleCrossChain();
  };

  const onChange = async (e) => {
  }
  const formTokenPrice = '0.45';

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__header">
        <p className="font-size-14 font-weight-700">Withdraw</p>
        <div className="d-flex justify-content-end">
          <ButtonClose onClick={onCancel} />
        </div>
      </div>

      <div className="confirm-modal__info pt-1 pb-1">
        <p className="font-size-12 txt-center">
            Withdraw your LP Alpha Tokens
        </p>
      </div>
      <div className="confirm-modal__summary justify-content-start pt-1 pb-1">
        <div className="confirm-modal__summary__icon">
          <div
            className="flex-center"
            style={{ background: "#070618", borderRadius: "50%" }}
          >
            <Symbol/>
          </div>
        </div>
        <p className='font-size-24 font-weight-700 v1alpha__alpha__rightTitle'>LP V1 ALPHA</p>
        <div>
          <Pill
              title='coin'
              small
              value={"T"}
              classes='pill__small__light pill-desktop-layout pill__small__v1alpha_modal1'
          />
          <Pill
              title='$Alpha'
              small
              value={usdFormatter.format(formTokenPrice)}
              classes='pill__small__light pill-desktop-layout pill__small__v1alpha_modal2'
          />
        </div>
      </div>
      <div className='font-size-14' style={{marginTop: '20px'}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount to withraw
      </div>
      <div>
        <TokenInput
            name={'USDT'}
            inputValue={(userTokenBalance/4*activeNumber).toLocaleString('en')}    
            withMaxIcon={''}
            formPrice={0}
            userTokenBalance={userTokenBalance}
            disabled={false}
            onChange={onChange}
            withBalance= {true}
        />
      </div>

      <div className="flex-center mt-1 mb-1 ml-2 mr-2">
          <div className = {activeNumber==1 ? "pill__small__v1alpha_label pill__small__v1alpha_label_selected": "pill__small__v1alpha_label"}  onClick={() => percentWithdraw(1)} >25%</div>
          <div className = {activeNumber==2 ? "pill__small__v1alpha_label pill__small__v1alpha_label_selected": "pill__small__v1alpha_label"}  onClick={() => percentWithdraw(2)} >50%</div>
          <div className = {activeNumber==3 ? "pill__small__v1alpha_label pill__small__v1alpha_label_selected": "pill__small__v1alpha_label"}  onClick={() => percentWithdraw(3)} >75%</div>
          <div className = {activeNumber==4 ? "pill__small__v1alpha_label pill__small__v1alpha_label_selected": "pill__small__v1alpha_label"}  onClick={() => percentWithdraw(4)} >MAX</div>
      </div>
      <div className="flex-center mt-2 mb-2 request-button">
        <Button
          type="button"
          text="Request"
          green
          disabled={buttonDisabled}
          classes="pl-13 pr-13"
          onClick={handleFlow}
        />
      </div>
      <div className="flex-center mt-1 mb-1 pill__small__v1alpha_modalDetail">
        FINAL INFO FEE.... BOX TO EDIT
      </div>
    </div>
  );
};

export default WithrawModal;



