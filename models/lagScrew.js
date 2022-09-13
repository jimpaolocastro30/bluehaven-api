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
        price: {
        type: String,
      }, 
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('lagscrew', lagScrewSchema);
