const shortid = require("shortid");
const URL = require("../models/URL");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });
  const shortID = shortid();
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ shortID: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
