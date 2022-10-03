import { useState } from 'react';
import SubSwitch from './components/SubSwitch';
import Add from './components/Add';
import Remove from './components/Remove';
import { SUB_TAB_NAMES } from 'PAGES/Swap/constants';
import YourLiquidity from './components/YourLiquidity';

const AddLiquidityTab = ({
	amount
}) => {
	const [activeBtn, setActiveBtn] = useState(SUB_TAB_NAMES.ADD);
	const handleSubSwitch = (tabName) => setActiveBtn(tabName);
	
	return (
		<div className='liquidity-tab'>
			<YourLiquidity 
				amount={amount}
			/>
			<SubSwitch handleSubSwitch={handleSubSwitch} />
			{activeBtn === SUB_TAB_NAMES.ADD ? 
			<Add />
			:
			<Remove />
			}
		</div>
	);
};

export default AddLiquidityTab;
