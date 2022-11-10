import Image from 'COMPONENTS/Image';
import ArrowUp from 'ASSETS/images/common/arrow-up.svg';
import ArrowDown from 'ASSETS/images/common/arrow-down.svg';
import SwapArrows from 'ASSETS/images/actions/arrows.svg';

const SwapperButton = ({
	icon,
	iconWidth,
	iconHeight,
	btnClasses = '',
	classes,
	onClick,
}) => (
	<div className='button-swapper'>
		<button
			type='button'
			onClick={onClick}
			className={`button-swapper__button ${btnClasses}`}
			style={{border: '1px solid #99ffcc'}}
		>
			{icon ? (
				<Image
					light={icon || SwapArrows}
					dark={icon || SwapArrows}
					alt='Swap'
					w={iconWidth || '42'}
					h={iconHeight || '42'}
					classes={classes}
				/>
			) : (
				<>
					<Image
						light={ArrowUp}
						dark={ArrowUp}
						alt='Swap'
						w='10'
						h='16'
						classes='button-swapper__button__arrow-up'
					/>
					<Image
						light={ArrowDown}
						dark={ArrowDown}
						alt='Swap'
						w='10'
						h='16'
						classes='button-swapper__button__arrow-down'
					/>
				</>
			)}
		</button>
	</div>
);

export default SwapperButton;
