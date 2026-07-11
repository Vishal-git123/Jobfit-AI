const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://outliervishal_db_user:Vishal123@cluster0.pfdtokm.mongodb.net/?appName=Cluster0",
  )
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Somethen went wrong,", err);
  });
