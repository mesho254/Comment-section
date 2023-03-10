import replyIcon from '../images/icon-reply.svg';
import deleteIcon from '../images/icon-delete.svg';
import editIcon from '../images/icon-edit.svg';

function ManageButton({ type, onClick }) {
	let icon;
	let text;
	let nameOfClass = 'comment-content-reply-edit';
	switch (type) {
		case 'reply':
			icon = replyIcon;
			text = 'Reply';
			break;
		case 'delete':
			icon = deleteIcon;
			text = 'Delete';
      nameOfClass = 'comment-content-reply-edit comment-content-delete';
			break;
		case 'edit':
			icon = editIcon;
			text = 'Edit';
			break;
		default:
			throw new Error('Unknown manage button type');
	}
	return (
		<div className={nameOfClass} onClick={onClick}>
			<img src={icon} alt='' />
			{text}
		</div>
	);
}

export default ManageButton;


