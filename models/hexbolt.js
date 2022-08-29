const mongoose = require('mongoose');
const crypto = require('crypto');

const hexboltchemaSchema = new mongoose.Schema(
    { 
      materialValue: {
      type: String,
    },
     threadValue: {
      type: String,
    },
      boltLenght: {
        type: String,
      },
      diameterValue: {
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

module.exports = mongoose.model('hexbolt', hexboltchemaSchema);
