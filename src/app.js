const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const { engine } = require("express-handlebars");
const { PORT } = require("./config");
// const { v4: uuidv4 } = require("uuid");


const app = express();
require('./database');
app.set("port", PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// app.engine(".hbs", exphbs({
//     defaultLayout: "main",
//     layoutsDir: path.join(app.get("views"), "layouts"),
//     partialsDir: path.join(app.get("views"), "partials"),
//     extname: ".hbs"
// }))

app.engine(
    "hbs",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs"
    })
  );
  
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        const filename = new Date().getTime() + path.extname(file.originalname);
        cb(null, filename);
    },
})
app.use(multer({ storage }).single('image'));


//Routes
app.use(require("./routes"))


module.exports = app;





