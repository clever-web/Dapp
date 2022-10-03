import { useCallback, useEffect, useState, useRef } from "react";
import useFetch from "use-http";
import Title from "COMPONENTS/Title";
import Pill from "COMPONENTS/Pill";
import ButtonSwitcher from "CONTAINERS/ButtonSwitcher";
import LiquidityTab from "./components/LiquidityTab";
import SwapTab from "./components/SwapTab";
import { BRIDGE_API_URL, getChainIds, TAB_NAMES } from "./constants";
import { useWeb3React } from "@web3-react/core";
import Tvl from "./components/Tvl";
import { useInterval } from "hooks/useInterval";
import StableSwapReminder from "components/StableSwapReminder";
import { usdFormatter } from "utils/formatters";
import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from "UTILS/constants";

import Modal from 'COMPONENTS/Modal';
import StableTokenModal from './components/StableTokenModal';
const Swap = () => {
  // data
  const { data } = useFetch(COIN_GECKO_URL, {}, []);
  const { account, chainId } = useWeb3React();
  const chainIdRef = useRef(chainId);
  chainIdRef.current = chainId;
  const [isLoading, setIsLoading] = useState(false);
  const initialSwapInfo = {
    fee: null,
    gas: null,
    maxSwapAmount: {
      src: null,
      dest: null,
    },
    minSwapAmount: {
      src: null,
      dest: null,
    },
    vaultBalances: {
      src: 0,
      dest: 0,
    },
  };
  const [swapInfo, setSwapInfo] = useState(initialSwapInfo);
  const getSwapInfo = async () => {
    console.log('getting swap info on chain ', chainId)
    const oldChainId = chainId;
    if (oldChainId) {
      const { src, dest } = getChainIds(oldChainId);
      const data = await fetch(BRIDGE_API_URL(src, dest));
      const res = await data.json();
      if (chainIdRef.current === oldChainId) {
        // only set when it's the right chain id now
        setSwapInfo(res);
      }
    }
  };

  const [userWelcome, setUserWelcome] = useState(true);
  useEffect(() => {
    getSwapInfo();
  }, [chainId]);

  useEffect(() => {
    setUserWelcome(localStorage.getItem('userWelcome'));
  }, []);

  useInterval(() => {
    getSwapInfo();
  }, 15000);

  // state
  const [currentTab, setCurrentTab] = useState(TAB_NAMES.SWAP);
	//modal
	const [showConfirmModal, setShowConfirmModal] = useState(true);

	const toggleConfirmModal = () =>
  {
    localStorage.setItem('userWelcome', true);
    setShowConfirmModal((prevState) => !prevState);
  }
  const toggleTabSwitch = (id) => setCurrentTab(id);
  const resetSwapInfo = () => setSwapInfo(initialSwapInfo);

  const formTokenPrice =
    data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE;

  return (
    <div className="swap space-h" style={{ display: 'block' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
        <Pill
          title="$Form price"
          value={usdFormatter.format(formTokenPrice)}
          small
          classes="pill__small__light pill-desktop-layout swap__value-pill"
        />
      </div>
      <div className="pt-5--mobile-large" style={{ paddingTop: "20px" }}>
        <Tvl swapInfo={swapInfo} isLoading={isLoading} />
      </div>
      <Title title="stable swap" />
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
          {currentTab === TAB_NAMES.SWAP ? <SwapTab swapInfo={swapInfo} resetSwapInfo={resetSwapInfo}/> : <LiquidityTab account={account} />}
        </div>
				<StableSwapReminder />
      </div>
      {!userWelcome &&
        <Modal show={showConfirmModal} classes={'my_modal_stableWelcome'}>
          <StableTokenModal onCancel={toggleConfirmModal} />
        </Modal>}
    </div>
  );
};

export default Swap;
