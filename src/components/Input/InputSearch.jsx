import Image from 'COMPONENTS/Image';
import MagnifyingGlassDarkIcon from 'ASSETS/images/common/dark/magnifying_glass.svg';
import MagnifyingGlassLightIcon from 'ASSETS/images/common/light/magnifying_glass.svg';

const InputSearch = ({ name, value, onChange, placeholder }) => (
	<div className='input__search__container'>
		<input
			name={name}
			type='text'
			value={value}
			onChange={onChange}
			className='input__search'
			placeholder={placeholder}
		/>
		<Image
			light={MagnifyingGlassLightIcon}
			dark={MagnifyingGlassDarkIcon}
			alt='Search'
			w='16'
			h='16'
			classes='input__search__icon'
		/>
	</div>
);

export default InputSearch;
