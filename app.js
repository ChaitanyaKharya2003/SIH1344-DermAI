const express = require("express");
const multer = require("multer");
const { mkdir } = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { rmdir } = require("fs");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
// Set up multer for file uploads
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/info", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "info.html"));
});
app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  console.log("File Uploaded Successfully ", "No error");
  // Create a Python child process to execute the TensorFlow script
  const process = spawn("python", ["./predict.py"], {
    stdio: ["pipe", "pipe", "pipe"],
    // input: req.file.buffer,
  });

  let predictedDisease = "";
  // let treatment = "";
  process.stdout.on("data", (data) => {
    output = data.toString();
    predictedDisease += output;

    // treatment += output[1];
  });
  console.log(req.file.buffer);
  process.stdin.write(req.file.buffer.toString());
  process.stdin.end();
  process.on("exit", (code) => {
    if (code === 0) {
      res.render("result", { disease: predictedDisease.trim() });
      res.json({
        disease: predictedDisease.trim(),
        // treatment: treatment.trim(),
      });
    } else {
      res.status(500).json({ error: "Prediction failed." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
