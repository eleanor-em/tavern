const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('API is online');
})

module.exports = router;