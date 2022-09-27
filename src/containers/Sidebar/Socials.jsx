import { useCallback, useContext } from 'react';
import { ThemeContext } from 'CONTEXT/theme-context';
import Image from 'COMPONENTS/Image';
import { socials } from 'UTILS/constants';

const Socials = () => {
	const { theme } = useContext(ThemeContext);

	const renderSocials = useCallback(
		() =>
			socials(theme).map(({ link, image }, index) => (
				<li key={index} className='socials__item'>
					<a
						href={link}
						rel='noreferrer'
						target='_blank'
						className='socials__item__link'
					>
						<Image
							light={image.src}
							dark={image.src}
							alt={image.alt}
							w={image.width}
							h={image.height}
							classes='socials__item__img'
						/>
					</a>
				</li>
			)),
		[theme]
	);

	return <ul className='socials'>{renderSocials()}</ul>;
};

export default Socials;
