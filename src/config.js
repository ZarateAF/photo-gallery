if(process.env.NODE_ENV !== 'production'){
    const { config } = require("dotenv");
    config()
}

module.exports.MONGODB_URI = process.env.MONGODB_URI;
module.exports.PORT = process.env.PORT;
module.exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
module.exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
module.exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
