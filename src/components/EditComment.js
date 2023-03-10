import { useState, useRef, useContext } from 'react';
import commentSection from '../context/comments';
import Button from './Button';

function EditComment({ comment }) {
	const { editComment  } = useContext(commentSection);
	const [text, setText] = useState(comment.content);
	const reference = useRef();

	const handleChange = () => {
		setText(reference.current.value);
	};

	return (
		<div className='container'>
			<div className='edit-comment-container'>
				<textarea
					value={text}
					ref={reference}
					className={'reply-add-textarea edit-comment-textarea'}
					onInput={handleChange}
				/>
				<Button
					className={'margin-left'}
					onClick={() => editComment(comment.id, text)}
					aria-label={'Update'}>
					UPDATE
				</Button>
			</div>
		</div>
	);
}

export default EditComment;
