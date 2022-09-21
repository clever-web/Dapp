import ReactDOM from 'react-dom';

const Backdrop = (props) =>
	ReactDOM.createPortal(
		<div
			className={`backdrop ${props.classes || ''}`}
			onClick={props.onClick}
		></div>,
		document.getElementById('backdrop-hook')
	);

export default Backdrop;
