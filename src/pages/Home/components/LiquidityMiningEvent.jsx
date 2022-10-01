import { useHistory } from 'react-router-dom';
import Button from 'COMPONENTS/Button';
import Image from 'COMPONENTS/Image';
import { useMediaQuery } from 'hooks/useMediaQuery';
import FormBusdMobileIcon from 'ASSETS/images/pages/home/form-busd-desktop.png';
import FormBusdDesktopIcon from 'ASSETS/images/pages/home/form-busd-desktop.png';
import FormUsdtMobileIcon from 'ASSETS/images/pages/home/form-usdt-desktop.png';
import FormUsdtDesktopIcon from 'ASSETS/images/pages/home/form-usdt-desktop.png';

const LiquidityMiningEvent = ({ aprForLP }) => {
	const history = useHistory();
	const matchMedia_1 = useMediaQuery('(min-width: 768px)');
	const matchMedia_2 = useMediaQuery('(min-width: 960px)');
	const matchMedia_3 = useMediaQuery('(min-width: 1075px)');

	const handleClick = () => history.push('/swap');

	return (
		<div className='home__simple space-h--mobile' style = {{float:'left',width:'100%'}}>
			<div className='liquidity-mining__box'>
				<div className='liquidity-mining__box__col'>

					<p className='liquidity-mining__box__txt liquidity-mining__box__txt--2 c-white'>
						APR:
						{aprForLP} %
					</p>
				</div>
				<div className='liquidity-mining__box__col__left'>
					<p className='liquidity-mining__box__txt liquidity-mining__box__txt--1 c-white txt-glow'>
						Create LP <br />Tokens
					</p>
					<Button
						type='button'
						text='Stake now'
						outlinedWhite
						glow
						classes='pl-5 pr-5 pt-2 pb-2 liquidity-mining__box__btn'
						onClick={handleClick}
					/>
				</div>
				<div className='liquidity-mining__box__col__right'>
					{/* <div className='liquidity-mining__box__image'> */}
					<div className = "liquidity-mining__box__col__right__1">
						<Image
							light={
								matchMedia_1
									? FormUsdtDesktopIcon
									: FormUsdtDesktopIcon
							}
							dark={
								matchMedia_1
									? FormUsdtMobileIcon
									: FormUsdtMobileIcon
							}
							alt='$FORM - USDT'
							w='135'
							h='186'
							classes='liquidity-mining__box__col__img'
						/>
						<p className='liquidity-mining__box__txt liquidity-mining__box__txt--3 c-white txt-glow'>
							&nbsp;&nbsp;$FORM/<br/>&nbsp;&nbsp;BUSD
						</p>
					</div>
					<div className = "liquidity-mining__box__col__right__2">
						<Image
							light={
								matchMedia_1
									? FormBusdDesktopIcon
									: FormBusdDesktopIcon
							}
							dark={
								matchMedia_1
									? FormBusdMobileIcon
									: FormBusdMobileIcon
							}
							alt='$FORM - USDT'
							w='135'
							h='186'
							classes='liquidity-mining__box__col__img'
						/>
						<p className='liquidity-mining__box__txt liquidity-mining__box__txt--4 c-white txt-glow'>
						&nbsp;&nbsp;$FORM/<br/>&nbsp;&nbsp;USDT
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiquidityMiningEvent;
