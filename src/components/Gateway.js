import Image from 'next/image';

import Gauge from './Gauge';
import styles from '../styles/components/Gateway.module.css';

import raspberry_pi_3 from '/public/img/raspberry_pi_3.png';

const Gateway = ({ gatewayData, conn }) => {
	return (
		<div className={styles.gridContainer}>
			{conn ? (
				<>
					<div className={styles.piSection}>
						<div className={styles.imageContainer}>
							<Image src={raspberry_pi_3} alt='' height={250} />
							<div className={styles.imageTag}>Raspberry Pi 3A+</div>
							{/* <div className={styles.connected}>•Connected</div> */}
						</div>
						<div className={styles.dataContainer}>
							<div className={styles.indivDataContainer}>
								<div className={styles.indivDataTitle}>CPU Thermal</div>
								<div className={styles.indivData}>
									{conn
										? `${gatewayData['cpu-thermal'].curr.toFixed(2)} °C`
										: `0°C`}
								</div>
							</div>
							<div className={styles.indivDataContainer}>
								<div className={styles.indivDataTitle}>Disk Usage</div>
								<div className={styles.indivData}>
									{conn
										? `${gatewayData['disk'].percent}% (${gatewayData[
												'disk'
										  ].used.toFixed(2)}/${gatewayData['disk'].total.toFixed(
												2
										  )} GB)`
										: `0 0/0 GB`}
								</div>
							</div>
							<div className={styles.indivDataContainer}>
								<div className={styles.indivDataTitle}>Memory Usage</div>
								<div className={styles.indivData}>
									{conn
										? `${gatewayData['mem'].percent}% (${gatewayData[
												'mem'
										  ].used.toFixed(2)}/${gatewayData['mem'].total.toFixed(
												2
										  )} MB)`
										: `0 0/0 MB`}
								</div>
							</div>
							<div className={styles.indivDataContainer}>
								<div className={styles.indivDataTitle}>CPU Usage</div>
								<div className={styles.indivData}>
									{conn ? `${gatewayData['cpu-usage']}%` : `0%`}
								</div>
							</div>
						</div>
					</div>

					<div>
						<Gauge min={0} max={100} val={gatewayData['cpu-usage']} />
					</div>
				</>
			) : (
				<div
					className={styles.gatewayNotConnected}
					style={{ gridColumn: '1 / span 2', placeItems: 'center' }}
				>
					• Pi Not Connected
				</div>
			)}
		</div>
	);
};

export default Gateway;
