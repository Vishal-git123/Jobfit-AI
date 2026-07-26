require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

require("./conn");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "https://jobfit-ai-xi.vercel.app",
  }),
);

const UserRoutes = require("./Routes/user");
const ResumeRoutes = require("./Routes/Resume");

app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Backend is running on port", PORT);
});
