const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const AUTHOR = "April Manalo";

// ✅ Predefined TikTok links
const tiktokLinks = [
  "https://www.tiktok.com/@kigs.prismprincesses/video/7469451797128547602",
  "https://www.tiktok.com/@vix.max/video/7458826851557952774",
  "https://www.tiktok.com/@mrbeast/video/7279840834071438597"
];

// ✅ Randomly select one from the array
function getRandomTikTokLink() {
  const index = Math.floor(Math.random() * tiktokLinks.length);
  return tiktokLinks[index];
}

// ✅ TikWM scraping function
async function getTikTokData(url) {
  try {
    const api = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const res = await axios.get(api, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = res.data;

    if (data.code !== 0 || !data.data?.play) {
      return {
        original_url: url,
        error: "❌ Failed to fetch video",
        author: AUTHOR
      };
    }

    return {
      original_url: url,
      video_url: data.data.hdplay || data.data.play || "❌ No video URL",
      title: data.data.title || "Untitled",
      tiktok_author: data.data.author?.nickname || "Unknown",
      author: AUTHOR
    };
  } catch (err) {
    return {
      original_url: url,
      error: `❌ ${err.message}`,
      author: AUTHOR
    };
  }
}

// ✅ Main endpoint
app.get("/shoti", async (req, res) => {
  const start = Date.now();

  const selectedUrl = getRandomTikTokLink();
  const result = await getTikTokData(selectedUrl);

  const responseTime = `${Date.now() - start}ms`;

  res.json({
    status: "success",
    timestamp: new Date().toISOString(),
    response_time: responseTime,
    generated_by: AUTHOR,
    result
  });
});

// ✅ Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Shoti API by ${AUTHOR} running at http://localhost:${PORT}`);
});
