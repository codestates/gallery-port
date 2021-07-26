const {
  getProjectData,
  fixProjectData,
  addProjectData,
  deleteProjectData,
} = require('../controller/project');
const { uploadProjectImage } = require('../uploader');
const { checkToken } = require('../controller/tokens/checkToken');
const express = require('express');
const router = express.Router();

router.get('/:projectid', getProjectData);
router.post('/', checkToken, uploadProjectImage, addProjectData);
router.patch('/:projectid', checkToken, uploadProjectImage, fixProjectData);
router.delete('/:projectid', checkToken, deleteProjectData);

module.exports = router;
