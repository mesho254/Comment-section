
import { useContext } from 'react';
import plusIcon from '../images/icon-plus.svg';
import minusIcon from '../images/icon-minus.svg';
import commentSection from '../context/comments';

function ScoreCounter({ id, score }) {
	const { handleScoreChange, mode } = useContext(commentSection);
	let orientationClass;
	mode === 'desktop' ? (orientationClass = 'score_counter-container-vertical')
		: (orientationClass = 'score_counter-container-horizontal');

	const handleChange = (id, sign) => {
		if (score === 0 && sign === '-') return;
		else if (score === 999 && sign === '+') return;
		else handleScoreChange(id, sign);
	};

	return (
		<div className={`score_counter-container ${orientationClass}`}>
			<button
				onClick={() => {
					handleChange(id, '+');
				}}
				className='score_counter-button'
				aria-label={'Vote'}>
				<img className='score_counter-img' src={plusIcon} alt='' />
			</button>
			<span className='score_counter-score'>{score}</span>
			<button
				aria-label={'Downvote'}
				onClick={() => {
					handleChange(id, '-');
				}}
				className='score_counter-button'>
				<img className='score_counter-img' src={minusIcon} alt='' />
			</button>
		</div>
	);
}

export default ScoreCounter;
