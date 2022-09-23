import Image from 'COMPONENTS/Image';
import { Tooltip } from 'COMPONENTS/Tooltip';
import { calculateValue } from './helper';

export const InputSlider = ({
	name,
	id,
	labelTopLeft,
	labelTopRight,
	labelBottomRight,
	onChange,
	max,
	min,
	value,
	classes,
	tooltipIconClasses,
}) => (
	<div className={`input__slider ${classes ? classes : ''}`}>
		{labelTopLeft && labelTopRight && (
			<div className='d-flex align-items-center justify-content-space-between mb-2'>
				<div className='flex-center'>
					<label
						htmlFor={id}
						className='input__label font-size-12 font-weight-400 mr-1'
					>
						{labelTopLeft.label}
					</label>
					{labelTopLeft.tooltipIcon && (
						<Tooltip
							content={labelTopLeft.tooltipText}
							width={
								labelTopLeft.tooltipText.length > 60
									? 'fixed'
									: 'auto'
							}
						>
							<Image
								light={labelTopLeft.tooltipIcon}
								dark={labelTopLeft.tooltipIcon}
								alt='Lock and charge information'
								w='12'
								h='12'
								classes={
									tooltipIconClasses ? tooltipIconClasses : ''
								}
							/>
						</Tooltip>
					)}
				</div>
				<span className='flex-center font-size-14 font-weight-700'>
					{labelTopRight.icon && (
						<Image
							light={labelTopRight?.icon?.src}
							dark={labelTopRight?.icon?.src}
							alt={labelTopRight?.icon?.alt}
							w={labelTopRight?.icon?.width}
							h={labelTopRight?.icon?.height}
							classes={labelTopRight?.classes?.icon}
						/>
					)}
					<span className={labelTopRight?.classes?.value}>
						{labelTopRight.value}
					</span>
					<span className={labelTopRight?.classes?.symbol}>
						{labelTopRight.symbol}
					</span>
				</span>
			</div>
		)}
		<input
			type='range'
			name={name}
			min={min}
			max={max}
			value={value}
			onChange={onChange}
			className='input__slider__thumb'
		/>
		<div className='slider'>
			<div className='slider__track' />
			<div
				className='slider__range'
				style={{ width: `${value * (100 / max)}%` }}
			/>
		</div>
		{labelBottomRight && (
			<div className='d-flex flex-direction-column align-items-end'>
				<p
					className='font-weight-700 mt-1'
					style={{ fontSize: '50px' }}
				>
					{calculateValue(labelBottomRight)}
				</p>
				<p className='font-size-14 font-weight-400'>
					{labelBottomRight.additionalInfo.subtitle}
				</p>
			</div>
		)}
	</div>
);
