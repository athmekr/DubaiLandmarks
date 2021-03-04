const express = require('express');
const LandmarksController = require('../controllers/landmarks');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

// Get all landmarks
router.get('/', LandmarksController.getLandmarks);

// Get landmark by id
router.get('/:id', LandmarksController.getLandmark);

// Update landmark
router.put('/:id', extractFile, LandmarksController.updateLandmark);

module.exports = router;
