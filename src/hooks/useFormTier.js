import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const SNAPSHOT = 2;

export const FetchStatus = {
  NOT_FETCHED: "not-fetched",
  SUCCESS: "success",
  FAILED: "failed",
};

export const TIERS = {
  DEFAULT: "default",
  SILVER: "silver",
  GOLD: "gold",
  DIAMOND: "diamond",
  BLACK: "black",
};

export const useFormTier = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [tierState, setTierState] = useState({
    tier: null,
    fetchStatus: NOT_FETCHED,
  });
  const { account, chainId } = useWeb3React();

  useEffect(() => {
    const fetchTier = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/early-adopter-tier?address=${ethers.utils.getAddress(
            account
          )}&chainId=${chainId}&snapshot=${SNAPSHOT}`,
        );
        const data = await response.json();
        setTierState({
          tier: data?.data?.type ?? null,
          fetchStatus: SUCCESS,
        });
      } catch (error) {
        setTierState({ tier: null, fetchStatus: FAILED });
      }
    };

    if (account && chainId) {
      fetchTier();
    } else {
      setTierState({
        balance: null,
        fetchStatus: NOT_FETCHED,
      });
    }
  }, [FAILED, NOT_FETCHED, SUCCESS, account, chainId]);

  return tierState;
};
