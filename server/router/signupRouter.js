const { test } = require('../controller/signup');
const express = require('express');
const router = express.Router();

router.post('/', test);

module.exports = router;