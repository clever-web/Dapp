import TierBlackIcon from 'ASSETS/images/common/tiers/tier_black.svg';
import TierDiamondIcon from 'ASSETS/images/common/tiers/tier_diamond.svg';
import TierGoldIcon from 'ASSETS/images/common/tiers/tier_gold.svg';
import TierSilverIcon from 'ASSETS/images/common/tiers/tier_silver.svg';
import TierDefaultIcon from 'ASSETS/images/common/tiers/tier_default.svg';

import Image from 'COMPONENTS/Image';
import { TIERS } from 'hooks/useFormTier';

const Tier = ({ type, classes }) => {
	const renderStyle = () => {
		let style = [`tier tier__${type}`];
		if (classes) style.push(classes);
		return style.join(' ');
	};

	let icon = TierDefaultIcon; 
	switch (type) {
		case TIERS.BLACK:
			icon = TierBlackIcon;
			break;
		case TIERS.DIAMOND:
			icon = TierDiamondIcon;
			break;
		case TIERS.GOLD:
			icon = TierGoldIcon;
			break;
		case TIERS.SILVER:
			icon = TierSilverIcon;
			break;
		default:
			break;
	}
	return (
		<div className={renderStyle()}>
			<Image
				light={icon}
				dark={icon}
				alt='Tier'
				w='25'
				h='36'
				classes='tier__icon'
			/>
			<div className='tier__txts'>
				<p className='tier__txt'>tier:</p>
				<p className='tier__txt'>{type}</p>
			</div>
		</div>
	);
};

export default Tier;
