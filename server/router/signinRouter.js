const { signin } = require('../controller/signin');
const express = require('express');
const router = express.Router();

router.post('/', signin);

module.exports = router;