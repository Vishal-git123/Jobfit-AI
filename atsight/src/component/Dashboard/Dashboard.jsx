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
  const [uploadFiletext, setUploadFiletext] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setjobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleonChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFiletext(e.target.files[0].name)
  }

  const handleUpload = async () => {
    setResult(null);
    if (!jobDesc || !resumeFile) {
      alert('Please fill job Description & upload Resume');
      return;
    }
    
    if (resumeFile.type !== 'application/pdf') {
      alert('Only PDF files are accepted');
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo);

    try {
      setLoading(true);
      const response = await axios.post('/api/resume/addResume', formData);
      setResult(response.data);
      console.log('Analysis Result:', response.data);
    } catch (err) {
      console.error('Error:', err);
      alert('Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>{uploadFiletext}</div>
          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              Upload Resume
            </label>
            <input type="file" accept=".pdf" id="inputField" onChange={handleonChangeFile} />
          </div>

          <div className={styles.jobDesc}>
            <textarea
              value={jobDesc}
              onChange={(e) => { setjobDesc(e.target.value) }}
              className={styles.textArea}
              placeholder='Paste Your Job Description'
              rows={10}
              cols={50}
            />
            <div
              className={styles.AnalyzeBtn}
              onClick={handleUpload}
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={280}
            height={280}
          />
        ) : result ? (
          <div className={styles.DashboardRightTopCard}>
            <div>Analysis Result</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
              <h1>{result.matchScore || 0}%</h1>
              <ScoreIcon />
            </div>
            <div className={styles.Feedback}>
              <h3>Feedback</h3>
              <p>{result.feedback || 'No feedback available'}</p>
            </div>
          </div>
        ) : (
          <div className={styles.DashboardRightTopCard}>
            <div>Analyze with AI</div>
            <img
              className={styles.profileImg}
              src="https://static.vecteezy.com/system/resources/previews/000/180/981/original/vector-graphic-designer-resume.jpg"
              alt="Resume analysis"
            />
            <h2>{userInfo?.name || 'User'}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default WithAuthHOC(Dashboard);
