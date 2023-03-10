import { useContext } from 'react';
import commentSection from '../context/comments';
import ScoreCounter from './ScoreCounter';
import CommentDetails from './CommentDetails';
import CommentControlBar from './CommentControlBar';
import ReplyAdd from './ReplyAdd';
import EditComment from './EditComment';

function ReplyDisplay({ comment }) {
	const { mode } = useContext(commentSection);
	const replies = [...comment.replies].map((reply) => {
		const textContent = (
			<p className='comment-content-text'>
				{reply.replyingTo ? (
					<span className='reply-to'>@{reply.replyingTo} </span>
				) : null}
				{reply.content}
			</p>
		);
		let content;

		if (mode === 'desktop') {
			content = (
				<div key={reply.id} className='reply-container'>
					<div className='reply-line-container'>
						<div className='reply-line'></div>
						<div></div>
					</div>
					<div className='container'>
						<div className='comment-container'>
							<div>
								<ScoreCounter id={reply.id} score={reply.score} />
							</div>
							<div className='container'>
								<CommentControlBar comment={reply} />
								{reply.editOpen ? <EditComment comment={reply} /> : textContent}
							</div>
						</div>
						{reply.addAnswer ? <ReplyAdd id={reply.id} /> : null}
					</div>
				</div>
			);
		} else {
			content = (
				<div key={reply.id} className='reply-container'>
					<div className='reply-line-container'>
						<div className='reply-line'></div>
						<div></div>
					</div>
					<div className='container'>
						<div className='comment-container'>
							<div className='container'>
								<CommentDetails comment={reply} />
								{reply.editOpen ? <EditComment comment={reply} /> : textContent}
								<div className='flex space-between vertical-center'>
									<ScoreCounter id={reply.id} score={reply.score} />
									<CommentControlBar comment={reply} />
								</div>
							</div>
						</div>
						{reply.addAnswer ? <ReplyAdd id={reply.id} /> : null}
					</div>
				</div>
			);
		}

		return content;
	});
	return replies;
}

export default ReplyDisplay;
