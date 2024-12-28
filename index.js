const express = require("express");
const urlRoute = require('./routes/URL.JS');  // Path matches the file's new name
// Ensure casing matches exactly
// Correct path

const { connectToMongoDB } = require("./connect");
const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDB"));

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port 8001 : ${PORT}`));

// Use the routes
app.use("/url", urlRoute);
 