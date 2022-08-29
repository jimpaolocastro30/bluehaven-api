const mongoose = require('mongoose');
const crypto = require('crypto');

const jboltSchema = new mongoose.Schema(
    { 
      jboltDiameter: {
      type: String,
    },
      lenght: {
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

module.exports = mongoose.model('jbolt', jboltSchema);
