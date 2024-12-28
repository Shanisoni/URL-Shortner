const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const shortID = shortid.generate(); // Fixed call

    // Create a new URL entry in the database
    const newURL = await URL.create({
      shortID,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      shortID: newURL.shortID,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetAnalytics (req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId: shortId });
  return  res.json({totalClicks: result.visitHistory.length});
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};
