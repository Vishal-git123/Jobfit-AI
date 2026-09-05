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
    console.log("FULL USER INFO:", userInfo);
    console.log("USER ID:", userInfo?._id);
    console.log("RESUME FILE:", resumeFile);
    console.log("JOB DESCRIPTION:", jobDesc);

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
    
    console.log("FORM DATA:");
    console.log("resume:", formData.get("resume"));
    console.log("user:", formData.get("user"));
    console.log("job_desc:", formData.get("job_desc"));

    setLoading(true);

    try {
      const response = await axios.post("/api/resume/addResume", formData);
      console.log("Resume Analysis Response:", response.data);
      setResult(response.data.data);
    } catch (err) {
      console.error("Resume Upload Error:", err.response?.data || err.message);
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
          <div>Important Instructions</div>
          <div className={styles.dashboardInstruction}>
            <div>
              Please paste the complete job description in the "Job Description"
              field before submitting.
            </div>
            <div>Only PDF Format (.pdf) resumes are accepted.</div>
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
            {error}
          </div>
        )}
        
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            {resumeFile ? '✓ ' : '📄 '}{uploadFiletext}
          </div>
          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              Upload Resume
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
              placeholder="Paste Your Job Description (e.g., Job requirements, skills needed, experience level)"
              rows={8}
            />
            <div className={styles.AnalyzeBtn} onClick={handleUpload}>
              {loading ? '...' : 'Analyze'}
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div>Analyze with AI</div>
          <img className={styles.profileImg} src={userInfo?.photoUrl} alt="Profile" />
          <h2>{userInfo?.name}</h2>
        </div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>Analysis Result</div>
            <div className={styles.scoreDisplay}>
              <h1>{result.score}%</h1>
              <ScoreIcon style={{fontSize: 50, color: '#667eea'}} />
            </div>
            <div className={styles.Feedback}>
              <h3>Feedback</h3>
              <p>{result?.feedback}</p>
            </div>
          </div>
        )}
        
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "15px" }}
            width="100%"
            height={280}
          />
        )}
      </div>
    </div>
  );
}

export default WithAuthHOC(Dashboard);