import { useWeb3React } from '@web3-react/core';
import { numberFormatter } from 'utils/formatters';

const Earn = ({ isActive, totalUserProfit = 0 }) => {
	const { account } = useWeb3React();

	const value = () => (account ? numberFormatter.format(totalUserProfit) : '-');

	return (
		<div className='farms__box__header__info__earn'>
			<p className='farms__box__header__info__earn__txt'>
				Earned &#36;FORM
			</p>
			<p className='font-size-12 font-weight-700'>{!isActive ? "-" :value()}</p>
		</div>
	);
};

export default Earn;
