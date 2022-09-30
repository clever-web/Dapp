import { useWeb3React } from '@web3-react/core';

import Button from 'COMPONENTS/Button';
import { useTokenApproval } from 'hooks/useTokenApprove';
import { TRANSACTION_STATUS } from 'UTILS/constants';
import { CONTRACTS_TYPE } from 'utils/contracts';
import { numberFormatter } from 'utils/formatters';
import { FARMS_ACTIONS } from '../../constants';

const balanceFormatter = new Intl.NumberFormat('en-US', {
	style: 'decimal',
	maximumFractionDigits: 7,
});

const ColActionTwo = ({
	isDesktop = false,
	isOpened,
	isEnabled,
	totalUserStaked,
	toggleStakeModal,
	isTransactionInProgress,
	transactionType,
	farmType,
	isActive,
}) => {
	const { account } = useWeb3React();
	const {
		currentAllowance,
		handleApproval: handleLPTokenApproval,
		transactionStatus: approvalTransactionStatus,
	} = useTokenApproval(CONTRACTS_TYPE.LP_STABLE, farmType);

	const handleApproval = async (event) => {
		event?.stopPropagation();
		if (!currentAllowance) {
			await handleLPTokenApproval({ successMessage: 'You can now Stake LP Tokens!' });
			return;
		}
		return;
	};

	const voidFunc = () => {};

	const renderButton = (media) => {
		if (account) {
			return isEnabled ? (
				totalUserStaked ? (
					<>
						<Button
							type='button'
							text={
								isTransactionInProgress && transactionType === FARMS_ACTIONS.UNSTAKE
									? 'Unstaking...'
									: 'Unstake'
							}
							value={FARMS_ACTIONS.UNSTAKE}
							classes={`w-100 mr-1 ${media === 'desktop' ? '' : 'mt-2 mr-2'}`}
							onClick={isActive ? toggleStakeModal : voidFunc}
							outlined
							disabled={!isActive || isTransactionInProgress}
						/>
						<Button
							type='button'
							text={
								isTransactionInProgress && transactionType === FARMS_ACTIONS.STAKE
									? 'Staking...'
									: 'Stake'
							}
							value={FARMS_ACTIONS.STAKE}
							classes={`w-100 ${media === 'desktop' ? '' : 'mt-2'}`}
							onClick={isActive ? toggleStakeModal : voidFunc}
							green
							disabled={!isActive || isTransactionInProgress}
						/>
					</>
				) : (
					<Button
						type='button'
						text={
							isTransactionInProgress && transactionType === FARMS_ACTIONS.STAKE
								? 'Staking...'
								: 'Stake'
						}
						value={FARMS_ACTIONS.STAKE}
						classes={`w-100 ${media === 'desktop' ? '' : 'mt-2'}`}
						onClick={isActive ? toggleStakeModal : voidFunc}
						green
						disabled={!isActive || isTransactionInProgress}
					/>
				)
			) : (
				<Button
					type='button'
					text={
						approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED
							? 'Enabling...'
							: 'Enable'
					}
					value={FARMS_ACTIONS.APPROVAL}
					classes={`w-100 ${media === 'mobile' ? 'mt-2' : ''}`}
					onClick={isActive ? handleApproval : voidFunc}
					green
					disabled={
						!isActive ||
						approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED
					}
				/>
			);
		}
	};

	const mobileHTML = (
		<div className='farms__box__action'>
			<div
				className={`farms__box__action__info ${
					account ? 'farms__box__action__info--visible' : ''
				} ${isEnabled ? 'farms__box__action__info--enabled' : ''}`}
			>
				<div className='txt-right'>
					<p className='font-size-12'>Total Staked</p>
				</div>
				{account ? (
					<div className='txt-right'>
						<span className='font-weight-700'>
							{balanceFormatter.format(totalUserStaked)}
						</span>
					</div>
				) : (
					'-'
				)}
			</div>
			<div className='d-flex w-100'>{renderButton('mobile')}</div>
		</div>
	);

	const desktopHTML = (
		<>
			<div className='farms__box__action__info farms__box__action__child-2'>
				<p className='font-size-12'>
					Total
					<br />
					Staked
				</p>
				{account ? (
					<div className='txt-right'>
						<span className='font-weight-700'>
							{!isActive ? '-' : balanceFormatter.format(totalUserStaked)}
						</span>
					</div>
				) : (
					<div className='txt-right'>
						<span className='font-weight-700'>-</span>
					</div>
				)}
			</div>
			{account && isOpened && <div className='d-flex w-100'>{renderButton('desktop')}</div>}
		</>
	);

	return isDesktop ? desktopHTML : mobileHTML;
};

export default ColActionTwo;
