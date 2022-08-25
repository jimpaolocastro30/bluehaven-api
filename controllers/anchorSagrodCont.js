const asszabt41401045 = require('../models/anchorBold');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addAnchorSagrod = (req, res) => {
  const {size, cuttingCost, threading,  bending} = req.body;
  let completeId = new asszabt41401045({ size, cuttingCost, threading,  bending});


  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added Earnings Deductions'); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchAsszabt41401045 = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    asszabt41401045.count({}).exec((err, total) => {
      asszabt41401045.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Earnings Deductions not found'
                  });
              }

              res.json({
                  "identifier": "get all Earnings Deductions list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    asszabt41401045.count({}).exec((err, total) => {
      asszabt41401045.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'asszabt41401045 not found'
                  });
              }
              res.json({
                  "identifier": "get all asszabt41401045 list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    asszabt41401045.count({}).exec((err, total) => {

      asszabt41401045.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'asszabt41401045 not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  asszabt41401045.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all asszabt41401045 list", tag, pagination, page, total });

          });
      });
  }
};

exports.getAsszabt41401045 = (req, res) => {
  

  asszabt41401045.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'asszabt41401045 not found'
          });
      }
      res.json({
          "identifier": "get ALL asszabt41401045", allUser
      });
});
};

exports.getOneAsszabt41401045 = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  EarningsDeductions.findOne({ employeeId: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'Asszabt41401045 not found'
          });
      }
      res.json({
          "identifier": "get One EarningsDeductions", allUser
      });
});
};


exports.updateAsszabt41401045 = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { employeeId: slug }
  var newV = req.body;
  EarningsDeductions.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated EarningsDeductions"});
  });
};