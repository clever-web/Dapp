import Image from 'COMPONENTS/Image';
import ExchangeIcon from 'ASSETS/images/actions/exchange.svg';

const ExchangeRate = ({rate, pair}) => (
	<div className='swapper__exchange'>
		<p className='font-size-14'>Exchange rate</p>
		<div className='swapper__exchange__rate'>
			<p className='font-size-14'>1 {pair.tokenFrom.name} = {rate} {pair.tokenTo.name}</p>
			<button type='button' className='btn-icon'>
				<div
					className='flex-center'
					style={{ background: '#070618', borderRadius: '50%' }}
				>
					<Image
						light={ExchangeIcon}
						dark={ExchangeIcon}
						alt='Refresh'
						w='16'
						h='16'
					/>
				</div>
			</button>
		</div>
	</div>
);

export default ExchangeRate;
