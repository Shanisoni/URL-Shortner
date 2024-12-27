const {nanoid} = require('nanoid');
const URL = require('../models/URL');

async function handleGenerateNewShortURL(req , res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({message : "URL is required"});
   const shortID = nanoid(6);
   await URL.create({
    shortID : shortID,
    redirectURL : body.url,
    visitHistory : [], 
   }) ;

   return res.json({shortID : shortID});

}

module.exports = {
    handleGenerateNewShortURL,
}