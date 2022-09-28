import { CONNECTOR_LOCAL_STORAGE_KEY } from "CONTAINERS/MainActions/constants";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      CONNECTOR_LOCAL_STORAGE_KEY
    );

    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
