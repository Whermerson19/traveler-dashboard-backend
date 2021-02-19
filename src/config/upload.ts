import multer from "multer";
import path from "path";

const tempFolter = path.resolve(__dirname, "..", "..", "temp");
export default {
  directory: tempFolter,
  uploadFolder: path.resolve(tempFolter, "uploads"),
  storage: multer.diskStorage({
    destination: tempFolter,
    filename(request, fileName, cb) {
      const hash = Math.random() * 29359023859;
      const hashedFileName = `${hash}-${fileName.originalname}`;

      return cb(null, hashedFileName);
    },
  }),
};
