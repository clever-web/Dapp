// import { useState } from 'react';
import Button from "COMPONENTS/Button";
import ButtonClose from "COMPONENTS/ButtonClose";
import { Tooltip } from "COMPONENTS/Tooltip";
import Image from "COMPONENTS/Image";
import { CONFIRM_SWAP_INFO, getTokens } from "../../../constants";

import QuestionDarkIcon from "ASSETS/images/actions/dark/question.svg";
import QuestionLightIcon from "ASSETS/images/actions/light/question.svg";
import ExchangeIcon from "ASSETS/images/actions/exchange.svg";
import { useWeb3React } from "@web3-react/core";

const ConfirmModal = ({ onCancel, handleSwap, srcSwapAmount = 0, destSwapAmount = 0, fee = 0, gas = 0 }) => {

  console.log({ srcSwapAmount, destSwapAmount, fee });

  const { chainId } = useWeb3React();
  const { from, to } = getTokens(chainId);

  const renderInfoRow = (item, idx) => {
    return (
      <div className="confirm-modal__footer__row" key={item.title}>
        <div className="flex-center">
          <p className="font-size-12 mr-1">{item.title}</p>
          {/* <Tooltip content={item.tooltip} direction='top'>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip> */}
        </div>
        <div className="flex-center">
          <p className="font-weight-700">{item.value}</p>
          {/* {idx === 0 && (
					<div
						className='flex-center ml-1'
						style={{ background: '#070618', borderRadius: '50%' }}
					>
						<Image
							light={ExchangeIcon}
							dark={ExchangeIcon}
							alt='Refresh'
							w='16'
							h='16'
							classes='c-pointer'
						/>
					</div>
				)} */}
        </div>
      </div>
    );
  };

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__header">
        <p className="font-size-14 font-weight-700">Confirm Swap</p>
        <div className="d-flex justify-content-end">
          <ButtonClose onClick={onCancel} />
        </div>
      </div>

      <div className="confirm-modal__summary pt-2 pb-2">
        <div className="flex-center">
          <div className="confirm-modal__summary__icon">
            <Image light={from.icon} dark={from.icon} alt={from.name} w="30" h="30" />
          </div>
          <p className="font-size-16 font-weight-700 ml-1">{srcSwapAmount?.toFixed(3)}</p>
        </div>
        <p className="font-size-16 font-weight-700">{from.name}</p>
      </div>
      <p className="confirm-modal__arrow">&#8595;</p>
      <div className="confirm-modal__summary pb-2">
        <div className="flex-center">
          <div className="confirm-modal__summary__icon">
            <Image light={to.icon} dark={to.icon} alt={to.name} w="30" h="30" />
          </div>
          <p className="font-size-16 font-weight-700 ml-1">{destSwapAmount?.toFixed(3)}</p>
        </div>
        <p className="font-size-16 font-weight-700">{to.name}</p>
      </div>

      <div className="confirm-modal__info mb-2">
        <p className="font-size-12 txt-center">
          Output is estimated.
          <br />
		  If the final price differs by more than
          <span className="font-weight-700"> 0.1%</span>
          <br />
          the transaction will revert.
        </p>
      </div>

      <div className="confirm-modal__footer">
        {CONFIRM_SWAP_INFO(from, to, fee?.toFixed(3), gas).map((item, idx) => renderInfoRow(item, idx))}
        <div className="flex-center mt-3 mb-3">
          <Button
            type="button"
            text="Confirm Swap"
            // disabled={!updateAccepted}
            green
            classes="pl-4 pr-4"
            onClick={handleSwap}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
