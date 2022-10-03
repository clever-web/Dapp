import Button from 'COMPONENTS/Button';

const Footer = () => (
	<div className='liquidity-tab__your-liquidity__footer'>
		<p className='font-size-14 mb-1'>Don't see a pool you joined?</p>
		<Button
			type='button'
			text='Find other LP tokens'
			outlined
			classes='font-weight-400 no-underline pl-4 pr-4'
			onClick={() => {}}
		/>
	</div>
);

export default Footer;
