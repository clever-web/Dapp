import { InputNumber } from './InputNumber';
import InputSearch from './InputSearch';
import { InputSelect } from './InputSelect';
import { InputSlider } from './InputSlider';
import { InputSwitch } from './InputSwitch';

const Input = ({
	name,
	type,
	id,
	labelTopLeft,
	labelTopRight,
	labelBottomRight,
	onChange,
	min,
	max,
	value,
	selectedValue,
	options,
	iconBefore,
	selectNote,
	customCarret,
	classes,
	tooltipIconClasses,
	switchSize,
	description,
	switchTooltip,
	placeholder,
}) => {
	switch (type) {
		case 'slider':
			return (
				<InputSlider
					name={name}
					id={id}
					labelTopLeft={labelTopLeft}
					labelTopRight={labelTopRight}
					labelBottomRight={labelBottomRight}
					onChange={onChange}
					min={min || '0'}
					max={max || '100'}
					value={value}
					classes={classes}
					tooltipIconClasses={tooltipIconClasses}
				/>
			);
		case 'number':
			return (
				<InputNumber
					name={name}
					id={id}
					labelTopLeft={labelTopLeft}
					labelBottomRight={labelBottomRight}
					onChange={onChange}
					value={value}
					classes={classes}
				/>
			);
		case 'select':
			return (
				<InputSelect
					name={name}
					selectedValue={selectedValue}
					options={options}
					iconBefore={iconBefore}
					selectNote={selectNote}
					onChange={onChange}
					customCarret={customCarret}
					classes={classes}
				/>
			);
		case 'switch':
			return (
				<InputSwitch
					id={id}
					description={description}
					switchTooltip={switchTooltip}
					size={switchSize}
					classes={classes}
				/>
			);
		case 'search':
			return (
				<InputSearch
					name={name}
					onChange={onChange}
					value={value}
					placeholder={placeholder}
				/>
			);
		default:
			break;
	}
};

export default Input;
