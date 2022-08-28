const LCs = require('../models/loop-clevis');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addLoopClevis = (req, res) => {
  const {typeD, size, price} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new LCs({ typeD, size, price, DateCreated});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added Loop Clevis'); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchLoopClevis= (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    LCs.count({}).exec((err, total) => {
        LCs.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'Earnings Deductions not found'
                  });
              }

              res.json({
                  "identifier": "get all Loop Clevis list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    LCs.count({}).exec((err, total) => {
        LCs.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              res.json({
                  "identifier": "get all Loop Clevis list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    LCs.count({}).exec((err, total) => {

        LCs.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  LCs.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all Loop Clevis list", tag, pagination, page, total });

          });
      });
  }
};

exports.getLoopClevis = (req, res) => {
  

    LCs.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get ALL Loop Clevis", allUser
      });
});
};

exports.getOneLoopClevis = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  LCs.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get One Loop Clevis", allUser
      });
});
};


exports.updateLoopClevis = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  LCs.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated Loop Clevis"});
  });
};