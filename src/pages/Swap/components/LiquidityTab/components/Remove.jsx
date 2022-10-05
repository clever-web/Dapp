import { useContext, useEffect, useState } from 'react'
import Button from 'COMPONENTS/Button'
import SwapperButton from 'CONTAINERS/SwapperButton'
import RemoveSummaryBox from './RemoveSummaryBox'
import AmountToRemove from './AmountToRemove'
import RemoveHeader from './RemoveHeader'
import { AMOUNT_TO_REMOVE, getPrice, options } from 'PAGES/Swap/constants'
import ArrowDownIcon from 'ASSETS/images/common/arrow-down.svg'
import { ToastContext } from 'CONTEXT/toast-context'
import { useContract } from 'hooks/useContract'
import { CONTRACTS_TYPE } from 'utils/contracts'
import { useWeb3React } from '@web3-react/core'
import { convertToUnit, parseFromUnit } from 'utils/formatters'
import { Pair, TokenAmount } from '@formation-finance/sdk'
import { useTokenApproval } from 'hooks/useTokenApprove'
import { TRANSACTION_ACTIONS, TRANSACTION_STATUS } from 'UTILS/constants'
import { formatUnits, parseUnits } from '@ethersproject/units'
import BigNumber from 'bignumber.js'

import WalletModal from 'COMPONENTS/Modal'
import ConnectWalletModal from 'CONTAINERS/MainActions/ConnectWallet/ConnectWalletModal'

