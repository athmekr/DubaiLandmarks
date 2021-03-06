const express = require('express');
const LandmarksController = require('../controllers/landmarks');
const router = express.Router();
//const validateLandmarkInput = require('../misc/update-landmark');
//const multer = require('multer');
//const checkAuth = require('../middleware/check-auth');
//const extractFile = require('../middleware/file');
//const upload = require ('../middleware/upload');


// Get all landmarks
router.get('/', LandmarksController.getLandmarks);

// Get landmark by id
router.get('/:id', LandmarksController.getLandmark);

// Update landmark
router.put('/:id', LandmarksController.updateLandmark);

/* router.put("/:id", async (req, res) => {
  const {error, isValid} = validateLandmarkInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json({ok: false, message: error.message});
  }
  try {
    await LandmarksController.updateLandmark(req);
    //const landmark = await LandmarksController.getLandmark();
    //return res.status(200).json(landmark);
  } catch (error) {
    return res.status(500).json({ok: false, message: error.message});
  }
}); */


module.exports = router;
