import { useContext } from 'react';

import ReplyAdd from './components/ReplyAdd';
import Comment from './components/Comment';
import commentSection from './context/comments'

function App() {
	const { postComments } = useContext(commentSection)
	
	const comments = postComments.map((comment) => {
		return (
			<Comment
				key={comment.id}
				comment={comment}
			/>
		);
	});
	return (
		<div className='container'>
			{comments}
			<ReplyAdd
				id={'new'}
			/>
		</div>
	);
}

export default App;
