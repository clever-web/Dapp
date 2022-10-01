import { useContext, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { ThemeContext } from 'CONTEXT/theme-context'
import Header from './components/Header'
import NewFeature from './components/NewFeature'
import V1Alhpa from './components/V1Alpha'
import Simple from './components/Simple'
import LiquidityMiningEvent from './components/LiquidityMiningEvent'
import Tiles from './components/Tiles'
import Title from 'COMPONENTS/Title'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts'

import { useContract } from 'hooks/useContract'
import { fromWei, toWei } from 'utils/formatters'

const Home = () => {
  const { account, library, chainId, error } = useWeb3React()
  const { theme } = useContext(ThemeContext)
  const matchMedia = useMediaQuery('(min-width: 960px)')

  const renderTitleStyle = () =>
    theme === 'theme-dark' ? 'c-white' : matchMedia ? 'c-dark' : 'c-white'

  const [aprForStaking, setAprForStaking] = useState(0)
  const [aprForLP, setAprForLP] = useState(0)
  const [sideStakingYieldAmount, setSideStakingYieldAmount] = useState(0)
  const [liqudidityPoolYieldAmount, setLiqudidityPoolYieldAmount] = useState(0)

  const formStakingContract = useContract(CONTRACTS_TYPE.FORM_TOKEN_STAKING)
  const lpFarmingContract = useContract(CONTRACTS_TYPE.LP_FARMING_V2)
  const formToken = useContract(CONTRACTS_TYPE.FORM_TOKEN)

  useEffect(() => {
    ;(async () => {
      if (account && chainId && library) {
        try {
          setAprForStaking((await formStakingContract.getAPRValue()).toNumber())
          setAprForLP((await lpFarmingContract.getAPRValue()).toNumber())
        } catch (err) {
          setAprForStaking(0)
          setAprForLP(0)
        }

        try {
          setSideStakingYieldAmount(
            fromWei(await formStakingContract.getUsersYieldAmount(account)),
          )
        } catch (err) {
          setSideStakingYieldAmount(0)
        }

        try {
          setLiqudidityPoolYieldAmount(
            fromWei(await lpFarmingContract.getUsersYieldAmount(account)),
          )
        } catch (err) {
          setLiqudidityPoolYieldAmount(0)
        }
      }
    })()
  }, [chainId, library, formToken, account])

  if (matchMedia)
    return (
      <div className="home">
        {matchMedia && (
          <Title title="Home" classes={renderTitleStyle() + ' title__home'} />
        )}
        <Header />
        <Tiles
          aprForStaking={aprForStaking}
          aprForLP={aprForLP}
          sideStakingYieldAmount={sideStakingYieldAmount}
          liqudidityPoolYieldAmount={liqudidityPoolYieldAmount}
        />

        <NewFeature />
        <p className="space-h--mobile mt-2">News&#47; Latest Updates</p>
        <div className="home__content">
          <Simple aprForStaking={aprForStaking} />
          <LiquidityMiningEvent aprForLP={aprForLP} />
        </div>
        <V1Alhpa />
      </div>
    )
  else
    return (
      <div className="home">
        {matchMedia && (
          <Title title="Home" classes={renderTitleStyle() + ' title__home'} />
        )}
        <Header />
        <Tiles
          aprForStaking={aprForStaking}
          aprForLP={aprForLP}
          sideStakingYieldAmount={sideStakingYieldAmount}
          liqudidityPoolYieldAmount={liqudidityPoolYieldAmount}
        />

        <NewFeature />
        <p className="space-h--mobile mt-2">News&#47; Latest Updates</p>

        <LiquidityMiningEvent aprForLP={aprForLP} />

        <Simple aprForStaking={aprForStaking} />

        <V1Alhpa />
      </div>
    )
}

export default Home
