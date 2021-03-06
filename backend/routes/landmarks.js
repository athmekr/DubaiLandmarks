const express = require('express');
const LandmarksController = require('../controllers/landmarks');
const router = express.Router();
// Multer middleware
const file = require('../middleware/file');

// Get all landmarks
router.get('/', LandmarksController.getLandmarks);

// Get landmark by id
router.get('/:id', LandmarksController.getLandmark);

// Update landmark
router.put('/:id', file, LandmarksController.updateLandmark);

module.exports = router;
