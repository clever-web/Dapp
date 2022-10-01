
import Button from 'COMPONENTS/Button';
import { useHistory } from 'react-router-dom';



const V1Alpha = () => {

	const history = useHistory();
	const handleClick = () => history.push('/v1alpha');

return (
	<div className='v1alpha space-h--mobile'>
		<div className='v1alpha__box'>
			<p className='v1alpha__box__txt'>
				<span className='txt-marked txt-marked--dark c-white'>
					v1 alpha &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</span>
				<p className="coming_soon"><span className='c-dark'>is coming soon</span></p>
				<span className='font-size-14 c-white'>available soon</span>
			</p>
		</div>
	</div>
);	
};

export default V1Alpha;
