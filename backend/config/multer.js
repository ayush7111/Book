const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (res, file, cb) {
    cb(null, `${file.originalname}${Date.now()}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
