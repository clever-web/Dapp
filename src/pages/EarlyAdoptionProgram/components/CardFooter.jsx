import SilverFooterLogo from 'assets/images/common/tiers/footer-logo__silver.svg'; 
import GoldFooterLogo from 'assets/images/common/tiers/footer-logo__gold.svg'; 
import DiamondFooterLogo from 'assets/images/common/tiers/footer-logo__diamond.svg'; 
import BlackFooterLogo from 'assets/images/common/tiers/footer-logo__black.svg'; 

const AdoptionCardFooter = ({ tier }) => {
  return (
    <div className={`adoption-card-footer adoption-card-footer-${tier}`}>
      {/* icon */}
      {tier === "silver" ? (
        <img src={SilverFooterLogo} alt="Card logo"></img>
      ) : null}
      {tier === "gold" ? 
        <img src={GoldFooterLogo} alt="Card logo"></img> 
        : null}
      {tier === "diamond" ? (
        <img src={DiamondFooterLogo} alt="Card logo"></img>
      ) : null}
      {tier === "black" ? (
        <img src={BlackFooterLogo} alt="Card logo"></img>
      ) : null}
      {/* title */}
      {tier === "silver" || tier === "gold" || tier === "diamond" ? (
        <div className="adoption-card-footer-title">{tier.toUpperCase()}</div>
      ) : null }
      { tier === 'black' ? (
        <div className="adoption-card-footer-title adoption-card-footer-title-black">{tier.toUpperCase()}</div>
      ) : null    
      }
    </div>
  );
};

export default AdoptionCardFooter;
