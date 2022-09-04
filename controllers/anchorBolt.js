const jBolt = require('../models/anchorBolt');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addAnchorBolt = (req, res) => {
  const {sizeA, inchA, bend, standard, hexNut, fW, total} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new jBolt({ sizeA, inchA, bend, standard, hexNut, fW, total, DateCreated});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added Anchor bolt '); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchAnchorBolt = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    jBolt.count({}).exec((err, total) => {
        jBolt.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'Anchor bolt not found'
                  });
              }

              res.json({
                  "identifier": "get all Anchor bolt list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    jBolt.count({}).exec((err, total) => {
        jBolt.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Anchor bolt not found'
                  });
              }
              res.json({
                  "identifier": "get all Anchor bolt list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    jBolt.count({}).exec((err, total) => {

        jBolt.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'Anchor bolt not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  jBolt.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all Anchor bolt list", tag, pagination, page, total });

          });
      });
  }
};

exports.getAnchorBolt = (req, res) => {
  

    jBolt.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'Anchor bolt not found'
          });
      }
      res.json({
          "identifier": "get ALL Anchor bolt", allUser
      });
});
};

exports.getOneAnchorBolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  jBolt.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'Anchor bolt not found'
          });
      }
      res.json({
          "identifier": "get One Anchor bolt", allUser
      });
});
};


exports.updateAnchorBolt = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  jBolt.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update Anchor bolt'
          });
      }
      res.json( {"identifier" : "updated Anchor bolt"});
  });
};