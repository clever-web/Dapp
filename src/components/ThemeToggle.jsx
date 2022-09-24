import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import ModeTogglerLight from 'ASSETS/images/actions/light/theme_mode.svg';
import Image from 'COMPONENTS/Image';
import ModeTogglerDark from 'ASSETS/images/actions/dark/ThemeMode';

const ThemeToggle = () => {
	const { theme, toggle } = useContext(ThemeContext);

	return (
		<div className='theme-toggle'>
			<button
				type='button'
				onClick={toggle}
				className='theme-toggle__btn'
			>
				{theme === 'theme-light' ? (
					<Image
						light={ModeTogglerLight}
						dark={ModeTogglerLight}
						alt='Menu'
						w='41'
						h='40'
					/>
				) : (
					<ModeTogglerDark />
				)}
			</button>
		</div>
	);
};

export default ThemeToggle;
