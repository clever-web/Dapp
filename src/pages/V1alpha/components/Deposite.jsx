const Depsite = ({icon}) => {
	

	return (
			<div className='v1alpha__alpha__deposite' >
				<div className='select-token-with-input__select__icon'>
					<img src={icon} alt='Token' />
				</div>
				<p className="font-size-18 v1alpha__alpha__deposite_word">Deposite</p><br/>
				<p className="font-size-20 v1alpha__alpha__deposite_unit">USDT</p>
			</div>
	);
};

export default Depsite;