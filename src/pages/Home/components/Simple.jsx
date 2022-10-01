import { useHistory } from 'react-router-dom';
import Button from 'COMPONENTS/Button';

const Simple = ({aprForStaking}) => {
	const history = useHistory();

	const handleClick = () => history.push('/pools');
	const percent = aprForStaking;

	return (
		<div className='home__simple space-h--mobile'  style = {{float:'left',width:'100%'}}>
			<div className='home__simple__box'>
				<div className='home__simple__box__txt'>
					{/* <span className='txt-marked txt-marked--dark c-white'>
						single
					</span> */}
					<p className='c-dark mb-1'>Single<br/> sided staking</p>
					
					<span className='font-size-60 txt-marked txt-marked--dark c-white' style = {{textShadow: '0px 0px 12px #99FFCC', padding: '5px'}}>
						APR:{percent}%
					</span>
					<p className='c-dark sub-title'>stake &#36;form&#47;earn &#36;form</p>
				</div>
				<Button
					type='button'
					text='Stake now'
					outlinedDark
					classes='pl-5 pr-5 pt-2 pb-2 mt-3'
					onClick={handleClick}
				/>
				
			</div>
		</div>
	);
};

export default Simple;
