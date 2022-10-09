const DepsiteIcon = ({icon}) => {
	

	return (
			<div className='v1alpha__alpha__deposite'>
				<div className='select-token-with-input__select__icon'>
					<img src={icon} alt='Token' />
				</div>
				<div className="select-token-with-input__select__icon_text">
					<p className="v1alpha__alpha__deposite_word">Input</p>
					<p className="font-size-24 v1alpha__alpha__deposite_unit">USDT</p>
					<div style={{float:'left', width:'160%', height:'.1px', backgroundColor:'gray', marginBottom:'20px'}}></div>
				</div>
			</div>
	);
};

export default DepsiteIcon;