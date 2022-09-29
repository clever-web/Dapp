import Button from "COMPONENTS/Button";
import Image from "COMPONENTS/Image";
import DoneIcon from "ASSETS/images/actions/migration/done.svg";
import NextIcon from "ASSETS/images/actions/migration/next.svg";

import { useContract } from "hooks/useContract";
import { CONTRACTS, CONTRACTS_TYPE } from "utils/contracts";
import { useTokenApproval } from "hooks/useTokenApprove";
import { convertToUnit } from "utils/formatters";
import { useCallback, useContext, useEffect, useState } from "react";
import { TRANSACTION_STATUS } from "UTILS/constants";
import { ToastContext } from "CONTEXT/toast-context";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ThemeContext } from "CONTEXT/theme-context";
import { useInterval } from "hooks/useInterval";

const doneIcon = (
  <Image
    light={DoneIcon}
    dark={DoneIcon}
    alt="Done migration step"
    w="18"
    h="17"
    classes="farms__migration-icon"
  />
);

const nextIcon = (
  <Image
    light={NextIcon}
    dark={NextIcon}
    alt="Next migration step"
    w="12"
    h="13"
    classes="farms__migration-icon"
  />
);

const STYLES = {
  CONTAINER: (theme) => { 
    return  {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      margin: "20px 0px 40px 0px",
      gap: "10px",
  }},
  MIGRATION: {
    CONTAINER: (isMobile = false, theme) => {
      return {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "10px",
        borderRadius: "10px",
        padding: "6px 12px",
        backgroundColor: theme === 'theme-light' ? "#FFF" : "#070618",
      };
    },
    STEP: (isActive, theme) => {
      return {
        CONTAINER: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px 46px",
          border: isActive
            ? "1px solid #99FFCC"
            : theme === 'theme-light' 
              ? '1px solid rgba(7, 6, 24, 0.2)'
              : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          gap: "24px",
        },
        TITLE: (theme) => { return {
          color: isActive ? "rgba(153, 255, 204, 1)" : theme === 'theme-light' ? "#000" : "rgba(255, 255, 255, 1)",
          fontWeight: 700,
          fontSize: "18px",
        }},
        DESCRITPION: {
          fontWeight: 400,
          fontSize: "14px",
        },
      };
    },
  },
};

