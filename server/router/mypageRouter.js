const { getUserData, fixUserData } = require('../controller/mypage');
const { checkToken } = require('../controller/tokens/checkToken');
const { uploadProfileImage } = require('../uploader')
const express = require('express');
const router = express.Router();

router.get('/:id', checkToken, getUserData);
router.patch('/:id', checkToken, uploadProfileImage, fixUserData);

module.exports = router;