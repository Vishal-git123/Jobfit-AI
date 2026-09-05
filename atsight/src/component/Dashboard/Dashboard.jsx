import React, { useState } from 'react'
import styles from './Dashboard.module.css';
import ScoreIcon from "@mui/icons-material/Score";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../Utils/HOC/withAuthHOC";
import axios from '../Utils/axios'
import { useContext } from "react";
import { AuthContext } from "../Utils/AuthContext";

const Dashboard = () => {
   const { userInfo } = useContext(AuthContext);
  const [uploadFiletext,setUploadFiletext] = useState("Upload your resume");
  const [loading,setLoading] = useState(false);
  const [resumeFile,setResumeFile] = useState(null);
  const [jobDesc,setjobDesc] = useState("");
  const [result,setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const handleonChangeFile = (e)=>{
    setResumeFile(e.target.files[0]);
    setUploadFiletext(e.target.files[0].name)
  }
  
 const handleUpload = async () => {
    setResult(null);
    setError(null);

    if (!jobDesc || !resumeFile) {
      setError("Please fill Job Description & upload Resume");
      return;
    }

    if (!userInfo?._id) {
      setError("User information not available");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("user", userInfo._id);
    formData.append("job_desc", jobDesc);

    setLoading(true);

    try {
      const response = await axios.post("/api/resume/addResume", formData);
      setResult(response.data.data);
      // Clear form after successful analysis
      setjobDesc("");
      setResumeFile(null);
      setUploadFiletext("Upload your resume");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while analyzing resume");
    } finally {
      setLoading(false);
    }
  };
  
   return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>
            Smart Resume Screening
          </div>
          <div className={styles.DashboardHeaderLargeTitle}>
            Resume Match Score
          </div>
        </div>
        
        <div className={styles.alertInfo}>
          <div>⚡ Important Instructions</div>
          <div className={styles.dashboardInstruction}>
            <div>✓ Paste the complete job description in the field below</div>
            <div>✓ Upload resume in PDF format only (.pdf)</div>
            <div>✓ Our AI will analyze your match score instantly</div>
          </div>
        </div>
        
        {error && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid #dc3545',
            borderRadius: '10px',
            padding: '12px 15px',
            marginBottom: '20px',
            color: '#dc3545',
            fontSize: '14px'
          }}>
            ❌ {error}
          </div>
        )}
        
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            {resumeFile ? '✓ ' : '📄 '}{uploadFiletext}
          </div>
          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              📁 Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              id="inputField"
              onChange={handleonChangeFile}
            />
          </div>

          <div className={styles.jobDesc}>
            <textarea
              value={jobDesc}
              onChange={(e) => {
                setjobDesc(e.target.value);
              }}
              className={styles.textArea}
              placeholder="📋 Paste Your Job Description here...\n\nExample:\n- Required skills (Python, React, etc)\n- Years of experience needed\n- Key responsibilities\n- Education requirements\n- Salary range (optional)"
              rows={8}
            />
            <button 
              className={styles.AnalyzeBtn} 
              onClick={handleUpload}
              disabled={loading}
              title={loading ? "Analyzing..." : "Click to analyze your resume"}
            >
              {loading ? '⏳' : '🚀 Analyze'}
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div>👤 Analyze with AI</div>
          <img className={styles.profileImg} src={userInfo?.photoUrl} alt="Profile" />
          <h2 style={{margin: '0', fontSize: '16px'}}>{userInfo?.name}</h2>
        </div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>✨ Analysis Result</div>
            <div className={styles.scoreDisplay}>
              <h1>{result.score}%</h1>
              <ScoreIcon style={{fontSize: 50, color: '#fca326'}} />
            </div>
            <div className={styles.Feedback}>
              <h3>💡 Feedback</h3>
              <p>{result?.feedback?.substring(0, 200)}...</p>
            </div>
          </div>
        )}
        
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "15px" }}
            width="100%"
            height={220}
          />
        )}
      </div>
    </div>
  );
}

export default WithAuthHOC(Dashboard);
