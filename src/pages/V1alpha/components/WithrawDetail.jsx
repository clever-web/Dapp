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
      <div className = 'request-detail-title'>
        <i className = "fa fa-save"></i>
          Requested withraw transaction history
      </div>
      <div className = 'request-detail-content'>
          <p className = "request-detail-content-no">You have no history with transaction</p>
          {/* <table className = 'myCustomTable'>
            <tr>
              <th>111</th>
              <th>222</th>
              <th>333</th>
            </tr>
            <tr>
              <td>qqq</td>
              <td>asd</td>
              <td>eee</td>
            </tr>
            <tr>
              <td>aaa</td>
              <td>sss</td>
              <td>sad</td>
            </tr>
          </table> */}
      </div>
    </div>
  );
};

export default WithrawDetail;



