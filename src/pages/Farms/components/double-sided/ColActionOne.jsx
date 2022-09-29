import { useWeb3React } from '@web3-react/core';
import Button from 'COMPONENTS/Button';
import { numberFormatter, usdFormatter } from 'utils/formatters';
import { FARMS_ACTIONS } from '../../constants';

const ColActionOne = ({
	isDesktop = false,
	isActive,
	handleHarvesting,
	isOpened,
	isEnabled,
	isTransactionInProgress,
	transactionType,
	totalUserProfit,
	totalUserProfitInUSD = 0,
	toggleShowWalletModal,
}) => {
	const { account } = useWeb3React();

	const mobileHTML = (
		<div className='farms__box__action'>
			<div
				className={`farms__box__action__info ${
					account ? 'farms__box__action__info--visible' : ''
				} ${isEnabled ? 'farms__box__action__info--enabled' : ''}`}
			>
				<div className='txt-right'>
					<p className='font-size-12'>Earned &#36;FORM</p>
				</div>
				{account ? (
					isOpened ? (
						<div className='txt-right'>
							<span className='font-weight-700'>
								{!isActive ? '-' : numberFormatter.format(totalUserProfit)}
							</span>
							<br />
							<span className='font-size-12'>
								≈ {!isActive ? '-' : usdFormatter.format(totalUserProfitInUSD)}
							</span>
						</div>
					) : (
						<div className='txt-right'>
							<span className='font-size-12 font-weight-700'>
								{!isActive ? '-' : usdFormatter.format(totalUserProfitInUSD)}
							</span>
						</div>
					)
				) : (
					'-'
				)}
			</div>
			<Button
				type='button'
				text={
					isTransactionInProgress && transactionType === FARMS_ACTIONS.HARVEST
						? 'Harvesting...'
						: 'Harvest'
				}
				value={FARMS_ACTIONS.HARVEST}
				classes='pl-4 pr-4 mt-2'
				onClick={handleHarvesting}
				green
				disabled={!isActive || !totalUserProfit || isTransactionInProgress}
			/>
		</div>
	);

	const desktopHTML = (
		<>
			<div className='farms__box__action__info farms__box__action__child-1'>
				<div className='txt-right'>
					<p className='font-size-12'>
						Earned
						<br />
						&#36;FORM
					</p>
				</div>
				{account ? (
					<div className='txt-right'>
						<span className='font-weight-700'>
							{!isActive ? '-' : numberFormatter.format(totalUserProfit)}
						</span>
						<br />
						<span className='font-size-12'>
							{!isActive ? '-' : usdFormatter.format(totalUserProfitInUSD)}
						</span>
					</div>
				) : (
					<div className='txt-right'>
						<span className='font-weight-700'>-</span>
					</div>
				)}
			</div>
			{isOpened && (
				<div
					className={`txt-center farms__box__action__child-3 ${
						account ? 'farms__box__action__child-3--logged' : ''
					}`}
				>
					{account ? (
						<Button
							type='button'
							text={
								isTransactionInProgress && transactionType === FARMS_ACTIONS.HARVEST
									? 'Harvesting...'
									: 'Harvest'
							}
							value={FARMS_ACTIONS.HARVEST}
							classes='pl-2 pr-2'
							onClick={handleHarvesting}
							green
							disabled={!isActive || !totalUserProfit || isTransactionInProgress}
						/>
					) : (
						<Button
							type='button'
							text='Connect Wallet'
							classes='pl-2 pr-2 w-80'
							onClick={toggleShowWalletModal}
							green
							wide
						/>
					)}
				</div>
			)}
		</>
	);

	return isDesktop ? desktopHTML : mobileHTML;
};

export default ColActionOne;
