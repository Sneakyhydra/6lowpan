import React from 'react';
import styles from '../styles/components/StatusData.module.css';
import Image from 'next/image';

const renderHorizontalLine = (isConnected) => {
    if(isConnected == 0) {
        return <hr className={styles.redLine}></hr>
    }
    return <hr className={styles.greenLine}></hr>
}

const renderMessage = (isConnected) => {
    if(isConnected == 0) {
        return <p className={styles.redMessage}>You are not connected to any device yet!</p>
    }
    return <p className={styles.greenMessage}>Connected to LaunchXL-CC2650!</p>
}

const StatusData = ({statusData}) => {
  return (
    <>
        {renderHorizontalLine(statusData.connected)}
        {renderMessage(statusData.connected)}
        {/* {renderImage(statusData.connected)} */}
    </>
  )
}

export default StatusData;