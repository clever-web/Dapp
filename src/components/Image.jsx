import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';

const Image = ({ light, dark, alt, w, h, classes = '' }) => {
	const { theme } = useContext(ThemeContext);

	return (
		<img
			src={theme === 'theme-light' ? light : dark}
			alt={alt}
			width={w}
			height={h}
			className={classes}
		/>
	);
};

export default Image;
