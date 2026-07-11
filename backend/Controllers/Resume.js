const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "cg9JnTGnukwiDuC9xh8OxIM5wnMQJQMJRyfp9dkE", // ya testing ke liye apni API key
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    const pdfPath = req.file.path;
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

    const result = response.text;
    const match = result.match(/Score:\s*(\d+)/);
    const score = match?parseInt(match[1],10):null
    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
    const reason = reasonMatch?reasonMatch[1].trim():null;
    const newResume = new ResumeModel({
        user,
        resume_name:req.file.originalname,
        job_desc,
        score,
        feedback:reason
    });
    await newResume.save();
    fs.unlinkSync(pdfPath);
    res.status(200).json({
      message: "Your analysis are ready",data : newResume
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllResumesForUser = async (req, res) => {
  try {
    {
      const { user } = req.params;
      let resumes = await ResumeModel.find({ user: user }).sort({
        createdAt: -1,
      });
      return res
        .status(200)
        .json({ message: "Your Previous History", resumes: resumes });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Server error", message: err.message });
  }
};

exports.getResumeForAdmin = async (req, res) => {
  try {
    {
      const { user } = req.params;
      let resumes = await ResumeModel.find({ }).sort({
        createdAt: -1,
      });
      return res
        .status(200)
        .json({ message: "Fetched all History", resumes: resumes });

    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Server error", message: err.message });
  }
};
