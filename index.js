const express = require("express");
const urlRoute = require('./routes/url');  // Correct path

const { connectToMongoDB } = require("./connect");

const app = express();

connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("Connected to MongoDB"));

const PORT = 8001;

app.listen(PORT, () => console.log(`Server is running on port 8001 : ${PORT}`));

// Use the routes
app.use("/url", urlRoute);
