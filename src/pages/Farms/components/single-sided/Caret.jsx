import { useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import Image from 'COMPONENTS/Image';
import CaretWhiteIcon from 'ASSETS/images/actions/caret_up_white.svg';
import CaretDarkIcon from 'ASSETS/images/actions/caret_up_dark.svg';

const Caret = ({ isOpened, classes = '' }) => {
	const { theme } = useContext(ThemeContext);

	return (
		<button
			type='button'
			className={
				isOpened
					? `farms__box__header__btn farms__box__header__btn__opened ${classes}`
					: `farms__box__header__btn ${classes}`
			}
		>
			<Image
				light={CaretDarkIcon}
				dark={CaretWhiteIcon}
				alt='Caret Up'
				w={theme === 'theme-light' ? '10' : '11'}
				h={theme === 'theme-light' ? '6' : '7'}
			/>
		</button>
	);
};

export default Caret;
