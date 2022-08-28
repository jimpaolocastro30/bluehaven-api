const tB = require('../models/turnBuckle');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addTurnBuckle = (req, res) => {
  const {millimeter, turnBuckle, pipeSize, price} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new tB({ millimeter, turnBuckle, pipeSize, price, DateCreated});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added Dynabolt'); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchTurnBuckle = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    tB.count({}).exec((err, total) => {
        tB.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'Earnings Deductions not found'
                  });
              }

              res.json({
                  "identifier": "get all tB list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    tB.count({}).exec((err, total) => {
        tB.find({
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
                  "identifier": "get all TurnBuckle list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    tB.count({}).exec((err, total) => {

        tB.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  tB.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all turnBuckle list", tag, pagination, page, total });

          });
      });
  }
};

exports.getTurnBuckle = (req, res) => {
  

    tB.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get ALL turnBuckle", allUser
      });
});
};

exports.getOneTurnBuckle = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  tB.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get One turnBuckle", allUser
      });
});
};


exports.updateTurnBuckle = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  tB.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated TurnBuckle"});
  });
};