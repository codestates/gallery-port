const { test } = require('../controller/mypage');
const express = require('express');
const router = express.Router();

const { checkToken } = require('../controller/tokens/checkToken')

router.get('/', checkToken, test);
// router.get('/', test);
router.patch('/');

module.exports = router;