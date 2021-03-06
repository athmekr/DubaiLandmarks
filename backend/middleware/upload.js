const multer = require('multer');

// Use multer memory storage
const storage = multer.memoryStorage();

const MIME_TYPE_IMAGE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// Multer filters
const fileFilter = (req, file, cb) => {
  if (MIME_TYPE_IMAGE[file.mimetype]) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


module.exports = (req, res, next) => {
  multer({
    storage: storage,
    limits: {
      fileSize: 5242880
    },
    fileFilter: fileFilter
  }).single('photo')(req, res, function (err) {
    //Catching and handling errors of multer
    if (err) {
      return res.status(400).json({ok: false, message: err.message})
    }
    //Everything is ok
    next()
  })
}
;
