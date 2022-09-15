const mongoose = require('mongoose');
const crypto = require('crypto');

const platesSchema = new mongoose.Schema(
    { 
      price: {
      type: String,
    },
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('plates', platesSchema);
