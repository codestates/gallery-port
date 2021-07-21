const { test } = require('../controller/mypage');
const express = require('express');
const router = express.Router();

router.get('/', test);
router.patch('/');

module.exports = router;