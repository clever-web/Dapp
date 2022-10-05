// import { useState } from 'react';
import Button from 'COMPONENTS/Button';
import ButtonClose from 'COMPONENTS/ButtonClose';
import { Tooltip } from 'COMPONENTS/Tooltip';
import Image from 'COMPONENTS/Image';
import { tokens } from '../../../constants';

import QuestionDarkIcon from 'ASSETS/images/actions/dark/question.svg';
import QuestionLightIcon from 'ASSETS/images/actions/light/question.svg';
import ExchangeIcon from 'ASSETS/images/actions/exchange.svg';

const ConfirmModal = ({
	selectedValue,
	swap,
	onCancel,
	invokeSwap,
	rate,
	pair
}) => {
	const setIcon = (name) => tokens.find((item) => item.name === name)?.icon;
	// const [updateAccepted, setUpdateAccepted] = useState(false);

	// const handleAccept = () => setUpdateAccepted((prevState) => !prevState);

	const CONFIRM_SWAP_INFO = [
		{ title: 'Price:', tooltip: 'Swap price', value: `1 ${pair.tokenFrom.name} = ${rate} ${pair.tokenTo.name}` },
		// { title: 'Minimum received:', tooltip: 'Lorem ipsum', value: '1.029 USDT' },
		// { title: 'Price Impact:', tooltip: 'Lorem ipsum', value: '0.10%' },
		// {
		// 	title: 'Liquidity Provider Fee:',
		// 	tooltip: 'Lorem ipsum',
		// 	value: '0.0001 FORM',
		// },
	];	

	const renderInfoRow = (item, idx) => (
		<div className='confirm-modal__footer__row' key={item.title}>
			<div className='flex-center'>
				<p className='font-size-12 mr-1'>{item.title}</p>
				<Tooltip content={item.tooltip} direction='top'>
					<Image
						light={QuestionLightIcon}
						dark={QuestionDarkIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip>
			</div>
			<div className='flex-center'>
				<p className='font-weight-700'>{item.value}</p>
				{idx === 0 && (
					<div
						className='flex-center ml-1'
						style={{ background: '#070618', borderRadius: '50%' }}
					>
						<Image
							light={ExchangeIcon}
							dark={ExchangeIcon}
							alt='Refresh'
							w='16'
							h='16'
							classes='c-pointer'
						/>
					</div>
				)}
			</div>
		</div>
	);

	return (
		<div className='confirm-modal'>
			<div className='confirm-modal__header'>
				<p className='font-size-14 font-weight-700'>Confirm Swap</p>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onCancel} />
				</div>
			</div>

			<div className='confirm-modal__summary pt-2 pb-2'>
				<div className='flex-center'>
					<div className='confirm-modal__summary__icon'>
						<Image
							light={setIcon(selectedValue.tokenFrom.name)}
							dark={setIcon(selectedValue.tokenFrom.name)}
							alt={selectedValue.tokenFrom.name}
							w='30'
							h='30'
						/>
					</div>
					<p className='font-size-16 font-weight-700 ml-1'>
						{swap.inputFrom?.toFixed(3)}
					</p>
				</div>
				<p className='font-size-16 font-weight-700'>
					{selectedValue.tokenFrom.name}
				</p>
			</div>
			<p className='confirm-modal__arrow'>&#8595;</p>
			<div className='confirm-modal__summary pb-2' style ={{borderBottom:"1px solid "}}>
				<div className='flex-center'>
					<div className='confirm-modal__summary__icon'>
						<Image
							light={setIcon(selectedValue.tokenTo.name)}
							dark={setIcon(selectedValue.tokenTo.name)}
							alt={selectedValue.tokenTo.name}
							w='30'
							h='30'
						/>
					</div>
					<p className='font-size-16 font-weight-700 ml-1'>
						{swap.inputTo?.toFixed(3)}
					</p>
				</div>
				<p className='font-size-16 font-weight-700'>
					{selectedValue.tokenTo.name}
				</p>
			</div>

			<div className='confirm-modal__info mb-2'>
				<p className='font-size-12 txt-center'>
					Output is estimated.
					<br />
					If the final price be different more than
					<span className='font-weight-700'> 1%</span>
					<br />
					the transaction will revert.
				</p>
			</div>

			<div className='confirm-modal__footer'>
				{CONFIRM_SWAP_INFO.map((item, idx) => renderInfoRow(item, idx))}
				{/* {!updateAccepted && (
					<div className='confirm-modal__footer__update'>
						<p className='font-weight-700 ml-2 line-height-base'>
							Price updated
						</p>
						<Button
							type='button'
							text='Accept'
							green
							classes='pl-4 pr-4 ml-auto'
							onClick={handleAccept}
						/>
					</div>
				)} */}
				<div className='flex-center mt-3 mb-3'>
					<Button
						type='button'
						text='Confirm Swap'
						// disabled={!updateAccepted}
						green
						classes='pl-4 pr-4'
						onClick={invokeSwap}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
