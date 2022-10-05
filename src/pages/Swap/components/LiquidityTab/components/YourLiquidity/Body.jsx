import { useMediaQuery } from "hooks/useMediaQuery";
import Image from "COMPONENTS/Image";

import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { options } from "PAGES/Swap/constants";
import Button from "COMPONENTS/Button";
import { useHistory } from "react-router";

const Body = ({ liquidityValue }) => {
  const { chainId } = useWeb3React();
  const history = useHistory();

  const [selectedValue, setSelectedValue] = useState({
    tokenFrom: { name: options[0].name, icon: options[0].icon },
    tokenTo: { name: options[1].name, icon: options[1].icon },
  });

  const redirectToFarms = () => history.push("/farms");

  useEffect(() => {
    if ([1, 4].includes(chainId)) {
      setSelectedValue({
        tokenFrom: { name: options[0].name, icon: options[0].icon },
        tokenTo: { name: options[1].name, icon: options[1].icon },
      });
    } else {
      setSelectedValue({
        tokenFrom: { name: options[0].name, icon: options[0].icon },
        tokenTo: { name: options[2].name, icon: options[2].icon },
      });
    }
  }, [chainId]);

  const matchMedia = useMediaQuery("(min-width: 960px)");

  return (
    <div className="liquidity-tab__your-liquidity__body">
      {selectedValue?.tokenFrom &&
      selectedValue?.tokenTo &&
      liquidityValue?.form?.toSignificant(6) &&
      liquidityValue?.stable?.toSignificant(6) &&
      liquidityValue?.poolPercentage?.toSignificant(6) !== "0" ? (
        <>
          <div className="liquidity-tab__your-liquidity__body__summary">
            <div className="flex-center">
              <div className="liquidity-tab__your-liquidity__body__icon">
                <Image
                  light={selectedValue.tokenFrom.icon}
                  dark={selectedValue.tokenFrom.icon}
                  alt={selectedValue.tokenFrom.name}
                  w="15"
                  h="15"
                />
              </div>
              <div className="liquidity-tab__your-liquidity__body__icon ml-n1">
                <Image
                  light={selectedValue.tokenTo.icon}
                  dark={selectedValue.tokenTo.icon}
                  alt={selectedValue.tokenTo.name}
                  w="20"
                  h="20"
                />
              </div>
            </div>

            <div className="d-flex justify-content-space-between align-items-start w-100 ml-1">
              <div className="liquidity-tab__your-liquidity__body__middle-col">
                <p className="font-size-12 line-height-4">
                  <span className="font-weight-700">
                    {liquidityValue?.form?.toSignificant(6) ?? "-"}
                  </span>{" "}
                  {selectedValue.tokenFrom.name}
                </p>
                {matchMedia && <span>&nbsp;&#47;&nbsp;</span>}
                <p className="font-size-12 line-height-4">
                  <span className="font-weight-700">
                    {liquidityValue?.stable?.toSignificant(6) ?? "-"}
                  </span>{" "}
                  {selectedValue.tokenTo.name}
                </p>
                {matchMedia && (
                  <p className="font-size-12 line-height-4 txt-right txt-left@phone">
                    Share of pool:{" "}
                    {liquidityValue?.poolPercentage?.toFixed(2) ?? "-"}%
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="liquidity-tab__your-liquidity__body__btns">
            <Button
              type="button"
              text="Stake LP Tokens"
              green
              classes="font-size-12 no-underline"
              onClick={redirectToFarms}
            />
          </div>
        </>
      ) : (
        <div className="flex-center w-100 pb-2 pt-2">
          <p className="font-size-12 line-height-4" style={{ opacity: 0.5 }}>
            You have no LP tokens
          </p>
        </div>
      )}
      {/* <div className='liquidity-tab__your-liquidity__body__btns'>
				<Button
					type='button'
					text='Remove'
					outlined
					classes='liquidity-tab__your-liquidity__body__btn'
					onClick={() => {}}
				/>
				<Button
					type='button'
					text='Add +'
					outlinedGreen
					classes='liquidity-tab__your-liquidity__body__btn ml-1'
					onClick={() => {}}
				/>
			</div> */}
    </div>
  );
};

export default Body;
