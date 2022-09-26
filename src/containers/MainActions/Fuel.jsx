import { useContext, useState } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import Image from 'COMPONENTS/Image';
import CaretIcon from 'ASSETS/images/actions/caret_dark.svg';
// import CaretYellowIcon from 'ASSETS/images/actions/caret_yellow.svg';
// import CaretUpYellowIcon from 'ASSETS/images/actions/caret_up_yellow.svg';
import GasIcon from 'ASSETS/images/actions/gas.svg';

const loadItems = [5, 10, 15, 20, 30, 40];

const SelectWithIcon = () => {
	// const { theme } = useContext(ThemeContext);
	useContext(ThemeContext);
	const [isLoadOpened, setIsLoadOpened] = useState(false);
	const [loadSelected, setLoadSelected] = useState(
		loadItems[loadItems.length - 1]
	);
	// const [caretHover, setCaretHover] = useState(CaretIcon);

	const selectClasses = isLoadOpened
		? 'fuel__select fuel__select__opened'
		: 'fuel__select';

	const renderItemClasses = (item) =>
		item === loadSelected
			? 'main-actions__load__list__item main-actions__load__list__item__active'
			: 'main-actions__load__list__item';

	const toggleLoad = () => setIsLoadOpened((prevState) => !prevState);
	const onSelectLoad = (e) => {
		setLoadSelected(parseInt(e.target.dataset.id, 10));
		toggleLoad();
	};

	return (
		<div className='main-actions__load'>
			<button
				type='button'
				className='fuel mr-2'
				// onClick={toggleLoad}
				// onMouseEnter={() => setCaretHover(CaretYellowIcon)}
				// onMouseLeave={() => setCaretHover(CaretIcon)}
			>
				<span className='fuel__icon'>
					<Image
						light={GasIcon}
						dark={GasIcon}
						alt='Select from dropdown'
						w='18'
						h='19'
					/>
				</span>
				<span className={selectClasses}>
					{loadSelected}
					{/* <Image
						light={isLoadOpened ? CaretYellowIcon : caretHover}
						dark={isLoadOpened ? CaretUpYellowIcon : caretHover}
						alt='Select from dropdown'
						w='9'
						h='7'
						classes={`ml-1 ${
							theme === 'theme-light' && isLoadOpened
								? 'fuel__select__opened__caret'
								: ''
						}`}
					/> */}
				</span>
			</button>
			{isLoadOpened && (
				<ul className='main-actions__load__list'>
					{loadItems.map((i) => (
						<li
							key={i}
							className={renderItemClasses(i)}
							title={i}
							data-id={i}
							onClick={onSelectLoad}
						>
							{i}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SelectWithIcon;
