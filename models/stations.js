const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
  phone: {type: String , required: true},
  createdAt: { type: Number, default: Date.now }
})

module.exports = mongoose.model('Station', stationSchema, 'Station');