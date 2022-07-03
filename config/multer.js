const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/thumbnails");
  },
  filename: (req, file, cb) => {
    const fileName = `avatar-${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const filter = (req, file, cb) => {
  const types = ["image/png", "image/jpg", "image/jpeg", "image.gif"];

  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg, and .gif allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: filter,
}).single("avatar");

module.exports = { upload };
