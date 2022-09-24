import Logo from './Logo';
import MainActions from './MainActions/MainActions';
import Image from 'COMPONENTS/Image';
import MenuIcon from 'ASSETS/images/actions/dark/menu.svg';

const Header = ({ showSidebar }) => (
	<header className='app-container header'>
		<Logo />
		<button
			type='button'
			onClick={showSidebar}
			className='header__toggle-menu'
		>
			<Image light={MenuIcon} dark={MenuIcon} alt='Menu' w='17' h='8' />
		</button>
		<MainActions />
	</header>
);

export default Header;
