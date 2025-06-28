const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// 👤 Author of API
const AUTHOR = "April Manalo";

// ✅ List of the TikTok links
const tiktokLinks = [
  "https://www.tiktok.com/@kigs.prismprincesses/video/7469451797128547602?is_from_webapp=1&sender_device=pc&web_id=7520861577470674439",
  "https://www.tiktok.com/@vix.max/video/7458826851557952774?is_from_webapp=1&sender_device=pc&web_id=7520861577470674439",
  ""
];

// 🛠️ Getting video info from TikWM
async function getTikTokData(url) {
  try {
    const api = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const res = await axios.get(api);
    const data = res.data;

    if (data.code !== 0 || !data.data || !data.data.play) {
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

// 📥 API Endpoint: /shoti
app.get("/shoti", async (req, res) => {
  const start = Date.now();
  const results = [];

  for (const url of tiktokLinks) {
    const result = await getTikTokData(url);
    results.push(result);
  }

  const end = Date.now();
  const time = `${end - start}ms`;

  res.json({
    status: "success",
    total_links: tiktokLinks.length,
    response_time: time,
    generated_by: AUTHOR,
    results
  });
});

// 🚀 Run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Shoti API by ${AUTHOR} running at http://localhost:${PORT}`);
});
