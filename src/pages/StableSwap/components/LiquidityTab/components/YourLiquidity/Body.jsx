import { useMediaQuery } from "hooks/useMediaQuery";
import Image from "COMPONENTS/Image";

import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { getTokens } from "PAGES/StableSwap/constants";
import { useContract } from "hooks/useContract";
import { CONTRACTS_TYPE } from "utils/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { parseFromUnit } from "utils/formatters";
import { useInterval } from "hooks/useInterval";

const Body = () => {
  const { account, chainId } = useWeb3React();
  const lpTokenContract = useContract(CONTRACTS_TYPE.LP_STABLE);

  const [totalSupplyLp, setTotalSupplyLp] = useState(BigNumber.from(0));
  const [decimalsLp, setDecimalsLp] = useState(18);
  const [userBalanceLp, setUserBalanceLp] = useState(BigNumber.from(0));
  const [lpTokens, setLpTokens] = useState({
    token: { icon: null, name: null, },
  });

  const getUserLpBalance = useCallback(async () => {
    if (account && lpTokenContract) {
      setUserBalanceLp(await lpTokenContract.balanceOf(account));
      setDecimalsLp(await lpTokenContract.decimals());
      setTotalSupplyLp(await lpTokenContract.totalSupply());
    }
  }, [account, lpTokenContract]);

  useEffect(() => {
    getUserLpBalance();
    const { from } = getTokens(chainId);
    setLpTokens({ token: from });
  }, [chainId, getUserLpBalance]);

  useInterval(() => {
    getUserLpBalance();
  }, 5000);

  const percentageOfThePool = () => {
    if (userBalanceLp.eq(0) || totalSupplyLp.eq(0)) {
      return 0;
    }
    const userBalance = parseFromUnit(userBalanceLp, decimalsLp);
    const totalSupply = parseFromUnit(totalSupplyLp, decimalsLp);
    return userBalance / totalSupply * 100
  }

  const matchMedia = useMediaQuery("(min-width: 960px)");
  return (
    <div className="liquidity-tab__your-liquidity__body">
      {!(userBalanceLp.eq(0)) ? (
        <>
          <div className="liquidity-tab__your-liquidity__body__summary">
            <div className="flex-center">
              <div className="liquidity-tab__your-liquidity__body__icon">
                <Image
                  light={lpTokens.token.icon}
                  dark={lpTokens.token.icon}
                  alt={lpTokens.token.name}
                  w="15"
                  h="15"
                />
              </div>
            </div>

            <div className="d-flex justify-content-space-between align-items-start w-100 ml-1">
              <div className="liquidity-tab__your-liquidity__body__middle-col">
                <p className="font-size-12 line-height-4">
                  <span className="font-weight-700">
                    {formatUnits(userBalanceLp, decimalsLp) ?? "-"}
                  </span>{" "}
                  {lpTokens.token.name} LP
                </p>
                {matchMedia && (
                  <p className="font-size-12 line-height-4 txt-right txt-left@phone">
                    Share of pool:{" "}{percentageOfThePool() ?? "-"}%
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-center w-100 pb-2 pt-2">
          <p className="font-size-12 line-height-4" style={{ opacity: 0.5 }}>
            You have no LP tokens
          </p>
        </div>
      )}
    </div>
  );
};

export default Body;
