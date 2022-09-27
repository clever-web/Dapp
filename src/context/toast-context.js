import { createContext, useRef } from 'react';
import { Toaster } from 'COMPONENTS/Toaster';

const initialState = { notify: () => {} };

const ToastContext = createContext(initialState);

function ToastProvider({ children }) {
	const toastRef = useRef();

	const notify = (mode, title, message) =>
		toastRef.current.addMessage({ mode, title, message });

	return (
		<ToastContext.Provider value={{ notify }}>
			<Toaster ref={toastRef} autoClose={true} />
			{children}
		</ToastContext.Provider>
	);
}

export { ToastProvider, ToastContext };
