import Button from "COMPONENTS/Button";
import SwapperButton from "CONTAINERS/SwapperButton";
import RemoveSummaryBox from "./RemoveSummaryBox";
import AmountToRemove from "./AmountToRemove";
import RemoveHeader from "./RemoveHeader";
import { AMOUNT_TO_REMOVE } from "PAGES/Swap/constants";
import ArrowDownIcon from "ASSETS/images/common/arrow-down.svg";
import { getTokens } from "PAGES/StableSwap/constants";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { CONTRACTS, CONTRACTS_TYPE } from "utils/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { useContract } from "hooks/useContract";
import { formatUnits } from "@ethersproject/units";
import { useTokenApproval } from "hooks/useTokenApprove";
import { convertToUnit, parseFromUnit } from "utils/formatters";
import { TRANSACTION_ACTIONS, TRANSACTION_STATUS } from "UTILS/constants";
import { ToastContext } from "CONTEXT/toast-context";

import WalletModal from 'COMPONENTS/Modal';
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal';

const Remove = () => {
  const { notify } = useContext(ToastContext);
  const { chainId, account } = useWeb3React();
  const stableVaultTokenContract = useContract(CONTRACTS_TYPE.STABLE_VAULT);
  const lpTokenContract = useContract(CONTRACTS_TYPE.STABLE_VAULT);
  const [transactionStatus, setTransactionStatus] = useState({
    type: null,
    status: null,
  });
  const {
    handleApproval: handleLpTokenApproval,
    currentAllowance: currentLpTokenAllowance,
    transactionStatus: approvalTransactionStatus,
  } = useTokenApproval(CONTRACTS_TYPE.LP_STABLE, CONTRACTS_TYPE.STABLE_VAULT);


  const [decimalsLp, setDecimalsLp] = useState(18);
  const [userBalanceLp, setUserBalanceLp] = useState(BigNumber.from(0));
  const [userBalanceLpReal, setUserBalanceLpReal] = useState(0);

  const [token, setToken] = useState({ name: null, icon: null });
  const [value, setValue] = useState(0);

  const [showWalletModal, setShowWalletModal] = useState(false);

  const getUserLpBalance = useCallback(async () => {
    if (account && lpTokenContract) {
      setUserBalanceLp(await lpTokenContract.balanceOf(account));
      setUserBalanceLpReal(parseFromUnit(await lpTokenContract.tokenAllocationOf(account), CONTRACTS[CONTRACTS_TYPE.STABLE_TOKEN][chainId].decimals));
      setDecimalsLp(await lpTokenContract.decimals());
    }
  }, [account, lpTokenContract]);

  useEffect(() => {
    getUserLpBalance();
    const { from } = getTokens(chainId);
    setToken({...from});
  }, [chainId, getUserLpBalance, transactionStatus]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const parsedValue = value ?? 0;
    setValue(parsedValue);
  };

  const onSelectRemoveValue = (amount) => {
    const userBalanceBN = BigNumber.from(userBalanceLp);
    const amountBN = BigNumber.from(amount);

    const fractionOfBalance = userBalanceBN.mul(amountBN).div(100);
    setValue(formatUnits(fractionOfBalance, decimalsLp));
  };

  const remove = async () => {
    try {
      setTransactionStatus({
        type: TRANSACTION_ACTIONS.SEND,
        status: TRANSACTION_STATUS.SUBMITTED,
      });
      const transaction = await stableVaultTokenContract.withdraw(convertToUnit(value, decimalsLp), account);
      notify('info', 'Withdrawal in progress', 'Transaction submitted');
      await transaction.wait();
      notify('success', 'Withdrew!', 'Funds were withdrawn successfully');
      setTransactionStatus({
        type: TRANSACTION_ACTIONS.SEND,
        status: TRANSACTION_STATUS.SUCCESS,
      });
      setValue(0);
    } catch (error) {
      setTransactionStatus({
        type: TRANSACTION_ACTIONS.SEND,
        status: TRANSACTION_STATUS.FAILED,
      });
      notify('error', 'Something is wrong!', 'Please try again later!');
    } 
  }

  const buttonTitle = () => {
    if (!account) return `Connect Wallet`;

    if (!currentLpTokenAllowance) {
      if (approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
        return `Enabling ${token.name} LP...`;
      }
      return `Enable ${token.name} LP`;
    }
    if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
      return "Removing...";
    }
    return "Remove";
  };

  const canRemove = () => {
    return transactionStatus.status !== TRANSACTION_STATUS.SUBMITTED && approvalTransactionStatus.status !== TRANSACTION_STATUS.SUBMITTED;
  }

  const buttonAction = () => {

    if(!account)
    {
      toggleShowWalletModal();
      return;
    }
    
    if (!currentLpTokenAllowance) {
      return handleLpTokenApproval({ successMessage: `${token.name} LP is enabled!`});
    }
    return remove();
  }

  const estimated = isNaN(userBalanceLpReal) ? "0" : parseFloat((value * userBalanceLpReal / parseFromUnit(userBalanceLp, decimalsLp)).toFixed(6)).toString();

  const toggleShowWalletModal = (e) => {
		e?.stopPropagation();
		setShowWalletModal((prevState) => !prevState);
	};

  return (
    <div className="swapper">
      <RemoveHeader userLpBalance={formatUnits(userBalanceLp, decimalsLp)} />
      <AmountToRemove value={value} handleChange={handleInputChange} balance={formatUnits(userBalanceLp, decimalsLp)} />
      <div className="liquidity-tab__remove__amounts">
        {AMOUNT_TO_REMOVE.map((amount) => (
          <Button
            key={amount}
            type="button"
            text={`${amount === "100" ? "MAX" : `${amount}%`}`}
            name={amount}
            classes="no-underline font-size-14"
            onClick={() => onSelectRemoveValue(amount)}
            outlined
          />
        ))}
      </div>
      <SwapperButton
        icon={ArrowDownIcon}
        iconWidth="10"
        iconHeight="16"
        onClick={() => {}}
        btnClasses="button-swapper__button--bg-dark button-swapper__button--border-green"
        classes="button-swapper__button__arrow-down position-relative left-1"
      />
      <div className="swapper__row">
        <div className="mr-2">
          <p className="font-size-14 mb-1 white-space-nowrap txt-right@phone">You will Receive:</p>
          <p className="font-size-14 font-weight-700 txt-right@phone">{token.name}</p>
        </div>
        <div className="liquidity-tab__remove__boxes">
          <RemoveSummaryBox icon={token.icon} iconWidth={token.width} iconHeight={token.height} value={estimated} name={token.name} />
        </div>
      </div>
      <div className="d-flex flex-direction-column flex-direction-row@phone align-items-center space-h--mobile">
        <Button
          type="button"
          text={buttonTitle()}
          green
          wide
          classes="liquidity-tab__submit mb-2--mobile mt-2--mobile"
          onClick={buttonAction}
          disabled={!canRemove()}
        />
      </div>
      <WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
				<ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
			</WalletModal>
    </div>
  );
};

export default Remove;
