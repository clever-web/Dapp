import Button from 'COMPONENTS/Button';
import ButtonClose from 'COMPONENTS/ButtonClose';
import Image from 'COMPONENTS/Image';

const ConfirmModal = ({
	supply,
	close,
	token,
	supplyAmount = 0,
	percentageOfThePool=0,
}) => {

	return (
		<div className='confirm-modal'>
			<div className='confirm-modal__header'>
				<p className='font-size-14 font-weight-700'>You will receive</p>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={close} />
				</div>
			</div>

			<div className='confirm-modal__summary pt-2 pb-2'>
				<div className='flex-center'>
					<div className='confirm-modal__summary__icon'>
						<Image
							light={token.icon}
							dark={token.icon}
							alt={token.name}
							w='30'
							h='30'
						/>
					</div>
				</div>
				<p className='font-size-24 font-weight-700'>{supplyAmount ?? '-'}</p>
			</div>
			<p className='font-size-12 txt-right mr-3 mb-2'>
				{token.name}{' '}Pool Tokens
			</p>

			<div className='confirm-modal__info mb-3'>
				<p className='font-size-12 txt-center'>
					Tokens ratio may change.
				</p>
			</div>

			<div className='confirm-modal__footer'>
				<div className='confirm-modal__footer__row'>
					<p className='font-size-12 mr-1'>{token.name} deposited</p>
					<p className='font-size-12 font-weight-700'>{supplyAmount}</p>
				</div>
				<div className='confirm-modal__footer__row'>
					<p className='font-size-12 mr-1'>Percentage of the pool</p>
					<p className='font-size-12 font-weight-700'>{percentageOfThePool?.toFixed(2)} %</p>
				</div>
				<div className='flex-center mt-2 mb-3'>
					<Button
						type='button'
						text='Confirm Supply'
						green
						classes='pl-4 pr-4'
						onClick={supply}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
