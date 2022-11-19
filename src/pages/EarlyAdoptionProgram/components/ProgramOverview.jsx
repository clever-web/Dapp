import { PROGRAM_TYPE } from "../constants";
import CardLogo from "./CardLogo";

const ProgramOverview = () => {
  return (
    <section className="card-overview">
      <span className="card-overview-title">Quick View Tiers Multiplier</span>
      <div className="card-overview-list">
        {PROGRAM_TYPE.slice(1).map((t, i) => (
          <div key={i} className="card-overview-list-item">
            <div className="card-overview-list-item-headline">
              <CardLogo type={t.tier} />
              <div className="card-overview-list-item-headline-description">
                <span className="card-overview-list-item-headline-description-title">
                  FORM
                </span>
                <span className="card-overview-list-item-headline-description-value">
                  {t.tier.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="card-overview-list-item-text">
              <span className="card-overview-list-item-text-title">
                {t.threshold}
              </span>
              <span className="card-overview-list-item-text-value">$FORM</span>
            </div>
            <div className="card-overview-list-item-text">
              <span className="card-overview-list-item-text-title">
                {t.multiplier}x
              </span>
              <span className="card-overview-list-item-text-value">
                MULTIPLIER
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramOverview;
