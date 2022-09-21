import Image from 'COMPONENTS/Image';

import CancelDarkIcon from 'ASSETS/images/actions/dark/cancel.svg';
import CancelLightIcon from 'ASSETS/images/actions/light/cancel.svg';

const ButtonClose = ({ onClick, classes = '' }) => (
	<button type='button' className={`btn-icon ${classes}`} onClick={onClick}>
		<Image
			light={CancelLightIcon}
			dark={CancelDarkIcon}
			alt='Close'
			w='15'
			h='15'
		/>
	</button>
);

export default ButtonClose;
