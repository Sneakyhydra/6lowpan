import React, { useEffect } from 'react';

import styles from '../styles/components/Board.module.css';

const renderConnectionStatus = (statusData) => {
  if(statusData.connected == 0) {
    return (
      <div className={styles.notConnected}>
        <div className={styles.msgSize}>•Not Connected</div>
      </div>
    )
  } else {
    return (
      <div className={styles.connected}>
        <div className={styles.msgSize}>•Connected to LaunchXL-CC2650</div>
      </div>
    )
  }
};

const renderBoardData = (boardData, statusData) => {
  
  
  return (
    <div className={styles.gridCol4}>
      <div className={styles.gridItem}>
          <div>CPU-on-Time</div>
          <div>{statusData.connected != 0 ? boardData["cpu-on-time"] : 0}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Radio Listen</div>
          <div>{statusData.connected != 0 ? boardData["radio-listen"] : 0}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>LPM</div>
          <div>{statusData.connected != 0 ? boardData["lpm"] : 0}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Total Time</div>
          <div>{statusData.connected != 0 ? boardData["total-time"] : 0}s</div>
        </div>
    </div>
  )
  
};

const Board = ({statusData, boardData}) => {
  useEffect(() => {
    console.log("Status Data: ", statusData)
    console.log("Board Data: ", boardData);
  }, []);
  
  
  return (
    <div>
      <div className={styles.boardContainer}>
        {renderConnectionStatus(statusData)}
        {renderBoardData(boardData, statusData)}
      </div>
    </div>
  )
}

export default Board;