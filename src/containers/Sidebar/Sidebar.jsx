import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import { NavLink } from 'react-router-dom';
import { routes } from 'ROUTES';
import ThemeToggle from 'COMPONENTS/ThemeToggle';
import Image from 'COMPONENTS/Image';
import Socials from './Socials';
import { useMediaQuery } from 'hooks/useMediaQuery';
import MenuActiveIconDark from 'ASSETS/images/actions/dark/menu_active.svg';
import MenuActiveIconLight from 'ASSETS/images/actions/light/menu_active.svg';
import Pill from 'COMPONENTS/Pill';
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from 'UTILS/constants';
import { usdFormatter } from 'utils/formatters';
import { useFormTier } from 'hooks/useFormTier';
import Tier from 'COMPONENTS/Tier';
import useFetch from 'use-http';

const Sidebar = ({ isOpen, showSidebar, location }) => {
	const [hoveredName, setHoveredName] = useState('');
	const { data } = useFetch(COIN_GECKO_URL, {}, []);

	const { theme } = useContext(ThemeContext);
	const { tier } = useFormTier();
	const matchMedia = useMediaQuery('(min-width: 960px)');

	const sidebarClasses = () => (isOpen ? 'sidebar sidebar--open' : 'sidebar');

	const renderActiveLinkColor = useCallback(
		(path) => (location === path ? '#8cffcc' : undefined),
		[location]
	);

	const handleFormPrice = () => {
		if (!matchMedia) {
			return (
				<div className='ml-1'>
					<Pill
						title='$Form price'
						value={usdFormatter.format(
							data?.market_data?.current_price?.usd ??
								FORM_TOKEN_DEFAULT_PRICE
						)}
						small
					/>
				</div>
			);
		}
		return;
	};

	const handleTier = () => {
		if (!matchMedia) {
			return <div className='ml-1'>{tier && <Tier type={tier} />}</div>;
		}
		return;
	};

	const changeIconColorOnHover = (e) => setHoveredName(e.target.name);

	const renderLinks = useCallback(
		() =>
			routes(theme).map(({ path, name, MenuIcon }, index) => (
				<li key={index} className='sidebar__list__item'>
					<NavLink
						className='sidebar__list__link'
						activeClassName='sidebar__list__link--active sidebar__list__link--active'
						exact
						to={path}
						name={name}
						onClick={showSidebar}
						onMouseEnter={changeIconColorOnHover}
						onMouseLeave={() => setHoveredName('')}
					>
						<MenuIcon
							color={
								name === hoveredName
									? theme === 'theme-light'
										? location === path
											? '#8cffcc'
											: ''
										: '#8cffcc'
									: '' || renderActiveLinkColor(path)
							}
						/>
						<span className='txt-uppercase'>{name}</span>
					</NavLink>
				</li>
			)),
		[theme, renderActiveLinkColor, showSidebar, hoveredName, location]
	);

	return (
		<nav className={sidebarClasses()}>
			<div className='sidebar__header'>
				{handleFormPrice()}
				<button
					type='button'
					onClick={showSidebar}
					className='header__toggle-menu ml-auto'
				>
					<Image
						light={MenuActiveIconLight}
						dark={MenuActiveIconDark}
						alt='Menu'
						w='23'
						h='9'
					/>
				</button>
				{handleTier()}
			</div>
			<ul className='sidebar__list'>{renderLinks()}</ul>
			<div className='sidebar__actions'>
				{/* <Lang /> */}
				<ThemeToggle />
			</div>
			<Socials />
		</nav>
	);
};

export default Sidebar;
