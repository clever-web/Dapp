import { getProgramInfoByType } from "../constants";

const ProgramDescription = ({ isInSecondSnapshot, tier }) => {
  return (
    <>
      <div className="benefits">
        <span className="font-size-18">Key Benefits:</span>
        <ul className="font-size-12">
          <li>Multiplier Bonus</li>
          <li>Early access to liquidity pools</li>
          <li>Juicy APY Kicker</li>
        </ul>
        <a
          className="font-size-10"
          href="https://formation-fi.medium.com/formation-fi-early-adoption-program-4265ef6cf157"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about Adoption Program
        </a>
      </div>
      <div className="apy">
        <div className="apy-cell">
          {isInSecondSnapshot ? (
            <div className="apy-cell-status" style={{ borderColor: "#F1E26E" }}>
              <span className="apy-cell-status-title" style={{ backgroundColor: "#F1E26E" }}>
                STATUS
              </span>
              <span className="apy-cell-status-value" style={{ color: "#F1E26E" }}>
                SECURED
              </span>
            </div>
          ) : null}
          <div className="apy-cell-status">
            <span className="apy-cell-status-title">APY</span>
            <span className="apy-cell-status-value">$FORM</span>
          </div>
          <div className="apy-cell-status">
            <span className="apy-cell-status-title">MULTIPLIER</span>
            <span className="apy-cell-status-value">
              {getProgramInfoByType(tier).multiplier}X
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramDescription;
