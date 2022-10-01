import Box from "./Box";
import BoxSingle from "./BoxSingle";
import { useContext } from "react";
import { ThemeContext } from "CONTEXT/theme-context";
import Title from "COMPONENTS/Title";
import Pill from "COMPONENTS/Pill";
import { useWeb3React } from "@web3-react/core";
import { usdFormatter } from "utils/formatters";
import useFetch from "use-http";
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from "UTILS/constants";
import { active_farms } from "./constants";
import Image from "COMPONENTS/Image";
import MigrationReminder from "components/MigrationReminder";
import WarningWhite from "ASSETS/images/common/warning-white.svg";

const Farms = () => {
  const { theme } = useContext(ThemeContext);
  const { data } = useFetch(COIN_GECKO_URL, {}, []);
  const { chainId = 1 } = useWeb3React();

  const formTokenPrice =
    data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;

  const box = active_farms(theme, chainId);

  return (
    <>
      <div className="farms space-h">
        <Title title="farms" />
        <br />
        <div className="d-flex justify-content-space-between">
          <div
            className="font-size-16 font-weight-600 txt-italic txt-uppercase"
            style={{
              lineHeight: "23px",
              border: "1px solid #99FFCC",
              borderRadius: "8px",
              padding: "15px",
              marginRight: 10
            }}
          >
            <div
              className="font-size-20"
              style={{ lineHeight: "24px", marginBottom: "15px" }}
            >
              <Image
                light={WarningWhite}
                dark={WarningWhite}
                alt="Warning"
                w="18"
                h="18"
                classes="reminder__header__icon mr-1"
              />
              INFO
            </div>
            <div style={{ marginLeft: "25px" }}>
              Due to security reasons of the protocol the rewards have been set
              to 0. You can unstake
              your LP's and collect all outstanding rewards. V3 Farm to be
              announced soon.
            </div>
          </div>
          <Pill
            title="$Form price"
            value={usdFormatter.format(formTokenPrice)}
            small
            classes="pill__small__light pill-desktop-layout farms__value-pill"
          />
        </div>
        <div className="farms__boxes">
          <BoxSingle
            key={0}
            formTokenPrice={formTokenPrice}
            box={box[0]}
            isFarmActive={box[0].active}
            farmType={box[0].type}
            farmName={box[0].name}
          />
          <Box
            key={0}
            formTokenPrice={formTokenPrice}
            box={box[1]}
            isFarmActive={box[1].active}
            farmType={box[1].type}
            farmName={box[1].name}
          />
        </div>
      </div>
    </>
  );
};

export default Farms;
