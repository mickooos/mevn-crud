import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("../frontend/src/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: diskStorage }).single("image");
