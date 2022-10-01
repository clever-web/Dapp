import Image from 'COMPONENTS/Image'
import CopyWhiteIcon from 'ASSETS/images/actions/copy_white.svg'
import CopyGreenIcon from 'ASSETS/images/actions/copy_green.svg'

import { numberFormatter, parseFromUnit, usdFormatter } from 'utils/formatters'

import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'

const Tile = ({
  title,
  totalWithToken,
  withIcon,
  link,
  price,
  token,
  result,
  index,
  aprForStaking,
  aprForLP,
  sideStakingYieldAmount,
  liqudidityPoolYieldAmount,
  isAuth,
  formTokenPrice,
  userTokenBalance,
}) => {
  let tokenAmount = 0
  let usdPrice = 0
  switch (index) {
    case 0:
      tokenAmount = userTokenBalance
      usdPrice = tokenAmount * formTokenPrice
      break
    case 1:
      tokenAmount = sideStakingYieldAmount
      usdPrice = tokenAmount * formTokenPrice
      break
    case 2:
      tokenAmount = sideStakingYieldAmount + liqudidityPoolYieldAmount
      usdPrice = tokenAmount * formTokenPrice
      break
    case 3:
      tokenAmount = liqudidityPoolYieldAmount
      usdPrice = tokenAmount * formTokenPrice
      break
    default:
      break;
  }

  tokenAmount = (tokenAmount || 0).toFixed(2)

  if (index % 2 == 0)
    return (
      <div className="home__header__tile">
        <p className="home__header__tile__title">
          <font>&nbsp;&nbsp;{title}</font>
        </p>

        <div className="home__header__tile__box">
          <div className="home__header__tile__box__first2">
            <p>
              <span className="home__header__tile__price">
                {usdFormatter.format(usdPrice)}&nbsp;
              </span>
            </p>
            <p className="font-size-12" style={{ marginTop: '10px' }}>
              {token ? '≈' : ''} {tokenAmount}{' '}
              {<span className="font-size-12">&nbsp;{token}</span>}
            </p>
          </div>

          {withIcon && (
            <Link to={link}>
              <Image
                light={CopyGreenIcon}
                dark={CopyWhiteIcon}
                alt="Copy Address"
                w="17"
                h="17"
              />
            </Link>
          )}
        </div>
      </div>
    )
  else
    return (
      <div className="home__header__tile home__header__tile__second2">
        <p className="home__header__tile__title">
          <font>&nbsp;&nbsp;{title}</font>
        </p>

        <div className="home__header__tile__box">
          <div style={{ width: '100%' }}>
            <div
              className="home__header__tile__box__title"
              style={{ width: '80%', float: 'left' }}
            >
              <p className="font-size-14 c-green home__header__tile__box__title__apr pl-1 pr-1">
                <b style={{ fontWeight: '900' }}>
                  APR: {index < 2 ? aprForStaking : aprForLP} %{' '}
                </b>
              </p>
            </div>
            {
              <div style={{ float: 'right', marginTop: '-5px' }}>
                <Link to={link}>
                  <Image
                    light={CopyGreenIcon}
                    dark={CopyWhiteIcon}
                    alt="Copy Address"
                    w="19"
                    h="19"
                  />
                </Link>
              </div>
            }
            <div className="underLine"></div>
            <p>
              <span
                className="home__header__tile__price"
                style={{ marginLeft: '8px' }}
              >
                {isAuth === true ? usdFormatter.format(usdPrice) : '2X'} &nbsp;
              </span>
              {totalWithToken && <span className="font-size-12">{token}</span>}
            </p>
            <p
              className="font-size-12"
              style={{ marginTop: '3px', marginLeft: '8px' }}
            >
              {token ? '≈' : ''} {isAuth === true ? tokenAmount : 'un'}{' '}
              {!totalWithToken && (
                <span className="font-size-12">&nbsp;{token}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    )
}

export default Tile
