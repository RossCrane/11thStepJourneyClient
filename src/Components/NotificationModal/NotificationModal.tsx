import React from 'react';
import './Styles.css';

interface NotificationModalProps {
	isOpen: boolean;
	onClose: () => void;
	announcements: string[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({
	isOpen,
	onClose,
	announcements,
}) => {
	return (
		<div className={`notification-modal ${isOpen ? 'open' : ''}`}>
			<div className="notification-modal-content">
				<button className="close-button" onClick={onClose}>
					Close
				</button>
				<h2>Announcements</h2>
				<ul>
					{announcements.map((announcement, index) => (
						<li key={index}>{announcement}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default NotificationModal;
