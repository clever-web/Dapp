import { useWeb3React } from '@web3-react/core';
import Image from 'COMPONENTS/Image';
import { getTokens } from 'PAGES/StableSwap/constants';

const RemoveHeader = ({ userLpBalance }) => {
	const { chainId } = useWeb3React();
	const { from } = getTokens(chainId);

	return (
		<div className='liquidity-tab__remove__header'>
			<div className='flex-center'>
				<div className='liquidity-tab__remove__header__icon'>
					<Image
						light={from?.icon}
						dark={from?.icon}
						alt={from?.name}
						w='18'
						h='18'
					/>
				</div>
			</div>

			<div className='d-flex justify-content-space-between align-items-center w-100 ml-1'>
				<p className='font-size-14 font-weight-700 mr-1'>
					{from?.name} LP:
				</p>
				<div className='liquidity-tab__remove__header__right-col'>
					<p className='font-size-14'>{userLpBalance}</p>
				</div>
			</div>
		</div>
	);
};

export default RemoveHeader;
