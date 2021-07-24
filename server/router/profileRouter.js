const { getProfileData } = require('../controller/profile');
const { checkToken } = require('../controller/tokens/checkToken');
const express = require('express');
const router = express.Router();

router.get('/:id', checkToken, getProfileData);

module.exports = router;