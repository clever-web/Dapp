import Image from 'COMPONENTS/Image';
import CaretWhiteIcon from 'ASSETS/images/actions/caret_up_white.svg';
import CaretGreenIcon from 'ASSETS/images/actions/caret_up_green.svg';
import { truncateWalletAddress } from 'utils/formatters';

const Button = ({
	toggleWalletSetting,
	showWalletSettings,
	selectedWallet,
	toggleShowWalletModal,
}) => {
	return (
		<button
			type='button'
			className={`connect-wallet ${selectedWallet ? 'connect-wallet--active' : ''}`}
			onClick={selectedWallet ? toggleWalletSetting : toggleShowWalletModal}
			style={showWalletSettings ? { zIndex: 120 } : { zIndex: 'unset' }}
		>
			{selectedWallet ? truncateWalletAddress(selectedWallet) : 'Connect'}
			{selectedWallet && (
				<Image
					light={CaretGreenIcon}
					dark={CaretWhiteIcon}
					alt='Select from dropdown'
					w='11'
					h='7'
					classes={`ml-1 ${
						showWalletSettings
							? 'connect-wallet__opened__caret'
							: 'connect-wallet__caret'
					}`}
				/>
			)}
		</button>
	);
};

export default Button;
