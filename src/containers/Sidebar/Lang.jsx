import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { languages } from 'UTILS/constants';

const Lang = () => {
	const [language] = useState('en');

	const renderLanguages = () =>
		languages.map(({ title, link }) => (
			<li className='lang__dropdown__item' key={title}>
				<NavLink
					className='lang__dropdown__link'
					title={title}
					exact
					to={link}
				>
					{title}
				</NavLink>
			</li>
		));

	return (
		<div className='lang'>
			<button type='button' className='lang__btn'>
				{language}
			</button>
			<ul className='lang__dropdown'>{renderLanguages()}</ul>
		</div>
	);
};

export default Lang;
