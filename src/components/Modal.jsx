import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.classes || ''}`}>{props.children}</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById('modal-hook')
	);
};

const Modal = (props) => {
	return (
		<>
			{props.show && (
				<Backdrop
					onClick={props.onCancel}
					classes={props.backdropClasses}
				/>
			)}
			{props.show && <ModalOverlay {...props} />}
		</>
	);
};

export default Modal;
