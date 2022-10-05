import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useFetch from "use-http";
import Title from "COMPONENTS/Title";
import Pill from "COMPONENTS/Pill";
import ButtonSwitcher from "CONTAINERS/ButtonSwitcher";
import LiquidityTab from "./components/LiquidityTab";
import SwapTab from "./components/SwapTab";
import { CHAIN, TAB_NAMES } from "./constants";
import { useWeb3React } from "@web3-react/core";
import { CONTRACTS_TYPE } from "utils/contracts";
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from "UTILS/constants";
import { useContract } from "hooks/useContract";
import { parseFromUnit, usdFormatter, numberFormatter } from "utils/formatters";
import * as SDK from '@formation-finance/sdk';
import { useInterval } from "hooks/useInterval";

const bscProviderMainnet = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/",
  { name: "binance", chainId: 56 }
);
const bscProviderTestnet = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s2.binance.org:8545/",
  { name: "binance", chainId: 97 }
);

const Swap = () => {
  // data 
  const { data } = useFetch(COIN_GECKO_URL, {}, []);
  const { account, chainId } = useWeb3React();
  const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN);
  const stableToken = useContract(CONTRACTS_TYPE.STABLE_TOKEN);
  const lpToken = useContract(CONTRACTS_TYPE.LP_TOKEN);  
  // state
  const [currentTab, setCurrentTab] = useState(TAB_NAMES.SWAP);
  const [chain, setChain] = useState(null);
  const [userTokenBalanceLPToken, setUserTokenBalanceLPToken] = useState(0);
  const [userTokenBalanceFORM, setUserTokenBalanceFORM] = useState(null);
  const [userTokenBalanceStable, setUserTokenBalanceStable] = useState(null);
  const [FORMToken, setFORMToken] = useState(null);
  const [FORMtoStableRoute, setFORMtoStableRoute] = useState(null);
	const [totalStaked, setTotalStaked] = useState(0);
  const [StableToken, setStableToken] = useState(null);
  const [StabletoFORMRoute, setStabletoFORMRoute] = useState(null);

  // 

  // fetchers 
  const getUserFormBalance = useCallback(async () => {
    if (account && formToken && stableToken && lpToken) {
      const userBalanceFORM = await formToken.balanceOf(account);
      setUserTokenBalanceFORM(parseFromUnit(userBalanceFORM?.toString(), await formToken?.decimals()));

      const userBalanceStable = await stableToken.balanceOf(account);    
      setUserTokenBalanceStable(parseFromUnit(userBalanceStable?.toString(), await stableToken.decimals()));

      const userBalanceLPToken = await lpToken.balanceOf(account);
      setUserTokenBalanceLPToken(userBalanceLPToken);
    } else {
      setUserTokenBalanceFORM(0);
      setUserTokenBalanceStable(0);
      setUserTokenBalanceLPToken(0);
    }
  }, [account, formToken, lpToken, stableToken]);

  const getPoolPair = useCallback(async () => {
      const chain = chainId || 4;

      const Token = SDK.Token; 
      const Fetcher = SDK.Fetcher;
      const Route = SDK.Route;

      if (!stableToken || !formToken) {
        return;
      }
      // STABLE
      const stableTokenInstance = new Token(chain, stableToken.address, await stableToken.decimals());
      setStableToken(stableTokenInstance);

      // FORM
      const FORM = new Token(chain, formToken.address, await formToken.decimals());
      setFORMToken(FORM);

      try {
        let pair0;
        if (chain === 56) {
          pair0 = await Fetcher.fetchPairData(
            FORM,
            stableTokenInstance,
            bscProviderMainnet
          );
        } else if (chain === 97) {
          pair0 = await Fetcher.fetchPairData(
            FORM,
            stableTokenInstance,
            bscProviderTestnet
          );
        } else {
          pair0 = await Fetcher.fetchPairData(FORM, stableTokenInstance);
        }

        const route0 = new Route([pair0], FORM, stableTokenInstance);
        setFORMtoStableRoute(route0);
      } catch (err) {
        console.log({ err }); // insert toast wrong chain
      }

      try {
        let pair1;
        if (chain === 56) {
          pair1 = await Fetcher.fetchPairData(
            stableTokenInstance,
            FORM,
            bscProviderMainnet
          );
        } else if (chain === 97) {
          pair1 = await Fetcher.fetchPairData(
            stableTokenInstance,
            FORM,
            bscProviderTestnet
          );
        } else {
          pair1 = await Fetcher.fetchPairData(stableTokenInstance, FORM);
        }
        const route1 = new Route([pair1], stableTokenInstance, FORM);
        setStabletoFORMRoute(route1);
      } catch (err) {
        console.log(err); // insert toast wrong chain
      }
    }, [chainId, formToken, stableToken]);

  const getChainName = useCallback(() => {
    if ([1, 4].includes(chainId)) {
      setChain(CHAIN.ETH);
    } else if ([56, 97].includes(chainId)) {
      setChain(CHAIN.BSC);
    } else {
      setChain(null);
    }
  }, [chainId]);

  // get initial state
  useEffect(() => {
    getUserFormBalance();
    getChainName();
    getPoolPair(chainId);
  }, [
    account,
    chainId,
    formToken,
    stableToken,
    getUserFormBalance,
    getPoolPair,
    getChainName,
  ]);

  useInterval(() => {
    getUserFormBalance();
    getChainName();
    getPoolPair(chainId);
  }, 5000);


  const toggleTabSwitch = (id) => setCurrentTab(id);

  const formTokenPrice =
    data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;

  return (
    <div className="swap space-h">
      <Title
        title={currentTab === TAB_NAMES.SWAP ? "Swap" : "Swap/ Add Liquidity"}
      /><br/>
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
          <Pill
            title="$Form price"
            value={usdFormatter.format(formTokenPrice)}
            small
            classes="pill__small__light pill-desktop-layout swap__value-pill"
          />
      </div>
      <div className="swap__box">
        <div className="swap__box__container">
          <div>
            <ButtonSwitcher
              firstButtonName={TAB_NAMES.SWAP}
              secondButtonName={TAB_NAMES.LIQUID}
              firstButtonTitle="Swap"
              secondButtonTitle="Liquidity"
              activeBtn={currentTab}
              setActiveBtn={toggleTabSwitch}
            />
          </div>
          {currentTab === TAB_NAMES.SWAP ? (
            <SwapTab
              chain={chain}
              userTokenBalanceFORM={userTokenBalanceFORM}
              userTokenBalanceStable={userTokenBalanceStable}
              formTokenPrice={formTokenPrice}
              token0={FORMToken}
              route0={FORMtoStableRoute}
              token1={StableToken}
              route1={StabletoFORMRoute}
              account={account}
            />
          ) : (
            <LiquidityTab
              chain={chain}
              formToken={FORMToken}
              stableToken={StableToken}
              userTokenBalanceFORM={userTokenBalanceFORM}
              userTokenBalanceStable={userTokenBalanceStable}
              userTokenBalanceLPToken={userTokenBalanceLPToken}
              formTokenPrice={formTokenPrice}
              token0={FORMToken}
              route0={FORMtoStableRoute}
              token1={StableToken}
              route1={StabletoFORMRoute}
              account={account}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Swap;
