import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Button from './Button';

function Modal({ onCancel, onConfirm }) {
	const element = document.querySelector('body');

	useEffect(() => {
		element.classList.add('overflow-hidden');
		return () => element.classList.remove('overflow-hidden');
	}, []);

	useEffect(() => {
		const modalButtons = document.querySelector('.modal-buttons');
		const cancelButton = modalButtons.querySelector('.modal-cancel');
		const confirmButton = modalButtons.querySelector('.modal-confirm');
		const modalBackdrop = document.querySelector('.modal-container');
		modalBackdrop.addEventListener('click', onCancel);
		cancelButton.addEventListener('click', onCancel);
		confirmButton.addEventListener('click', onConfirm);
		
		modalButtons.addEventListener('click', (e) => {
			e.stopPropagation();
		});
		
		return () => {
			cancelButton.removeEventListener('click', onCancel);
			confirmButton.removeEventListener('click', onConfirm);
			modalButtons.removeEventListener('click', (e) => {
				e.stopPropagation();
			});
		};
	}, [onCancel, onConfirm]);
	

	const modalWindow = (
		<div className='modal-container'>
			<div className='modal-window'>
				<p className='modal-header'>Delete comment</p>
				<p className='modal-text'>
					Are you sure you wat to delete this comment? This will remove the
					comment and can't be undone.
				</p>
				<div className='modal-buttons'>
					<Button className={'modal-cancel'} onClick={onCancel}>
						NO, CANCEL
					</Button>
					<Button className={'modal-confirm'} onClick={onConfirm}>
						YES, DELETE
					</Button>
				</div>
			</div>
		</div>
	);

	return createPortal(modalWindow, element);
}

export default Modal;
