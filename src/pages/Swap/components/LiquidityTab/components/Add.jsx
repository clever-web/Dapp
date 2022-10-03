import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import { ToastContext } from 'CONTEXT/toast-context';
import SelectTokenWithInput from 'CONTAINERS/SelectTokenWithInput';
import TransactionModal from 'CONTAINERS/TransactionModal';
import SwapperButton from 'CONTAINERS/SwapperButton';
import Button from 'COMPONENTS/Button';
import Modal from 'COMPONENTS/Modal';
import { getPrice, options } from '../../../constants';
import SwapperInfo from './SwapperInfo';
import SelectTokenModal from '../../SelectTokenModal';
import ConfirmModal from './ConfirmModal';

import PlusDarkIcon from 'ASSETS/images/actions/dark/plus.svg';
import PlusLightIcon from 'ASSETS/images/actions/light/plus.svg';
import { CONTRACTS_TYPE } from 'utils/contracts';
import { useContract } from 'hooks/useContract';
import { Pair, Percent, TokenAmount } from "@formation-finance/sdk";
import { useWeb3React } from '@web3-react/core';
import { useTokenApproval } from 'hooks/useTokenApprove';
import { TRANSACTION_ACTIONS, TRANSACTION_STATUS } from 'UTILS/constants';
import { parseUnits } from '@ethersproject/units';

import WalletModal from 'COMPONENTS/Modal';
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal';

