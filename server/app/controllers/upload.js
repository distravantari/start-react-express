var multer = require('multer'); // to upload the secret face to a temporary file
var upload = multer({ dest: './client/store/picture' }); // this is the temporary destination file

module.exports = upload.single('photo'), (req, res, next) => {
    res.send("successfully upload the photo");
    res.end(req.file);
};