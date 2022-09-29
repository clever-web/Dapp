import { useWeb3React } from '@web3-react/core';
import Title from 'COMPONENTS/Title';
import { useContract } from 'hooks/useContract';
import { useFormTier } from 'hooks/useFormTier';
import { useEffect, useState } from 'react';
import useFetch from 'use-http';
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from 'UTILS/constants';
import { CONTRACTS_TYPE } from 'utils/contracts';
import { DEFAULT_CHAIN_ID } from 'UTILS/web3';
import AdoptionCard from './components/AdoptionCard';
import ProgramDescription from './components/ProgramDescription';
import ProgramOverview from './components/ProgramOverview';
import EarlyProgramReminder from './components/Reminder';

const EarlyAdoptionProgram = () => {
	const [userTokenBalance, setUserTokenBalance] = useState(null);
	const { chainId = DEFAULT_CHAIN_ID, account, library } = useWeb3React();
	const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN);
	const { data } = useFetch(COIN_GECKO_URL, {}, []);
	const { tier = 'default' } = useFormTier();

	useEffect(() => {
		const getUserBalance = async () => {
			if (account && formToken) {
				const userBalance = await formToken.balanceOf(account);
				setUserTokenBalance(userBalance);
			} else {
				setUserTokenBalance(null);
			}
		};
		getUserBalance();
	}, [account, chainId, formToken, library]);

	const currentFormTokenPriceInUSD =
		data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;
	const isInSecondSnapshot = tier && tier !== 'default';

	return (
		<div className='early-adoption-program space-h'>
			<Title title='early adoption program' />
			<div className='early-adoption-program__box'>
				<p className='early-adoption-program__box__title mb-1--mobile'>
					early adopters program is done
				</p>
				<span className='txt-marked txt-marked--yellow c-dark font-size-20 font-weight-800 txt-uppercase txt-italic pl-2 pr-2'>
					check if you secured your tier
				</span>
				<AdoptionCard
					tier={tier ?? 'default'}
					isInSecondSnapshot={isInSecondSnapshot}
				/>
				<ProgramDescription
					isInSecondSnapshot={isInSecondSnapshot}
					tier={tier}
				/>
			</div>
			<ProgramOverview />
			<EarlyProgramReminder />
		</div>
	);
};

export default EarlyAdoptionProgram;
