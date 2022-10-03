import Image from "COMPONENTS/Image";
import ExchangeIcon from "ASSETS/images/actions/exchange.svg";
import { getTokens } from "PAGES/StableSwap/constants";
import { useWeb3React } from "@web3-react/core";

const ExchangeRate = ({ }) => {
  const { chainId } = useWeb3React();
  const { from, to } = getTokens(chainId);

  return (
    <>
    <div className="swapper__exchange">
      <p className="font-size-14">Exchange rate</p>
      <div className="swapper__exchange__rate">
        <p className="font-size-14">
          1 {from?.name} = 1 {to?.name}
        </p>
        <button type="button" className="btn-icon">
          <div
            className="flex-center"
            style={{ background: "#070618", borderRadius: "50%" }}
          >
            <Image
              light={ExchangeIcon}
              dark={ExchangeIcon}
              alt="Refresh"
              w="16"
              h="16"
            />
          </div>
        </button>
      </div>
    </div>
    </>
  );
};

export default ExchangeRate;
