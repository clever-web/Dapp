// import { ethers } from "ethers";
import { useState, useContext, useEffect } from 'react'
import { ToastContext } from 'CONTEXT/toast-context'
import Button from 'COMPONENTS/Button'
import Modal from 'COMPONENTS/Modal'
import TransactionModal from 'CONTAINERS/TransactionModal'
import SelectTokenWithInput from 'CONTAINERS/SelectTokenWithInput'
import SwapperButton from 'CONTAINERS/SwapperButton'
import Header from './components/Header'
import SelectTokenModal from '../SelectTokenModal'
import ConfirmModal from './components/ConfirmModal'
import ExchangeRate from './components/ExchangeRate'
import Footer from './components/Footer'
import { getPrice, options } from '../../constants'
import { CONTRACTS_TYPE } from 'utils/contracts'
import { useContract } from 'hooks/useContract'
import { useTokenApproval } from 'hooks/useTokenApprove'
import { TRANSACTION_STATUS } from 'UTILS/constants'
import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'

import WalletModal from 'COMPONENTS/Modal'
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal'

const SwapTab = ({
  chain,
  userTokenBalanceFORM,
  userTokenBalanceStable,
  formTokenPrice,
  token0,
  route0,
  token1,
  route1,
  account,
}) => {
  const { notify } = useContext(ToastContext)
  const uniswap = useContract(CONTRACTS_TYPE.UNISWAP)
  const { chainId } = useWeb3React()

  const [showWalletModal, setShowWalletModal] = useState(false)

  const {
    transactionStatus: stableTokenApprovalStatus,
    currentAllowance: stableTokenAllowance,
    handleApproval: handleStableTokenApproval,
  } = useTokenApproval(CONTRACTS_TYPE.STABLE_TOKEN, CONTRACTS_TYPE.UNISWAP)
  const {
    transactionStatus: formTokenApprovalStatus,
    currentAllowance: formTokenAllowance,
    handleApproval: handleFormTokenApproval,
  } = useTokenApproval(CONTRACTS_TYPE.FORM_TOKEN, CONTRACTS_TYPE.UNISWAP)

  const [selectedValue, setSelectedValue] = useState({
    tokenFrom: { name: options[0].name, icon: options[0].icon },
    tokenTo: { name: options[1].name, icon: options[1].icon },
  })
  const [swap, setSwap] = useState({
    inputFrom: 0,
    inputTo: 0,
  })
  const [currentDestination, setCurrentDestination] = useState(null)
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { value } = e.target
    const parsedValue = value ?? 0
    const ratio0 = getPrice(selectedValue.tokenFrom.name, route0, route1)
    const swapValue = parsedValue * ratio0
    setSwap(() => ({
      inputFrom: parseFloat(parsedValue),
      inputTo: swapValue,
    }))
  }

  const handleInputChangeMax = (name, value) => {
    const ratio0 = getPrice(selectedValue.tokenFrom.name, route0, route1)
    const swapValue = value * ratio0
    setSwap(() => ({
      inputFrom: parseFloat(value),
      inputTo: swapValue,
    }))
  }

  const toggleTokenModal = (name) => {
    setShowTokenModal((prevState) => !prevState)
    if (typeof name === 'string') setCurrentDestination(name)
    else setCurrentDestination(null)
  }

  const toggleConfirmModal = () =>
    setShowConfirmModal((prevState) => !prevState)

  const handleSelectToken = (destination, tokenName) => {
    const token = options.find((item) => item.name === tokenName)
    setSelectedValue((prevState) => ({
      ...prevState,
      [destination]: token,
    }))
    toggleTokenModal()
  }

  const toggleTransactionModal = () => {
    setShowConfirmModal(false)
    setShowTransactionModal((prevState) => !prevState)
  }

  const handleSwap = () => {
    const temp1 = {
      name: selectedValue.tokenFrom.name,
      icon: selectedValue.tokenFrom.icon,
      value: swap.inputFrom,
    }
    const temp2 = {
      name: selectedValue.tokenTo.name,
      icon: selectedValue.tokenTo.icon,
      value: swap.inputTo,
    }

    setSelectedValue({
      tokenFrom: { name: temp2.name, icon: temp2.icon },
      tokenTo: { name: temp1.name, icon: temp1.icon },
    })

    setSwap(() => ({
      inputFrom: 0,
      inputTo: 0,
    }))
  }

  const invokeSwap = async () => {
    toggleConfirmModal()
    const currency = {
      name: selectedValue.tokenFrom.name,
      value: swap.inputFrom,
    }
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20
    let path

    if (currency.name === 'FORM') {
      path = [token0.address, token1.address]
    } else {
      path = [token1.address, token0.address]
    }

    try {
      let inputAmount
      if (selectedValue.tokenFrom.name === 'BUSD') {
        inputAmount = parseUnits(swap?.inputFrom?.toString(), 18)
      } else if (selectedValue.tokenFrom.name === 'USDT') {
        if (chainId === 1) {
          inputAmount = parseUnits(swap?.inputFrom?.toFixed(6), 6)
        } else {
          inputAmount = parseUnits(swap?.inputFrom?.toString(), 18)
        }
      } else {
        inputAmount = parseUnits(swap?.inputFrom?.toString(), 18)
      }

      let outputAmount
      if (selectedValue.tokenTo.name === 'BUSD') {
        outputAmount = parseUnits((swap?.inputTo * 0.99)?.toString(), 18)
      } else if (selectedValue.tokenTo.name === 'USDT') {
        if (chainId === 1) {
          outputAmount = parseUnits((swap?.inputTo * 0.99)?.toFixed(6), 6)
        } else {
          outputAmount = parseUnits((swap?.inputTo * 0.99)?.toString(), 18)
        }
      } else {
        outputAmount = parseUnits((swap?.inputTo * 0.99)?.toString(), 18)
      }

      const tx = await uniswap.swapExactTokensForTokens(
        inputAmount,
        outputAmount,
        path,
        account,
        deadline,
      )
      notify('info', 'Swap initiated', `In progress..`)
      setIsLoading(true)
      await tx.wait()
      notify('success', 'Swap done', `Success`)
      setIsLoading(false)
    } catch (err) {
      console.log({ err })
      if (!err?.error?.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
        notify('error', 'Transaction failed', 'Please try again.')
        return
      }
      notify(
        'error',
        'Tolerance slippage was too high',
        'Please try again later.',
      )
    }
  }

  // get initial state
  useEffect(() => {
    setSelectedValue({
      tokenFrom: { name: options[0].name, icon: options[0].icon },
      tokenTo:
        chain === 'BSC'
          ? { name: options[2].name, icon: options[2].icon }
          : { name: options[1].name, icon: options[1].icon },
    })
  }, [chain])

  const validate = () => {
    if (!formTokenAllowance || !stableTokenAllowance) {
      return (
        formTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED ||
        stableTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED
      )
    } else if (isLoading) {
      return true
    } else {
      return (
        !swap.inputFrom ||
        !swap.inputTo ||
        selectedValue.tokenFrom.name === selectedValue.tokenTo.name
      )
    }
  }

  const isFORMasInput = selectedValue.tokenFrom.name === 'FORM'

  const renderButtonTitle = () => {
    if (!account) return `Connect Wallet`

    if (!formTokenAllowance && selectedValue?.tokenFrom?.name === 'FORM') {
      if (formTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED) {
        return 'Enabling FORM...'
      }
      return 'Enable FORM'
    }
    if (
      !stableTokenAllowance &&
      (selectedValue?.tokenFrom?.name === 'USDT' ||
        selectedValue?.tokenFrom?.name === 'BUSD')
    ) {
      if (stableTokenApprovalStatus.status === TRANSACTION_STATUS.SUBMITTED) {
        return `Enabling ${selectedValue?.tokenFrom?.name}...`
      }
      return `Enable ${selectedValue?.tokenFrom?.name}`
    }
    if (isLoading) {
      return 'Swapping...'
    }
    if (validate()) {
      return 'Please enter an amount'
    }
    return 'Swap'
  }

  const handleButtonAction = () => {
    if (!account) {
      toggleShowWalletModal()
      return
    }
    if (!formTokenAllowance && selectedValue?.tokenFrom?.name === 'FORM') {
      return handleFormTokenApproval({ successMessage: 'Form is enabled!' })
    }
    if (
      !stableTokenAllowance &&
      (selectedValue?.tokenFrom?.name === 'USDT' ||
        selectedValue?.tokenFrom?.name === 'BUSD')
    ) {
      return handleStableTokenApproval({
        successMessage: `${selectedValue?.tokenFrom?.name} is enabled!`,
      })
    }

    return toggleConfirmModal()
  }

  const toggleShowWalletModal = (e) => {
    e?.stopPropagation()
    setShowWalletModal((prevState) => !prevState)
  }
  return (
    <>
      <div className="swap-tab">
        <Header />
        <div className="swapper">
          <SelectTokenWithInput
            selectedValue={selectedValue.tokenFrom.name}
            icon={selectedValue.tokenFrom.icon}
            note="Swap From"
            inputValue={swap.inputFrom}
            displaySelect={false}
            toggleModal={() => {}}
            tokenToName="tokenFrom"
            inputToName="inputFrom"
            handleInputChange={handleInputChange}
            handleInputChangeMax={handleInputChangeMax}
            withMaxIcon={true}
            leftSideMaxIcon={true}
            withBalance={true}
            userTokenBalance={
              isFORMasInput ? userTokenBalanceFORM : userTokenBalanceStable
            }
            formPrice={isFORMasInput ? formTokenPrice : 1}
          />
          <SwapperButton
            onClick={handleSwap}
            btnClasses="button-swapper__button--bg-dark button-swapper__button--border-green"
          />
          <SelectTokenWithInput
            selectedValue={selectedValue.tokenTo.name}
            icon={selectedValue.tokenTo.icon}
            note="Swap To"
            displaySelect={false}
            toggleModal={() => {}}
            inputValue={!swap?.inputTo ? 0 : swap?.inputTo?.toFixed(3)}
            tokenToName="tokenTo"
            inputToName="inputTo"
            withBalance={true}
            userTokenBalance={
              !isFORMasInput ? userTokenBalanceFORM : userTokenBalanceStable
            }
            formPrice={!isFORMasInput ? formTokenPrice : 1}
            classes="pt-0--mobile"
            handleInputChange={() => {}}
          />
          <Button
            type="button"
            text={renderButtonTitle()}
            disabled={isLoading || validate()}
            wide
            green
            classes="swap-tab__submit"
            onClick={handleButtonAction}
          />

          <ExchangeRate
            rate={getPrice(selectedValue.tokenFrom.name, route0, route1)}
            pair={selectedValue}
          />
          <Footer />
        </div>
      </div>
      <Modal show={showTokenModal} onCancel={toggleTokenModal}>
        <SelectTokenModal
          destination={currentDestination}
          handleSelectToken={handleSelectToken}
          onCancel={toggleTokenModal}
          chain={chain}
        />
      </Modal>
      <Modal show={showConfirmModal} onCancel={toggleConfirmModal}>
        <ConfirmModal
          selectedValue={selectedValue}
          swap={swap}
          onCancel={toggleConfirmModal}
          invokeSwap={invokeSwap}
          rate={getPrice(selectedValue.tokenFrom.name, route0, route1)}
          pair={selectedValue}
        />
      </Modal>

      <WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
        <ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
      </WalletModal>

      <Modal show={showTransactionModal} onCancel={toggleTransactionModal}>
        <TransactionModal
          info="Supplying 381.885 FORM and Supplying 818.28 USDT"
          onCancel={toggleTransactionModal}
        />
      </Modal>
    </>
  )
}

export default SwapTab
