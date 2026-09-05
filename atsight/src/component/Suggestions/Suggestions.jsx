import { useState, useEffect, useContext } from "react";
import styles from "./Suggestions.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
import axios from "../Utils/axios";
import { AuthContext } from "../Utils/AuthContext";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FeedbackIcon from "@mui/icons-material/Feedback";

const Suggestions = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [filterMode, setFilterMode] = useState("all");
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userInfo?._id) return;

      setLoader(true);
      setError(null);

      try {
        const results = await axios.get("/api/resume/get/" + userInfo._id);
        setData(results.data.resumes || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Failed to load your suggestions and feedback");
        setData([]);
      } finally {
        setLoader(false);  // ✅ FIX: THIS WAS COMMENTED OUT!
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

  const extractSection = (feedback, sectionName) => {
    const regex = new RegExp(`${sectionName}:\\s*\\n([\\s\\S]*?)(?=\\n\\w+:|$)`, "i");
    const match = feedback?.match(regex);
    if (match && match[1]) {
      return match[1]
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter((line) => line);
    }
    return [];
  };

  const filteredData = data.filter((item) => {
    if (filterMode === "all") return true;
    if (filterMode === "suggestions") {
      const suggestions = extractSection(item.feedback, "Suggestions");
      return suggestions.length > 0;
    }
    if (filterMode === "feedback") {
      const reasons = extractSection(item.feedback, "Reason");
      return reasons.length > 0;
    }
    return true;
  });

  return (
    <div className={styles.Suggestions}>
      <div className={styles.SuggestionsHeader}>
        <h1 className={styles.SuggestionsTitle}>💡 Suggestions & Feedback</h1>
        <p className={styles.SuggestionsSubtitle}>
          AI-powered insights to improve your resume and increase match scores
        </p>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterBtn} ${filterMode === "all" ? styles.active : ""}`}
          onClick={() => setFilterMode("all")}
        >
          All Results
        </button>
        <button
          className={`${styles.filterBtn} ${filterMode === "suggestions" ? styles.active : ""}`}
          onClick={() => setFilterMode("suggestions")}
        >
          <LightbulbIcon style={{ fontSize: 18, marginRight: 6 }} />
          Suggestions
        </button>
        <button
          className={`${styles.filterBtn} ${filterMode === "feedback" ? styles.active : ""}`}
          onClick={() => setFilterMode("feedback")}
        >
          <FeedbackIcon style={{ fontSize: 18, marginRight: 6 }} />
          Feedback
        </button>
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
      ) : filteredData.length === 0 ? (
        <div className={styles.emptyState}>
          <div style={{ fontSize: "48px" }}>💡</div>
          <h3>No Suggestions Yet</h3>
          <p>Analyze your resume on the Dashboard to get personalized suggestions and feedback.</p>
        </div>
      ) : (
        <div className={styles.SuggestionsCardBlock}>
          {filteredData.map((item) => {
            const suggestions = extractSection(item.feedback, "Suggestions");
            const reasons = extractSection(item.feedback, "Reason");
            const isExpanded = selectedId === item._id;

            return (
              <div
                key={item._id}
                className={`${styles.SuggestionsCard} ${isExpanded ? styles.expanded : ""}`}
                onClick={() => setSelectedId(isExpanded ? null : item._id)}
              >
                {/* Header Section */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={styles.cardPercentage}>{item.score}%</div>
                    <div>
                      <div className={styles.resumeName}>{item.resume_name}</div>
                      <div className={styles.cardDate}>📅 {formatDate(item.createdAt)}</div>
                    </div>
                  </div>
                  <div className={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</div>
                </div>

                {/* Job Description Preview */}
                <div className={styles.jobDescPreview}>
                  <strong>📋 Job Posted For:</strong>
                  <p>{item.job_desc?.substring(0, 80)}...</p>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={styles.expandedContent}>
                    {/* Feedback/Reasons Section */}
                    {reasons.length > 0 && (
                      <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                          <FeedbackIcon className={styles.sectionIcon} />
                          Analysis & Reasons
                        </div>
                        <ul className={styles.itemList}>
                          {reasons.map((reason, idx) => (
                            <li key={idx} className={styles.listItem}>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggestions Section */}
                    {suggestions.length > 0 && (
                      <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                          <LightbulbIcon className={styles.sectionIcon} />
                          Improvement Suggestions
                        </div>
                        <ul className={styles.itemList}>
                          {suggestions.map((suggestion, idx) => (
                            <li key={idx} className={styles.listItem}>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Full Feedback */}
                    <div className={styles.section}>
                      <div className={styles.sectionTitle}>📝 Complete Feedback</div>
                      <div className={styles.fullFeedback}>
                        {item.feedback}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WithAuthHOC(Suggestions);
