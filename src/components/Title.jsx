const Title = ({ title, classes }) => {
	const renderStyle = () => {
		let style = ['title'];

		if (classes) style.push(classes);

		return style.join(' ');
	};

	return <p className={renderStyle()}>{title}</p>;
};

export default Title;
