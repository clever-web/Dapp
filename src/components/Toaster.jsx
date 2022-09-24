import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { Toast } from 'COMPONENTS/Toast';
import { useToastAutoClose } from 'HOOKS/useToastAutoClose';
import { useToastPortal } from 'HOOKS/useToastPortal';
import { uuid } from 'SHARED/helpers';

export const Toaster = forwardRef(
	({ autoClose, autoCloseTime = 8000 }, ref) => {
		const [toasts, setToasts] = useState([]);
		const { loaded, portalId } = useToastPortal();

		useToastAutoClose({
			toasts,
			setToasts,
			autoClose,
			autoCloseTime,
		});

		const removeToast = (id) => {
			setToasts(toasts.filter((t) => t.id !== id));
		};

		useImperativeHandle(ref, () => ({
			addMessage(toast) {
				setToasts([...toasts, { ...toast, id: uuid() }]);
			},
		}));

		return loaded ? (
			ReactDOM.createPortal(
				<div className='toast__container'>
					{toasts.map((t) => (
						<Toast
							key={t.id}
							mode={t.mode}
							title={t.title}
							message={t.message}
							onClose={() => removeToast(t.id)}
						/>
					))}
				</div>,
				document.getElementById(portalId)
			)
		) : (
			<></>
		);
	}
);
