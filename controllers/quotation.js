const quotS = require('../models/quotation');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addQuotation = (req, res) => {
  const {finishedProduct, customerId, orderStatus, payment, delivery} = req.body;
  let createdAt = moment().format('l');
  var transactionPrefix = "invoiceBluehaven";
  var invoiceNumber = transactionPrefix + moment().format("x");

  let completeId = new quotS({ finishedProduct, customerId, orderStatus, invoiceNumber, payment, delivery, createdAt});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added Quotation '); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchQuotation = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    quotS.count({}).exec((err, total) => {
        quotS.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'Quotation not found'
                  });
              }

              res.json({
                  "identifier": "get all Quotation list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    quotS.count({}).exec((err, total) => {
        quotS.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'quotS not found'
                  });
              }
              res.json({
                  "identifier": "get all quotS list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    quotS.count({}).exec((err, total) => {

        quotS.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  jBolt.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all quotS list", tag, pagination, page, total });

          });
      });
  }
};

exports.getQuotation = (req, res) => {
  

    quotS.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get ALL quotS", allUser
      });
});
};

exports.getOneQuotation = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  quotS.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'quotS not found'
          });
      }
      res.json({
          "identifier": "get One quotS", allUser
      });
});
};


exports.updateQuotation = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  quotS.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated quotS"});
  });
};