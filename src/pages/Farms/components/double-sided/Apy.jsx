import Pill from 'COMPONENTS/Pill';

const Apy = ({ currentAPR }) => (
	<div className='farms__box__header__apy'>
		<Pill title='APR' value={currentAPR + '%'} small />
	</div>
);

export default Apy;
