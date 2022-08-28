const mongoose = require('mongoose');
const crypto = require('crypto');

const lagScrewSchema = new mongoose.Schema(
    { 
      screwLength: {
      type: String,
    },
      screwSize: {
      type: String,
    },
      totalScrew: {
      type: String,
    }, 
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('lagscrew', lagScrewSchema);
