const express = require('express');

const router = express.Router();

const {handleGenerateShortURL} = require('../controllers/url');

router.post('/' , handleGenerateShortURL);


module.exports = router;