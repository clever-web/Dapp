

const WalletInfo = ({ amount, text, showModal }) => {
	
	return (
		<>
			{text !== "no_lpToken" ? (
				<p className="font-size-14 v1alpha__alpha__rightWarning"> You have no lp tokens. Deposit and make money </p>
			) : (
				<div className="v1alpha__alpha__withdrawModal">
					<div className="v1alpha__alpha__withdrawModal__svg">
						<svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.303 28.4151L15.5875 28.4151L22.3815 20.5142L21.614 17.3943L21.3584 12.1558L22.7797 12.4704L25.4517 11.4684L26.2481 10.5236L24.713 9.00689L23.0353 8.46223L25.9917 6.77364L28.7494 4.48312L30 0.96228L25.3379 4.71226L21.8984 4.65497L18.0319 4.19757L15.3599 5.14145L12.5173 4.16849L8.73652 4.71226L5.26817 4.68405L0.60606 0.991361L1.88558 4.5122L4.58552 6.85913L7.54277 8.46223L5.80815 9.09237L4.35885 10.4663L5.26816 11.5257L7.79832 12.4414L9.19162 12.2413L8.90718 17.5089L8.22454 20.5714L14.9906 28.3869L15.303 28.4151Z" fill="#070619"/>
						<path d="M20.294 10.3906L20.294 8.17218L23.067 8.43784" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3032 20.3733L17.8497 19.4855L18.9081 17.3229" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M18.908 17.323L19.6788 15.6216L20.2684 10.3905L21.4037 12.2197" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.303 24.8103L19.559 20.2394L20.8491 15.4479L20.2881 10.3613L18.7848 9.836" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M16.9667 13.9954L15.3029 13.9954" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3397 19.2641L17.6211 18.7544L18.4404 17.1842L17.082 13.9417L18.8279 9.9127L17.6646 9.36194L15.3397 8.47865L18.7641 8.72478L20.3353 8.15396L20.5721 6.11766L15.3033 5.12176" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M28.8907 4.28986L25.2858 4.56716" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3029 8.44934L15.3029 20.3733" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M20.2943 8.17218L24.3543 9.79262L25.563 10.9452" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.0257 28.4151L15.5706 28.4151L22.339 20.5251L21.6986 17.7026L21.3157 12.1888L22.784 12.5091L25.3394 11.5454L26.2961 10.5201L24.7639 9.04508L22.9776 8.46686L26.0411 6.8642L28.7867 4.49058L30 0.96228L25.2746 4.71501L21.9561 4.71501L18.0612 4.23448L15.3157 5.15418L18.0612 4.23448" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3035 8.44936L20.5352 6.03213L26.1182 6.74765L25.3487 4.56714L20.5352 6.03213" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M20.2944 10.3905L18.4021 17.323L15.303 16.0332" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M17.5213 18.7095L15.3029 15.9365" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M18.5694 8.72668L18.6306 9.72391L15.303 13.9954" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M24.4541 9.83587L24.7314 9.00397" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M17.7985 19.5415L19.4255 20.2684L22.2353 20.3734" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M19.7401 15.4688L20.8153 15.382L21.6812 17.6004" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M10.3112 10.3906L10.3112 8.17218L7.53824 8.43784" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3029 20.3733L12.7564 19.4855L11.6979 17.3229" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M11.6981 17.323L10.9281 15.6216L10.3364 10.3905L9.20241 12.2197" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3029 24.8103L11.0469 20.2394L9.75683 15.4479L10.3151 10.3613L11.8211 9.836" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M13.639 13.9954L15.3029 13.9954" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.2692 19.2641L12.985 18.7544L12.1684 17.1842L13.5242 13.9417L11.7809 9.74337L12.9443 9.36194L15.2692 8.47865L11.8448 8.72478L10.2709 8.15396L10.0341 6.11766L15.3029 5.12177" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M1.71536 4.28986L5.32028 4.56716" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M10.3112 8.17218L6.25124 9.79262L5.04252 10.9452" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.5804 28.4151L15.0355 28.4151L8.26717 20.5251L8.90493 17.7026L9.28777 12.1888L7.81951 12.5091L5.26671 11.5454L4.30744 10.5201L5.83965 9.04508L7.62853 8.46686L4.56412 6.86332L1.81859 4.4897L0.606141 0.962279L5.33066 4.71501L8.65001 4.71501L12.5449 4.23448L15.2904 5.15418L12.5449 4.23448" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M10.3114 10.3905L12.2055 17.323L15.3029 16.0332" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M13.0844 18.7095L15.3029 15.9365" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M12.0365 8.72668L11.9752 9.72391L15.3029 13.9954" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M6.15195 9.83587L5.87465 9.00397" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M12.8073 19.5415L11.1803 20.2684L8.37049 20.3734" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M10.8659 15.4688L9.79173 15.382L8.92477 17.6004" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M15.3029 5.01289L15.3029 8.44936L10.0699 6.03213L4.4881 6.74765L5.25782 4.56714L10.0699 6.03213" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M20.2944 10.3242L18.076 11.4998L18.7868 9.836L20.2944 10.3242Z" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						<path d="M11.8308 9.836L12.5298 11.4998L10.3113 10.3623L11.8308 9.836Z" stroke="#99FFCC" stroke-width="0.3" stroke-miterlimit="10"/>
						</svg>
					</div>
					<div className="v1alpha__alpha__withdrawModal__balance">
						<p className="font-size-12">Balance:</p>
						<p className="font-size-14">{amount} ALPHA LP TOKEN</p>
					</div>
					<button onClick={showModal} className="v1alpha__alpha__withdrawModal__button">Withdraw</button>
				</div>
			)}
		</>
	)
};

export default WalletInfo;