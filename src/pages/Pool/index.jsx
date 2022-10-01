import { useCallback, useContext, useEffect, useState } from 'react';
// import { useMediaQuery } from 'hooks/useMediaQuery';
import { ToastContext } from 'CONTEXT/toast-context';
import Title from 'COMPONENTS/Title';
import Button from 'COMPONENTS/Button';
import Modal from 'COMPONENTS/Modal';
import Pill from 'COMPONENTS/Pill';
import ButtonSwitcher from 'CONTAINERS/ButtonSwitcher';
import SelectTokenWithInput from 'CONTAINERS/SelectTokenWithInput';
import TransactionModal from 'CONTAINERS/TransactionModal';
import CalculatorModal from 'CONTAINERS/CalculatorModal';
import Header from './components/Header';
import MainBoxHeader from './components/MainBoxHeader';
import ConfirmModal from './components/ConfirmModal';
import { AMOUNT_TO_REMOVE, TAB_NAMES } from './constants';
import FORMIcon from 'ASSETS/images/coins/form_dark.svg';
import { useContract } from 'hooks/useContract';
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { usdFormatter, numberFormatter, convertToUnit, parseFromUnit } from 'utils/formatters';
import useFetch from 'use-http';
import {
	COIN_GECKO_URL,
	FORM_TOKEN_DEFAULT_PRICE,
	TRANSACTION_STATUS,
} from 'UTILS/constants';
import ClaimModal from './components/ClaimModal';
import { useInterval } from 'hooks/useInterval';
import { useTokenApproval } from 'hooks/useTokenApprove';

import WalletModal from 'COMPONENTS/Modal';
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal';

