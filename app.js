const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Database Config File
const configFile = require("./app/config/config.json");

// // Database Connection
const db_url = configFile.connect_db;
mongoose.connect(db_url, {useUnifiedTopology : true , useNewUrlParser : true, useFindAndModify : false});

const db = mongoose.connection;
db.once("open", () =>{
    console.log("MongoDB database connected!");
});


// controllers
const userController = require('./app/controllers/user-controller');
const productsController = require('./app/controllers/products-controller');
const shoppingController = require('./app/controllers/shopping-controller');
const orderController = require('./app/controllers/order-controller');
// const docController = require('./app/controllers/document-controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/uploads',express.static('uploads'))


app.use('/api/user', userController);
app.use('/api/products',  productsController);
app.use('/api/shopping', shoppingController);
app.use('/api/order', orderController);
// app.use('/api/doc', docController);

app.listen(3000, () => console.log("Listening on http://localhost:3000"));