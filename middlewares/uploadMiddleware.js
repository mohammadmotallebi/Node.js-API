const multer = require('multer');

const storage = multer.diskStorage({ // set storage settings
    destination: function (req, file, cb) { // set destination folder
        cb(null, 'admin/public/images'); // set destination folder
    },
    filename: function (req, file, cb) { // set file name settings
        cb(null, Date.now() + '.jpg'); // set file name with date and jpg extension
    }
});

const upload = multer({storage: storage}); // set upload settings

module.exports = upload; // export upload settings