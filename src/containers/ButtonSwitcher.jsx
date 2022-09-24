import Button from 'COMPONENTS/Button';

const ButtonSwitcher = ({
	firstButtonName,
	secondButtonName,
	firstButtonTitle,
	secondButtonTitle,
	activeBtn,
	setActiveBtn,
	disabled
}) => {
	const handleButtonClick = (e) => setActiveBtn(e.target.name);

	return (
		<div className='button__switcher'>
			<div className='button__switcher__bg'>
				<Button
					type='button'
					name={firstButtonName}
					text={firstButtonTitle}
					classes={`button__switcher__btn ${
						activeBtn === firstButtonName && !disabled
							? 'button__switcher__btn--active'
							: ''
					}`}
					onClick={handleButtonClick}
					disabled={disabled}
				/>
				<Button
					type='button'
					name={secondButtonName}
					text={secondButtonTitle}
					classes={`button__switcher__btn ${
						activeBtn === secondButtonName && !disabled
							? 'button__switcher__btn--active'
							: ''
					}`}
					onClick={handleButtonClick}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default ButtonSwitcher;
