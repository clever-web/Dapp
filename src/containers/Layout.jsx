import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Bg from './Bg';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Backdrop from 'COMPONENTS/Backdrop';
import { useMediaQuery } from 'hooks/useMediaQuery';

const Layout = ({ children, ...props }) => {
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);
	const [currentPath, setCurrentPath] = useState(null);
	const [linearBg, setLinearBg] = useState(false);
	const matchMedia = useMediaQuery('(min-width: 960px)');

	const showSidebar = () => setSidebar(!sidebar);

	useEffect(() => {
		if (location.pathname !== currentPath) {
			setCurrentPath(location.pathname);
			if (location.pathname !== '/') {
				setLinearBg(true);
			} else {
				setLinearBg(false);
			}
		}
	}, [location.pathname, currentPath]);

	const handleBackdrop = () => {
		if (!matchMedia) {
			return sidebar && <Backdrop onClick={showSidebar} />;
		}
		return;
	};

	return (
		<div className={`layout ${linearBg ? 'linear-bg' : ''}`}>
			<Bg />
			<Header showSidebar={showSidebar} />
			<main className='main'>
				{handleBackdrop()}
				<Sidebar
					isOpen={sidebar}
					showSidebar={showSidebar}
					location={location.pathname}
				/>
				<div className='container'>{children}</div>
			</main>
		</div>
	);
};

export default Layout;
