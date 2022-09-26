import { useState } from 'react';
import WalletModal from 'COMPONENTS/Modal';
import Button from './Button';
import Modal from './Modal';
import ConnectWalletModal from './ConnectWalletModal';
import { useWeb3React } from '@web3-react/core';

const ConnectWallet = () => {
	const { account } = useWeb3React();
	const [showWalletSettings, setShowWalletSettings] = useState(false);
	const [showWalletModal, setShowWalletModal] = useState(false);

	const toggleShowWalletModal = () => {
		setShowWalletModal((prevState) => !prevState);
		setShowWalletSettings(false);
	};
	const toggleWalletSetting = () =>
		setShowWalletSettings((prevState) => !prevState);

	return (
		<>
			<div className='main-actions__connect-wallet'>
				{showWalletSettings && (
					<div
						className='backdrop'
						onClick={toggleWalletSetting}
					></div>
				)}
				<Button
					toggleWalletSetting={toggleWalletSetting}
					showWalletSettings={showWalletSettings}
					selectedWallet={account}
					toggleShowWalletModal={toggleShowWalletModal}
				/>
				{showWalletSettings && (
					<Modal
						selectedWallet={account}
						toggleShowWalletModal={toggleShowWalletModal}
                        toggleShowWalletSettings={setShowWalletSettings}
					/>
				)}
			</div>
			<WalletModal
				show={showWalletModal}
				onCancel={toggleShowWalletModal}
			>
				<ConnectWalletModal
					toggleShowWalletModal={toggleShowWalletModal}
				/>
			</WalletModal>
		</>
	);
};

export default ConnectWallet;