const Pool = () => {
	const { notify } = useContext(ToastContext);
	const formStakingContract = useContract(CONTRACTS_TYPE.FORM_TOKEN_STAKING);
	const formTokenContract = useContract(CONTRACTS_TYPE.FORM_TOKEN);
	const { handleApproval: handleFormTokenApproval, currentAllowance, transactionStatus: approvalTransactionStatus } = useTokenApproval(CONTRACTS_TYPE.FORM_TOKEN, CONTRACTS_TYPE.FORM_TOKEN_STAKING);
	const { account, chainId } = useWeb3React();

	const [transactionStatus, setTransactionStatus] = useState({
		status: null,
		reason: null,
	});
	const [currentTitle, setCurrentTitle] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [totalStaked, setTotalStaked] = useState(0);
	const [currentAPR, setCurrentAPR] = useState(0);
	const [totalUserStaked, setTotalUserStaked] = useState(0);
	const [totalUserProfit, setTotalUserProfit] = useState(0);
	const [userTokenBalance, setUserTokenBalance] = useState(null);
	const { data } = useFetch(COIN_GECKO_URL, {}, []);

	const [currentTab, setCurrentTab] = useState(TAB_NAMES.STAKE);
	const [selectedValue] = useState({
		tokenFrom: { name: 'FORM', icon: FORMIcon },
		tokenTo: { name: 'FORM', icon: FORMIcon },
	});
	const [inputValue, setInputValue] = useState({
		inputFrom: 0,
		inputTo: 0,
	});
	const [showClaimModal, setShowClaimModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const [showCalculatorModal, setShowCalculatorModal] = useState(false);

	const [showWalletModal, setShowWalletModal] = useState(false);

	const handleWithdrawal = async () => {
		try {
			
			const transaction = await formStakingContract.withdrawYield();
			setShowConfirmModal(false);
			notify('info', 'Harvest in progress!', 'Transaction was submitted.');
			setTransactionStatus({
				status: TRANSACTION_STATUS.SUBMITTED,
				reason: 'Transaction submitted',
			});
			handleInputChangeMax('inputTo', 0);
			
			await transaction.wait();
			setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, reason: 'Claimed.\n You earnings have been harvested to you wallet.' });
			notify('success', 'Harvested!', 'You earnings have been harvested to you wallet.');
		} catch (err) {
			notify('error', 'Something wrong happened!', 'Please try again later.');
			setTransactionStatus({
				stauts: TRANSACTION_STATUS.FAILED,
				reaon: 'Could not perform rewards withdrawal. Please try again later.',
			});
		}
	};

	const handleUnstaking = async () => {
		try {
			if (formStakingContract) {
				const transaction = await formStakingContract.unstake(
					convertToUnit(inputValue?.inputTo),
				);
				setShowConfirmModal(false);
				setTransactionStatus({ status: TRANSACTION_STATUS.SUBMITTED, reason: 'Transaction submitted.' });
				notify('info', 'Unstaking in progress!', 'Transaction was submitted.');
				
				await transaction.wait();
				setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, reason: 'Unstaked.\n Your earnings have also been harvested to you wallet.' });
				notify('success', 'Unstaked!', 'Your earnings have also been harvested to you wallet.');
			}
		} catch (error) {
			setTransactionStatus({
				status: TRANSACTION_STATUS.FAILED,
				reason: 'Can not unstake tokens. Please try again later.',
			});
			notify('error', 'Something wrong happened!', 'Please try again later.');
		}
	};

	const handleStaking = async () => {
		try {
			if (currentAllowance > 0 && currentAllowance > inputValue.inputFrom) {
				const transaction = await formStakingContract.stake(
					convertToUnit(inputValue?.inputFrom),
				);
				setShowConfirmModal(false);
				handleInputChangeMax('inputFrom', 0);
				setTransactionStatus({ status: TRANSACTION_STATUS.SUBMITTED, reason: 'Transaction submitted.' });	
				notify('info', 'Staking in progress!', 'Transaction was submitted.');
				
				await transaction.wait();
				notify('success', 'Staked!', 'Your funds have been staked in the pool.');
				setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, reason: 'Staked.\n Your funds have been staked in the pool.' });
			}
		} catch (error) {
			console.error(error);
			setShowConfirmModal(false);
			notify('error', 'Something wrong happened!', 'Please try again later.');
			setTransactionStatus({
				status: TRANSACTION_STATUS.FAILED,
				reason: 'Can not add more tokens to staking. Please try again later.',
			});
		}
	};

	// main action logic
	const handleAction = async () => {
		if (currentTab === TAB_NAMES.STAKE) {
			if (!currentAllowance) {
				setShowConfirmModal(false);
				await handleFormTokenApproval({ successMessage: "You can now stake FORM in the Pool!" });
			} else {
				await handleStaking();
			}
		} else if (currentTab === TAB_NAMES.UNSTAKE) {
			if (!currentAllowance) {
				setShowConfirmModal(false);
				await handleFormTokenApproval({ successMessage: "You can now stake FORM in the Pool!" });
			} else {
				await handleUnstaking();
			}
		}
	};

	const getUserBalance = useCallback(async () => {
		if (account && formTokenContract) {
			const userBalance = await formTokenContract.balanceOf(account);
			setUserTokenBalance(parseFromUnit(userBalance));
		} else {
			setUserTokenBalance(null);
		}
	}, [account, formTokenContract]);

	const getCurrentAPY = useCallback(async () => {
		if (formStakingContract) {
			const currentAPR = await formStakingContract.getAPRValue();
			setCurrentAPR(currentAPR);
		}
	}, [formStakingContract]);

	const getTotalStakingAmount = useCallback(async () => {
		if (formTokenContract) {
			const totalStaked = await formTokenContract.balanceOf(
				CONTRACTS[CONTRACTS_TYPE.FORM_TOKEN_STAKING][chainId].address
			);
			setTotalStaked(totalStaked);
		}
	}, [chainId, formTokenContract]);

	const getTotalStakedAmountOfUser = useCallback(async () => {
		if (account && formStakingContract) {
			try {
				const totalStakedPerUser =
					await formStakingContract.stakingBalance(account);
				const totalProfitPerUser =
					await formStakingContract.getUsersYieldAmount(account);

				setTotalUserProfit(totalProfitPerUser ?? 0);
				setTotalUserStaked(totalStakedPerUser ?? 0);
			} catch (error) {
				if (
					error?.error?.message ===
					'execution reverted: You do not stake any tokens'
				) {
					console.log('Nothing is staked for that address');
				}
				setTotalUserStaked(0);
			}
		}
	}, [account, formStakingContract]);

	// get initial state
	useEffect(() => {
		getTotalStakingAmount();
		getTotalStakedAmountOfUser();
		getCurrentAPY();
		getUserBalance();
	}, [
		formTokenContract,
		formStakingContract,
		account,
		chainId,
		getTotalStakingAmount,
		transactionStatus,
		approvalTransactionStatus,
		getTotalStakedAmountOfUser,
		getCurrentAPY,
		getUserBalance,
	]);

	useInterval(() => {
		getTotalStakingAmount();
		getTotalStakedAmountOfUser();
		getCurrentAPY();
		getUserBalance();
	}, 5000);

	// input & toggles
	const toggleClaimModal = () => setShowClaimModal((prevState) => !prevState);

	const toggleConfirmModal = () =>
	{
		if(!account)
		{
		  toggleShowWalletModal();
		  return;
		}
		setShowConfirmModal((prevState) => !prevState);
	}
	


	const toggleTransactionModal = () => {
		setShowConfirmModal(false);
		setShowTransactionModal((prevState) => !prevState);
	};

	const toggleCalculatorModal = () =>
		setShowCalculatorModal((prevState) => !prevState);

	const toggleTabSwitch = (id) => setCurrentTab(id);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputValue((prevState) => ({
			...prevState,
			[name]: parseFloat(value),
		}));
	};

	const handleInputChangeMax = (name, value) => {
		setInputValue((prevState) => ({
			...prevState,
			[name]: parseFloat(value),
		}));
	};

	const onSelectInputValue = (e) => {
		const calculatedValue =
			parseFloat(parseFromUnit(totalUserStaked)) *
			(parseInt(e.target.name, 10) / 100);

		setInputValue((prevState) => ({
			...prevState,
			inputTo: calculatedValue,
		}));
	};

	const isUserConnected = formTokenContract && account;
	const isProfit = Number(totalUserProfit) > 0;
	const isStaking = totalUserStaked && Number(totalUserStaked) > 0;


	const renderInputName = (title1, title2) =>
		currentTab === TAB_NAMES.STAKE ? title1 : title2;

	const formTokenPrice =
		data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;

	useEffect(() => {
		const renderActionTitle = () => {
			if (!isUserConnected) {
				return 'Connect wallet';
			}
			if (currentTab === TAB_NAMES.STAKE) {
				if (!currentAllowance) {
					if (
						approvalTransactionStatus.status ===
						TRANSACTION_STATUS.SUBMITTED
					) {
						return 'Enabling...';
					}
					return 'Enable';
				}
				if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
					setIsLoading(true);
					return 'Transaction in progress ...';
				}
				return 'Stake';
			} else if (currentTab === TAB_NAMES.UNSTAKE) {
				if (!currentAllowance) {
					if (
						approvalTransactionStatus.status ===
						TRANSACTION_STATUS.SUBMITTED
					) {
						return 'Enabling...';
					}
					return 'Enable';
				}
				if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
					setIsLoading(true);
					return 'Transaction in progress ...';
				}
				return 'Unstake';
			}
		};

		const currentTitle = renderActionTitle();
		setCurrentTitle(currentTitle);
	}, [approvalTransactionStatus.status, currentAllowance, currentTab, isUserConnected, transactionStatus]);


	const toggleShowWalletModal = (e) => {
		// e?.stopPropagation();
		setShowWalletModal((prevState) => !prevState);
	};
	return (
		<>
			<div className='pools space-h'>
				<div className='total-value-desktop-layout'>
					<p className='font-size-12 font-weight-500'>
						Total Value Staked
					</p>
					<p className='font-size-20 font-weight-700'>
						{usdFormatter.format(
							formTokenPrice * parseFromUnit(totalStaked)
						)}
					</p>
				</div>
				<Pill
					title='$Form price'
					value={usdFormatter.format(formTokenPrice)}
					small
					classes='pill__small__light pill-desktop-layout pools__value-pill'
				/>
				<Title title='formulas pools' />
				<div>
				<div className='pt-5--mobile-large'>
					<Header
						totalStaked={numberFormatter.format(
							parseFromUnit(totalStaked)
						)}
					/>
				</div>
					<div className='pools__box'>
						<div className='pools__box__container'>
							<MainBoxHeader
								toggleCalculator={toggleCalculatorModal}
								toggleClaimModal={toggleClaimModal}
								totalUserStaked={totalUserStaked}
								totalUserProfit={totalUserProfit}
								formPrice={formTokenPrice}
								currentAPR={currentAPR}
								isDisabled={
									!(isUserConnected && isProfit) ||
									transactionStatus.status ===
										TRANSACTION_STATUS.SUBMITTED || approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED
								}
							/>

							{/* part of tab stake and unstake */}
							<div className='mt-2'>
								<ButtonSwitcher
									firstButtonName={TAB_NAMES.STAKE}
									secondButtonName={TAB_NAMES.UNSTAKE}
									firstButtonTitle={
										isStaking ? 'Stake more FORM' : 'Stake FORM'
									}
									secondButtonTitle='Unstake'
									activeBtn={currentTab}
									setActiveBtn={toggleTabSwitch}
									disabled={!isUserConnected}
								/>
							</div>
							<SelectTokenWithInput
								selectedValue={selectedValue.tokenFrom.name}
								icon={selectedValue.tokenFrom.icon}
								toggleModal={() => {}}
								note={'Enter amount'}
								inputValue={
									currentTab === TAB_NAMES.STAKE
										? inputValue.inputFrom
										: inputValue.inputTo
								}
								tokenToName={renderInputName(
									'tokenFrom',
									'tokenTo'
								)}
								inputToName={renderInputName(
									'inputFrom',
									'inputTo'
								)}
								disabled={!isUserConnected}
								handleInputChange={handleInputChange}
								handleInputChangeMax={handleInputChangeMax}
								withMaxIcon={currentTab === TAB_NAMES.STAKE}
								leftSideMaxIcon={currentTab === TAB_NAMES.STAKE}
								withBalance={true}
								userTokenBalance={userTokenBalance}
								formPrice={formTokenPrice}
							/>
							{currentTab === TAB_NAMES.UNSTAKE && (
								<div className='pools__amounts mb-2'>
									{AMOUNT_TO_REMOVE.map((amount) => (
										<Button
											key={amount}
											type='button'
											text={`${
												amount === '100'
													? 'MAX'
													: `${amount}%`
											}`}
											name={amount}
											classes='no-underline font-size-14'
											onClick={onSelectInputValue}
											outlined
										/>
									))}
								</div>
							)}
							<div className='pools__submit__container'>
								<Button
									type='button'
									text={currentTitle}
									disabled={
										account &&
										(transactionStatus.status ===
											TRANSACTION_STATUS.SUBMITTED || approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED ||
										!isUserConnected
											? true
											: !currentAllowance
												? false
												: currentTab === TAB_NAMES.STAKE
													? !inputValue.inputFrom
													: !inputValue.inputTo)
										}
									wide
									green
									classes='pools__submit'
									onClick={toggleConfirmModal}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal show={showClaimModal} onCancel={toggleClaimModal}>
				<ClaimModal
					onCancel={toggleClaimModal}
					displayValue={totalUserProfit}
					onConfirm={handleWithdrawal}
				/>
			</Modal>
			<Modal show={showConfirmModal} onCancel={toggleConfirmModal}>
				<ConfirmModal
					selectedValue={selectedValue}
					onCancel={toggleConfirmModal}
					currentTab={currentTab}
					inputValue={inputValue}
					handleAction={handleAction}
					showTransactionModal={toggleTransactionModal}
					approvalModal={!currentAllowance}
				/>
			</Modal>
			<Modal
				show={showTransactionModal}
				onCancel={toggleTransactionModal}
			>
				<TransactionModal
					info={`Supplying ${
						currentTab === TAB_NAMES.STAKE
							? inputValue.inputFrom
							: inputValue.inputTo
					} ${
						currentTab === TAB_NAMES.STAKE
							? selectedValue.tokenFrom.name
							: selectedValue.tokenTo.name
					}`}
					onCancel={toggleTransactionModal}
					isLoading={isLoading}
					transactionStatus={transactionStatus}
				/>
			</Modal>
			<Modal show={showCalculatorModal} onCancel={toggleCalculatorModal}>
				<CalculatorModal
					onCancel={toggleCalculatorModal}
					formPrice={formTokenPrice}
					currentAPR={currentAPR}
				/>
			</Modal>

			<WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
				<ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
			</WalletModal>
		</>
	);
};

export default Pool;
