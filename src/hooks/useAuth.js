import { useCallback } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { getConnector } from "UTILS/web3";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorID) => {
      const chainId = localStorage.getItem('chainId');
      const connector = getConnector(chainId)[connectorID];
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log("Unsupported chain", error);
          } else {
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              console.log("Error with provider", error);
            } else if (error instanceof UserRejectedRequestErrorInjected) {
              console.log("User rejected error", error);
            } else {
              console.log("General error", error);
            }
          }
        });
      } else {
        console.log("Unable to find connector");
      }
    },
    [activate]
  );

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
