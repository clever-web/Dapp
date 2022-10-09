import Button from "COMPONENTS/Button";
import ButtonClose from "COMPONENTS/ButtonClose";
import Symbol from "./Symbol";
import Image from "COMPONENTS/Image";
import FORMTokenIcon from "ASSETS/images/tokens/form.svg";
import Pill from 'COMPONENTS/Pill';
import { usdFormatter, numberFormatter, convertToUnit, parseFromUnit } from 'utils/formatters';
// import TokenInput from '../../../components/sub_view/TokenInput';
import TokenInput from './TokenInput';

const WithrawDetail = ({
  swapInAmount,
  onCancel,
  handleCrossChain,
  buttonDisabled,
  // showTransactionModal,
}) => {
  const handleFlow = async () => {
    // showTransactionModal();
    await handleCrossChain();
  };
  const formTokenPrice = '0.45';

  return (
    <div className="confirm-modal">
      <div className = 'request-detail-title' style = {{fontSize:'14px',textAlign:'left'}}>
        <i className = "fa fa-save"></i>
          Request history
      </div>
      <div className = 'request-detail-content'>
          {/* <p className = "request-detail-content-no">You have no history with transaction</p> */}
          <table className = 'myCustomTable'>
            <tr className = 'titleTr'>
              <th style = {{width:'25%'}}>Status</th>
              <th style = {{width:'37.5%'}}>Amount Alpha LP</th>
              <th style = {{width:'37.5%'}}>Order ID</th>
            </tr>
            <tr>
              <td><p style={{backgroundColor:'rgba(255, 255, 255, 0.1)', borderRadius:'15px'}}>pending...</p></td>
              <td>15,000</td>
              <td>0x7ee38f...f48676e1 (BSC)</td>
            </tr>
            <tr>
              <td><p style={{backgroundColor:'rgba(153, 255, 204, 0.1)', color:'#99FFCC', borderRadius:'15px'}}>completed</p></td>
              <td>32,000</td>
              <td>0x7ee38f...f48676e1 (BSC)</td>
            </tr>
          </table>
      </div>
    </div>
  );
};

export default WithrawDetail;



