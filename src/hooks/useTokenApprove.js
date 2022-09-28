import { useWeb3React } from "@web3-react/core";
import { ToastContext } from "CONTEXT/toast-context";
import { ethers } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { TRANSACTION_ACTIONS, TRANSACTION_STATUS } from "UTILS/constants";
import { CONTRACTS, CONTRACTS_TYPE } from "utils/contracts";
import { parseFromUnit } from "utils/formatters";
import { useContract } from "./useContract";

export const useTokenApproval = (token, spender) => {
    const { account, chainId } = useWeb3React();
    const tokenContract = useContract(CONTRACTS_TYPE[token]);
    const [transactionStatus, setTransactionStatus] = useState({
        status: null,
		type: null,
    });
    const [currentAllowance, setCurrentAllowance] = useState(0);
    const { notify } = useContext(ToastContext);

    useEffect(() => {
        const getCurrentAllowance = async () => {
            if (!tokenContract || !account) {
                setTransactionStatus({
                    status: TRANSACTION_STATUS.FAILED,
                    type: TRANSACTION_ACTIONS.APPROVAL
                });
                return;
            }
            const currentAllowance = await tokenContract.allowance(
                account,
                CONTRACTS[spender][chainId].address
            );
            if (!currentAllowance) {
                setTransactionStatus({
                    status: TRANSACTION_STATUS.FAILED,
                    type: TRANSACTION_ACTIONS.APPROVAL
                });
                setCurrentAllowance(0);
                return;
            }
            setCurrentAllowance(parseFromUnit(currentAllowance, await tokenContract.decimals()));
        };

        if (account && chainId) {
            getCurrentAllowance();
        }
    }, [account, chainId, notify, spender, tokenContract, transactionStatus]);

    const handleApproval = useCallback(async ({ infoMessage = 'Transaction was submitted.', successMessage }) => {
        try {
            if (!tokenContract || !account) {
                setTransactionStatus({
                    status: TRANSACTION_STATUS.FAILED,
                    type: TRANSACTION_ACTIONS.APPROVAL
                });
                notify('error', 'Something wrong happened!', 'Pleae try again later.');
                return;
            }
            const transaction = await tokenContract.approve(
                CONTRACTS[spender][chainId].address,
                ethers.constants.MaxUint256
            );
            setTransactionStatus({ status: TRANSACTION_STATUS.SUBMITTED, type: TRANSACTION_ACTIONS.APPROVAL });
            notify('info', 'In progress', infoMessage);
            
            await transaction.wait();
            notify('success', 'Success!', successMessage);
            setTransactionStatus({ status: TRANSACTION_STATUS.SUCCESS, type: TRANSACTION_ACTIONS.APPROVAL });
        } catch (err) {
            console.log({ err });
            notify('error', 'Something wrong happened!', 'Please try again later.');
            setTransactionStatus({
                status: TRANSACTION_STATUS.FAILED,
                type: TRANSACTION_ACTIONS.APPROVAL
            });
        }
    }, [account, chainId, notify, spender, tokenContract]);

    return { transactionStatus, currentAllowance, handleApproval };
}