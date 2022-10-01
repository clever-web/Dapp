import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import Tile from './Tile'
import { useWeb3React } from '@web3-react/core'
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts'
import { useContract } from 'hooks/useContract'

import { COIN_GECKO_URL, FORM_TOKEN_DEFAULT_PRICE } from 'UTILS/constants'
import BigNumber from 'bignumber.js'

import { fromWei, toWei } from 'utils/formatters'

let totalFormBalance = 0,
  totalForm = 0
// let

const initialTiles = (isAuth) => [
  {
    title: 'Total FORM Balance',
    totalWithToken: true,
    withIcon: false,
    link: null,
    price: totalFormBalance,
    token: '$FORM',
    result: '35,467.8',
    index: 0,
  },
  {
    title: 'Single Side Staking',
    totalWithToken: false,
    withIcon: isAuth ? true : false,
    link: '/pools',
    price: isAuth ? 100 : '2x',
    token: isAuth ? '$FORM' : null,
    result: isAuth ? '2,960.51852' : 'Multiplier',
    index: 1,
  },
  {
    title: 'My Yield',
    totalWithToken: false,
    withIcon: false,
    link: null,
    price: totalForm,
    token: '$FORM',
    result: '3,159.25',
    index: 2,
  },
  {
    title: 'Liqudidity Pool',
    totalWithToken: false,
    withIcon: isAuth ? true : false,
    link: '/farms',
    price: isAuth ? 1023 : '0.5x',
    token: isAuth ? '$FORM' : null,
    result: isAuth ? '3,789.2963' : 'Multiplier',
    index: 3,
  },
]

const Tiles = ({
  aprForStaking,
  aprForLP,
  sideStakingYieldAmount,
  liqudidityPoolYieldAmount,
}) => {
  const { account, library, chainId } = useWeb3React()
  const [tiles, setTiles] = useState(() => initialTiles(!!account))

  const [userTokenBalance, setUserTokenBalance] = useState(null)
  const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN) //Liqudidity Pool Reward value

  const { data } = useFetch(COIN_GECKO_URL, {}, []) //$FORM PRICE
  const formTokenPrice =
    data?.market_data?.current_price?.usd ?? FORM_TOKEN_DEFAULT_PRICE //$FORM PRICE

  useEffect(() => {
    const getUserBalance = async () => {
      if (account && formToken) {
        const userBalance = await formToken.balanceOf(account)
        setUserTokenBalance(fromWei(userBalance))
      } else {
        setUserTokenBalance(0)
      }
    }

    getUserBalance()
  }, [account, chainId, formToken, library])

  useEffect(() => setTiles(initialTiles(!!account)), [account])
  return (
    <div className="home__header__tiles space-h">
      {tiles.map((tile) => (
        <Tile
          {...tile}
          aprForStaking={aprForStaking}
          aprForLP={aprForLP}
          sideStakingYieldAmount={sideStakingYieldAmount}
          liqudidityPoolYieldAmount={liqudidityPoolYieldAmount}
          isAuth={!!account}
          formTokenPrice={formTokenPrice}
          userTokenBalance={userTokenBalance}
        />
      ))}
    </div>
  )
}

export default Tiles
