import React, { useEffect } from 'react';
import Image from 'next/image';

import styles from '../styles/components/Gateway.module.css';

import raspberry_pi_3 from '/public/img/raspberry_pi_3.png';



const Gateway = ({gatewayData, gatewayStatus}) => {

    useEffect(() => {
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
	}

    return (
    <div className={styles.gridContainer}>
        <div className={styles.imageContainer}>
            <Image src={raspberry_pi_3} alt="" height={150} />
            <div className={styles.imageTag}>Raspberry Pi 3</div>
            {/* <div className={styles.connected}>•Connected</div> */}
        </div>

        <div className={styles.dataContainer}>
            <div className={styles.indivDataContainer}>
                <div className={styles.indivDataTitle}>
                    CPU Thermal
                </div>
                <div className={styles.indivData}>
                    {isGateWayConnected() ? 
                    `${gatewayData['cpu-thermal'].crit} ${gatewayData['cpu-thermal'].curr}/${gatewayData['cpu-thermal'].high}°C` :
                    `0 0/0°C` }
                </div>
            </div>
            <div className={styles.indivDataContainer}>
                <div className={styles.indivDataTitle}>
                    Disk Usage
                </div>
                <div className={styles.indivData}>
                    {isGateWayConnected() ? 
                    `${gatewayData['disk'].percent}% (${gatewayData['disk'].used.toFixed(2)}/${gatewayData['disk'].total.toFixed(2)} GB)` :
                    `0 0/0 GB` }
                </div>
            </div>
            <div className={styles.indivDataContainer}>
                <div className={styles.indivDataTitle}>
                    Memory Usage
                </div>
                <div className={styles.indivData}>
                    {isGateWayConnected() ? 
                    `${gatewayData['mem'].percent}% (${gatewayData['mem'].used.toFixed(2)}/${gatewayData['mem'].total.toFixed(2)} MB)` :
                    `0 0/0 MB` }
                </div>
            </div>
            <div className={styles.indivDataContainer}>
                <div className={styles.indivDataTitle}>
                    CPU Usage
                </div>
                <div className={styles.indivData}>
                    {isGateWayConnected() ? 
                    `${gatewayData['cpu-usage']}%` :
                    `0%` }
                </div>
            </div>
        </div>

    </div>
  )
}

export default Gateway;