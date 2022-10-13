const mongoose = require('mongoose');
const crypto = require('crypto');

const hexboltchemaSchema = new mongoose.Schema(
    { 
      boltLenght: {
      type: String,
    },    
      materialValue: {
      type: String,
    },
     threadValue: {
      type: String,
    },
      boltLenght: {
        type: String,
      },
      cost: {
      type: String,
    },
      hexNut: {
      type: String,
    },
      fW: {
      type: String,
    },
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('hexbolt', hexboltchemaSchema);
