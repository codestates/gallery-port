const { test } = require('../controller/project');
const express = require('express');
const router = express.Router();

router.get('/', test);
router.post('/');
router.patch('/');
router.delete('/');

module.exports = router;