const Migration = () => {
  const { notify } = useContext(ToastContext);
  const { theme } = useContext(ThemeContext);
  const matchMedia = useMediaQuery("(min-width: 960px)");
  
  const { account, chainId = 1 } = useWeb3React();
  const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN);
  const lpToken = useContract(CONTRACTS_TYPE.LP_TOKEN);

  // unstake process
  const [unstakeStatus, setUnstakeStatus] = useState({
    status: null,
  });
  const lpFarmV1Contract = useContract(CONTRACTS_TYPE.LP_FARMING_V1);

  // stake process
  const [stakeStatus, setStakeStatus] = useState({
    status: null,
  });
  const lpFarmV2Contract = useContract(CONTRACTS_TYPE.LP_FARMING_V2);

  // approval process
  const {
    currentAllowance,
    handleApproval: handleLPTokenApproval,
    transactionStatus: approvalStatus,
  } = useTokenApproval(CONTRACTS_TYPE.LP_TOKEN, CONTRACTS_TYPE.LP_FARMING_V2);

  // get initial state
  const [unstakeAmount, setUnstakeAmount] = useState(null);
  const [stakingBalanceRewardInWei, setStakingBalanceRewardInWei] =
    useState(null);
  const [accountBalanceInLP, setAccountBalanceInLP] = useState(null);
  const [isAddressStakingInV1, setIsAddressStakingInV1] = useState(false);
  const [isAddressStakingInV2, setIsAddressStakingInV2] = useState(false);

  useEffect(() => {
    const isAddressStaking = async () => {
      if (account && lpFarmV1Contract && lpFarmV2Contract) {
        try {
          const stakingBalance = await lpFarmV1Contract.stakingBalanceLp(account);
          if (parseFloat(formatUnits(stakingBalance?.toString(), 18))) {
            setIsAddressStakingInV1(true);
          } else {
            setIsAddressStakingInV1(false);
          }
        } catch (error) {
          setIsAddressStakingInV1(false);
        }

        try {
          const stakingBalance = await lpFarmV2Contract.stakingBalanceLp(account);
          if (parseFloat(formatUnits(stakingBalance?.toString(), 18))) {
            setIsAddressStakingInV2(true);
          } else {
            setIsAddressStakingInV2(false);
          }
        } catch (error) {
          setIsAddressStakingInV2(false);
        }
      } else {
        setIsAddressStakingInV1(false);
        setIsAddressStakingInV2(false);
      }
    }

    isAddressStaking();
  }, [chainId, account, lpFarmV1Contract, lpFarmV2Contract]);

  const getUnstakeAmount = useCallback(async () => {
    if (account && lpFarmV1Contract && formToken && lpToken) {
      const accountStakingBalanceReward =
        await lpFarmV1Contract.stakingBalanceReward(account);
      const accountStakingBalanceRewardBN = new BigNumber(
        formatUnits(accountStakingBalanceReward?.toString(), 18)
      );

      const formBalanceOnPair = await formToken.balanceOf(
        CONTRACTS[CONTRACTS_TYPE.UNISWAP_PAIR][chainId].address
      );
      const formBalanceOnPairBN = new BigNumber(
        formatUnits(formBalanceOnPair?.toString(), 18)
      );

      const lpTokenSupply = await lpToken.totalSupply();
      const lpTokenSupplyBN = new BigNumber(
        formatUnits(lpTokenSupply?.toString(), 18)
      );

      const unstakeAmount = lpTokenSupplyBN
        .multipliedBy(accountStakingBalanceRewardBN)
        .div(formBalanceOnPairBN.multipliedBy(new BigNumber(2)));
      setUnstakeAmount(unstakeAmount);
      setStakingBalanceRewardInWei(accountStakingBalanceReward?.toString());
    }
  }, [account, chainId, formToken, lpFarmV1Contract, lpToken]);

  const getUserBalanceInLPToken = useCallback(async () => {
    if (lpToken) {
      const balanceOfLpTokenOnAccount = await lpToken.balanceOf(account);
      setAccountBalanceInLP(balanceOfLpTokenOnAccount);
    }
  }, [account, lpToken]);

  useEffect(() => {
    getUnstakeAmount();
    getUserBalanceInLPToken();
  }, [account, chainId, formToken, lpFarmV1Contract, lpToken, approvalStatus, stakeStatus, unstakeStatus, getUnstakeAmount, getUserBalanceInLPToken]);

  useInterval(() => {
    getUnstakeAmount();
    getUserBalanceInLPToken();
  }, 10000);

  const handleApproval = async (event) => {
    event?.stopPropagation();
    if (!currentAllowance) {
      await handleLPTokenApproval({
        infoMessage: "In progress",
        successMessage: "Migration Approved!",
      });
      return;
    }
    console.log("Allowance is OK");
    return;
  };

  const handleUnstaking = async () => {
    try {
      if (lpFarmV1Contract && unstakeAmount) {
        const transaction = await lpFarmV1Contract.unstake(
          convertToUnit(unstakeAmount?.toFixed(18), 18),
          { gasLimit: 200000 }
        );
        setUnstakeStatus({ status: TRANSACTION_STATUS.SUBMITTED });
        notify("info", "In progress", "Migration is enabling.");

        await transaction.wait();
        setUnstakeStatus({ status: TRANSACTION_STATUS.SUCCESS });
        notify("success", "Success", "Migration Enabled!");
      }
    } catch (error) {
      console.log({ error });
      setUnstakeStatus({ status: TRANSACTION_STATUS.FAILED });
      notify("error", "Something is wrong!", "Please try again later.");
    }
  };

  const handleStaking = async () => {
    try {
      if (lpFarmV1Contract && lpToken && account) {
        const transaction = await lpFarmV2Contract.stake(accountBalanceInLP, {
          gasLimit: 200000,
        });
        setStakeStatus({ status: TRANSACTION_STATUS.SUBMITTED });
        notify("info", "In progress", "Migration is starting.");

        await transaction.wait();
        setStakeStatus({ status: TRANSACTION_STATUS.SUCCESS });
        notify("success", "Success", "Migration done!");
      }
    } catch (error) {
      console.log({ error });
      setStakeStatus({ status: TRANSACTION_STATUS.FAILED });
      notify("error", "Something is wrong!", "Please try again later.");
    }
  };


  const isFirstStepDisabled = new BigNumber(stakingBalanceRewardInWei).lt(
    new BigNumber(10).pow(decimals)
  );

  const isSecondStepDisabled = !!currentAllowance;
  const isThirdStepDisabled = (accountBalanceInLP && formatUnits(accountBalanceInLP?.toString(), 18) === "0.0");

  const currentActive = [
    isFirstStepDisabled,
    isSecondStepDisabled,
    isThirdStepDisabled,
  ].indexOf(false);


  const TXT = [
    {
      step: "1.",
      title: "Enable Migration Process",
      doneTxt: "Enabled",
      actionTxt: "Enable",
      inProgressTxt: 'Enabling',
      handler: handleUnstaking,
      inProgress: unstakeStatus.status === TRANSACTION_STATUS.SUBMITTED,
    },
    {
      step: "2.",
      title: "Approve Migration Process",
      doneTxt: "Approved",
      actionTxt: "Approve",
      inProgressTxt: 'Approving',
      handler: handleApproval,
      inProgress: approvalStatus.status === TRANSACTION_STATUS.SUBMITTED,
    },
    {
      step: "3.",
      title: "Begin Migration Process",
      doneTxt: "Confirmed",
      actionTxt: "Confirm",
      inProgressTxt: 'Confirming',
      handler: handleStaking,
      inProgress: stakeStatus.status === TRANSACTION_STATUS.SUBMITTED,
    },
  ];

  return !isAddressStakingInV1 || isAddressStakingInV2 || (isFirstStepDisabled && isSecondStepDisabled && isThirdStepDisabled) ? (
    <div style={STYLES.CONTAINER(theme)}></div>
  ) : (
    <div style={STYLES.CONTAINER(theme)}>
      <p style={{ textShadow: "0px 0px 4px #FFFFFF" }}>
        To migrate follow the next steps
      </p>
      <div style={STYLES.MIGRATION.CONTAINER(!matchMedia, theme)}>
        {TXT.map((value, index) => {
          const isThisStepActive = index === currentActive;
          const isDone = currentActive > index;
          return (
            <div style={STYLES.MIGRATION.STEP(isThisStepActive, theme).CONTAINER} key={index}>
              <p style={STYLES.MIGRATION.STEP(isThisStepActive, theme).TITLE(theme)}>
                {value.step}
              </p>
              <p style={STYLES.MIGRATION.STEP(isThisStepActive, theme).DESCRITPION}>
                {value.title}
              </p>
              <Button
                type="button"
                text={value.inProgress ? value.inProgressTxt : isDone ? value.doneTxt : value.actionTxt}
                green
                disabled={!isThisStepActive || value.inProgress}
                constantWidth
                iconBefore={isDone && doneIcon}
                iconAfter={isThisStepActive && nextIcon}
                onClick={value.handler}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Migration;
