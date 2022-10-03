import Button from 'COMPONENTS/Button';
import ButtonClose from 'COMPONENTS/ButtonClose';
import Image from 'COMPONENTS/Image';
import { tokens } from '../../../constants';

const ConfirmModal = ({
	selectedValue,
	swap,
	onCancel,
	invokeAddLiquidity,
	rate,
	liqduityInfo,
}) => {
	const setIcon = (name) => tokens.find((item) => item.name === name)?.icon;
	const renderInfoRow = (item) => (
		<div className='confirm-modal__footer__row' key={item.title}>
			<p className='font-size-12 mr-1'>{item.title}</p>
			<p className='font-size-12 font-weight-700'>{item.value}</p>
		</div>
	);

	const CONFIRM_LIQUIDITY_INFO = [
		{ title: `${selectedValue.tokenFrom.name} Deposited:`, value: `${swap.inputFrom} ${selectedValue.tokenFrom.name}` },
		{ title: `${selectedValue.tokenTo.name} Deposited:`, value: `${swap.inputTo} ${selectedValue.tokenTo.name}` },
		{ title: 'Rates:', value: `1 ${selectedValue.tokenFrom.name} = ${rate} ${selectedValue.tokenTo.name}` }
	];

	return (
		<div className='confirm-modal'>
			<div className='confirm-modal__header'>
				<p className='font-size-14 font-weight-700'>You will receive</p>
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
					<div className='confirm-modal__summary__icon ml-n1'>
						<Image
							light={setIcon(selectedValue.tokenTo.name)}
							dark={setIcon(selectedValue.tokenTo.name)}
							alt='Select extra token'
							w='30'
							h='30'
						/>
					</div>
				</div>
				<p className='font-size-24 font-weight-700'>{liqduityInfo?.receivedLpTokens?.toSignificant(6) ?? '-'}</p>
			</div>
			<p className='font-size-12 txt-right mr-3 mb-2'>
				{selectedValue.tokenFrom.name} / {selectedValue.tokenTo.name}{' '}
				Pool Tokens
			</p>

			<div className='confirm-modal__info mb-3'>
				<p className='font-size-12 txt-center'>
					Tokens ratio may change.
				</p>
			</div>

			<div className='confirm-modal__footer'>
				{CONFIRM_LIQUIDITY_INFO.map((item, idx) =>
					renderInfoRow(item, idx)
				)}
				<div className='flex-center mt-2 mb-3'>
					<Button
						type='button'
						text='Confirm Supply'
						green
						classes='pl-4 pr-4'
						onClick={invokeAddLiquidity}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
