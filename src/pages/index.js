import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import styles from '../styles/index.module.css';

import Gateway from '@/components/Gateway';
import Board from '@/components/Board';

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

export default function Home() {
	const [boardData, setBoardData] = useState({
		'cpu-on-time': 0,
		'deep-lpm': 0,
		'lpm': 0,
		'radio-listen': 0,
		'radio-off': 0,
		'radio-transmit': 0,
		'total-time': 0,
	});
	const [cmdData, setCmdData] = useState('');
	const [statusData, setStatusData] = useState({
		'connected': 0,
		'data': {
			'baudrate': 0,
			'device': '',
			'port': '',
		},
	});
	const [gatewayData, setGatewayData] = useState({
		'cpu-thermal': {
			'crit': 0.0,
			'curr': 0.0,
			'high': 0.0,
		},
		'disk': {
			'percent': 0.0,
			'used': 0.0,
			'total': 0.0,
		},
		'mem': {
			'percent': 0.0,
			'used': 0.0,
			'total': 0.0,
		},
		'cpu-usage': 0.0,
	});
	const [gatewayStatus, setGatewayStatus] = useState({
		'connected': 0,
		'last-ping': '',
	});


	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);

		const boardDataRef = ref(db, 'board_data');
		const cmdDataRef = ref(db, 'cmd');
		const statusRef = ref(db, 'status');
		const gatewayDataRef = ref(db, 'gateway_data');
		const gatewayStatusRef = ref(db, 'gateway_status');

		onValue(boardDataRef, (snapshot) => {
			const temp = snapshot.val();
			setBoardData(temp);
			console.log("Board Data: ", boardData);
		});
		
		onValue(cmdDataRef, (snapshot) => {
			const temp = snapshot.val();
			setCmdData(temp);
			console.log("Cmd: ", cmdData);
		});
		
		onValue(statusRef, (snapshot) => {
			const temp = snapshot.val();
			setStatusData(temp);
			console.log("Status: ", statusData);
		});

		onValue(gatewayDataRef, (snapshot) => {
			const temp = snapshot.val();
			setGatewayData(temp);
			console.log("Gateway Data: ", gatewayData);
		});

		onValue(gatewayStatusRef, (snapshot) => {
			const temp = snapshot.val();
			setGatewayStatus(temp);
			console.log("Gateway Status: ", gatewayStatus);
		});
	}, []);


	const isGateWayConnected = () => {
		// if time.now() - gatewayStatus['last-ping'] > 10 seconds then false else true
		const currDateTime = new Date();
		const lastPingDateTime = new Date(gatewayStatus['last-ping']);
		const diff = currDateTime - lastPingDateTime;
		const diffSeconds = diff / 1000;
		console.log("Curr: ", currDateTime);
		console.log("Last Ping: ", lastPingDateTime);
		console.log("Diff: ", diffSeconds);
		if (diffSeconds > 10) {
			return false;
		} else {
			return true;
		}
		return false;
	}

	return (
		<>
			<div className={styles.header}>Gateway to Raspberry Pi 3</div>
			{/* <BoardData boardData={boardData} />
			<StatusData statusData={statusData} /> */}

			<div className={styles.gridContainer}>
				<Gateway gatewayData={gatewayData} gatewayStatus={gatewayStatus} />
				{isGateWayConnected() ?
				<Board boardData={boardData} statusData={statusData} /> :
				<div className={styles.gatewayNotConnected}>•Not Connected to the Gateway!</div>}
			</div>

			<div className={styles.terminalContainer}>

			</div>
		</>
	);
}
