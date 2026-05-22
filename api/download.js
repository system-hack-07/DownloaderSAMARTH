export default async function handler(req, res) {
  try {
    const { url, quality } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing URL" });
    }

    const apiUrl = `https://yt-vedio-download-api.vercel.app/api/direct?url=${encodeURIComponent(url)}&quality=${quality || 720}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "External API failed" });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
}
