import { useState } from 'react';
import Button from 'COMPONENTS/Button';
import { SUB_TAB_NAMES } from 'PAGES/Swap/constants';

const SubSwitch = ({ handleSubSwitch }) => {
	const [activeBtn, setActiveBtn] = useState(SUB_TAB_NAMES.ADD);


	const handleButtonClick = (e) => {
		const name = e.target.name;
		setActiveBtn(name);
		handleSubSwitch(name);
	};

	return (
		<div className='liquidity-tab__sub-switch'>
			<Button
				type='button'
				name={SUB_TAB_NAMES.ADD}
				text='Add'
				classes={`liquidity-tab__sub-switch__btn ${
					activeBtn === SUB_TAB_NAMES.ADD
						? 'liquidity-tab__sub-switch__btn--active font-weight-700'
						: ''
				}`}
				onClick={handleButtonClick}
			/>
			<Button
				type='button'
				name={SUB_TAB_NAMES.REMOVE}
				text='Remove'
				classes={`liquidity-tab__sub-switch__btn ${
					activeBtn === SUB_TAB_NAMES.REMOVE
						? 'liquidity-tab__sub-switch__btn--active font-weight-700'
						: ''
				}`}
				onClick={handleButtonClick}
			/>
		</div>
	);
};

export default SubSwitch;
