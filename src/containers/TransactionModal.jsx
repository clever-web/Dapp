// import { useContext, useEffect, useState } from "react";
import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import Button from 'COMPONENTS/Button';
import ButtonClose from 'COMPONENTS/ButtonClose';
import Image from 'COMPONENTS/Image';

import SpinnerIcon from 'ASSETS/images/common/spinner.svg';
import SpinnerSuccessIcon from 'ASSETS/images/common/spinner_success.svg';
import WarningDarkIcon from 'ASSETS/images/common/dark/warning_in_circle.svg';
import WarningLightIcon from 'ASSETS/images/common/light/warning_in_circle.svg';
// import CopyWhiteIcon from "ASSETS/images/actions/copy_white.svg";
// import CopyDarkIcon from "ASSETS/images/actions/copy_dark.svg";

const TransactionModal = ({
	info,
	onCancel,
	isLoading,
	transactionStatus: { status, reason },
}) => {
	// const { theme } = useContext(ThemeContext);
	useContext(ThemeContext);

	return (
		<div className='transaction-modal'>
			{isLoading && (
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onCancel} />
				</div>
			)}
			<div className='d-flex justify-content-center align-items-center'>
				{isLoading && (
					<Image
						light={SpinnerIcon}
						dark={SpinnerIcon}
						alt='Waiting'
						w='110'
						h='110'
						classes='spin'
					/>
				)}
				{!isLoading && status === 'SUCCESS' && (
					<Image
						light={SpinnerSuccessIcon}
						dark={SpinnerSuccessIcon}
						alt='Success'
						w='110'
						h='110'
						classes='mt-2'
					/>
				)}
				{!isLoading && status === 'FAILED' && (
					<Image
						light={WarningLightIcon}
						dark={WarningDarkIcon}
						alt='Success'
						w='110'
						h='110'
						classes='mt-2'
					/>
				)}
			</div>

			<>
				<p className='txt-center font-weight-700 pt-2 pb-1'>
					{isLoading && 'Waiting For Confirmation'}
					<br />
				</p>
				{status === 'FAILED' && reason ? (
					<p className='txt-center font-weight-400 font-size-12 txt-pre-line pb-2'>
						{reason}
					</p>
				) : null}
			</>

			{isLoading && (
				<div className='transaction-modal__footer mt-3'>
					<p className='txt-center font-size-12 font-weight-700 line-height-6'>
						{info}
					</p>
					<p className='txt-center font-size-12'>
						Please confirm this transaction in your wallet
					</p>
				</div>
			)}
			{!isLoading && (
				<div className='d-flex flex-direction-column justify-content-center align-items-center pb-3'>
					{/* <div className='flex-center mt-1 mb-1'>
						<Image
							light={CopyDarkIcon}
							dark={CopyWhiteIcon}
							alt='View on explorer'
							w='12'
							h='12'
						/>
						<a
							className={`font-size-12 font-weight-700 ${
								theme === 'theme-light' ? 'c-dark' : 'c-green'
							} txt-underline ml-1 line-height-1 c-pointer`}
							href={transactionLink}
						>
							View on explorer
						</a>
					</div> */}
					<Button
						type='button'
						text='Close'
						green
						classes='pl-8 pr-8'
						onClick={onCancel}
					/>
				</div>
			)}
		</div>
	);
};

export default TransactionModal;
