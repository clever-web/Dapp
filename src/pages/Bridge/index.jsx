import { useCallback, useContext, useEffect, useState } from 'react';
import Reminder from 'CONTAINERS/Reminder';
import SelectTokenWithInput from 'CONTAINERS/SelectTokenWithInput';
import SwapperButton from 'CONTAINERS/SwapperButton';
import TransactionModal from 'CONTAINERS/TransactionModal';
import Title from 'COMPONENTS/Title';
import Pill from 'COMPONENTS/Pill';
import Button from 'COMPONENTS/Button';
import Modal from 'COMPONENTS/Modal';
import ConfirmModal from './components/ConfirmModal';
import { ANYSWAP_CONFIG, options } from './constants';
import { useAnySwapAPI } from 'hooks/useAnySwapAPI';
import { useWeb3React } from '@web3-react/core';
import { parseUnits } from 'ethers/lib/utils';
import { useContract } from 'hooks/useContract';
import { CONTRACTS_TYPE } from 'utils/contracts';
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE, TRANSACTION_STATUS } from 'UTILS/constants';
import useFetch from 'use-http';
import { parseFromUnit, usdFormatter } from 'utils/formatters';
import { ToastContext } from 'CONTEXT/toast-context';

import WalletModal from 'COMPONENTS/Modal';
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal';

const getSwapDetails = (bridgeInfo, srcToken) => {
	if (!bridgeInfo || !srcToken) {
		return {
			minimumSwapFee: 0,
			maxiumumSwapFee: 0,
			minimumSwapAmount: 0,
			maximumSwapAmount: 0,
			swapFeeRate: 0,
		};
	}

	let swapDetails = {
		MinimumSwapFee: 0,
		MaximumSwapFee: 0,
		SwapFeeRate: 0,
		MaximumSwap: 0,
		MinimumSwap: 0,
	};
	if (srcToken === 'ETH') {
		swapDetails = bridgeInfo?.SrcToken;
	} else if (srcToken === 'BNB') {
		swapDetails = bridgeInfo?.DestToken;
	}

	const {
		MinimumSwapFee: minimumSwapFee,
		MaximumSwapFee: maxiumumSwapFee,
		SwapFeeRate: swapFeeRate,
		MaximumSwap: maximumSwapAmount,
		MinimumSwap: minimumSwapAmount,
	} = swapDetails;
	return {
		minimumSwapAmount,
		maxiumumSwapFee,
		swapFeeRate,
		maximumSwapAmount,
		minimumSwapFee,
	};
};



const getSwapAmounts = (
	swapInAmount,
	swapFeeRate,
	minimumSwapFee,
	maxiumumSwapFee
) => {
	const absolutSwapFeeAmount = swapInAmount * swapFeeRate;

	const actualFeeAmount =
		absolutSwapFeeAmount < minimumSwapFee
			? minimumSwapFee
			: absolutSwapFeeAmount > maxiumumSwapFee
			? maxiumumSwapFee
			: absolutSwapFeeAmount;
	const swapOutAmount =
		swapInAmount - actualFeeAmount < 0 ? 0 : swapInAmount - actualFeeAmount;

	return { swapInAmount, swapOutAmount };
};


const getSwapState = (chainId) => {
	if (chainId === 1) {
		return {
			tokenFrom: {
				name: options[1].name,
				icon: options[1].icon,
				chainFrom: '$FORM-ERC20',
			},
			tokenTo: {
				name: options[0].name,
				icon: options[0].icon,
				chainTo: '$FORM-BEP20',
			},
		}
	} else if (chainId === 56) {
		return {
			tokenFrom: {
				name: options[0].name,
				icon: options[0].icon,
				chainFrom: '$FORM-BEP20',
			},
			tokenTo: {
				name: options[1].name,
				icon: options[1].icon,
				chainTo: '$FORM-ERC20',
			},
		}
	}
	return {
		tokenFrom: {
			name: options[1].name,
			icon: options[1].icon,
			chainFrom: '$FORM-ERC20',
		},
		tokenTo: {
			name: options[0].name,
			icon: options[0].icon,
			chainTo: '$FORM-BEP20',
		},
	};
}

