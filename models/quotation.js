const mongoose = require('mongoose');
const crypto = require('crypto');

const quotationSchema = new mongoose.Schema(
    {  
      
    finishedProduct:{
      type: {},
      min: 200,
      max: 2000000
    },
      customerId: {
      type: String,
    },
      orderStatus: {
        type: {},
        min: 200,
        max: 2000000
    },
      invoiceNumber: {
      type: String,
    },
      payment: {
        type: {},
        min: 200,
        max: 2000000
    },
      delivery: {
        type: {},
        min: 200,
        max: 2000000
    },
      createdAt:{
      type:Date
    },
      updatedAt:{
      type:Date
    },
    },
    { timestamp: true }
);

module.exports = mongoose.model('quotation', quotationSchema);
