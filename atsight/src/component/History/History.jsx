import React from 'react'
import styles from './History.module.css';
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
const History = () => {
  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>
        <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "20px" }}
                  width={280}
                  height={280}
                  sx={{borderRadius:"20px"}}
                />
        <div className={styles.HistoryCard}>
          <div className={styles.cardPercentage}>80%</div>
          <h2>Frontend Developer</h2>
          <p>Resume Name : .ResumePdf</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            voluptatum, ea laborum neque magni, a vero libero impedit
            perferendis suscipit ducimus, fugit iusto dolorem doloribus ex
            aperiam dolore velit fuga.
          </p>
          <p>Dated: 4-7-26 </p>
        </div>
        <div className={styles.HistoryCard}>
          <div className={styles.cardPercentage}>80%</div>
          <h2>Frontend Developer</h2>
          <p>Resume Name : .ResumePdf</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            voluptatum, ea laborum neque magni, a vero libero impedit
            perferendis suscipit ducimus, fugit iusto dolorem doloribus ex
            aperiam dolore velit fuga.
          </p>
          <p>Dated: 4-7-26 </p>
        </div>
        <div className={styles.HistoryCard}>
          <div className={styles.cardPercentage}>80%</div>
          <h2>Frontend Developer</h2>
          <p>Resume Name : .ResumePdf</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            voluptatum, ea laborum neque magni, a vero libero impedit
            perferendis suscipit ducimus, fugit iusto dolorem doloribus ex
            aperiam dolore velit fuga.
          </p>
          <p>Dated: 4-7-26 </p>
        </div>
        <div className={styles.HistoryCard}>
          <div className={styles.cardPercentage}>80%</div>
          <h2>Frontend Developer</h2>
          <p>Resume Name : .ResumePdf</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            voluptatum, ea laborum neque magni, a vero libero impedit
            perferendis suscipit ducimus, fugit iusto dolorem doloribus ex
            aperiam dolore velit fuga.
          </p>
          <p>Dated: 4-7-26 </p>
        </div>
        <div className={styles.HistoryCard}>
          <div className={styles.cardPercentage}>80%</div>
          <h2>Frontend Developer</h2>
          <p>Resume Name : .ResumePdf</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            voluptatum, ea laborum neque magni, a vero libero impedit
            perferendis suscipit ducimus, fugit iusto dolorem doloribus ex
            aperiam dolore velit fuga.
          </p>
          <p>Dated: 4-7-26 </p>
        </div>
      </div>
    </div>
  );
}

export default WithAuthHOC (History)