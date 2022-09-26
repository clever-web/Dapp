import ConnectWallet from './ConnectWallet';
import Currency from './Currency';
// import Fuel from './Fuel';

const MainActions = () => {
	return (
		<div className='main-actions'>
			<Currency />
			{/* <Fuel /> */}
			<ConnectWallet />
		</div>
	);
};

export default MainActions;
