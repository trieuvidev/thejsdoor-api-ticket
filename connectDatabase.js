const mongoose = require("mongoose"),
bluebird = require("bluebird");

const connectDatabase = () => {
  mongoose.Promise = bluebird;
  let URL = "mongodb+srv://trieuvidev:@Trieuvi@123@app-ticket-car-aql0y.mongodb.net/app-ticket-car"
  return mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Connect Database MongoDB Successfuly"))
    .catch(console.log);
};

module.exports = connectDatabase;