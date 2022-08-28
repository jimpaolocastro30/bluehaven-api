const mongoose = require('mongoose');
const crypto = require('crypto');

const dynaboltSchema = new mongoose.Schema(
    { 

      dynaboltSize: {
      type: String,
    },
      lenghtD: {
      type: String,
    },
      price: {
      type: String,
    },
    DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('dynabolt', dynaboltSchema);
