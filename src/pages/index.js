import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import styles from '../styles/index.module.css';

import Gateway from '@/components/Gateway';
import Board from '@/components/Board';
import Cmd from '@/components/Cmd';

const firebaseConfig = {
	apiKey: 'AIzaSyAN5AxEKvhLV7Oe1DaqR4f-8q3O01d3e94',
	authDomain: 'lowpan-6c3a4.firebaseapp.com',
	projectId: 'lowpan-6c3a4',
	storageBucket: 'lowpan-6c3a4.appspot.com',
	messagingSenderId: '204225718178',
	appId: '1:204225718178:web:243ed024c550894fd934fb',
	measurementId: 'G-K719XP2PD9',
	databaseURL:
		'https://lowpan-6c3a4-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const FIVE_SECONDS = 5000;

export default function Home() {
	const [boardData, setBoardData] = useState({
		'cpu-on-time': 0,
		'deep-lpm': 0,
		lpm: 0,
		'radio-listen': 0,
		'radio-off': 0,
		'radio-transmit': 0,
		'total-time': 0,
	});
	const [cmdData, setCmdData] = useState('');
	const [statusData, setStatusData] = useState({
		connected: 0,
		data: {
			baudrate: 0,
			device: '',
			port: '',
		},
	});
	const [gatewayData, setGatewayData] = useState({
		'cpu-thermal': {
			crit: 0.0,
			curr: 0.0,
			high: 0.0,
		},
		disk: {
			percent: 0.0,
			used: 0.0,
			total: 0.0,
		},
		mem: {
			percent: 0.0,
			used: 0.0,
			total: 0.0,
		},
		'cpu-usage': 0.0,
	});
	const [gatewayStatus, setGatewayStatus] = useState({
		connected: 0,
		'last-ping': '',
	});

	const [conn, setConn] = useState(false);

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);

		const boardDataRef = ref(db, 'board_data');
		const cmdDataRef = ref(db, 'cmd');
		const statusRef = ref(db, 'status');
		const gatewayDataRef = ref(db, 'gateway_data');
		const gatewayStatusRef = ref(db, 'gateway_status');
		const tempref = ref(db, 'gateway_status/last-ping');

		onValue(boardDataRef, (snapshot) => {
			const temp = snapshot.val();
			setBoardData(temp);
			console.log('Board Data: ', temp);
		});

		onValue(cmdDataRef, (snapshot) => {
			const temp = snapshot.val();
			setCmdData(temp);
			console.log('Cmd: ', temp);
		});

		onValue(statusRef, (snapshot) => {
			const temp = snapshot.val();
			setStatusData(temp);
			console.log('Status: ', temp);
		});

		onValue(gatewayDataRef, (snapshot) => {
			const temp = snapshot.val();
			setGatewayData(temp);
			console.log('Gateway Data: ', temp);
		});

		onValue(gatewayStatusRef, (snapshot) => {
			const temp = snapshot.val();
			setGatewayStatus(temp);
			console.log('Gateway Status: ', gatewayStatus);
		});

		const interval = // Check the timestamp of the last update every 5 seconds
			setInterval(() => {
				const currentTime = Date.now();
				let lastUpdate;

				// Check the timestamp of the last update for gateway_status reference
				onValue(tempref, (snapshot) => {
					lastUpdate = snapshot.val();
					console.log('lastUpdate: ', lastUpdate);
					const tempdate = new Date(lastUpdate);
					const timeSinceLastUpdate = currentTime - tempdate;

					if (timeSinceLastUpdate > FIVE_SECONDS) {
						setConn(false);
						console.log(
							'gateway_status has not been updated for the last 5 seconds.'
						);
					} else {
						setConn(true);
						console.log(
							'gateway_status has been updated within the last 5 seconds.'
						);
					}
				});
			}, FIVE_SECONDS);

		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className='background-circle'></div>
			<div className='background-square'></div>
			<div className={styles.gridContainer}>
				<Gateway gatewayData={gatewayData} conn={conn} />
				{conn ? (
					<div className={styles.boardContainer}>
						<Board boardData={boardData} statusData={statusData} />
						<div className={styles.terminalContainer}>
							<Cmd cmdData={cmdData} />
						</div>
					</div>
				) : (
					<div className={styles.instructions}>
						<span>• Check if your pi is connected to a network.</span>
						<span>• Replug the power supply of Pi.</span>
						<span>• Contact Technical Support.</span>
					</div>
				)}
			</div>
		</>
	);
}
