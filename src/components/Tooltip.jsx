import { useState } from 'react';

export const Tooltip = (props) => {
	const [active, setActive] = useState(false);

	const showTip = () => setActive(true);
	const hideTip = () => setActive(false);

	const renderWidth = () => {
		if (props.width && props.width === 'auto') {
			return { whiteSpace: 'nowrap' };
		}

		return { width: '50vw' };
	};

	return (
		<div className='tooltip' onMouseEnter={showTip} onMouseLeave={hideTip}>
			{props.children}
			{active && (
				<div
					className={`tooltip__tip ${props.direction || 'top'}`}
					style={renderWidth()}
				>
					<p>{props.content}</p>
				</div>
			)}
		</div>
	);
};
