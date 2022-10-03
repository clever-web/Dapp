import ButtonClose from "COMPONENTS/ButtonClose";
import { useState } from "react";

const StableTokenModal = ({
  swapInAmount,
  onCancel,
  handleCrossChain,
  buttonDisabled,
  // showTransactionModal,
}) => {

  const [checkValue1, setCheckValue1] = useState(false);
  const [checkValue2, setCheckValue2] = useState(false);

  const handleFlow = async () => {
    // showTransactionModal();
    await handleCrossChain();
  };
  const formTokenPrice = '0.45';

  const check1 = async (e) => {
    setCheckValue1(e.target.checked);
  }

  const check2 = async (e) => {
    setCheckValue2(e.target.checked);
  }



  return (
    <div className="confirm-modal">
      <div className = 'request-detail-title font-size-20 font-weight-700' style = {{textAlign:'left'}}>
          Welcome!
      </div>


      <div className = 'request-detail-content' style = {{padding:'15px 30px'}}>
          <p className = "font-size-20 font-weight-500" style = {{textAlign:'left'}}>This Product is in beta</p>
          <br/>
          <p className = "font-size-16" style = {{textAlign:'left'}}>Please read the terms and conditions</p>
          <br/>
          <br/>

          <label className="container112">I understand that I am using this product at my own risk. Any losses incured due to my actions are my own responsibility.
            <input type="checkbox" onChange = {check1}/>
            <span className="checkmark"></span>
          </label>
          <br/>
          <label className="container112"> I understand that this product is still in beta. I am participating at my own risk
            <input type="checkbox" onChange = {check2} />
            <span className="checkmark"></span>
          </label>

          <br/>

          <button className="Stable__token_Modal__button" style = {{marginBottom:'10px'}} onClick = {onCancel} disabled = { checkValue1 & checkValue2 ? false:true}>Continue</button>
      </div>
    </div>
  );
};

export default StableTokenModal;



