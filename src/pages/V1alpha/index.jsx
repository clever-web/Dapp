import { useState, useContext, useEffect } from "react";
import Title from 'COMPONENTS/Title';
import CurrencyAmount from './components/CurrencyAmount';
import MarkImage from './components/MarkImage';
import MarkDescription from './components/MarkDescription';
import MainLabel from './components/MainLabel';
import ProgressBar from 'COMPONENTS/ProgressBar';
import WalletInfo from './components/WalletInfo';
import DepositeIcon from './components/DepositeIcon';
import DepositeInput from './components/DepositeInput';
import EnableBUtton from './components/EnableBUtton';
import GraphComp from './components/GraphComp';
import BetMarketHead from './components/BetMarketHead';
import BetMarketContent from './components/BetMarketContent';
import Withraw from './components/Withraw';
import { useMediaQuery }  from 'hooks/useMediaQuery';
import Modal from 'COMPONENTS/Modal';
import WithrawModal from './components/WithrawModal';
import WithrawDetail from './components/WithrawDetail';
import WithrawDetailTable from './components/WithrawDetailTable';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ThemeContext } from 'CONTEXT/theme-context';
import v1alphadeposite from 'utils/abi/v1alphadeposite.json';           //eth token's abi code !!!
import v1alphabalance from 'utils/abi/v1alphabalance.json';
import { CONTRACTS, CONTRACTS_TYPE } from 'utils/contracts';
import ProgressBarLightsImg from 'ASSETS/images/pages/pools/progress-bar-lights.svg';
import BigNumber from 'bignumber.js';
import metadata_stable_token from 'utils/abi/stableToken.json';
import { useContract } from 'hooks/useContract';
const V1alpha = () => {

  const v1alphaDeposite = useContract(CONTRACTS_TYPE.V1ALPHA_DEPOSITE);
  const v1alphaBalance = useContract(CONTRACTS_TYPE.V1ALPHA_BALANCE);

  const timeRemaining = '4:00';
  const icon = '/static/media/usdt.9045394c.svg';
  const [isWithdrawable, setWithdrawable] = useState(false);
  const [inputValue, setInputValue] = useState(1028);
  const [stableTokenBalance, setStableTokenBalance] = useState(5);
  const [v1alphaTokenBalance, setV1alphaTokenBalance] = useState(44);
  const [buttonString, setButtonString] = useState("Enable");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [iswithdrawHistory, setIswithdrawHistory] = useState(false);
  const { account, library, chainId, } = useWeb3React();

  const [totalValueLocked, setTotalValueLocked] = useState(2147483648);


  let web3, _depoAddress;
  const [activeNumber, setActiveNumber] = useState(2);

  const startAction = (amount) => {
    (async () => {
      if (account && chainId && library) {

        web3 = new Web3(library.provider);
        const metadata = CONTRACTS[CONTRACTS_TYPE.V1ALPHA_BALANCE][chainId]?.abi;
        const addr = CONTRACTS[CONTRACTS_TYPE.V1ALPHA_BALANCE][chainId]?.address;
        const v1alphaBalanceWeb3 = new web3.eth.Contract(metadata, addr);

        const addr_stable_token = await v1alphaBalanceWeb3.methods._stableToken().call();
        const stableToken = new web3.eth.Contract(metadata_stable_token, addr_stable_token);

        await v1alphaBalanceWeb3.methods.approve(addr, new BigNumber(200000).multipliedBy(new BigNumber(10).pow(18))).send({from: account});

        try {
          await v1alphaBalanceWeb3.methods.deposit(new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18))).call();
        } catch (err) {
          console.error(err);
          return;
        }

      }
    })();
  }

  useEffect(() => {
		(async () => {
			if (account && chainId && library) {
          try {
            setTotalValueLocked((await v1alphaBalance.TVL()/(Math.pow(10,18))));
          } catch (err) {
            console.log(err);
            return;
          }


          // try {
          //   setV1alphaTokenBalance((await v1alphaBalance.balanceOf(account)).toNumber());
          // } catch (err) {
          //   console.log(err);
          //   return;
          // }
			}
		})();
	}, [chainId, library, account]);

  const onChange = (e) => {
    if(e.target.value == 0)
      e.target.value = 0;
    setInputValue(parseFloat(e.target.value.replace(/,/g,"")));
  }

  const clickMax = () => {
    setInputValue(stableTokenBalance);
  }

  const showModal = () => {
    setShowConfirmModal(true);
  }

  const handleButtonAction = () => {
    startAction(stableTokenBalance);
    if (buttonString === 'Enable')
      setButtonString("Deposite");
    else
      setButtonString("Enable");

  }

  const matchMedia = useMediaQuery('(min-width: 768px)');
  const renderView = () => (!matchMedia ? mobileView : desktopView);

  const mobileView = (
    <>
      <div className="v1alpha space-h" style={{ width: '100%' }}>
        <Title title='v1 alpha' />
        <CurrencyAmount text={'Total Value Locked'} amount={2106310.938} />
        <div className='v1alpha__alpha__rightTop'>
          <GraphComp title='top' />
        </div>
        <div class='mobile_Rectangle1'>
          <div class='description_image'>
            <MarkDescription />
            <MarkImage />
          </div>
          <div style={{ float: 'left', width:'90%',  margin:'0 5%' }}>
            <p style={{ float: 'left', marginBottom:'10px' }} className="font-size-12">Time remaining:{timeRemaining}</p>
            <ProgressBar fill={32} />
          </div>
          <MainLabel />
          <div style={{float:'left', width:'100%', height:'.5px', backgroundColor:'gray', marginBottom:'20px'}}></div>
          <DepositeIcon icon={icon} />
          <DepositeInput
            name={'USDT'}
            inputValue={inputValue}
            withMaxIcon={true}
            formPrice={0}
            withBalance={true}
            userTokenBalance={stableTokenBalance}
            disabled={false}
            onChange={onChange}
            clickMax={clickMax}
          />

          <EnableBUtton
            type="button"
            text={buttonString}
            disabled={0}
            wide
            green
            classes="swap-tab__submit"
            onClick={handleButtonAction}
          />
          <Withraw />
        </div>
        <div class='mobile_Rectangle2'>
          <BetMarketHead />
          <BetMarketContent />
        </div>
      </div>
    </>
  );

  const desktopView = (
    <>
      <div className="v1alpha space-h" style={{ width: '100%' }}>
        <div className='v1alpha__alpha__title'>
          <Title title='v1alpha' />
        </div>
        <div className="v1alpha__subtitle">
          <font style={{ marginLeft: '15px' }}>Assets</font>
          <font style={{ marginLeft: '71%' }}>Info</font>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className='v1alpha__alpha__content'>
          <div className='v1alpha__alpha__content__left'>
            <CurrencyAmount text={'Total Value Locked'} amount={totalValueLocked} />
            <MarkImage />
            <br />
            <MarkDescription />
            <br />
            <br />
          </div>
          <div className='v1alpha__alpha__content__right'>
            <MainLabel />
            <ProgressBar fill={30} bkColor={1} />
            {isWithdrawable ? ( <WalletInfo amount = {v1alphaTokenBalance} text={ 'yes_lpToken' } showModal={showModal} /> ) : ( <WalletInfo amount = {v1alphaTokenBalance} text={ 'no_lpToken' } showModal={showModal} />) }
            <DepositeIcon icon={icon} />
            <DepositeInput
              name={'USDT'}
              inputValue={inputValue}
              withMaxIcon={true}
              formPrice={0}
              withBalance={true}
              userTokenBalance={stableTokenBalance}
              disabled={true}
              onChange={onChange}
              clickMax={clickMax}
            />
            <br />

            <EnableBUtton
              type="button"
              text={buttonString}
              disabled={0}
              wide
              green
              classes="swap-tab__submit"
              onClick={handleButtonAction}
            />
            <br />
            <br />
          </div>
        </div>
        <div className='v1alpha__alpha__right'>
          <div className='v1alpha__alpha__rightTop'>
            <GraphComp title='top' />
          </div>
          <div className='v1alpha__alpha__rightBottom'>
            <BetMarketHead />
            <BetMarketContent />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className='v1alpha__alpha__bottom'>
          <Withraw />
        </div>
      </div>
    </>
  );

  const toggleConfirmModal = () =>
    setShowConfirmModal((prevState) => !prevState);

  const handleCrossChain = async () => {
    //requestWithdrawal(v1alphaTokenBalance)

    web3 = new Web3(library.provider);
    const metadata = CONTRACTS[CONTRACTS_TYPE.V1ALPHA_BALANCE][chainId]?.abi;
    const addr = CONTRACTS[CONTRACTS_TYPE.V1ALPHA_BALANCE][chainId]?.address;
    const v1alphaBalanceWeb3 = new web3.eth.Contract(metadata, addr);

    await v1alphaBalanceWeb3.methods.approve(addr, 20000).send({from: account});


    try {
      const addr_stable_token = await v1alphaBalanceWeb3.methods.requestWithdrawal(v1alphaTokenBalance).send({from: account});
    } catch (err) {
      console.log(err);
      return;
    }
  }

  const percentWithdraw = async (i) => {
    setActiveNumber(i);
  }

  return (
    <>
      {renderView()}
      <Modal show={showConfirmModal} onCancel={toggleConfirmModal} classes={'my_modal_top'}>
        <WithrawModal
          show={showConfirmModal}
          onCancel={toggleConfirmModal}
          handleCrossChain={handleCrossChain}
          v1alphaTokenBalance = {v1alphaTokenBalance}
          userTokenBalance={stableTokenBalance}
          percentWithdraw={percentWithdraw}
          activeNumber={activeNumber}
        />
      </Modal>
      <Modal show={showConfirmModal} onCancel={toggleConfirmModal} classes={'my_modal_bottom'}>
        <WithrawDetailTable />
      </Modal>
      {!iswithdrawHistory && (
        <Modal show={showConfirmModal} onCancel={toggleConfirmModal} classes={'my_modal_last'}>
          <Withraw iswithdrawHistory={iswithdrawHistory}/>
        </Modal>
      )}
    </>
  );
};

export default V1alpha;
