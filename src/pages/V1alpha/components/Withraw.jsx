const Withraw = ({ iswithdrawHistory }) => {
	
	return <div className='v1alpha__withraw'>
		<p className='font-size-12'><a>{!iswithdrawHistory ? ('Withdraw txt info for tehe user. Your LP Tokens ....') : ('Withdraw info. Your LP Tokens ....')}</a></p>
	</div>
};

export default Withraw;