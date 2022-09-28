import AdoptionCardFooter from "./CardFooter";
import CardLogo from "./CardLogo";

const AdoptionCard = ({ tier, isInSecondSnapshot }) => {
  return (
    <div className="adoption-card">
      {!isInSecondSnapshot ? (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', height: '250px', fontWeight: 700 }}>
            <span>SORRY</span>
            <span style={{ color: "#99ffcc"}}>YOU</span>
            <span style={{ color: "#99ffcc"}}>ARE</span>
            <span>NOT</span> 
            <span>QUALIFIED</span> 
        </div>
      ) : (
        <>
          <section className='adoption-card-box'>
            <div className="adoption-card-box-top">
              <CardLogo type={tier} />
              <div className="adoption-card-box-top-description">
                <span className="adoption-card-box-top-description-title">FORMATION.FI</span>
                <span className="adoption-card-box-top-description-subtitle">($FORM)</span>
              </div>
            </div>
          </section>
          <section className='adoption-card-box'>
            <div className="adoption-card-box-middle">
              <span className="adoption-card-box-middle-subtitle">Holding</span>
              {tier === "silver" ? <span className="adoption-card-box-middle-title">2,500+</span> : null}
              {tier === "gold" ? <span className="adoption-card-box-middle-title">10,000+</span> : null}
              {tier === "diamond" ? (
                <span className="adoption-card-box-middle-title">35,000+</span>
              ) : null}
              {tier === "black" ? <span className="adoption-card-box-middle-title">50,000+</span> : null}
              {tier === "default" ? <span className="adoption-card-box-middle-title">0.00</span> : null}
              <span className="subtitle">$FORM</span>
            </div>
          </section>
          <section className="adoption-card-box-last">
            <AdoptionCardFooter tier={tier} />
          </section>{" "}
        </>
      )}
    </div>
  );
};

export default AdoptionCard;
