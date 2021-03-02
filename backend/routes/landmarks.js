const express = require('express');
const LandmarksController = require('../controllers/landmarks');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', LandmarksController.getLandmarks);

router.get('/:id', LandmarksController.getLandmark);
/*
router.put('/:id', checkAuth, LandmarksController.updateLandmark);

router.post('', checkAuth, LandmarksController.createLandmark);
 */
module.exports = router;
