import Image from 'COMPONENTS/Image';
import CaretDarkIcon from 'ASSETS/images/actions/caret_dark.svg';
import CaretLightIcon from 'ASSETS/images/actions/caret_white.svg';

export const InputSelect = ({
	name,
	options,
	iconBefore,
	selectNote,
	onChange,
	selectedValue,
	classes,
}) => (
	<div className={`input__select ${classes ? classes : ''}`}>
		{iconBefore && (
			<div className='input__select__icon__container'>
				<Image
					light={iconBefore.img}
					dark={iconBefore.img}
					alt={iconBefore.alt}
					w={iconBefore.width}
					h={iconBefore.height}
					classes='input__select__icon--before'
				/>
			</div>
		)}
		<div className='input__select__select-box'>
			{selectNote && (
				<p className='input__select__select-note'>{selectNote}</p>
			)}
			<div className='input__select__select-container'>
				<select name={name} onChange={onChange} value={selectedValue}>
					{options &&
						options.map((option, index) => (
							<option key={`${index}-${option}`} value={option}>
								{option}
							</option>
						))}
				</select>
				<Image
					light={CaretDarkIcon}
					dark={CaretLightIcon}
					alt='Select from dropdown'
					w='10'
					h='6'
					classes='select__icon'
				/>
			</div>
		</div>
	</div>
);
