const eShield = require('../models/expansionShield');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addEShield = (req, res) => {
  const {diameter, boltLength, price} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new eShield({ diameter, boltLength, price, DateCreated});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added eShield '); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchEShield = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    eShield.count({}).exec((err, total) => {
        eShield.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'eShield not found'
                  });
              }

              res.json({
                  "identifier": "get all eShield list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    eShield.count({}).exec((err, total) => {
        eShield.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'eShield not found'
                  });
              }
              res.json({
                  "identifier": "get all eShield list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    eShield.count({}).exec((err, total) => {

        eShield.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Dynabolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  eShield.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all turnBuckle list", tag, pagination, page, total });

          });
      });
  }
};

exports.getEShield = (req, res) => {
  

    eShield.find({}).exec((err, allUser) => {
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

exports.getOneEShield = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  eShield.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'eShield not found'
          });
      }
      res.json({
          "identifier": "get One eShield", allUser
      });
});
};


exports.updateEShield = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  eShield.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated eShield"});
  });
};