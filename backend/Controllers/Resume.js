const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClient } = require("cohere-ai");

exports.addResume = async (req, res) => {
  let pdfPath = null;

  try {
    // Check Cohere API Key
    console.log("COHERE KEY EXISTS:", !!process.env.COHERE_API_KEY);

    console.log("COHERE KEY LENGTH:", process.env.COHERE_API_KEY?.length);

    // Initialize Cohere Client
    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    // Get data from request
    const { job_desc, user } = req.body;

    console.log("========== REQUEST DATA ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("JOB DESC:", job_desc);
    console.log("USER:", user);
    console.log("==================================");

    // Check resume PDF
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required.",
      });
    }

    // Check Job Description
    if (!job_desc) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    // Check User
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is required.",
      });
    }

    // Store uploaded PDF path
    pdfPath = req.file.path;

    // Read PDF file
    const dataBuffer = fs.readFileSync(pdfPath);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    console.log("PDF TEXT LENGTH:", pdfData.text?.length);

    // Create AI Prompt
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

    console.log("Calling Cohere...");

    // Call Cohere API
    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
    });

    console.log("Cohere Response:", response);

    // Get AI response text
    const result = response.text || "";

    // Extract score
    const scoreMatch = result.match(/Score:\s*(\d+)/i);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    // Feedback
    const feedback = result;

    // Save resume analysis to MongoDB
    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback,
    });

    await newResume.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data: newResume,
    });
  } catch (err) {
    console.error("========== ADD RESUME ERROR ==========");

    console.error("Error Message:", err.message);

    console.error("Full Error:", err);

    console.error("Stack:", err.stack);

    console.error("======================================");

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  } finally {
    // Delete uploaded PDF after processing
    if (pdfPath && fs.existsSync(pdfPath)) {
      try {
        fs.unlinkSync(pdfPath);

        console.log("Uploaded PDF deleted successfully.");
      } catch (deleteError) {
        console.error("Error deleting PDF:", deleteError.message);
      }
    }
  }
};

// Get all resumes for a specific user
exports.getAllResumesForUser = async (req, res) => {
  try {
    const { user } = req.params;

    const resumes = await ResumeModel.find({
      user,
    }).sort({
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

// Get all resumes for admin
exports.getResumeForAdmin = async (req, res) => {
  try {
    const resumes = await ResumeModel.find({})
      .sort({
        createdAt: -1,
      })
      .populate("user");

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
