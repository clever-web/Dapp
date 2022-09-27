import { createContext, useEffect, useState } from 'react';

const initialState = {
	theme: 'theme-dark',
	toggle: () => {},
};

const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('theme-dark');

	useEffect(() => {
		const selectedTheme = localStorage.getItem('theme');
		if (selectedTheme) {
			setTheme(selectedTheme);
			document.documentElement.className = selectedTheme;
		} else {
			localStorage.setItem('theme', theme);
			setTheme(theme);
		}
	}, [theme]);

	useEffect(() => {
		const selectedTheme = localStorage.getItem('theme');
		if (selectedTheme) {
			setTheme(selectedTheme);
			document.documentElement.className = selectedTheme;
		}
	}, [theme]);

	const toggle = () => {
		const currentTheme =
			theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
		localStorage.setItem('theme', currentTheme);
		setTheme(currentTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

export { ThemeProvider, ThemeContext };
