const { getProjectImage, getProfileImage } = require('../controller/image')
const express = require('express');
const router = express.Router();

router.get('/project/:path', getProjectImage)
router.get('/profile/:path', getProfileImage)

module.exports = router;