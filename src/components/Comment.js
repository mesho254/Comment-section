import { useContext } from 'react';
import commentSection from '../context/comments';

import ScoreCounter from './ScoreCounter';
import CommentControlBar from './CommentControlBar';
import ReplyDisplay from './ReplyDisplay';
import ReplyAdd from './ReplyAdd';
import EditComment from './EditComment';
import CommentDetails from './CommentDetails';

function Comment({ comment }) {
	const { closeOpenedSections, postComments, mode } = useContext(commentSection);

	const textContent = (
		<p className='comment-content-text'>
			{comment.replyingTo ? (
				<span className='reply-to'>@{comment.replyingTo} </span>
			) : null}{' '}
			{comment.content}
		</p>
	);

	let content;

	if (mode === 'desktop') {
		content = (
			<div className='container'>
				<div className='comment-container'>
					<div>
						<ScoreCounter id={comment.id} score={comment.score} />
					</div>
					<div className='container'>
						<div className='container'>
							<CommentControlBar comment={comment} />
							{comment.editOpen ? (
								<EditComment comment={comment} />
							) : (
								textContent
							)}
						</div>
					</div>
				</div>
				{comment.addAnswer ? <ReplyAdd id={comment.id} /> : null}
				<ReplyDisplay
					comment={comment}
					onFocus={() => closeOpenedSections(postComments)}
				/>
			</div>
		);
	} else {
		content = (
			<div className='container'>
				<div className='comment-container'>
					<div className='container'>
						<div className='container'>
						<CommentDetails comment={comment}/>
							{comment.editOpen ? (
								<EditComment comment={comment} />
							) : (
								textContent
							)}
							<div className='flex space-between vertical-center'>
								<ScoreCounter id={comment.id} score={comment.score} />
								<CommentControlBar comment={comment} />
							</div>
						</div>
					</div>
				</div>
				{comment.addAnswer ? <ReplyAdd id={comment.id} /> : null}
				<ReplyDisplay
					comment={comment}
					onFocus={() => closeOpenedSections(postComments)}
				/>
			</div>
		);
	}

	return content;
}

export default Comment;
