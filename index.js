const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Video Downloader API is running.");
});

app.get("/api/download", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "Video URL is required." });
  }

  try {
    const apiUrl = `https://video-downloader-api.p.rapidapi.com/api/download?url=${encodeURIComponent(videoUrl)}`;

    const options = {
      method: 'GET',
      url: apiUrl,
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'video-downloader-api.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("Download error:", error.message);
    res.status(500).json({ error: "Error fetching download link" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
