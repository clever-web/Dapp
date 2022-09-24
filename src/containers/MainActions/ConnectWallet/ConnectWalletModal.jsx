import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import ButtonClose from 'COMPONENTS/ButtonClose';
import { CONNECTOR_LOCAL_STORAGE_KEY, wallets } from '../constants';
import useAuth from 'hooks/useAuth';

const ConnectWalletModal = ({ toggleShowWalletModal }) => {
	const { theme } = useContext(ThemeContext);
	const { login } = useAuth();

	const handleLogin = (connectorID) => {
		login(connectorID);
		window.localStorage.setItem(CONNECTOR_LOCAL_STORAGE_KEY, connectorID);
		toggleShowWalletModal();
	};

	return (
		<div className='wallet-modal'>
			<div className='d-flex justify-content-end'>
				<ButtonClose onClick={toggleShowWalletModal} />
			</div>
			<div className='wallet-modal__header'>
				<p
					className={`font-size-20 font-weight-700 ${
						theme === 'theme-light' ? 'c-dark' : 'c-green'
					}`}
				>
					Connect to a wallet
				</p>
			</div>
			<div className='wallet-modal__body'>
				<ul className='wallet-modal__list'>
					{wallets.map((wallet) => (
						<li
							key={wallet.name}
							className='wallet-modal__list__item'
							onClick={() => handleLogin(wallet.connectorID)}
						>
							<p className='font-size-14'>{wallet.name}</p>
							<img src={wallet.icon} alt={wallet.name} />
						</li>
					))}
				</ul>
			</div>
			{/* <div className='wallet-modal__footer'>
				<p className='font-size-10 txt-center'>
					Need help?{' '}
					<a
						href='www.google.com'
						className='wallet-modal__footer__link'
						style={
							theme === 'theme-light'
								? { color: '#070618' }
								: null
						}
					>
						Learn more about wallets
					</a>
				</p>
			</div> */}
		</div>
	);
};

export default ConnectWalletModal;
