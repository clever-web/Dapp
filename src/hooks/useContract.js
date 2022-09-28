import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useMemo } from "react";
// import { CONTRACTS, CONTRACTS_TYPE } from "utils/contracts";
import { CONTRACTS } from "utils/contracts";
import UncheckedJsonRpcSigner from "utils/providers";
import { DEFAULT_CHAIN_ID } from "UTILS/web3";

export function getProviderOrSigner(library, account) {
  return account
    ? new UncheckedJsonRpcSigner(library.getSigner(account))
    : library;
}

export function isAddress(value) {
  try {
    return ethers.utils.getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account)
  );
}

export function useContract(contractType, withSignerIfPossible = true) {
  const { library, account, chainId = DEFAULT_CHAIN_ID } = useWeb3React();

  const address = CONTRACTS[contractType][chainId].address;
  const ABI = CONTRACTS[contractType][chainId].abi;

  return useMemo(() => {
    try {
      const contract = getContract(
        address,
        ABI,
        library,
        withSignerIfPossible ? account : undefined
      );
      return (contract && (contract.signer || contract.provider)) ? contract : null; 
    } catch (error) {
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
