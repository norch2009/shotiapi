const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const AUTHOR = "April Manalo";

const tiktokLinks = [
  "https://vt.tiktok.com/ZSkNNuMjW/",
  "https://vt.tiktok.com/ZSkNNVbsy/",
  "https://vt.tiktok.com/ZSkNNkWYt/",
  "https://vt.tiktok.com/ZSkNNg2N1/",
  "https://vt.tiktok.com/ZSkNF8hkJ/",
  "https://vt.tiktok.com/ZSkNFdXhA/",
  "https://vt.tiktok.com/ZSkNNToGP/",
  "https://vt.tiktok.com/ZSkNFdHrW/",
  "https://vt.tiktok.com/ZSkNFNrDH/",
  "https://vt.tiktok.com/ZSkNFNQ4S/",
  "https://vt.tiktok.com/ZSkNNEkh2/",
  "https://vt.tiktok.com/ZSkNNwDUG/",
  "https://vt.tiktok.com/ZSkNNvGJn/",
  "https://vt.tiktok.com/ZSkNF1rTs/",
  "https://vt.tiktok.com/ZSkNFdtvD/",
  "https://vt.tiktok.com/ZSkNF8uRT/",
  "https://vt.tiktok.com/ZSkNN7EVQ/",
  "https://vt.tiktok.com/ZSkNFRmU1/",
  "https://vt.tiktok.com/ZSkNFFB4n/",
  "https://vt.tiktok.com/ZSkNFJkPg/",
  "https://vt.tiktok.com/ZSkNFHXTc/",
  "https://vt.tiktok.com/ZSkNF6moS/",
  "https://vt.tiktok.com/ZSkNFPVNT/",
  "https://vt.tiktok.com/ZSkNF5AxV/",
  "https://vt.tiktok.com/ZSkNFjBrs/",
  "https://vt.tiktok.com/ZSkNFfEFm/",
  "https://vt.tiktok.com/ZSkNFUuYt/",
  "https://vt.tiktok.com/ZSkNFHse3/",
  "https://vt.tiktok.com/ZSkNFYHkg/",
  "https://vt.tiktok.com/ZSk8QUGHj/",
  "https://vt.tiktok.com/ZSk8QB8we/",
  "https://vt.tiktok.com/ZSk8QJ7vY/",
  "https://vt.tiktok.com/ZSk8QBYYP/",
  "https://vt.tiktok.com/ZSk8QSjVe/",
  "https://vt.tiktok.com/ZSk8QUT2u/",
  "https://vt.tiktok.com/ZSk89sYVm/",
  "https://vt.tiktok.com/ZSk8Qf4QX/",
  "https://vt.tiktok.com/ZSk8QdRhR/",
  "https://vt.tiktok.com/ZSk8Q2RDc/",
  "https://vt.tiktok.com/ZSk8Q2xam/",
  "https://vt.tiktok.com/ZSk8QLRSR/",
  "https://vt.tiktok.com/ZSk8QNdJE/",
  "https://vt.tiktok.com/ZSk8QUP4c/",
  "https://vt.tiktok.com/ZSk8QR7Bv/",
  "https://vt.tiktok.com/ZSk8Qf7RE/",
  "https://vt.tiktok.com/ZSk8QBCUh/",
  "https://vt.tiktok.com/ZSk8Qe5Vg/",
  "https://vt.tiktok.com/ZSk8Q8efV/",
  "https://vt.tiktok.com/ZSk8QXvKR/",
  "https://vt.tiktok.com/ZSk8QmywE/",
  "https://vt.tiktok.com/ZSk8QWHc8/",
  "https://vt.tiktok.com/ZSk8Q5h7W/",
  "https://vt.tiktok.com/ZSk8QSJxV/",
  "https://vt.tiktok.com/ZSk8QFp6p/",
  "https://vt.tiktok.com/ZSk8QJY92/",
  "https://vt.tiktok.com/ZSk8Q6AkE/",
  "https://vt.tiktok.com/ZSk8QBayJ/",
  "https://vt.tiktok.com/ZSk8QMEuF/",
  "https://vt.tiktok.com/ZSk8QsxpY/",
  "https://vt.tiktok.com/ZSk8QVnm2/",
  "https://vt.tiktok.com/ZSk8QpysX/",
  "https://vt.tiktok.com/ZSk8QvsHe/",
  "https://vt.tiktok.com/ZSk8Q9yT5/",
  "https://vt.tiktok.com/ZSk8QamGS/",
  "https://vt.tiktok.com/ZSk8QVGq1/",
  "https://vt.tiktok.com/ZSk8QcU9S/",
  "https://vt.tiktok.com/ZSk8QmySP/",
  "https://vt.tiktok.com/ZSk8Qg5No/",
  "https://vt.tiktok.com/ZSk8Q5dQv/",
  "https://vt.tiktok.com/ZSk8QtGDr/",
  "https://vt.tiktok.com/ZSk8QmQVX/",
  "https://vt.tiktok.com/ZSk8Q7V8X/",
  "https://vt.tiktok.com/ZSk8QC71b/",
  "https://vt.tiktok.com/ZSk8Qubc3/",
  "https://vt.tiktok.com/ZSk8QmryL/",
  "https://vt.tiktok.com/ZSk8Q4bG2/",
  "https://vt.tiktok.com/ZSk8QmJKB/",
  "https://vt.tiktok.com/ZSk8Q4j8c/",
  "https://vt.tiktok.com/ZSk8QTNGo/",
  "https://vt.tiktok.com/ZSk8C8XCK/",
  "https://vt.tiktok.com/ZSk8CRDr7/",
  "https://vt.tiktok.com/ZSk8C6gUT/",
  "https://vt.tiktok.com/ZSk8CBNtE/",
  "https://vt.tiktok.com/ZSk8CJJX7/",
  "https://vt.tiktok.com/ZSk8C12T6/",
  "https://vt.tiktok.com/ZSk8QTM7P/",
  "https://vt.tiktok.com/ZSk8CFWtX/",
  "https://vt.tiktok.com/ZSk8CLUgK/",
  "https://vt.tiktok.com/ZSk8Q3VS6/",
  "https://vt.tiktok.com/ZSk8QTnNa/",
  "https://vt.tiktok.com/ZSk8CJYXo/",
  "https://vt.tiktok.com/ZSk8QE6dY/",
  "https://vt.tiktok.com/ZSk8C153u/",
  "https://vt.tiktok.com/ZSk8C8gMg/",
  "https://vt.tiktok.com/ZSk8CJPon/",
  "https://vt.tiktok.com/ZSk8CS2Ac/",
  "https://vt.tiktok.com/ZSk8CSJS1/",
  "https://vt.tiktok.com/ZSk8ChAgQ/",
  "https://vt.tiktok.com/ZSk8C15Vp/",
  "https://vt.tiktok.com/ZSk8QKFxC/",
  "https://vt.tiktok.com/ZSk8CjhbN/",
  "https://vt.tiktok.com/ZSk8CS9fM/",
  "https://vt.tiktok.com/ZSk8C2r1b/",
  "https://vt.tiktok.com/ZSk8C63jp/",
  "https://vt.tiktok.com/ZSk8CF3Ho/",
  "https://vt.tiktok.com/ZSk8QKWcS/",
  "https://vt.tiktok.com/ZSk8QEyXD/",
  "https://vt.tiktok.com/ZSk8CAURV/",
  "https://vt.tiktok.com/ZSk8CyKvt/",
  "https://vt.tiktok.com/ZSk8C5Nnp/",
  "https://vt.tiktok.com/ZSk8CXnE8/",
  "https://vt.tiktok.com/ZSk8CssxC/",
  "https://vt.tiktok.com/ZSk8Cnjfy/",
  "https://vt.tiktok.com/ZSk8CqScB/",
  "https://vt.tiktok.com/ZSk8Cs2HT/",
  "https://vt.tiktok.com/ZSk8Cfn1s/",
  "https://vt.tiktok.com/ZSk8CXqA7/",
  "https://vt.tiktok.com/ZSk8Cxx9n/",
  "https://vt.tiktok.com/ZSk8CPRN5/",
  "https://vt.tiktok.com/ZSk8CHRTJ/",
  "https://vt.tiktok.com/ZSk8C5btu/",
  "https://vt.tiktok.com/ZSk8CfgYN/",
  "https://vt.tiktok.com/ZSk8C9p7T/",
  "https://vt.tiktok.com/ZSk8CV38r/",
  "https://vt.tiktok.com/ZSk8Cpb6n/",
  "https://vt.tiktok.com/ZSk8CqG1B/",
  "https://vt.tiktok.com/ZSk8CbsnJ/",
  "https://vt.tiktok.com/ZSk8CbA2q/",
  "https://vt.tiktok.com/ZSk8CX1aD/",
  "https://vt.tiktok.com/ZSk8CCvnr/",
  "https://vt.tiktok.com/ZSk8CGynP/",
  "https://vt.tiktok.com/ZSk8CDmjD/",
  "https://vt.tiktok.com/ZSk8CowMb/",
  "https://vt.tiktok.com/ZSk8X6R7d/",
  "https://vt.tiktok.com/ZSk8CosvS/",
  "https://vt.tiktok.com/ZSk8CodKq/",
  "https://vt.tiktok.com/ZSk8XjdbA/",
  "https://vt.tiktok.com/ZSk8X1mhA/",
  "https://vt.tiktok.com/ZSk8CcjxV/",
  "https://vt.tiktok.com/ZSk8XLH66/",
  "https://vt.tiktok.com/ZSk8Cod2h/",
  "https://vt.tiktok.com/ZSk8VXdVk/",
  "https://vt.tiktok.com/ZSk8VTHMm/",
  "https://vt.tiktok.com/ZSk8VKYtN/",
  "https://vt.tiktok.com/ZSk8q14WE/",
  "https://vt.tiktok.com/ZSk8V32Ec/",
  "https://vt.tiktok.com/ZSk8q21fs/",
  "https://vt.tiktok.com/ZSk8pJ5yT/",
  "https://vt.tiktok.com/ZSk8gKghJ/",
  "https://vt.tiktok.com/ZSBRNepcV/",
  "https://vt.tiktok.com/ZSBRLKEqh/",
  "https://vt.tiktok.com/ZSBRNJdAw/",
  "https://vt.tiktok.com/ZSBRN2wrj/",
  "https://vt.tiktok.com/ZSBRNAxMf/",
  "https://vt.tiktok.com/ZSBRNMVLH/",
  "https://vt.tiktok.com/ZSBRNyFLe/",
  "https://vt.tiktok.com/ZSBRN1YPM/",
  "https://vt.tiktok.com/ZSBRNdgv5/",
  "https://vt.tiktok.com/ZSBRN8vj5/",
  "https://vt.tiktok.com/ZSBRNyF7V/",
  "https://vt.tiktok.com/ZSBRNeeUU/",
  "https://vt.tiktok.com/ZSBRNj6bM/",
  "https://vt.tiktok.com/ZSBRNd2PY/",
  "https://vt.tiktok.com/ZSBRNhmxg/",
  "https://vt.tiktok.com/ZSBRLoqGc/",
  "https://vt.tiktok.com/ZSBRNLMfK/",
  "https://vt.tiktok.com/ZSBRNYuE9/",
  "https://vt.tiktok.com/ZSBRNjDqF/",
  "https://vt.tiktok.com/ZSBRLs8d4/",
  "https://vt.tiktok.com/ZSBRNgKpC/",
  "https://vt.tiktok.com/ZSBRNf2bP/",
  

// ... paste all remaining lines here until the end of your list ...

];

// Random selection, scraping logic, API endpoint, etc., remains the same as before.


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
