import { useState, useContext } from 'react';
import commentSection from '../context/comments';
import ManageButton from './ManageButton';
import CommentDetails from './CommentDetails';
import Modal from './Modal';

function CommentControlBar({ comment }) {
	const { showReplyWindow, userDetails, delComment, mode } =
		useContext(commentSection);
	const [modalVisible, setModalVisibility] = useState(false);

	const hideModal = (e) => {
		e.stopPropagation();
		setModalVisibility(false);
	};

	const handleEdit = () => {
		showReplyWindow(comment.id, 'editOpen');
	};

	const replyButton = (
		<ManageButton type='reply' onClick={() => showReplyWindow(comment.id)} />
	);

	const manageButtons = (
		<div className='flex'>
			<ManageButton type='delete' onClick={() => setModalVisibility(true)} />
			<ManageButton type='edit' onClick={() => handleEdit()} />
		</div>
	);

	let displayedButtons;
	let desktopView;

	mode === 'desktop'
		? (desktopView = <CommentDetails comment={comment} />)
		: (desktopView = null);

	userDetails.username === comment.user.username
		? (displayedButtons = manageButtons)
		: (displayedButtons = replyButton);
	return (
		<div className={mode === 'desktop' ? 'comment-content' : ''}>
			{modalVisible ? (
				<Modal onCancel={hideModal} onConfirm={() => delComment(comment.id)} />
			) : null}
			{desktopView}
			{displayedButtons}
		</div>
	);
}
export default CommentControlBar;
