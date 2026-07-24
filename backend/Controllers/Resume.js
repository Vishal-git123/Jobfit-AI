const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // API key .env me rakho
});

exports.addResume = async (req, res) => {
  let pdfPath = null;

  try {
    const { job_desc, user } = req.body;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required.",
      });
    }

    pdfPath = req.file.path;

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    const prompt = `
You are an ATS Resume Screening Assistant.

Compare the following resume with the Job Description.

Resume:
${pdfData.text}

Job Description:
${job_desc}

Return ONLY in this format:

Score: XX/100

Reason:
- Point 1
- Point 2
- Point 3

Suggestions:
- Suggestion 1
- Suggestion 2
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
      temperature: 0.3,
    });

    const result = response.text || "";

    const scoreMatch = result.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    const feedback = result;

    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback,
    });

    await newResume.save();

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data: newResume,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    // Delete uploaded pdf
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }
  }
};

exports.getAllResumesForUser = async (req, res) => {
  try {
    const { user } = req.params;

    const resumes = await ResumeModel.find({ user }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Your Previous History",
      resumes,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

exports.getResumeForAdmin = async (req, res) => {
  try {
    const resumes = await ResumeModel.find({}).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Fetched all History",
      resumes,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};
