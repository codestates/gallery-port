const { getAllProjects } = require('../controller/landing');
const express = require('express');
const router = express.Router();

router.get('/', getAllProjects);

module.exports = router;