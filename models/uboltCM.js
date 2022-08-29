const mongoose = require('mongoose');
const crypto = require('crypto');

const uboltCMSchema = new mongoose.Schema(
    { 
      material: {
      type: String,
    },
      uboltSize: {
      type: String,
    },
      pipeSize: {
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

module.exports = mongoose.model('ubolt-cms', uboltCMSchema);
