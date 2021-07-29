const { createNewUser } = require('../controller/signup');
const express = require('express');
const { uploadProfileImage } = require('../uploader');
const router = express.Router();

router.post('/', uploadProfileImage, createNewUser);

module.exports = router;