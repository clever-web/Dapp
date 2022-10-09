import Pill from 'COMPONENTS/Pill';
import { usdFormatter, numberFormatter, convertToUnit, parseFromUnit } from 'utils/formatters';

const MainLabel = ({ text, amount }) => {
	
    const formTokenPrice = '15.00';
    const timeRemaining = '4:00';

	return <div className = "v1alpha__alpha__mainLabel">
                <div style = {{float:'left'}} >
                    <b className='font-size-30 font-weight-700 v1alpha__alpha__rightTitle' style={{float:'left'}}>v1 alpha index</b>
                    <p class="font-size-14">Time remaining:{timeRemaining}</p>
                </div>
                <div style = {{float:'right'}} className = "v1alpha__alpha__mainLabel__index">
                    <Pill
                        title='$Alpha'
                        small
                        value={usdFormatter.format(formTokenPrice)}
                        classes='pill__small__light pill__small__v1alpha_item'
                    />
                </div>
            </div>
};

export default MainLabel;