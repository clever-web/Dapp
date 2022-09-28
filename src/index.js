import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'CONTEXT/theme-context';
import { ToastProvider } from 'CONTEXT/toast-context';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './scss/main.scss';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from 'UTILS/web3';

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<BrowserRouter>
				<ThemeProvider>
					<ToastProvider>
						<App />
					</ToastProvider>
				</ThemeProvider>
			</BrowserRouter>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
