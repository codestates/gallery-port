const {
  getProjectData,
  fixProjectData,
  createProjectData,
  deleteProjectData,
} = require('../controller/project');
const { uploadProjectImage } = require('../uploader');
const { checkToken } = require('../controller/tokens/checkToken');
const express = require('express');
const router = express.Router();

router.get('/:projectid', getProjectData);
router.post('/', checkToken, uploadProjectImage, createProjectData);
router.patch('/:projectid', checkToken, uploadProjectImage, fixProjectData);
router.delete('/:projectid', checkToken, deleteProjectData);

module.exports = router;
