import Image from 'COMPONENTS/Image';

const RemoveSummaryBox = ({ icon, iconWidth = 30, iconHeight = 30, value, name }) => (
	<div className='liquidity-tab__remove__boxes__col'>
		<div className='liquidity-tab__remove__boxes__col__img'>
			<Image light={icon} dark={icon} alt={name} w={iconWidth} h={iconHeight} />
		</div>
		<div className='d-flex flex-direction-column justify-content-center'>
			<p className='font-size-14 c-white'>{value}</p>
			<p className='font-size-14 c-white'>{name}</p>
		</div>
	</div>
);

export default RemoveSummaryBox;
