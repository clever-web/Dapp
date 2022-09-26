import Image from 'COMPONENTS/Image';
import CaretDarkIcon from 'ASSETS/images/actions/caret_dark.svg';
import CaretLightIcon from 'ASSETS/images/actions/caret_white.svg';

const SelectToken = ({
	name,
	selectedValue,
	onOpen,
	icon,
	note,
	displaySelect,
}) => (
	<div className='select-token-with-input__select'>
		<div className='select-token-with-input__select__icon'>
			<img src={icon} alt='Token' />
		</div>
		<div className='select-token-with-input__select__box'>
			<p className='font-size-14'>{note}</p>
			<button
				type='button'
				className={`select-token-with-input__select__btn ${
					!displaySelect ? `cursor-default` : null
				} `}
				onClick={() => onOpen(name)}
			>
				{selectedValue}
				{displaySelect ? (
					<Image
						light={CaretDarkIcon}
						dark={CaretLightIcon}
						alt='Select'
						w='10'
						h='6'
						classes='ml-1'
					/>
				) : null}
			</button>
		</div>
	</div>
);

export default SelectToken;
