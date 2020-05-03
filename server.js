const express = require('express'),
path = require('path'),
port = process.env.PORT || 5000,
bodyParser = require('body-parser')
connectMongoDB = require('./connectDatabase'),
Stations = require("./models/stations"),
initRouter = require("./routes/index");

var app = express();
connectMongoDB(); // file connect Database được gọi ở đây


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', initRouter)


app.listen(port)
console.log('Server listening on port: ' + port)