const { getProfileImage, getProjectImage } = require('../controller/image')
const express = require('express');
const router = express.Router();

router.get('/profile/:path', getProfileImage)
router.get('/project/:path', getProjectImage)

module.exports = router;