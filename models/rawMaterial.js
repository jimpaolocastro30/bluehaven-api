const mongoose = require('mongoose');
const crypto = require('crypto');

const rawMaterialSchema = new mongoose.Schema(
    { 

      id: {
      type: String,
    },
      name: {
      type: String,
    },
      type: {
      type: String,
    },
      diameter: {
      type: String,
    },
      weight: {
      type: String,
    },
      price: {
      type: String,
    },
      quantity: {
      type: String,
    },
      orderDate: {
      type: Date,
    },
      deliveredDate: {
      type: Date,
    },
      remarks:{
      type: String
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('rawMaterial', rawMaterialSchema);
