const mongoose = require('mongoose');
const crypto = require('crypto');

const turnBuckleSchema = new mongoose.Schema(
    { 

      millimeter: {
      type: String,
    },
    turnBuckle: {
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

module.exports = mongoose.model('turn-buckles', turnBuckleSchema);
