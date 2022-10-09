import { numberFormatter } from 'utils/formatters';
const CurrencyAmount = ({ text, amount }) => {
	
	// return <div style={{ marginLeft: '7%',marginTop:'10px' }}>
     return <div className = "v1alpha__alpha__content__money">
                <p className="font-size-12">{text}</p>
                 <p className="font-size-22 font-weight-700 c-dollar "> {/* {"$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   */}
                {"$" + numberFormatter.format(amount)}</p><br />
           </div>
};

export default CurrencyAmount;