const Add = ({
	formToken,
	stableToken,
	userTokenBalanceFORM,
	userTokenBalanceStable,
	formTokenPrice,
	token0,
	route0,
	token1,
	route1,
	account,
}) => {
	const uniswap = useContract(CONTRACTS_TYPE.UNISWAP);
	const lpTokenContract = useContract(CONTRACTS_TYPE.LP_TOKEN);
	const uniswapPair = useContract(CONTRACTS_TYPE.UNISWAP_PAIR);

	const { transactionStatus: stableTokenApprovalStatus, currentAllowance: stableTokenAllowance, handleApproval: handleStableTokenApproval } = useTokenApproval(CONTRACTS_TYPE.STABLE_TOKEN, CONTRACTS_TYPE.UNISWAP);
	const { transactionStatus: formTokenApprovalStatus, currentAllowance: formTokenAllowance, handleApproval: handleFormTokenApproval } = useTokenApproval(CONTRACTS_TYPE.FORM_TOKEN, CONTRACTS_TYPE.UNISWAP);

	const { chainId = 1 } = useWeb3React();

	const { theme } = useContext(ThemeContext);
	const { notify } = useContext(ToastContext);
	
	const [transactionStatus, setTransactionStatus] = useState({
        status: null,
		type: null,
    });
	const [liqduityInfo, setLiqduityInfo] = useState({
		poolPercentage: null,
		receivedLpTokens: null,
	});
	const [selectedValue, setSelectedValue] = useState({
		tokenFrom: { name: options[0].name, icon: options[0].icon },
		tokenTo: { name: options[1].name, icon: options[1].icon },
	});
	const [swap, setSwap] = useState({
		inputFrom: 0,
		inputTo: 0,
	});
	const [showTokenModal, setShowTokenModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showTransactionModal, setShowTransactionModal] = useState(false);
	const [currentDestination, setCurrentDestination] = useState(null);

	const [showWalletModal, setShowWalletModal] = useState(false);

	useEffect(() => {
		if ([1,4].includes(chainId)) {
			setSelectedValue({
				tokenFrom: { name: options[0].name, icon: options[0].icon },
				tokenTo: { name: options[1].name, icon: options[1].icon },
			});
		} else if ([56,97].includes(chainId)) {
			setSelectedValue({
				tokenFrom: { name: options[0].name, icon: options[0].icon },
				tokenTo: { name: options[2].name, icon: options[2].icon },
			});
		}
	}, [chainId]);

	useEffect(() => {
		const getReserves = async () => {
			if (uniswapPair && lpTokenContract && swap.inputFrom && swap.inputTo) {
				try {
					const reserves = await uniswapPair.getReserves();
		
					const lpTokenTotalSupply = await lpTokenContract.totalSupply();
					const pair = new Pair(new TokenAmount(formToken, reserves[0]), new TokenAmount(stableToken, reserves[1]));
					
					const lpTotalSupplyTokenAmount = new TokenAmount(pair.liquidityToken, lpTokenTotalSupply.toString());
					const formTokenAmount = new TokenAmount(formToken, parseUnits(swap.inputFrom.toString(), stableToken.decimals));
					const stableTokenAmount = new TokenAmount(stableToken, parseUnits(swap.inputTo.toString(), stableToken.decimals));

					const LPTokensToReceive = pair.getLiquidityMinted(lpTotalSupplyTokenAmount, formTokenAmount, stableTokenAmount);
					const potentialPoolPercentage = new Percent(LPTokensToReceive.raw, lpTotalSupplyTokenAmount.add(LPTokensToReceive).raw);

					setLiqduityInfo({
						receivedLpTokens: LPTokensToReceive,
						poolPercentage: potentialPoolPercentage,
					});
				} catch (err) {
					console.log(err);
				}
			} else {
				setLiqduityInfo({
					receivedLpTokens: null,
					poolPercentage: null,
				});
			}
		}

		getReserves();
	}, [formToken, lpTokenContract, stableToken, swap, swap.inputFrom, swap.inputTo, uniswapPair]);


	useEffect(() => {
		const { tokenFrom } = selectedValue;
		const ratio = getPrice(selectedValue.tokenFrom.name, route0, route1);

		if (tokenFrom.name === 'FORM' && swap.inputFrom) {
			const swapValue = swap.inputFrom * ratio;

			setSwap(() => ({
				inputFrom: parseFloat(swap.inputFrom),
				inputTo: parseFloat(swapValue),
			}));
		} else {
			if (swap.inputTo) {
				const swapValue = swap.inputTo / ratio;
	
				setSwap(() => ({
					inputFrom: parseFloat(swapValue),
					inputTo: parseFloat(swap.inputTo),
				}));
			}
		}
	}, [route0, route1, selectedValue, swap.inputFrom, swap.inputTo]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const parsedValue = value ?? 0;
		const ratio = getPrice(selectedValue.tokenFrom.name, route0, route1);
		if (name === 'inputFrom') {
			const swapValue = parsedValue * ratio;

			setSwap(() => ({
				inputFrom: parseFloat(parsedValue),
				inputTo: parseFloat(swapValue),
			}));
		} else {
			const swapValue = parsedValue / ratio;

			setSwap(() => ({
				inputTo: parseFloat(parsedValue),
				inputFrom: parseFloat(swapValue),
			}));
		}
	};

	const handleInputChangeMax = (name, value) => {
		const parsedValue = value ?? 0;
		const ratio = getPrice(selectedValue.tokenFrom.name, route0, route1);

		if (name === 'inputFrom') {
			const swapValue = parsedValue * ratio;

			setSwap(() => ({
				inputFrom: parseFloat(parsedValue),
				inputTo: parseFloat(swapValue),
			}));
		} else {
			const swapValue = parsedValue / ratio;

			setSwap(() => ({
				inputFrom: parseFloat(swapValue),
				inputTo: parseFloat(parsedValue),
			}));
		}
	};

	const toggleTokenModal = (name) => {
		setShowTokenModal((prevState) => !prevState);
		if (typeof name === 'string') setCurrentDestination(name);
		else setCurrentDestination(null);
	};

	const toggleConfirmModal = () =>
		setShowConfirmModal((prevState) => !prevState);

	const toggleTransactionModal = () => {
		setShowConfirmModal(false);
		setShowTransactionModal((prevState) => !prevState);
	};

	const handleSelectToken = (destination, tokenName) => {
		const token = options.find((item) => item.name === tokenName);
		setSelectedValue((prevState) => ({
			...prevState,
			[destination]: token,
		}));
		toggleTokenModal();
	};

	const invokeAddLiquidity = async () => {
		toggleConfirmModal();
		  try {
			const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // can be different


			let inputAmount; 
			if (selectedValue.tokenFrom.name === 'BUSD') {
			  inputAmount = parseUnits(swap?.inputFrom?.toString(), 18);
			} else if (selectedValue.tokenFrom.name === 'USDT'){
				if (chainId === 1) {
					inputAmount = parseUnits(swap?.inputFrom?.toFixed(6), 6);
				} else {
					inputAmount = parseUnits(swap?.inputFrom?.toString(), 18);
				}
			} else {
			  inputAmount = parseUnits(swap?.inputFrom?.toString(), 18);
			}
	  
			let outputAmount;
			if (selectedValue.tokenTo.name === 'BUSD') {
			  outputAmount = parseUnits((swap?.inputTo)?.toString(), 18);
			} else if (selectedValue.tokenTo.name === 'USDT' ){
				if (chainId === 1) {
					outputAmount = parseUnits((swap?.inputTo)?.toFixed(6), 6);
				} else {
					outputAmount = parseUnits((swap?.inputTo)?.toString(), 18);
				}
			} else {
			  outputAmount = parseUnits((swap?.inputTo)?.toString(), 18);
			}

			let inputAmountWithSlippage;
			if (selectedValue.tokenFrom.name === 'BUSD') {
				inputAmountWithSlippage = parseUnits((swap?.inputFrom * 0.99)?.toString(), 18);
			} else if (selectedValue.tokenFrom.name === 'USDT' ){
				if (chainId === 1) {
					inputAmountWithSlippage = parseUnits((swap?.inputFrom * 0.99)?.toFixed(6), 6);
				} else {
					inputAmountWithSlippage = parseUnits((swap?.inputFrom * 0.99)?.toString(), 18);
				}
			} else {
				inputAmountWithSlippage = parseUnits((swap?.inputFrom * 0.99)?.toString(), 18);
			}
	  
			let outputAmountWithSlippage;
			if (selectedValue.tokenTo.name === 'BUSD') {
				outputAmountWithSlippage = parseUnits((swap?.inputTo * 0.99)?.toString(), 18);
			} else if (selectedValue.tokenTo.name === 'USDT' ){
				if (chainId === 1) {
					outputAmountWithSlippage = parseUnits((swap?.inputTo * 0.99)?.toFixed(6), 6);
				} else {
					outputAmountWithSlippage = parseUnits((swap?.inputTo * 0.99)?.toString(), 18);
				}
			} else {
				outputAmountWithSlippage = parseUnits((swap?.inputTo * 0.99)?.toString(), 18);
			}

			const tx = await uniswap.addLiquidity(
				token0.address,
				token1.address,
				inputAmount,
				outputAmount,
				inputAmountWithSlippage,
				outputAmountWithSlippage,
				account,
				deadline
			);
			setTransactionStatus({
				type: TRANSACTION_ACTIONS.SEND,
				status: TRANSACTION_STATUS.SUBMITTED,
			});
			notify('info', 'Addding liquidity initiated', `In progress...`);

			await tx.wait();
			setTransactionStatus({
				type: TRANSACTION_ACTIONS.SEND,
				status: TRANSACTION_STATUS.SUCCESS,
			});
			notify('success', 'Liquidity added', `Success!`);
		  } catch (err) {
			  console.log({ err });
			  setTransactionStatus({
				type: TRANSACTION_ACTIONS.SEND,
				status: TRANSACTION_STATUS.FAILED,
			});
			  notify('error', 'Addding liquidity failed', 'Please try again.');
		  }
	};

	const isButtonDisabled = () => {
		if (!formTokenAllowance || !stableTokenAllowance) {
			return formTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED || stableTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED;
		} 
		else if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
			return true;
		}
		else {
			return 		!swap.inputFrom ||
			!swap.inputTo ||
			selectedValue.tokenFrom.name === selectedValue.tokenTo.name;
		}
	}


	const isFORMasInput = selectedValue.tokenFrom.name === 'FORM';

	const exchangeRate = () => {
		return { 
			fromPrice: getPrice(selectedValue.tokenFrom.name, route0, route1),
			toPrice: getPrice(selectedValue.tokenTo.name, route0, route1),
		};
	}

	const renderButtonTitle = () => {
		if (!account) return `Connect Wallet`;

		if (!formTokenAllowance) {
			if (formTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED) {
				return `Enabling ${selectedValue.tokenFrom.name}...`;
			}
			return `Enable ${selectedValue.tokenFrom.name}`;
		}
		if (!stableTokenAllowance) {
			if (stableTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED) {
				return `Enabling ${selectedValue.tokenTo.name}...`;
			}
			return `Enable ${selectedValue.tokenTo.name}`;
		}
		if (transactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
			return 'Supplying...';
		}
		return 'Supply';
	};

	const handleButtonAction = async () => {
		if(!account)
		{
		  toggleShowWalletModal();
		  return;
		}

		if (!formTokenAllowance) {
			return handleFormTokenApproval({ successMessage: "Form is enabled!" });
		}
		if (!stableTokenAllowance) {
			return handleStableTokenApproval({ successMessage: "Stable is enabled!" });
		}
		return toggleConfirmModal();
	}

	const toggleShowWalletModal = (e) => {
		e?.stopPropagation();
		setShowWalletModal((prevState) => !prevState);
	};

	return (
		<>
			<div className='swapper'>
			<SelectTokenWithInput
				selectedValue={selectedValue.tokenFrom.name}
				icon={selectedValue.tokenFrom.icon}
				toggleModal={() => {}}
				note='Add'
				inputValue={swap.inputFrom}
				// inputValue={0}
				tokenToName='tokenFrom'
				inputToName='inputFrom'
				handleInputChange={handleInputChange}
				handleInputChangeMax={handleInputChangeMax}
				// handleInputChange={() => {}}
				// handleInputChangeMax={() => {}}
				withMaxIcon={true}
				leftSideMaxIcon={true}
				withBalance={true}
				userTokenBalance={isFORMasInput ? userTokenBalanceFORM : userTokenBalanceStable}
				formPrice={isFORMasInput ? formTokenPrice : 1}
			/>
				<>
					<SwapperButton
						icon={
							theme === 'theme-light'
								? PlusDarkIcon
								: PlusDarkIcon
						}
					/>
					<div className='liquidity-tab__swap-to'>
						<SelectTokenWithInput
							selectedValue={selectedValue.tokenTo.name}
							icon={selectedValue.tokenTo.icon}
							toggleModal={() => {}}
							note='Add'
							inputValue={!swap?.inputTo ? 0 : swap?.inputTo}
							// inputValue={0}
							tokenToName='tokenTo'
							inputToName='inputTo'
							userTokenBalance={!isFORMasInput ? userTokenBalanceFORM : userTokenBalanceStable}
							formPrice={!isFORMasInput ? formTokenPrice : 1}
							classes='pt-0--mobile'
							handleInputChange={handleInputChange}
							handleInputChangeMax={handleInputChangeMax}
							// handleInputChange={() => {}}
							// handleInputChangeMax={() => {}}
							withMaxIcon={true}
							leftSideMaxIcon={true}
							withBalance={true}
						/>
					</div>
				</>
				<Button
					type='button'
					text={renderButtonTitle()}
					wide
					green
					disabled={isButtonDisabled()}
					classes='liquidity-tab__submit'
					onClick={handleButtonAction}
				/>
				<SwapperInfo selectedValue={selectedValue} exchangeRate={exchangeRate()} percentageOfThePool={liqduityInfo?.poolPercentage} />
			</div>
			{/* <Modal show={showTokenModal} onCancel={toggleTokenModal}>
				<SelectTokenModal
					destination={currentDestination}
					handleSelectToken={handleSelectToken}
					onCancel={toggleTokenModal}
				/>
			</Modal> */}
			<Modal show={showConfirmModal} onCancel={toggleConfirmModal}>
				<ConfirmModal
					swap={swap}
					selectedValue={selectedValue}
					onCancel={toggleConfirmModal}
					invokeAddLiquidity={invokeAddLiquidity}
					rate={getPrice(selectedValue.tokenFrom.name, route0, route1)}
					liqduityInfo={liqduityInfo}
				/>
			</Modal>

			<WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
				<ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
			</WalletModal>
			{/* <Modal
				show={showTransactionModal}
				onCancel={toggleTransactionModal}
			>
				<TransactionModal
					info='Supplying 381.885 FORM and 90.0815 BUSD'
					onCancel={toggleTransactionModal}
				/>
			</Modal> */}
		</>
	);
};

export default Add;
