const { endSession } = require('../controller/signout');
const { checkToken } = require('../controller/tokens/checkToken');
const express = require('express');
const router = express.Router();

router.post('/', checkToken, endSession);

module.exports = router;