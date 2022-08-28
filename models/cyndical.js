const mongoose = require('mongoose');
const crypto = require('crypto');

const cyndicalSchema = new mongoose.Schema(
    { 

      cyndicalSize: {
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

module.exports = mongoose.model('cyndicals', cyndicalSchema);
