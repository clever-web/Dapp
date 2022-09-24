import { useLocation } from "react-router";
const Bg = () => {
	let location = useLocation();
	if(location.pathname != '/')
		return(
			<div className='linear-bg__container'>
		
				<div className='linear-bg__container--left'>
				</div>
				<div className='linear-bg__container--right'></div>
			</div>
		);
	else
		return(<></>);
}

export default Bg;
