const hexbolt = require('../models/hexbolt');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addHexBolt = (req, res) => {
  const {hType, threadValue, cType, clenght, cost} = req.body;
  let DateCreated = moment().format('l');
  console.log("sadas " + clenght)
  let completeId = new hexbolt({ hType, threadValue, clenght, cType, cost, DateCreated});
  
  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added hexbolt '); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchhexBolt = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    hexbolt.count({}).exec((err, total) => {
        hexbolt.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'hexbolt not found'
                  });
              }

              res.json({
                  "identifier": "get all hexbolt list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    hexbolt.count({}).exec((err, total) => {
        hexbolt.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'hexbolt not found'
                  });
              }
              res.json({
                  "identifier": "get all hexbolt list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    hexbolt.count({}).exec((err, total) => {

        hexbolt.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'hexbolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  hexbolt.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all hexbolt list", tag, pagination, page, total });

          });
      });
  }
};

exports.gethexBolt = (req, res) => {
  

    hexbolt.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get ALL hexbolt", allUser
      });
});
};

exports.getOneHexBolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  hexbolt.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'hexbolt not found'
          });
      }
      res.json({
          "identifier": "get One hexbolt", allUser
      });
});
};


exports.updatehexBolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  hexbolt.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update hexbolt'
          });
      }
      res.json( {"identifier" : "updated hexbolt"});
  });
};
