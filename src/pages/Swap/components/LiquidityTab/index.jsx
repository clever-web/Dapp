import { useState } from 'react';
import SubSwitch from './components/SubSwitch';
import Add from './components/Add';
import Remove from './components/Remove';
import { SUB_TAB_NAMES } from 'PAGES/Swap/constants';
import YourLiquidity from './components/YourLiquidity';

const AddLiquidityTab = ({
	chain,
	formToken,
	stableToken,
	userTokenBalanceFORM,
	userTokenBalanceStable,
	userTokenBalanceLPToken,
	formTokenPrice,
	account,
	route0,
	route1,
	token0,
	token1,
}) => {
	const [activeBtn, setActiveBtn] = useState(SUB_TAB_NAMES.ADD);
	const handleSubSwitch = (tabName) => setActiveBtn(tabName);
	
	return (
		<div className='liquidity-tab'>
			<YourLiquidity 
				formToken={formToken}
				stableToken={stableToken}
				userTokenBalanceLPToken={userTokenBalanceLPToken}
			/>
			<SubSwitch handleSubSwitch={handleSubSwitch} />
			{activeBtn === SUB_TAB_NAMES.ADD ? 
			<Add
				chain={chain}
				formToken={formToken}
				stableToken={stableToken}
				userTokenBalanceFORM={userTokenBalanceFORM}
				userTokenBalanceStable={userTokenBalanceStable}
				formTokenPrice={formTokenPrice}
				account={account}
				route0={route0}
				route1={route1}
				token0={token0}
				token1={token1}
			/>
			:
			<Remove 
				chain={chain}
				formToken={formToken}
				stableToken={stableToken}
				account={account}
				route0={route0}
				route1={route1}
				token0={token0}
				token1={token1}
			/>
			}
		</div>
	);
};

export default AddLiquidityTab;
