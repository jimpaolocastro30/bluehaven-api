const mongoose = require('mongoose');
const crypto = require('crypto');

const loopClevisSchema = new mongoose.Schema(
    { 
    typeD: {
      type: String,
    },
    size: {
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

module.exports = mongoose.model('loop-clevis', loopClevisSchema);
