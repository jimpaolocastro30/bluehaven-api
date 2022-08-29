const mongoose = require('mongoose');
const crypto = require('crypto');

const expansionShieldSchema = new mongoose.Schema(
    { 
      diameter: {
      type: String,
    },
    boltLenght: {
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

module.exports = mongoose.model('expansionShields', expansionShieldSchema);
