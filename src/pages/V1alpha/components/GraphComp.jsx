import Pill from 'COMPONENTS/Pill';
import { usdFormatter, numberFormatter, convertToUnit, parseFromUnit } from 'utils/formatters';
const GraphComp = ({ title, classes, currentAmount }) => {

	const formTokenPrice = '24%';

	return  <>
				<div className='v1alpha__alpha__rightTopGraph'>
				<svg width="59" height="34" viewBox="0 0 59 34" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 33L13 26L25 30L38 5.5L44.5 12.5L57.5 1" stroke="#99FFCC" stroke-width="2"/>
				</svg>
				</div>

				{/* <div class="pill pill__small pill__small__light pill__small__v1alpha_rightTop_item v1alpha__alpha__rightTop_item">
								<p class="pill__top ">$Alpha Index Value 30 days</p>
								<p class="pill__bottom ">24%</p>
							</div>	 */}
				<div className='v1alpha__alpha__rightTopLabel'>
					<Pill
						title='Alpha Index Value 30 days'
						small
						value={formTokenPrice}
						classes='pill__small__light pill__small__v1alpha_item'
					/>
				</div>
			</>
		;
};

export default GraphComp;