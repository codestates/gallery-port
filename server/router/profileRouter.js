const { getProfileData } = require('../controller/profile');
const express = require('express');
const router = express.Router();

router.get('/:id', getProfileData);

module.exports = router;