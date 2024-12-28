const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url"); // Import correctly

const router = express.Router();

router.post("/", handleGenerateNewShortURL); // Register route

module.exports = router; // Export router
