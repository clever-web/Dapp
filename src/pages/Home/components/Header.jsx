import useFetch from 'use-http';
import { useMediaQuery } from 'hooks/useMediaQuery';
import Image from 'COMPONENTS/Image';
import Pill from 'COMPONENTS/Pill';
import UpgradeIcon from 'ASSETS/images/actions/upgrade.svg';
import { numberFormatter, parseFromUnit, usdFormatter } from 'utils/formatters';
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { DEFAULT_CHAIN_ID } from 'UTILS/web3';
import { useFormTier } from 'hooks/useFormTier';
import Tier from 'COMPONENTS/Tier';
import { useEffect, useState } from 'react';
import { useContract } from 'hooks/useContract';
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from 'UTILS/constants';

const Header = () => {
	const { data } = useFetch(COIN_GECKO_URL, {}, []);
	const [userTokenBalance, setUserTokenBalance] = useState(null);
	const [tvlStakingBalance, setTvlStakingBalance] = useState(null);

	const matchMedia = useMediaQuery('(min-width: 768px)');
	const { tier } = useFormTier();
	const { chainId = DEFAULT_CHAIN_ID, account, library } = useWeb3React();
	const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN);

	useEffect(() => {
		
		const getTvlStakingBalance = async () => {
			if (formToken) {
				const tvlBalance = await formToken.balanceOf(
					CONTRACTS[CONTRACTS_TYPE.FORM_TOKEN_STAKING][chainId].address
				);
				setTvlStakingBalance(tvlBalance);
			} else {
				setTvlStakingBalance(0);
			}
		};

		getTvlStakingBalance();
	}, [account, chainId, formToken, library]);

	const formTokenPrice = data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;
	const users = 12384;
	return (
		<div className='home__header__container'>
			<header className='home__header space-h'>
				<div className='home__header__summary'>
					<div className='d-flex align-items-center mt-3' style={{marginBottom: '5px'}}>
						<Image
							light={UpgradeIcon}
							dark={UpgradeIcon}
							alt='Total Value Locked'
							w='16'
							h='16'
						/>
						<p className='c-white ml-1 font-size-14'>Total Value Locked <font className = 'c-green'>Cross Chain</font></p>
					</div>
					<p className='font-size-32 font-weight-700 c-green home__header__summary__value mb-1'>
						{usdFormatter.format(formTokenPrice * parseFromUnit(tvlStakingBalance))}
					</p>
				</div>
				<div className='home__header__pill'>
					{matchMedia && tier && <Tier type={tier} />}
					{matchMedia && (<Pill
						title='Users'
						value={users.toLocaleString()}
						small
						classes='pill__small__light ml-1 home__header__pill__user'
						isHome
					/>)}
					<Pill
						title='$Form price'
						value={usdFormatter.format(formTokenPrice)}
						small
						classes='pill__small__light ml-1 home__header__pill__price'
						isHome
					/>
					
				</div>

				
			</header>
		</div>
	);
};

export default Header;
