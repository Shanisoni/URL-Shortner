const express = require("express");
const urlRoute = require('./routes/URL.JS');  // Path matches the file's new name
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connected to MongoDB"));

app.use(express.json());

// Fix: Mark the route handler as async
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Fix: Correct the query object
        const entry = await URL.findOneAndUpdate(
            { shortID: shortId },  // Assuming 'shortID' is the field name
            { 
                $push: { 
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }  // This returns the updated document
        );

        // Check if the entry exists, then redirect
        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('Short URL not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server is running on port 8001 : ${PORT}`));

// Use the routes
app.use("/url", urlRoute);
