import { useMemo } from 'react';
import ButtonClose from 'COMPONENTS/ButtonClose';

export const Toast = ({ mode, title, message, onClose }) => {
	const classes = useMemo(
		() => ['toast__header', `toast__header--${mode}`].join(' '),
		[mode]
	);

	return (
		<div className='toast'>
			<div className={classes}>
				<p className='font-size-14 font-weight-700 pl-4'>{title}</p>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onClose} classes='p-0' />
				</div>
			</div>
			<div className='toast__body'>
				<p className='font-size-14 pl-4 pr-4'>{message}</p>
			</div>
		</div>
	);
};
