import { useContext } from 'react';
import commentSection from '../context/comments';
import CreationTime from './TimeAgo';

function CommentDetails({ comment }) {
	const { userDetails } = useContext(commentSection);
	const image = require(`../${comment.user.image.png.slice(2)}`);

	let markCurrentUserComment
	userDetails.username === comment.user.username ? markCurrentUserComment = <span className='mark-current-user'>you</span> : markCurrentUserComment = null;
	
	return (
		<div className='comment-detail-container'>
			<img
				className='comment-detail-img'
				src={image}
				alt={comment.user.image.png}
			/>
			<p className='comment-detail-name'>
				{comment.user.username}{' '}
				{markCurrentUserComment}
				<span className='comment-detail-time'>
					<CreationTime date={comment.createdAt} />
				</span>
			</p>
		</div>
	);
}

export default CommentDetails;
