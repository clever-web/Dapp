import Image from 'COMPONENTS/Image';

const Coins = ({ box }) => {
	return (
	<div className='farms__box__header__coins'>
		<div className='farms__box__header__coins__coin'>
			<Image
				light={box.coin_1.img}
				dark={box.coin_1.img}
				alt={box.coin_1.name}
				w='30'
				h='30'
			/>
		</div>
		{ box && BaseAudioContext.coin_2 && (
		<div className='farms__box__header__coins__coin'>
			<Image
				light={box.coin_2.img}
				dark={box.coin_2.img}
				alt={box.coin_2.name}
				w='30'
				h='30'
			/>
		</div>
		)}
	</div>
	);
}


export default Coins;
