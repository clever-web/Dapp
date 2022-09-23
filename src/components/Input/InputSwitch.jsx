import { useState } from 'react';
import { Tooltip } from 'COMPONENTS/Tooltip';
import Image from 'COMPONENTS/Image';
import QuestionIcon from 'ASSETS/images/actions/dark/question.svg';

const SwitchSmall = ({ id, description, switchTooltip = '', classes }) => {
	const [checked, setChecked] = useState(false);

	return (
		<div className={`input__switch__small ${classes ? classes : ''}`}>
			<div className='input__switch__small__description'>
				<p className='font-size-2 font-weight-400 mr-1'>
					{description}
				</p>
				<Tooltip
					content={switchTooltip}
					width={switchTooltip.length > 60 ? 'fixed' : 'auto'}
				>
					<Image
						light={QuestionIcon}
						dark={QuestionIcon}
						alt='Information'
						w='12'
						h='12'
					/>
				</Tooltip>
			</div>
			<div className='input__switch__small__checkbox'>
				<input
					id={`switch-small-${id}`}
					type='checkbox'
					className='input__checkbox'
					checked={checked}
					onChange={() => setChecked((prevState) => !prevState)}
				/>
				<label
					htmlFor={`switch-small-${id}`}
					className={`input__switch__small__label ${
						checked ? 'input__switch__small__checked' : ''
					}`}
				>
					<span className='input__switch__small__toggle'></span>
				</label>
			</div>
		</div>
	);
};

const SwitchLarge = ({ id, classes }) => {
	const [checked, setChecked] = useState(false);

	return (
		<div className={`input__switch__large ${classes ? classes : ''}`}>
			<input
				type='checkbox'
				id={`switch-large-${id}`}
				className='input__checkbox'
				checked={checked}
				onChange={() => setChecked((prevState) => !prevState)}
			/>
			<label
				className='input__switch__large__label'
				htmlFor={`switch-large-${id}`}
			>
				<div
					className={`input__switch__large__toggle ${
						checked ? 'input__switch__large__checked' : ''
					}`}
				></div>
				<div className='input__switch__large__names'>
					<p
						className={`input__switch__large__light ${
							checked ? 'input__switch__large__checked' : ''
						}`}
					>
						Lock
					</p>
					<p
						className={`input__switch__large__dark ${
							checked ? 'input__switch__large__checked' : ''
						}`}
					>
						Unlock
					</p>
				</div>
			</label>
		</div>
	);
};

export const InputSwitch = ({
	id,
	description,
	switchTooltip,
	size,
	classes,
}) => {
	switch (size) {
		case 'small':
			return (
				<SwitchSmall
					id={id}
					description={description}
					switchTooltip={switchTooltip}
					classes={classes}
				/>
			);
		case 'large':
			return <SwitchLarge id={id} classes={classes} />;
		default:
			break;
	}
};
