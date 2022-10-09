import Image from 'COMPONENTS/Image';
import ProgressBarLightsImg from 'ASSETS/images/pages/pools/progress-bar-lights.svg';

const ProgressBar = ({ fill }) => (
	<div className='progress-bar'>
		<div className='progress-bar__line'>
			<div
				className={`progress-bar__line__fill ${
					fill === 100 ? 'progress-bar__line__fill--completed' : ''
				}`}
				style={{ width: `${fill}%` }}
			>
				{fill < 100 && (
					<Image
						light={ProgressBarLightsImg}
						dark={ProgressBarLightsImg}
						alt='Progress'
						w='15'
						h='29'
						classes='progress-bar__line__fill__icon'
					/>
				)}
			</div>
		</div>
		{/* <p className='font-weight-900 line-height-4 txt-uppercase txt-italic c-white txt-glow'>{fill}%</p> */}
	</div>
);

export default ProgressBar;
