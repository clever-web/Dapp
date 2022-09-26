import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import Image from 'COMPONENTS/Image';
import { currencies } from './constants';
import CaretIcon from 'ASSETS/images/actions/caret_dark.svg';
import CaretYellowIcon from 'ASSETS/images/actions/caret_yellow.svg';
import CaretUpYellowIcon from 'ASSETS/images/actions/caret_up_yellow.svg';
import { useWeb3React } from '@web3-react/core';

const SelectCurrency = () => {
	const { theme } = useContext(ThemeContext);
	const { chainId } = useWeb3React();
	const chainName = chainId > 50 ? 'BSC' : 'ETH';
	const [isCurrencyOpened, setIsCurrencyOpened] = useState(false);
	const [currencySelected, setCurrencySelected] = useState(chainId);
	const [caretHover, setCaretHover] = useState(CaretIcon);

	useEffect(()=>{
		localStorage.setItem('chainId', 1);
	},[])

	const selectClasses = isCurrencyOpened
		? 'select-currency select-currency__opened'
		: 'select-currency';

	const renderItemClasses = (item) =>
		item === currencySelected
			? 'main-actions__currency__list__item main-actions__currency__list__item__active'
			: 'main-actions__currency__list__item';

	const toggleCurrency = () => setIsCurrencyOpened((prevState) => !prevState);
	const onSelectCurrency = async (e) => {
		setCurrencySelected(e.target.dataset.id);
		const networkId = e.target.dataset.id === 'BSC' ? '0x38' : '0x1';
		const chainId = e.target.dataset.id === 'BSC' ? 56 : 1;
		localStorage.setItem('chainId', chainId);
		await changeNetwork(networkId);
		toggleCurrency();
	};

	const handleNetworkChanged = (networkId) => {
		const newChainName = networkId < 50 ? 'ETH' : 'BSC';
		setCurrencySelected(newChainName);
	};

	const changeNetwork = async (chainId) => {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId }],
			});
		} catch (switchError) {
			// This error code indicates that the chain has not been added to MetaMask.
			if (switchError.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [{ chainId }],
					});
				} catch (addError) {}
			}
		}
	};

	if (window && window.ethereum) {
		window.ethereum.on('networkChanged', handleNetworkChanged);
	}

	return (
		<div className='main-actions__currency'>
			{isCurrencyOpened && (
				<div className='backdrop' onClick={toggleCurrency}></div>
			)}
			<button
				type='button'
				className={selectClasses}
				onClick={toggleCurrency}
				onMouseEnter={() => setCaretHover(CaretYellowIcon)}
				onMouseLeave={() => setCaretHover(CaretIcon)}
			>
				{currencySelected || chainName}
				<Image
					light={caretHover}
					dark={isCurrencyOpened ? CaretUpYellowIcon : caretHover}
					alt='Select from dropdown'
					w='9'
					h='7'
					classes={`ml-1 ${
						theme === 'theme-light' && isCurrencyOpened
							? 'select-currency__opened__caret'
							: ''
					}`}
				/>
			</button>
			{isCurrencyOpened && (
				<ul className='main-actions__currency__list'>
					<p className='main-actions__currency__list__title'>
						Select a Network
					</p>
					<p className='font-size-14 line-height-4 mb-2'>
						You are currently browsing Formation on Etherereum
						network
					</p>
					{currencies.map((cur) => (
						<li
							key={cur.name}
							className={renderItemClasses(cur.short)}
							title={cur.name}
							data-id={cur.short}
							onClick={onSelectCurrency}
						>
							{cur.name}
							<img
								src={cur.img}
								alt={cur.name}
								width={cur.width}
								height={cur.height}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SelectCurrency;
