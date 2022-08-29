const mongoose = require('mongoose');
const crypto = require('crypto');

const uboltMMSchema = new mongoose.Schema(
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

module.exports = mongoose.model('ubolt-mms', uboltMMSchema);