const Remove = ({ formToken, stableToken, token0, token1, route0, route1 }) => {
  const { notify } = useContext(ToastContext)

  const {
    handleApproval: handleLPTokenApproval,
    currentAllowance,
    transactionStatus: approvalTransactionStatus,
  } = useTokenApproval(CONTRACTS_TYPE.LP_TOKEN, CONTRACTS_TYPE.UNISWAP)

  const lpToken = useContract(CONTRACTS_TYPE.LP_TOKEN)
  const uniswap = useContract(CONTRACTS_TYPE.UNISWAP)
  const uniswapPair = useContract(CONTRACTS_TYPE.UNISWAP_PAIR)

  const [removeTransactionStatus, setRemoveTransactionStatus] = useState({
    status: null,
    type: null,
  })

  const [userTokenBalanceLPToken, setUserTokenBalanceLPToken] = useState(0)

  const [liquidityInfo, setLiquidityInfo] = useState({
    liquidtyForm: null,
    liquidityStable: null,
  })

  const [removeValue, setRemoveValue] = useState(0)
  const [swapError, setSwapError] = useState(false)
  const { chainId = 1, account } = useWeb3React()

  const [showWalletModal, setShowWalletModal] = useState(false)

  const [selectedValue, setSelectedValue] = useState({
    tokenFrom: {
      name: options[0].name,
      icon: options[0].icon,
      width: options[0].width,
      height: options[0].height,
    },
    tokenTo: {
      name: options[1].name,
      icon: options[1].icon,
      width: options[1].width,
      height: options[1].height,
    },
  })

  useEffect(() => {
    if ([1, 4].includes(chainId)) {
      setSelectedValue({
        tokenFrom: {
          name: options[0].name,
          icon: options[0].icon,
          width: options[0].width,
          height: options[0].height,
        },
        tokenTo: {
          name: options[1].name,
          icon: options[1].icon,
          width: options[1].width,
          height: options[1].height,
        },
      })
    } else {
      setSelectedValue({
        tokenFrom: {
          name: options[0].name,
          icon: options[0].icon,
          width: options[0].width,
          height: options[0].height,
        },
        tokenTo: {
          name: options[2].name,
          icon: options[2].icon,
          width: options[2].width,
          height: options[2].height,
        },
      })
    }
  }, [chainId])

  useEffect(() => {
    const getUserTokenBalance = async () => {
      const userBalanceLPToken = lpToken ? await lpToken.balanceOf(account) : 0;
      setUserTokenBalanceLPToken(formatUnits(userBalanceLPToken))
    }

    const getLiquidity = async () => {
      if (uniswapPair && lpToken && account && removeValue) {
        const reserves = await uniswapPair.getReserves()
        const pair = new Pair(
          new TokenAmount(formToken, reserves[0]),
          new TokenAmount(stableToken, reserves[1]),
        )

        const lpTokenTotalSupply = await lpToken.totalSupply()
        const lpTokenTotalSupplyInTokenAmount = new TokenAmount(
          pair.liquidityToken,
          lpTokenTotalSupply.toString(),
        )

        const userBalanceToRemove = new TokenAmount(
          pair.liquidityToken,
          convertToUnit(
            removeValue?.isNaN() ? 0 : removeValue?.toFixed(18),
            18,
          ),
        )
        const [liquidtyA, liquidityB] = [
          pair.getLiquidityValue(
            pair.token0,
            lpTokenTotalSupplyInTokenAmount,
            userBalanceToRemove,
            false,
          ),
          pair.getLiquidityValue(
            pair.token1,
            lpTokenTotalSupplyInTokenAmount,
            userBalanceToRemove,
            false,
          ),
        ]

        setLiquidityInfo({
          liquidtyForm: liquidtyA,
          liquidityStable: liquidityB,
        })
      } else {
        setLiquidityInfo({
          liquidtyForm: null,
          liquidityStable: null,
        })
      }
    }

    getLiquidity()
    getUserTokenBalance()
  }, [
    account,
    formToken,
    lpToken,
    removeValue,
    stableToken,
    uniswapPair,
    removeTransactionStatus,
    route0,
    route1,
  ])

  const validateInput = (value) => {
    return value.gt(new BigNumber(0)) ? setSwapError(false) : setSwapError(true)
  }

  const onRemoveValue = (e) => {
    const { value } = e.target
    validateInput(new BigNumber(value))
    setRemoveValue(new BigNumber(value))
  }

  const onSelectRemoveValue = (amount) => {
    setSwapError(false)
    const userBalance = userTokenBalanceLPToken ?? 0
    setRemoveValue(
      new BigNumber(userBalance).multipliedBy(new BigNumber(amount / 100)),
    )
  }

  const onSwap = () => validateInput(removeValue)

  const exchangeRate = () => {
    return {
      fromPrice: getPrice(selectedValue.tokenFrom.name, route0, route1),
      toPrice: getPrice(selectedValue.tokenTo.name, route0, route1),
    }
  }

  // actions
  const invokeRemoveLiquidity = async () => {
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20
      const tx = await uniswap.removeLiquidity(
        token0.address,
        token1.address,
        convertToUnit(removeValue?.toFixed(18), 18),
        0,
        0,
        account,
        deadline,
      )
      setRemoveTransactionStatus({
        status: TRANSACTION_STATUS.SUBMITTED,
        type: TRANSACTION_ACTIONS.SEND,
      })
      notify('info', 'Removing liquidity initiated.', `In progress...`)
      await tx.wait()

      setRemoveTransactionStatus({
        status: TRANSACTION_STATUS.SUCCESS,
        type: TRANSACTION_ACTIONS.SEND,
      })
      notify('success', 'Liquidity removed!', 'Success!')
    } catch (err) {
      console.log({ err })
      notify('error', 'Removing liquidity failed!', 'Please try again.')
    }
  }

  const handleApproval = async (event) => {
    event?.stopPropagation()
    if (!currentAllowance) {
      await handleLPTokenApproval({
        successMessage: 'You can now remove LP tokens.',
        infoMessage: 'Enabling..',
      })
    }
  }

  const buttonTitle = () => {
    if (!currentAllowance) {
      if (approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
        return 'Enabling...'
      }
      return 'Enable'
    }
    if (removeTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED) {
      return 'Removing...'
    }
    return 'Remove'
  }

  const hanndleConnectWallet = async () => {
    if (!account) {
      toggleShowWalletModal()
      return
    }
  }

  const toggleShowWalletModal = (e) => {
    e?.stopPropagation()
    setShowWalletModal((prevState) => !prevState)
  }

  return (
    <div className="swapper">
      <RemoveHeader
        selectedValue={selectedValue}
        userTokenBalanceLPToken={userTokenBalanceLPToken ?? 0}
      />
      <AmountToRemove
        value={removeValue}
        handleChange={onRemoveValue}
        // handleChange={() => {}}
        error={swapError}
        userTokenBalanceLPToken={userTokenBalanceLPToken ?? 0}
      />
      <div className="liquidity-tab__remove__amounts">
        {AMOUNT_TO_REMOVE.map((amount) => (
          <Button
            key={amount}
            type="button"
            text={`${amount === '100' ? 'MAX' : `${amount}%`}`}
            name={amount}
            classes="no-underline font-size-14"
            onClick={() => {
              onSelectRemoveValue(amount)
            }}
            // onClick={() => {}}
            outlined
          />
        ))}
      </div>
      <SwapperButton
        icon={ArrowDownIcon}
        iconWidth="10"
        iconHeight="16"
        onClick={onSwap}
        btnClasses="button-swapper__button--bg-dark button-swapper__button--border-green"
        classes="button-swapper__button__arrow-down position-relative left-1"
      />
      <div className="swapper__row">
        <div className="mr-2">
          <p className="font-size-14 mb-1 white-space-nowrap txt-right@phone">
            You will Receive:
          </p>
          <p className="font-size-14 font-weight-700 txt-right@phone">
            {selectedValue.tokenFrom.name}&#47;
            {selectedValue.tokenTo.name}
          </p>
        </div>
        <div className="liquidity-tab__remove__boxes">
          <RemoveSummaryBox
            icon={selectedValue.tokenFrom.icon}
            iconWidth={selectedValue.tokenFrom.width}
            iconHeight={selectedValue.tokenFrom.height}
            value={liquidityInfo?.liquidtyForm?.toSignificant(6) ?? 0}
            name={selectedValue.tokenFrom.name}
          />
          <RemoveSummaryBox
            icon={selectedValue.tokenTo.icon}
            iconWidth={selectedValue.tokenTo.width}
            iconHeight={selectedValue.tokenTo.height}
            value={liquidityInfo?.liquidityStable?.toSignificant(6) ?? 0}
            name={selectedValue.tokenTo.name}
          />
        </div>
      </div>
      <div className="d-flex flex-direction-column flex-direction-row@phone align-items-center space-h--mobile">
        <Button
          type="button"
          text={!account ? 'Connect Wallet' : buttonTitle()}
          green
          wide
          classes="liquidity-tab__submit mb-2--mobile mt-2--mobile"
          onClick={
            account
              ? !currentAllowance
                ? handleApproval
                : invokeRemoveLiquidity
              : hanndleConnectWallet
          }
          disabled={
            account &&
            (!removeValue ||
              swapError ||
              !account ||
              !userTokenBalanceLPToken ||
              removeTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED ||
              approvalTransactionStatus.status === TRANSACTION_STATUS.SUBMITTED)
          }
        />
      </div>
      <div className="liquidity-tab__remove__summary">
        <p className="font-size-12">Price:</p>
        <div>
          <p className="font-size-12">
            1 {selectedValue.tokenFrom.name} = {exchangeRate().fromPrice}{' '}
            {selectedValue.tokenTo.name}
          </p>
          <p className="font-size-12">
            1 {selectedValue.tokenTo.name} = {exchangeRate().toPrice}{' '}
            {selectedValue.tokenFrom.name}
          </p>
        </div>
      </div>
      <WalletModal show={showWalletModal} onCancel={toggleShowWalletModal}>
        <ConnectWalletModal toggleShowWalletModal={toggleShowWalletModal} />
      </WalletModal>
    </div>
  )
}

export default Remove
