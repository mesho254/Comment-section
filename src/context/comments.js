import { useState, useEffect, createContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import data from '../data';
import generateID from '../utilities/generateID';

import {
	loadLocalStoredComments,
	saveToLocal,
} from '../utilities/localStorage';
const commentSection = createContext();

function Provider({ children }) {
	const [postComments, setData] = useState(loadLocalStoredComments().comments);

	useEffect(() => {
		closeOpenedSections(postComments);
	}, []);

	const userDetails = data.currentUser;

	let mode
	useMediaQuery({ query: '(min-width: 576px)' }) === true ? mode = 'desktop' : mode = 'mobile';
	function closeOpenedSections(obj) {
		//addAnswer determines if reply window under current comment is opened
		//editOpen as above, related to edit post if post author is currentUser.username
		const addAnswerWindow = obj.map((comment) => {
			const replies = comment.replies.map((reply) => {
				return { ...reply, addAnswer: false, editOpen: false };
			});
			return { ...comment, replies, addAnswer: false, editOpen: false };
		});
		setData(addAnswerWindow);
		saveToLocal(addAnswerWindow);
	}

	const handleScoreChange = (id, sign) => {
		let incrementDirection;
		sign === '+' ? (incrementDirection = 1) : (incrementDirection = -1);
		const result = postComments.map((comment) => {
			if (comment.id === id) {
				return { ...comment, score: comment.score + 1 * incrementDirection };
			} else if (comment.replies.length) {
				//dive deeper into replies section
				const updatedReplies = comment.replies.map((reply) => {
					if (reply.id === id) {
						return { ...reply, score: reply.score + 1 * incrementDirection };
					} else return { ...reply };
				});
				return { ...comment, replies: updatedReplies };
			} else return comment;
		});
		const sortedData = sortComments(result)
		setData(sortedData);
		saveToLocal(sortedData)
	};

	const showReplyWindow = (id, value = 'addAnswer') => {
		// value may be 'addAnswer' to reply or 'editOpen' to edit. Determines if reply or edit window is opened

		if (value !== 'aadAnswer' && value !== 'editOpen') value = 'addAnswer';
		let secondValue; // is used to keep only one window open at a time.
		value === 'addAnswer'
			? (secondValue = 'editOpen')
			: (secondValue = 'addAnswer');
		const result = postComments.map((comment) => {
			const replies = comment.replies.map((reply) => {
				if (reply.id === id) {
					return { ...reply, [value]: !reply[value], [secondValue]: false };
				} else {
					return { ...reply, [value]: false, [secondValue]: false };
				}
			});
			if (comment.id === id) {
				return {
					...comment,
					replies,
					[value]: !comment[value],
					[secondValue]: false,
				};
			} else {
				return { ...comment, replies, [value]: false, [secondValue]: false };
			}
		});
		setData(result);
		saveToLocal(result)
	};

	const sortComments = (obj) => {
		const result = obj?.sort((a, b) => b.score - a.score);
		return result;
	};

	const addReply = (id, text) => {
		if (text === '') {
			closeOpenedSections(postComments);
			return;
		}

		const newComment = {
			id: generateID(postComments),
			content: text,
			createdAt: Date.now(),
			score: 0,
			user: {
				image: {
					png: userDetails.image.png,
					webp: userDetails.image.webp,
				},
				username: userDetails.username,
			},
		};
		let result;
		if (id === 'new') {
			newComment.replies = [];
			result = [...postComments, newComment];
		} else {
			result = postComments.map((comment) => {
				if (comment.id === id) {
					newComment.replyingTo = comment.user.username;
					return { ...comment, replies: [...comment.replies, newComment] };
				} else {
					const updatedReplies = comment.replies.map((reply) => {
						if (reply.id === id) {
							newComment.replyingTo = reply.user.username;
							return [reply, newComment];
						} else {
							return { ...reply };
						}
					});

					return { ...comment, replies: updatedReplies.flat() };
				}
			});
		}
		closeOpenedSections(result);
		saveToLocal(result);
	};

	const delComment = (id) => {
		const result = postComments.map((comment) => {
			const replies = comment.replies.filter((reply) => reply.id !== id);

			return { ...comment, replies };
		});
		const filteredResult = result.filter((comment) => comment.id !== id)
		setData(filteredResult);
		saveToLocal(filteredResult)
	};

	const editComment = (id, text) => {
		const result = postComments.map((comment) => {
			if (comment.id === id) {
				return { ...comment, content: text, editOpen: false };
			} else {
				const updatedReplies = comment.replies.map((reply) => {
					if (reply.id === id) {
						return { ...reply, content: text, editOpen: false };
					} else {
						return { ...reply };
					}
				});
				return { ...comment, replies: updatedReplies };
			}
		});
		setData(result);
		saveToLocal(result)
	};

	const valueToShare = {
		userDetails,
		postComments,
		handleScoreChange,
		showReplyWindow,
		addReply,
		delComment,
		editComment,
		mode
	};

	return (
		<commentSection.Provider value={{ ...valueToShare }}>
			{children}
		</commentSection.Provider>
	);
}

export { Provider };
export default commentSection;
