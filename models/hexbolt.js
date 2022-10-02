const mongoose = require('mongoose');
const crypto = require('crypto');

const hexboltchemaSchema = new mongoose.Schema(
    { 
      hType: {
      type: String,
    },
      cType: {
      type: String,
    },
     threadValue: {
      type: String,
    },
      clenght: {
        type: String,
      },
      cost: {
      type: String,
    },
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('hexbolt', hexboltchemaSchema);
