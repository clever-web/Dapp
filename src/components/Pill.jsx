import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from 'CONTEXT/theme-context';
import { useMediaQuery } from 'hooks/useMediaQuery';

const borderStyle = 'pill__extra-border';

const Pill = ({ title, value, isValueImage, large, small, classes, isHome }) => {
	const { theme } = useContext(ThemeContext);
	const location = useLocation();
	const matchMedia = useMediaQuery('(min-width: 960px)');

	const [isHomePath, setIsHomePath] = useState(false);

	useEffect(() => {
		if (location.pathname === '/') {
			setIsHomePath(true);
		} else {
			setIsHomePath(false);
		}
	}, [location.pathname]);

	const renderStyle = () => {
		let style = ['pill'];

		if (large) style.push('pill__large');
		if (small) style.push('pill__small');
		if (classes) style.push(classes);

		return style.join(' ');
	};

	const renderBottomValue = () => {
		if (small && isValueImage) {
			return isHome ? (
				<div className='pill__bottom'>
					<img
						src={value}
						className='pill__bottom__icon'
						alt='title'
					/>
				</div>
			) : value ? (
				<div className='pill__bottom'>
					<img
						src={value}
						className='pill__bottom__icon'
						alt='title'
					/>
				</div>
			) : (
				'-'
			);
		}

		//new code for circle in modal V1alpha
		if(value == "T")
			return (
				<p
					className={`pill__bottom ${
						theme === 'theme-light' && !isHomePath && matchMedia
							? borderStyle
							: ''
					}`}
				>
					<div className = "specailPillCharacter">&nbsp;{value || '-'}&nbsp;</div>
				</p>
			);

		return (
			<p
				className={`pill__bottom pill__bottom__opacity ${
					theme === 'theme-light' && !isHomePath && matchMedia
						? borderStyle
						: ''
				}`}
			>
				{value || '-'}
			</p>
		);
	};

	return (
		<div className={renderStyle()}>
			<p className={`pill__top ${
					theme === 'theme-light' && !isHomePath && matchMedia
						? borderStyle
						: ''
				}`}>{title}</p>
			{renderBottomValue()}
		</div>
	);
};

export default Pill;
