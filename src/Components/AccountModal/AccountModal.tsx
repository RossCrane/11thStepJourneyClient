import React, { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal">
			<h1>Account Modal</h1>
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
					Close
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
