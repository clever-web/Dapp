import { useWeb3React } from "@web3-react/core";
import { getTokens } from "PAGES/StableSwap/constants";

const SwapperInfo = ({ percentageOfThePool = 0 }) => {
  const { chainId = 4 } = useWeb3React();
  const { from, to } = getTokens(chainId);

  return (
    <div className="swapper__info">
      <div className="swapper__info__row">
        <p className="font-size-14">
          1 {from?.name} per 1 {to?.name}
        </p>
        <p className="font-size-14">{percentageOfThePool?.toFixed(2)} %</p>
      </div>
      <div className="swapper__info__row">
        <p className="font-size-14">
          1 {to?.name} per 1 {from?.name}
        </p>
        <p className="font-size-14">Share of Pool</p>
      </div>
    </div>
  );
};

export default SwapperInfo;
