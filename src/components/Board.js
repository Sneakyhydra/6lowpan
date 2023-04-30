import React, { useEffect } from 'react';
import Image from 'next/image';
import launchxl from '/public/img/launchxl.png';

import styles from '../styles/components/Board.module.css';

const renderConnectionStatus = (statusData, boardData) => {
	if (statusData.connected == 0) {
		return (
			<div className={styles.notConnected}>
				<div className={styles.msgSize}>• No Devices Connected</div>
			</div>
		);
	} else {
		return (
			<>
				<div className={styles.imageContainer}>
					<Image src={launchxl} alt='' height={180} />
					<div className={styles.imageTag}>LaunchXL-CC2650</div>
				</div>
				{renderBoardData(boardData, statusData)}
			</>
		);
	}
};

const renderBoardData = (boardData, statusData) => {
	return (
		<div className={styles.gridCol4}>
			<div className={styles.gridItem}>
				<div className={styles.indivDataTitle}>CPU Ontime</div>
				<div className={styles.indivData}>
					{statusData.connected != 0 ? boardData['cpu-on-time'] : 0}s
				</div>
			</div>
			<div className={styles.gridItem}>
				<div className={styles.indivDataTitle}>Radio Listening</div>
				<div className={styles.indivData}>
					{statusData.connected != 0 ? boardData['radio-listen'] : 0}s
				</div>
			</div>
			<div className={styles.gridItem}>
				<div className={styles.indivDataTitle}>Low Power Mode</div>
				<div className={styles.indivData}>
					{statusData.connected != 0 ? boardData['lpm'] : 0}s
				</div>
			</div>
			<div className={styles.gridItem}>
				<div className={styles.indivDataTitle}>Total Time</div>
				<div className={styles.indivData}>
					{statusData.connected != 0 ? boardData['total-time'] : 0}s
				</div>
			</div>
		</div>
	);
};

const Board = ({ statusData, boardData }) => {
	useEffect(() => {
		console.log('Status Data: ', statusData);
		console.log('Board Data: ', boardData);

		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className={styles.boardContainer}>
				{renderConnectionStatus(statusData, boardData)}
			</div>
		</div>
	);
};

export default Board;
