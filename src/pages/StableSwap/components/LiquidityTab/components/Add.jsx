import { useContext, useEffect, useState } from "react";
import SelectTokenWithInput from "CONTAINERS/SelectTokenWithInput";
import Button from "COMPONENTS/Button";
import Modal from "COMPONENTS/Modal";
import SwapperInfo from "./SwapperInfo";
import ConfirmModal from "./ConfirmModal";
import { useWeb3React } from "@web3-react/core";
import { getTokens } from "PAGES/StableSwap/constants";
import { useContract } from "hooks/useContract";
import { CONTRACTS_TYPE } from "utils/contracts";
import { convertToUnit, parseFromUnit } from "utils/formatters";
import { useTokenApproval } from "hooks/useTokenApprove";
import { TRANSACTION_ACTIONS, TRANSACTION_STATUS } from "UTILS/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { ToastContext } from "CONTEXT/toast-context";

import WalletModal from 'COMPONENTS/Modal';
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal';

const Add = () => {
  const { notify } = useContext(ToastContext);
  const { chainId, account } = useWeb3React();
  const stableVaultContract = useContract(CONTRACTS_TYPE.STABLE_VAULT);
  const stableCoinContract = useContract(CONTRACTS_TYPE.STABLE_TOKEN);
  const lpStableTokenContract = useContract(CONTRACTS_TYPE.LP_STABLE);
  const {
    handleApproval: handleStableApproval,
    currentAllowance: currentStableAllowance,
    transactionStatus: approvalTransactionStatus,
  } = useTokenApproval(CONTRACTS_TYPE.STABLE_TOKEN, CONTRACTS_TYPE.STABLE_VAULT);

  const [lpTotalSupply, setLpTotalSupply] = useState(BigNumber.from(0));
  const [userStableBalance, setUserStableBalance] = useState(BigNumber.from(0));
  const [stableDecimals, setStableDecimals] = useState(18);
  const [percentageOfThePool, setPercentageOfThePool] = useState(0);
  const [decimalsLp, setDecimalsLp] = useState(18);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState({
    status: null,
    type: null,
  });
  const [token, setToken] = useState({ name: null, icon: null });
  const [value, setValue] = useState(0);

  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    const getUserBalance = async () => {
      if (account && stableCoinContract && lpStableTokenContract) {
        setStableDecimals(await stableCoinContract.decimals());
        setUserStableBalance(await stableCoinContract.balanceOf(account));
        setLpTotalSupply(await lpStableTokenContract.totalSupply());
        setDecimalsLp(await lpStableTokenContract.decimals());
      }
    };
    const getCurrentSrcToken = () => {
      const { from } = getTokens(chainId);
      setToken({...from});
    }

    getUserBalance();
    getCurrentSrcToken();
  }, [account, chainId, lpStableTokenContract, stableCoinContract]);

  useEffect(() => {
    if (value) {
      const supplyAmount = parseFloat(value);
      const currentTotalAmount = parseFromUnit(lpTotalSupply, decimalsLp);

      setPercentageOfThePool(supplyAmount/(currentTotalAmount+supplyAmount) * 100);
    } else {
      setPercentageOfThePool(0);
    }
  }, [stableDecimals, lpTotalSupply, value]);

  const toggleConfirmModal = () => setShowConfirmModal((prevState) => !prevState);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const parsedValue = parseFloat(value ?? 0);
    setValue(parsedValue);
  };

  const handleInputChangeMax = (_, value) => {
    const parsedValue = parseFloat(value ?? 0);
    setValue(parsedValue);
  };

  const buttonTitle = () => {
    if (!account) return `Connect Wallet`;

    if (!currentStableAllowance || currentStableAllowance < 100000) {
      if (approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
        return `Enabling ${token.name}...`;
      }
      return `Enable ${token.name}`;
    }
    if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
      return "Supplying...";
    }
    return "Supply";
  };


  const handleButtonAction = () => {
    if(!account)
    {
      toggleShowWalletModal();
      return;
    }

    if (!currentStableAllowance || currentStableAllowance < 100000) {
      return handleStableApproval({ successMessage: "Stable is enabled!" });
    }
    return toggleConfirmModal();
  };

  const canSupply = () => {
    return transactionStatus.status !== TRANSACTION_STATUS.SUBMITTED && approvalTransactionStatus.status !== TRANSACTION_STATUS.SUBMITTED;
  };

  const supplyLp = async () => {
    try {
      setTransactionStatus({
        type: TRANSACTION_ACTIONS.SEND,
        status: TRANSACTION_STATUS.SUBMITTED,
      });
      const transaction = await stableVaultContract.deposit(convertToUnit(value, stableDecimals), account);
      notify('info', 'Deposit in progress', 'Transaction submitted');
      toggleConfirmModal();
      await transaction.wait();
      notify('success', 'Deposited!', 'Funds were deposited successfully');
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
      toggleConfirmModal();
      notify('error', 'Something is wrong!', 'Please try again later!');
    } 
  };



  

  const toggleShowWalletModal = (e) => {
		e?.stopPropagation();
		setShowWalletModal((prevState) => !prevState);
	};

  return (
    <>
      <div className="swapper">
        <SelectTokenWithInput
          selectedValue={token.name}
          icon={token.icon}
          inputValue={value}
          note="Supply"
          displaySelect={false}
          s
          tokenToName="tokenFrom"
          inputToName="inputFrom"
          handleInputChange={handleInputChange}
          handleInputChangeMax={handleInputChangeMax}
          withMaxIcon={true}
          leftSideMaxIcon={true}
          withBalance={true}
          userTokenBalance={parseFromUnit(userStableBalance, stableDecimals)}
          userTokenBalanceRaw={userStableBalance}
          decimals={stableDecimals}
          formPrice={1}
        />
        <Button
          type="button"
          text={buttonTitle()}
          wide
          green
          disabled={!canSupply()}
          classes="liquidity-tab__submit"
          onClick={handleButtonAction}
        />
        <SwapperInfo percentageOfThePool={percentageOfThePool}/>
      </div>
      <Modal show={showConfirmModal} onCancel={toggleConfirmModal}>
        <ConfirmModal supply={supplyLp} close={toggleConfirmModal} percentageOfThePool={percentageOfThePool} supplyAmount={value} token={token} />
      </Modal>

      <WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
				<ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
			</WalletModal>
    </>
  );
};

export default Add;
