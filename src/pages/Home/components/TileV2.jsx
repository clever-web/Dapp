import Image from 'COMPONENTS/Image';
import CopyWhiteIcon from 'ASSETS/images/actions/copy_white.svg';
import CopyGreenIcon from 'ASSETS/images/actions/copy_green.svg';
import { Link } from 'react-router-dom';

const Tile = ({ title, totalWithToken, withIcon, link, price, token, result }) => {
	return (
		<div className='home__header__tile'>
			<p className='home__header__tile__title'>{title}</p>

			<div className='home__header__tile__box'>
				<div>
					<p>
						<span className='home__header__tile__price'>{price}&nbsp;</span>
						{totalWithToken && <span className='font-size-12'>{token}</span>}
					</p>
					<p className='font-size-12'>
						{token ? '=' : ''} {result}
						{!totalWithToken && <span className='font-size-12'>&nbsp;{token}</span>}
					</p>
				</div>

				{withIcon && (
					<Link to={link}>
						<Image
							light={CopyGreenIcon}
							dark={CopyWhiteIcon}
							alt='Copy Address'
							w='17'
							h='17'
						/>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Tile;
