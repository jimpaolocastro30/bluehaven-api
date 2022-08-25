const mongoose = require('mongoose');
const crypto = require('crypto');

const asszbt41401045Schema = new mongoose.Schema(
    { 

      size: {
      type: String,
    },
      cuttingCost: {
      type: String,
    },
      threading: {
      type: String,
    },
      bending: {
      type: String,
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('anchorBold', asszbt41401045Schema);
