import BLACK_TOP_LOGO from 'assets/images/common/tiers/top-logo__black.svg';
import WHITE_TOP_LOGO from 'assets/images/common/tiers/top-logo__white.svg';


const CardLogo = ({ type }) => {
    return (
        <div className={`logo logo-${type}`}>
            {
                type === 'silver' || type === 'gold' || type === 'diamond'
                ? (<img src={BLACK_TOP_LOGO} alt='Card logo'></img>)
                : (<img src={WHITE_TOP_LOGO} alt='Card logo'></img>)
            }
        </div>
    )
}

export default CardLogo;