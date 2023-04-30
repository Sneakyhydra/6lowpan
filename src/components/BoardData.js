import React from "react";
import styles from "../styles/components/BoardData.module.css";

const BoardData = ({boardData}) => {
  return (
    <div className={styles.boardData}>
      <div className={styles.gridRow4}>
        <div className={styles.gridItem}>
          <div>CPU-on-Time</div>
          <div>{boardData["cpu-on-time"]}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Deep-LPM</div>
          <div>{boardData["deep-lpm"]}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>LPM</div>
          <div>{boardData["lpm"]}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Total Time</div>
          <div>{boardData["total-time"]}s</div>
        </div>
      </div>
      <div className={styles.gridRow3}>
        <div className={styles.gridItem}>
          <div>Radio Listen</div>
          <div>{boardData["radio-listen"]}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Radio Transmit</div>
          <div>{boardData["radio-transmit"]}s</div>
        </div>
        <div className={styles.gridItem}>
          <div>Radio Off</div>
          <div>{boardData["radio-off"]}s</div>
        </div>
      </div>
    </div>
  );
};

export default BoardData;
