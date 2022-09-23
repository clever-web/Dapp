export const calculateValue = (labelBottomRight) => {
	const result =
		labelBottomRight.value * labelBottomRight.additionalInfo.multiplier;

	if (typeof result !== 'number') return null;

	return `${result > 0 ? '+' : ''}${result}${
		labelBottomRight.additionalInfo.symbol
	}`;
};
