import Image from 'COMPONENTS/Image';
import Button from 'COMPONENTS/Button';
import { copyToClipboard } from './helpers';

import CopyWhiteIcon from 'ASSETS/images/actions/copy_white.svg';
import CopyGreenIcon from 'ASSETS/images/actions/copy_green.svg';
import ViewWhiteIcon from 'ASSETS/images/actions/view_white.svg';
import ViewGreenIcon from 'ASSETS/images/actions/view_green.svg';
import useAuth from 'hooks/useAuth';
import { CONNECTOR_LOCAL_STORAGE_KEY } from '../constants';
import { useWeb3React } from '@web3-react/core';
import { SCAN_LINK } from 'UTILS/web3';

const Modal = ({
	selectedWallet,
	toggleShowWalletModal,
	toggleShowWalletSettings,
}) => {
	const { logout } = useAuth();
	const { chainId, account } = useWeb3React();

	const handleLogout = () => {
		window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY);
		logout();
		toggleShowWalletSettings(false);
	};

	return (
		<div className='main-actions__connect-wallet__popup'>
			<div className='main-actions__connect-wallet__popup__row main-actions__connect-wallet__popup__row--1'>
				<p className='font-size-20 font-weight-700'>Account</p>
				<Button
					type='button'
					text={selectedWallet ? 'Disconnect' : 'Connect'}
					small
					onClick={
						selectedWallet ? handleLogout : toggleShowWalletModal
					}
				/>
			</div>
			{selectedWallet && (
				<div className='main-actions__connect-wallet__popup__row main-actions__connect-wallet__popup__row--2'>
					<p className='font-size-14 mb-2'>Connected</p>
					<div className='main-actions__connect-wallet__popup__actions'>
						<div className='main-actions__connect-wallet__popup__actions__col'>
							<Image
								light={CopyGreenIcon}
								dark={CopyWhiteIcon}
								alt='Copy Address'
								w='17'
								h='17'
							/>
							<p
								className='font-size-12 c-green txt-underline ml-2 line-height-1 c-pointer'
								data-copy={selectedWallet}
								onClick={copyToClipboard}
							>
								Copy Address
							</p>
						</div>
						<div className='main-actions__connect-wallet__popup__actions__col'>
							<Image
								light={ViewGreenIcon}
								dark={ViewWhiteIcon}
								alt='View on explorer'
								w='14'
								h='14'
							/>
							<a
								target='_blank'
								rel='noreferrer'
								href={`${SCAN_LINK[chainId]}address/${account}`}
								className='font-size-12 c-green txt-underline ml-2 line-height-1 c-pointer'
							>
								View on explorer
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
