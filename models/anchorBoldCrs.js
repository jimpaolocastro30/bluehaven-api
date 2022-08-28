const mongoose = require('mongoose');
const crypto = require('crypto');

const asszbtCRSSchema = new mongoose.Schema(
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
    DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('anchor/sagrod-szbt-crs', asszbtCRSSchema);
