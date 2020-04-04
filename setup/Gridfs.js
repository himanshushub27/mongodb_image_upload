const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const keys = require("../config/keys");
const mongoURI = keys.mongoURI;


const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploadImage',
          metadata: {originalname: file.originalname}//we have to save the original name in metadata only
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


module.exports = upload;


