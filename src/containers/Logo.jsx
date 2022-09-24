import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import { Link } from 'react-router-dom';
import Image from 'COMPONENTS/Image';
import FormationWhiteIcon from 'ASSETS/images/logo_white.svg';
import FormationBlackIcon from 'ASSETS/images/logo_black.svg';
import { useMediaQuery } from 'hooks/useMediaQuery';

const Logo = () => {
	const { theme } = useContext(ThemeContext);
	const matchMedia = useMediaQuery('(min-width: 960px)');

	const renderLogo = () => {
		if (!matchMedia) {
			return FormationWhiteIcon;
		}
		return theme === 'theme-light'
			? FormationBlackIcon
			: FormationWhiteIcon;
	};

	return (
		<Link to='/' className='header__logo'>
			<Image
				light={renderLogo()}
				dark={renderLogo()}
				alt='Formation.FI'
				w='27'
				h='48'
				classes='header__logo__img'
			/>
			<div className='header__logo__description'>
				<p className='txt-uppercase font-size-12 font-weight-500'>
					formation.fi&nbsp;&nbsp;
				</p>
				<p className='txt-uppercase font-size-12 font-weight-400'>
					&#40;&#36;form&#41;
				</p>
			</div>
		</Link>
	);
};

export default Logo;
