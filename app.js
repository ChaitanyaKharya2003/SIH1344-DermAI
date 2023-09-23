const express = require("express");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.use(express.static("public"));
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  //   console.log("hello");
  //   Create a Python child process to execute the TensorFlow script
  // const process = spawn("python", ["./predict.py"], {
  //   stdio: "inherit",
  //   input: req.file.buffer,
  // });

  // let predictedDisease = "";
  // let treatment = "";
  // process.stdout.on("data", (data) => {
  //   output = data.toString().split(",,");
  //     predictedDisease += output[0];
  //     treatment += output[1];
  // });

  // process.on("exit", (code) => {
  //   if (code === 0) {
  //       res.json({
  //           disease: predictedDisease.trim(),
  //           treatment: treatment.trim()    });
  //   } else {
  //     res.status(500).json({ error: "Prediction failed." });
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
