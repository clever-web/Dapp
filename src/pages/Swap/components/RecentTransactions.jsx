import ButtonClose from 'COMPONENTS/ButtonClose';
import Image from 'COMPONENTS/Image';
import { RECENT_TRANSACTIONS } from '../constants';
import ApproveIcon from 'ASSETS/images/common/dark/approve.svg';
import CopyWhiteIcon from 'ASSETS/images/actions/copy_white.svg';
import CopyDarkIcon from 'ASSETS/images/actions/copy_dark.svg';

const RecentTransactions = ({ onCancel }) => {
	return (
		<div className='recent-transactions'>
			<div className='recent-transactions__header'>
				<p className='font-size-14 font-weight-700'>Transactions</p>
				<div className='d-flex justify-content-end'>
					<ButtonClose onClick={onCancel} />
				</div>
			</div>
			<div className='recent-transactions__body'>
				{RECENT_TRANSACTIONS.map((el) => (
					<div
						key={el.title}
						className='recent-transactions__body__box'
					>
						<div className='d-flex align-items-center'>
							<div className='recent-transactions__body__box__icon'>
								<Image
									light={ApproveIcon}
									dark={ApproveIcon}
									alt='Menu'
									w='34'
									h='34'
								/>
							</div>
							<p className='font-size-14 font-weight-700 ml-1'>
								{el.title}
							</p>
						</div>
						<Image
							light={CopyDarkIcon}
							dark={CopyWhiteIcon}
							alt='View on explorer'
							w='12'
							h='12'
							classes='c-pointer'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentTransactions;