const Bridge = () => {
	const { notify } = useContext(ToastContext);

	const { data } = useAnySwapAPI();
	const [isSwapping, setIsSwapping] = useState(false);
	const { data: formTokenData } = useFetch(COIN_GECKO_URL, {}, []);


	const [transactionStatus, setTransactionStatus] = useState({
		status: null,
		reason: null,
	});
	const { chainId, account } = useWeb3React();

	const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN);
	const anyFormToken = useContract(CONTRACTS_TYPE.ANY_FORM_TOKEN);

	const [userTokenBalance, setUserTokenBalance] = useState(null);
	const [selectedValue, setSelectedValue] = useState(getSwapState(chainId));
	const [swap, setSwap] = useState({
		inputFrom: 0,
		inputTo: 0,
	});
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showTransactionModal, setShowTransactionModal] = useState(false);


	const [showWalletModal, setShowWalletModal] = useState(false);
	

	const {
		minimumSwapFee,
		maxiumumSwapFee,
		minimumSwapAmount,
		maximumSwapAmount,
		swapFeeRate,
	} = getSwapDetails(data, selectedValue.tokenFrom.name);
	const { swapInAmount, swapOutAmount } = getSwapAmounts(
		swap.inputFrom,
		swapFeeRate,
		minimumSwapFee,
		maxiumumSwapFee
	);

	const setCrossChainError = (reason) => {
		setIsSwapping(false);
		setTransactionStatus({
			status: TRANSACTION_STATUS.FAILED,
			reason,
		});
		setShowTransactionModal(true);
	};

	const changeNetwork = async (chainId) => {
		try {
			await window.ethereum.request({
			  method: 'wallet_switchEthereumChain',
			  params: [{ chainId }],
			});
		  } catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
			  try {
				await window.ethereum.request({
				  method: 'wallet_addEthereumChain',
				  params: [{ chainId }],
				});
			  } catch (addError) {
			  }
			}
		  }
    }

	const handleCrossChain = async () => {
		try {
			setIsSwapping(true);
			toggleConfirmModal();

			if (selectedValue.tokenFrom.name === 'ETH') {
				if (swapInAmount < data.SrcToken.MinimumSwap) {
					notify('Error', 'Something is wrong!', 'Amount is too small.')
					setCrossChainError(
						`Swap amount too low. Minimum value is: ${data.SrcToken.MinimumSwap}`
					);
					return;
				}
				if (chainId !== 1) {
					notify('Error', 'Something is wrong!', 'Please, change network to the Etherum Mainnet')
					setCrossChainError(
						`Please, change network to the Etherum Mainnet`
					);
					return;
				}
				// const { hash } =
				const transaction = await formToken.transfer(
					ANYSWAP_CONFIG.SWAP_TO_BEP_ADDRESS,
					parseUnits(swapInAmount.toString(), 18)
				);
				notify('info', 'Bridge in progress.', 'Transaction submitted.');
				setTransactionStatus({ status: TRANSACTION_STATUS.SUBMITTED, reason: 'Transaction submitted.' });
				
				await transaction.wait();
				notify('info', 'Bridge was completed on ETH.', 'Please wait a few moments so your funds will arrive on BSC.');
				setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, reason: 'CROSS-CHAIN\n Tokens successfully sent.' });
				setIsSwapping(false);
			}

			if (selectedValue.tokenFrom.name === 'BNB') {
				if (swapInAmount < data.DestToken.MinimumSwap) {
					setIsSwapping(false);
					setTransactionStatus({
						status: TRANSACTION_STATUS.FAILED,
						reason: `Swap amount too low. Minimum value is: ${data.DestToken.MinimumSwap}`,
					});
					notify('Error', 'Something is wrong!', 'Amount is too small.')
					setShowTransactionModal(false);
					return;
				}
				if (chainId !== 56) {
					notify('Error', 'Something is wrong!', 'Please, change network to the BSC.')
					setCrossChainError(`Please, change network to the BSC`);
					return;
				}
				if (!account) {
					notify('Error', 'Something is wrong!', 'Please, connect your wallet first.')
					setCrossChainError(
						`Connect wallet prior to swap.`
					);
					return;
				}

				// const { hash } =
				const transaction = await anyFormToken.Swapout(
					parseUnits(swapInAmount.toString(), 18),
					account
				);
				notify('info', 'Bridge in progress.', 'Transaction submitted.');
				setTransactionStatus({ status: TRANSACTION_STATUS.SUBMITTED, reason: 'Transaction submitted.' });
				
				await transaction.wait();
				notify('info', 'Bridge was completed on BSC.', 'Please wait a few moments so your funds will arrive on ETH.');
				setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, reason: 'CROSS-CHAIN\n Tokens successfully sent.' });				
				setIsSwapping(false);
			}
		} catch (err) {
			if (
				err?.message ===
				'MetaMask Tx Signature: User denied transaction signature.'
			) {
				setCrossChainError('');
			} else {
				setCrossChainError(
					`Plese try again later.`
				);
			}
			console.log({ err });
			notify('Error', 'Something is wrong!', 'Please try again later.')
		}
	};

	const handleSwap = async () => {
		const currentFrom = {
			name: selectedValue.tokenFrom.name,
			icon: selectedValue.tokenFrom.icon,
			chain: selectedValue.tokenFrom.chainFrom,
			value: swap.inputFrom,
		};
		const currentTo = {
			name: selectedValue.tokenTo.name,
			icon: selectedValue.tokenTo.icon,
			chain: selectedValue.tokenTo.chainTo,
			value: swap.inputTo,
		};
		
		const fromNetwork = currentTo.name === 'BNB' ? '0x38' : '0x1';
		await changeNetwork(fromNetwork);

		setSelectedValue({
			tokenFrom: {
				name: currentTo.name,
				icon: currentTo.icon,
				chainFrom: currentTo.chain,
			},
			tokenTo: {
				name: currentFrom.name,
				icon: currentFrom.icon,
				chainTo: currentFrom.chain,
			},
		});

		setSwap({
			inputFrom: currentTo.value,
			inputTo: currentFrom.value,
		});
	};


	const getUserBalance = useCallback(async () => {
		if (account && formToken) {
		  const userBalance = await formToken.balanceOf(account);
		  setUserTokenBalance(parseFromUnit(userBalance));
		} else {
		  setUserTokenBalance(null);
		}
	}, [account, formToken]);

	useEffect(() => {
		getUserBalance();
		setSelectedValue(getSwapState(chainId));
	},[getUserBalance, chainId, transactionStatus]);

	const toggleConfirmModal = () =>
		{
			if(!account)
			{
				toggleShowWalletModal();
				return;
			}
			setShowConfirmModal((prevState) => !prevState);
		}

	const toggleShowWalletModal = (e) => {
		e?.stopPropagation();
		setShowWalletModal((prevState) => !prevState);
	};
			

	const toggleTransactionModal = () => {
		setShowConfirmModal(false);
		setShowTransactionModal((prevState) => !prevState);
	};

	const handleInputChangeMax = (name, value) => {
		setSwap((prevState) => ({
			...prevState,
			[name]: parseFloat(value),
		}));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSwap((prevState) => ({
			...prevState,
			[name]: value ? parseFloat(value) : 0,
		}));
	};

	const formTokenPrice = formTokenData?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;

	return (
		<>
			<div className='bridge space-h'>
				<Pill
					title='$Form price'
					value={usdFormatter.format(formTokenPrice)}
					small
					classes='pill__small__light pill-desktop-layout bridge__value-pill'
				/>
				<Title title='bridge' />
				<div className='bridge__box'>
					<div className='bridge__box__container'>
						<div className='bridge__box__header'>
							<p className='font-size-14 font-weight-700'>
								Deposit
							</p>
						</div>
						<div className='p-small'>
							<div className='bridge__box__input'>
								<SelectTokenWithInput
									selectedValue='$FORM'
									icon={selectedValue.tokenFrom.icon}
									toggleModal={() => {}}
									displaySelect={false}
									note='From'
									inputValue={swapInAmount}
									tokenToName='tokenFrom'
									inputToName='inputFrom'
									handleInputChange={handleInputChange}
									handleInputChangeMax={handleInputChangeMax}
									withMaxIcon={true}
									withBalance={true}
									userTokenBalance={userTokenBalance}
									leftSideMaxIcon={true}
									formPrice={formTokenPrice}
								/>
								<p className='bridge__box__input__chain-code'>
									{selectedValue.tokenFrom.chainFrom}
								</p>
							</div>
							<SwapperButton onClick={handleSwap} btnClasses='button-swapper__button--bg-dark button-swapper__button--border-green' />
							<div className='bridge__box__input'>
								<SelectTokenWithInput
									selectedValue='$FORM'
									icon={selectedValue.tokenTo.icon}
									toggleModal={() => {}}
									displaySelect={false}
									note='To'
									inputValue={swapOutAmount}
									tokenToName='tokenTo'
									inputToName='inputTo'
									handleInputChange={handleInputChange}
									disabled={true}
								/>
								<p className='bridge__box__input__chain-code'>
									{selectedValue.tokenTo.chainTo}
								</p>
							</div>
							<Button
								type='button'
								text={
									!account? 'Connect Wallet':(
									!swapInAmount
										? 'Enter amount'
										: 'Cross Chain')
								}
								wide
								green
								disabled={account &&(swapInAmount < minimumSwapAmount)}
								classes='swap-tab__submit'
								onClick={toggleConfirmModal}
							/>
						</div>
					</div>
				</div>
				<Reminder
					swapFeeRate={swapFeeRate}
					minimumSwapAmount={minimumSwapAmount}
					maximumSwapAmount={maximumSwapAmount}
					minimumSwapFee={minimumSwapFee}
					maxiumumSwapFee={maxiumumSwapFee}
				/>
			</div>
			<Modal show={showConfirmModal} onCancel={toggleConfirmModal}>
				<ConfirmModal
					onCancel={toggleConfirmModal}
					swapInAmount={swapInAmount}
					handleCrossChain={handleCrossChain}
					showTransactionModal={toggleTransactionModal}
					buttonDisabled={!data || !data.DestToken || !data.SrcToken}
				/>
			</Modal>
			{/* <Modal
				show={showTransactionModal}
				onCancel={toggleTransactionModal}
			>
				<TransactionModal
					onCancel={toggleTransactionModal}
					isLoading={isSwapping}
					transactionStatus={transactionStatus}
				/>
			</Modal> */}
			<WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
				<ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
			</WalletModal>
		</>
	);
};

export default Bridge;
