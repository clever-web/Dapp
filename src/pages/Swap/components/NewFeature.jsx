import Image from 'COMPONENTS/Image';
import Left from 'ASSETS/images/pages/swap/Left.png';
import Right from 'ASSETS/images/pages/swap/Right.png';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { useState } from 'react';

const Header = () => {
	const matchMedia = useMediaQuery('(max-width: 500px)');
    const [ethAmount, SetEthAmount] = useState('2501002');
    const [busdAmount, SetBusdAmount] = useState('2501002');
	return (
		<div className='swap__header'>
            <div className="swap__header__pack swap_header_pack-eth">
                <Image
                    light={Left}
                    dark={Left}
                    alt='Coins'
                    w='40'
                    h='40'
                    classes='swap__header__left'
                />
                <p className="swap__header__pack__TVL">ETH TVL: {ethAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
			<div className='swap__header__textTitle'>
				<p
					className={`${
						matchMedia ? 'font-size-24' : 'font-size-34'
					} font-weight-900 txt-uppercase txt-italic txt-center c-white txt-glow white-space-nowrap swap__header__title`}
				>
					BUSD/USDT
				</p>
                <p
					className={`${
						matchMedia ? 'font-size-24' : 'font-size-34'
					} font-weight-900 txt-uppercase txt-italic txt-center c-white txt-glow white-space-nowrap`}
                    style={{marginTop: '-10px', marginLeft: '15px'}}
				>
					POOL
				</p>
			</div>
            <div className="swap__header__pack swap_header_pack-busd">
                <Image
                    light={Right}
                    dark={Right}
                    alt='Hero'
                    w='40'
                    h='40'
                    classes='swap__header__right'
                />
                <p className="swap__header__pack__TVL swap__header__pack__busdTVL">BUSD TVL: {busdAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
		</div>
	);
};

export default Header;
