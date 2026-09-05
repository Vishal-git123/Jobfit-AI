import { useState, useEffect, useContext } from "react";
import styles from "./History.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
import axios from "../Utils/axios";
import { AuthContext } from "../Utils/AuthContext";

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userInfo?._id) return;

      setLoader(true);
      setError(null);

      try {
        const results = await axios.get("/api/resume/get/" + userInfo._id);
        console.log("Resume History:", results.data.resumes);
        setData(results.data.resumes || []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load your resume history");
        setData([]);
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, [userInfo?._id]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString?.slice(0, 10) || "N/A";
    }
  };

  return (
    <div className={styles.History}>
      <div className={styles.HistoryHeader}>
        <h1 className={styles.HistoryTitle}>Analysis History</h1>
        <p className={styles.HistorySubtitle}>
          Review your previous resume analyses and match scores
        </p>
      </div>

      {loader ? (
        <div className={styles.skeletonGrid}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="100%"
              height={280}
              sx={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      ) : error ? (
        <div className={styles.emptyState}>
          <div style={{ fontSize: "48px" }}>⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      ) : data.length === 0 ? (
        <div className={styles.emptyState}>
          <div style={{ fontSize: "48px" }}>📄</div>
          <h3>No Analyses Yet</h3>
          <p>Start by uploading your resume to the Dashboard to see your analysis here.</p>
        </div>
      ) : (
        <div className={styles.HistoryCardBlock}>
          {data.map((item) => (
            <div key={item._id} className={styles.HistoryCard}>
              <div className={styles.cardPercentage}>{item.score}%</div>

              <div className={styles.cardLabel}>Resume Name</div>
              <p className={styles.cardContent}>
                <strong>{item.resume_name}</strong>
              </p>

              {item.feedback && (
                <div className={styles.cardFeedback}>
                  <strong>Feedback:</strong>
                  <p>{item.feedback.substring(0, 150)}...</p>
                </div>
              )}

              <div className={styles.cardDate}>
                📅 {formatDate(item.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WithAuthHOC(History);