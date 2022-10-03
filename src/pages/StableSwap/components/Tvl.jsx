import Image from 'COMPONENTS/Image';
import Left from 'ASSETS/images/pages/swap/Left.png';
import Right from 'ASSETS/images/pages/swap/Right.png';
import { useMediaQuery } from 'hooks/useMediaQuery';
import CharacterImg from 'assets/images/pages/swap/CHARACTER.svg';
import { useWeb3React } from '@web3-react/core';

const Header = ({ swapInfo, isLoading }) => {
    const { chainId = 4,  } = useWeb3React();
	const matchMedia = useMediaQuery('(max-width: 500px)');

    const ethAmount = [1,4].includes(chainId) ? swapInfo?.vaultBalances?.src : swapInfo?.vaultBalances?.dest;
    const busdAmount = [56,97].includes(chainId) ? swapInfo?.vaultBalances?.src : swapInfo?.vaultBalances?.dest;
	return (
		<div className='swap__header' style={{marginBottom: '10px'}}>
            <div className="swap__header__pack swap_header_pack-eth">
                <Image
                    light={Left}
                    dark={Left}
                    alt='Coins'
                    w='40'
                    h='40'
                    classes='swap__header__left'
                />
                <p className="swap__header__pack__TVL">BUSD TVL: {parseFloat(busdAmount)?.toFixed(3)}</p>
            </div>
            <Image
                light={CharacterImg}
                dark={CharacterImg}
                alt='Hero'
                w='40'
                h='40'
                classes='swap__header__character'
            />
			<div className='swap__header__textTitle'>
				<p  style = {{marginBottom:'5px'}}
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
                <p className="swap__header__pack__TVL swap__header__pack__busdTVL">USDT TVL: {parseFloat(ethAmount)?.toFixed(3)}</p>
            </div>
		</div>
	);
};

export default Header;
