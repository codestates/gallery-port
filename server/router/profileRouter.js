const { test } = require('../controller/profile');
const express = require('express');
const router = express.Router();

router.get('/', test);

module.exports = router;