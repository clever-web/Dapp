import { useEffect, useState } from "react";

export const FetchStatus = {
  NOT_FETCHED: "not-fetched",
  SUCCESS: "success",
  FAILED: "failed",
};

export const useAnySwapAPI = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;

  const [formBridgeData, setFormBridgeData] = useState({
    data: null,
    fetchStatus: NOT_FETCHED,
  });

  useEffect(() => {
    const getFormBridgeData = async () => {
      try {
        const URL = "https://bridgeapi.anyswap.exchange/v2/serverInfo/56";
        const response = await fetch(URL);
        const data = await response.json();
        setFormBridgeData({
          data: data['formv5'] ?? null,
          fetchStatus: SUCCESS,
        });
      } catch (err) {
        setFormBridgeData({
          data: null,
          fetchStatus: FAILED,
        });
      }
    };

    getFormBridgeData();
  }, [FAILED, SUCCESS]);

  return formBridgeData;
};
