if(process.env.NODE_ENV !== 'production'){
    const { config } = require("dotenv");
    config()
}

module.exports.MONGODB_URI = process.env.MONGODB_URI;
module.exports.PORT = process.env.PORT;
