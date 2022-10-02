const mongoose = require('mongoose');
const crypto = require('crypto');

const anchorBoltsSchema = new mongoose.Schema(
    { 
      sizeA: {
      type: String,
    },
      inchA: {
      type: String,
    },
      bend: {
      type: String,
    },
    standard: {
      type: String,
    },
    hexNut: {
      type: String,
    },
    fW: {
      type: String,
    },
    typeAnchor: {
      type: String,
    },
    bend: {
      type: String,
    },
    tl: {
      type: String,
    },
    total: {
      type: String,
    },
      DateCreated:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('anchorBolts', anchorBoltsSchema);
