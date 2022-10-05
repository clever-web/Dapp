import Header from './Header';
import Body from './Body';
import { useContract } from 'hooks/useContract';
import { CONTRACTS_TYPE } from 'utils/contracts';
import { Pair, Percent, TokenAmount } from '@formation-finance/sdk';
import { useEffect, useState } from 'react';

const YourLiquidity = ({ formToken, stableToken, userTokenBalanceLPToken }) => { 
	const [liquidityValue, setLiquidityValue] = useState({
		form: null,
		stable: null,
		poolPercentage: null,
	});

	const lpTokenContract = useContract(CONTRACTS_TYPE.LP_TOKEN);
	const uniswapPair = useContract(CONTRACTS_TYPE.UNISWAP_PAIR);


	useEffect(() => {
		const getReserves = async () => {
			if (uniswapPair && lpTokenContract && formToken && stableToken) {
				const reserves = await uniswapPair.getReserves();
	
				const lpTokenTotalSupply = await lpTokenContract.totalSupply();
				const pair = new Pair(new TokenAmount(formToken, reserves[0]), new TokenAmount(stableToken, reserves[1]));
	
				const liquidityInForm = pair.getLiquidityValue(
					pair.token0, 
					new TokenAmount(pair.liquidityToken, lpTokenTotalSupply.toString()), 
					new TokenAmount(pair.liquidityToken, userTokenBalanceLPToken.toString()), 
					false
				);
				const liquidityInStable = pair.getLiquidityValue(
					pair.token1, 
					new TokenAmount(pair.liquidityToken, lpTokenTotalSupply.toString()), 
					new TokenAmount(pair.liquidityToken, userTokenBalanceLPToken.toString()), 
					false
				);

				const userPoolPercentage = new Percent(
					new TokenAmount(pair.liquidityToken, userTokenBalanceLPToken.toString()).raw, 
					new TokenAmount(pair.liquidityToken, lpTokenTotalSupply.toString()).raw
				);

				setLiquidityValue({
					form: liquidityInForm,
					stable: liquidityInStable,
					poolPercentage: userPoolPercentage,
				});
			} else {
				setLiquidityValue({
					form: null,
					stable: null,
					poolPercentage: null,
				});
			}
		}

		getReserves();
	}, [formToken, lpTokenContract, stableToken, uniswapPair, userTokenBalanceLPToken]);

	return (
	<div className='swap__box mb-0 pt-0'>
		<div className='swap__box__container' style={{ border: 'none' }}>
			<Header />
			<Body liquidityValue={liquidityValue} />
			{/* <Footer /> */}
		</div>
	</div>
)};

export default YourLiquidity;
