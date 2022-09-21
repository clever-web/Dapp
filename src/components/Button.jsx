const Button = ({
	name,
	type,
	onClick = () => {},
	text,
	disabled = false,
	classes,
	small,
	large,
	wide,
	green,
	onTheTop,
	glossy,
	white,
	outlined,
	outlinedDark,
	outlinedWhite,
	outlinedGreen,
	colorWhite,
	iconBefore,
	iconAfter,
	glow,
	value,
	constantWidth,
}) => {
	const renderStyle = () => {
		let style = ['btn'];

		if (classes) style.push(classes);
		if (small) style.push('btn--small');
		if (large) style.push('btn--large');
		if (wide) style.push('btn--wide');
		if (green) style.push('btn--green');
		if (outlined) style.push('btn--outlined');
		if (white) style.push('btn--white');
		if (outlinedDark) style.push('btn--outlined--dark');
		if (outlinedWhite) style.push('btn--outlined--white');
		if (outlinedGreen) style.push('btn--outlined--green');
		if (colorWhite) style.push('btn--color--white');
		if (disabled) style.push('btn--disabled');
		if (glow) style.push('btn--glow');
		if (onTheTop) style.push('btn--onTheTop');
		if (glossy) style.push('btn--glossy');

		return style.join(' ');
	};

	return (
		<button
			type={type}
			name={name}
			value={value}
			onClick={onClick}
			style={constantWidth && { width: '190px' }}
			className={renderStyle()}
			disabled={disabled}
		>
			{iconBefore && iconBefore}
			{text}
			{iconAfter && iconAfter}
		</button>
	);
};

export default Button;
