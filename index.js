const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// 👤 Author
const AUTHOR = "April Manalo";

// 🧩 TikTok Links
const tiktokLinks = [
  "https://www.tiktok.com/@kigs.prismprincesses/video/7469451797128547602",
  "https://www.tiktok.com/@vix.max/video/7458826851557952774",
  "https://www.tiktok.com/@mrbeast/video/7279840834071438597"
];

// 🔍 Scraper Function
async function getTikTokData(url) {
  if (!url || !url.startsWith("http")) {
    return {
      original_url: url,
      error: "❌ Invalid or empty link",
      author: AUTHOR
    };
  }

  try {
    const api = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const res = await axios.get(api, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
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
      video_url: data.data.play,
      title: data.data.title || "No title",
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

// 📡 API Endpoint
app.get("/shoti", async (req, res) => {
  const start = Date.now();

  // Parallel fetch for better speed
  const results = await Promise.all(tiktokLinks.map(getTikTokData));
  const end = Date.now();

  res.json({
    status: "success",
    timestamp: new Date().toISOString(),
    total_links: tiktokLinks.length,
    response_time: `${end - start}ms`,
    generated_by: AUTHOR,
    results
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Shoti API by ${AUTHOR} running at http://localhost:${PORT}/shoti`);
});
