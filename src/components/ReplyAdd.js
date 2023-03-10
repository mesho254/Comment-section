import { useState, useRef, useContext } from 'react';
import commentSection from '../context/comments';
import Button from './Button';

function ReplyAdd({ id, onFocus }) {
	const { userDetails, addReply, mode } = useContext(commentSection);
	const [text, setText] = useState('');
	const image = require(`../${userDetails.image.png.slice(2)}`);
	const reference = useRef();

	const handleChange = () => {
		setText(reference.current.value);
	};

	let buttonToRender;
	id === 'new'
		? (buttonToRender = (
				<Button
					onClick={() => {
						addReply('new', text);
						setText('');
					}}>
					SEND
				</Button>
		  ))
		: (buttonToRender = (
				<Button onClick={() => addReply(id, text)} aria-label={'Reply'}>REPLY</Button>
		  ));

	let content;
	if (mode === 'desktop') {
		content = (
			<div className='comment-container'>
				<img
					className={'reply-add-img'}
					src={image}
					alt={userDetails.username}
				/>
				<textarea
					value={text}
					ref={reference}
					className={'reply-add-textarea'}
					onInput={handleChange}
					onFocus={onFocus}
					placeholder={'Add a comment...'}
				/>
				{buttonToRender}
			</div>
		);
	} else {
		content = (
			<div className='comment-container reply-add-container'>
				<textarea
					value={text}
					ref={reference}
					className={'reply-add-textarea'}
					onInput={handleChange}
					onFocus={onFocus}
					placeholder={'Add a comment...'}
				/>
				<div className='flex space-between vertical-center'>
					<img
						className={'reply-add-img'}
						src={image}
						alt={userDetails.username}
					/>

					{buttonToRender}
				</div>
			</div>
		);
	}

	return content;
}

export default ReplyAdd;
