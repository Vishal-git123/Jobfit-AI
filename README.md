# Jobfit-AI-Powered Resume Analyzer

Jobfit-AI is an AI-powered resume analysis platform that helps job seekers evaluate how well their resume matches a specific job description. It analyzes uploaded resumes, generates an ATS-style match score, and provides actionable AI-generated feedback to improve resume relevance and job application success.

## 🚀 Live Demo

> Add your deployed application URL here.

**Live Application:** `https://your-deployment-url.com`

---

## 📌 Overview

Jobfit-AI allows users to upload their resume in PDF format and provide a target job description. The platform extracts relevant resume information, analyzes it against the job requirements using AI, and generates a detailed compatibility report.

The platform is designed to help candidates:

* Understand how relevant their resume is to a job
* Identify missing or weak skills
* Improve resume alignment with job descriptions
* Track previous resume analyses
* Make data-driven improvements to their job applications

---

## ✨ Features

### 🤖 AI-Powered Resume Analysis

Analyze your resume against a specific job description and receive an AI-generated evaluation.

### 📊 Resume Match Score

Get a percentage-based match score indicating how closely your resume aligns with the target job description.

### 📝 Personalized Feedback

Receive actionable feedback highlighting areas where your resume can be improved.

### 📄 PDF Resume Upload

Upload resumes directly in PDF format for automated analysis.

### 📚 Analysis History

View previously analyzed resumes and review their scores, feedback, and analysis dates.

### 🔐 User Authentication

Secure user authentication allows users to access their personalized resume analysis history.

### ⚡ Responsive Interface

Designed with a clean and responsive interface for a smooth experience across different screen sizes.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS Modules
* Material UI
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* PDF Parser

### AI

* Cohere AI API

### Authentication

* Firebase Authentication

### Development Tools

* Git
* GitHub
* Nodemon

---

## 🏗️ Project Architecture

```text
ATSight
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   ├── pages/
│   │   ├── Utils/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔄 How It Works

```text
User
  │
  ▼
Upload Resume (PDF)
  │
  ▼
Enter Job Description
  │
  ▼
Frontend sends request
  │
  ▼
Express.js Backend
  │
  ├── Extract Resume Text
  │
  ├── Process Job Description
  │
  ▼
Cohere AI Analysis
  │
  ▼
Generate Match Score + Feedback
  │
  ▼
Store Analysis in MongoDB
  │
  ▼
Display Results
```

---

## 📊 Resume Analysis Flow

1. User signs in to the application.
2. User uploads a resume in PDF format.
3. User enters the target job description.
4. The frontend sends the resume and job description to the backend.
5. The backend extracts text from the uploaded PDF.
6. The resume content and job description are analyzed using Cohere AI.
7. The system generates:

   * Resume Match Score
   * Skill relevance
   * Missing skills
   * Improvement suggestions
   * Personalized feedback
8. The analysis is stored in MongoDB.
9. The user can view the result and access previous analyses through the History section.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB Atlas account
* Cohere API key
* Authentication provider credentials

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Vishal-git123/Jobfit-AI.git
```

```bash
cd Jobfit-AI
```

---

### 2. Install Frontend Dependencies

```bash
cd atsight
npm install
```

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
COHERE_API_KEY=your_cohere_api_key
```

Add any additional authentication-related environment variables required by your configuration.



## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm start
```

The backend will run on:

```text
http://localhost:4000
```

### Start Frontend

In a separate terminal:

```bash
cd atsight
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### User

| Method | Endpoint    | Description                         |
| ------ | ----------- | ----------------------------------- |
| POST   | `/api/user` | Create or retrieve user information |

### Resume

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| POST   | `/api/resume/addResume`   | Upload and analyze a resume             |
| GET    | `/api/resume/get/:userId` | Retrieve user's resume analysis history |

> API endpoints may vary depending on the current backend implementation.

---

## 🧠 AI Analysis

Jobfit-AI uses AI to compare the content of a resume with a target job description.

The analysis focuses on:

* Skills
* Technologies
* Job requirements
* Experience relevance
* Keyword alignment
* Resume strengths
* Missing qualifications
* Improvement opportunities

The resulting analysis helps candidates understand how effectively their resume communicates their suitability for a specific position.

---

## 🛡️ Security

The application follows basic security practices including:

* Environment variables for sensitive credentials
* `.env` excluded from Git
* Authentication-protected user data
* Server-side API key management
* MongoDB access controls

> API keys and database credentials should never be exposed in frontend code or committed to public repositories.

---


### Dashboard

> Add dashboard screenshot

### Resume Analysis

> Add analysis result screenshot

### Analysis History

> Add history page screenshot

---

## 🚀 Future Improvements

Planned improvements include:

* [ ] Advanced ATS keyword analysis
* [ ] Resume section-wise scoring
* [ ] AI-powered resume improvement suggestions
* [ ] Resume optimization recommendations
* [ ] Multiple resume version management
* [ ] Job description keyword extraction
* [ ] Resume builder
* [ ] Resume export functionality
* [ ] Support for additional document formats
* [ ] Improved analytics and visualizations

---

## 🎯 Use Cases
 Jobfit-AI can be useful for:

* Students applying for internships
* Fresh graduates preparing for placements
* Software engineers applying for jobs
* Professionals switching careers
* Candidates optimizing resumes for ATS systems

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

## 📄 License

This project is intended for educational and personal portfolio purposes.

---

## 👨‍💻 Author

**Vishal**

GitHub:
https://github.com/Vishal-git123

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---


