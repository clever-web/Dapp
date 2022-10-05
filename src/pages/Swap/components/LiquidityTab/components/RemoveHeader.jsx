import Image from 'COMPONENTS/Image';

const RemoveHeader = ({ selectedValue, userTokenBalanceLPToken }) => {

	return (
		<div className='liquidity-tab__remove__header'>
			<div className='flex-center'>
				<div className='liquidity-tab__remove__header__icon'>
					<Image
						light={selectedValue.tokenFrom.icon}
						dark={selectedValue.tokenFrom.icon}
						alt={selectedValue.tokenFrom.name}
						w='18'
						h='18'
					/>
				</div>
				<div className='liquidity-tab__remove__header__icon ml-n1'>
					<Image
						light={selectedValue.tokenTo.icon}
						dark={selectedValue.tokenTo.icon}
						alt={selectedValue.tokenTo.name}
						w='25'
						h='25'
					/>
				</div>
			</div>

			<div className='d-flex justify-content-space-between align-items-center w-100 ml-1'>
				<p className='font-size-14 font-weight-700 mr-1'>
				{selectedValue.tokenFrom.name}&#47;{selectedValue.tokenTo.name} LP:
				</p>
				<div className='liquidity-tab__remove__header__right-col'>
					<p className='font-size-14'>
						{userTokenBalanceLPToken}
					</p>
				</div>
			</div>
		</div>
	);
};

export default RemoveHeader;
