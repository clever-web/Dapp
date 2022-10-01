import Image from 'COMPONENTS/Image';
import ProgressBar from './ProgressBar';
import Hero from 'ASSETS/images/pages/pools/hero.svg';
import Coins from 'ASSETS/images/pages/pools/coins.svg';
import { useMediaQuery } from 'hooks/useMediaQuery';

const Header = ({totalStaked}) => {
	const matchMedia = useMediaQuery('(min-width: 960px)');
	return (
		<div className='pools__header'>
			<Image
				light={Coins}
				dark={Coins}
				alt='Coins'
				w='53'
				h='55'
				classes='pools__header__coins'
			/>
			<div className='d-flex flex-direction-column'>
				<p
					className={`${
						matchMedia ? 'font-size-34' : 'font-size-24'
					} font-weight-900 txt-uppercase txt-italic txt-center c-white txt-glow white-space-nowrap mb-1`}
				>
					&#36;FORM TVL: {totalStaked}
				</p>
				<ProgressBar fill={90} />
				<p className='font-size-20 font-weight-900 txt-uppercase txt-italic c-white txt-center txt-glow white-space-nowrap mt-1'>
					1X MULTIPLIER
				</p>
			</div>
			<Image
				light={Hero}
				dark={Hero}
				alt='Hero'
				w='48'
				h='59'
				classes='pools__header__hero'
			/>
		</div>
	);
};

export default Header;
