const express = require('express');
const router = express.Router();


router.get('/index', (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

module.exports = router;