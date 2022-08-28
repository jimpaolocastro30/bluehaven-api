const dynabolt = require('../models/dynabolt');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addDynabolt = (req, res) => {
  const {dynaboltSize, lenghtD, price} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new dynabolt({ dynaboltSize, lenghtD, price, DateCreated});
  

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

exports.getPaginatedSearchDynabolt = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
      dynabolt.count({}).exec((err, total) => {
        dynabolt.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'Earnings Deductions not found'
                  });
              }

              res.json({
                  "identifier": "get all Dynabolt list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    dynabolt.count({}).exec((err, total) => {
      dynabolt.find({
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
                  "identifier": "get all Dynabolt list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    dynabolt.count({}).exec((err, total) => {

      dynabolt.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  dynabolt.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all Dynabolt list", tag, pagination, page, total });

          });
      });
  }
};

exports.getDynabolt = (req, res) => {
  

  dynabolt.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'asszabtCRS not found'
          });
      }
      res.json({
          "identifier": "get ALL Dynabolt", allUser
      });
});
};

exports.getOneDynabolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  dynabolt.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'Asszabt41401045 not found'
          });
      }
      res.json({
          "identifier": "get One Dynabolt", allUser
      });
});
};


exports.updateDynabolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  dynabolt.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated Dynabolt"});
  });
};