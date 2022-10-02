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
        type: {},
        min: 200,
        max: 2000000
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

module.exports = mongoose.model('anchor/sagrod-szbt-4140/1045', asszbt41401045Schema);
