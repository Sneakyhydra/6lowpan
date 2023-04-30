import { useEffect } from 'react';
import styles from '../styles/components/Cmd.module.css';

const scrollToBottom = () => {
	const elem = document.getElementById('cmdlast');
	if (elem) {
		elem.scrollIntoView({ behavior: 'auto' });
	}
};

const Cmd = ({ cmdData }) => {
	useEffect(() => {
		const interval = setInterval(scrollToBottom, 10);
		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const interval = setInterval(scrollToBottom, 10);
		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, [cmdData]);

	const onChange = (e) => {
		M.updateTextFields();
		setCurrMess(e.target.value);
	};

	return (
		<div id='cmd' className={styles.cmdData}>
			{cmdData}
			<span id='cmdlast'></span>
		</div>
	);
};

export default Cmd;
