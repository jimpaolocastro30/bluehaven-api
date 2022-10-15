const rMaterial = require('../models/rawMaterial');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addrawMaterial = (req, res) => {
  const {name, type, diameter, weight, price, quantity, deliveredDate, remarks} = req.body;
  var transactionPrefix = "RM";
  var id = transactionPrefix + "-"+ moment().format("x");
  let orderDate = moment().format('l');

  let completeId = new rMaterial({ id, name, type, diameter, weight, price, quantity, orderDate, deliveredDate, remarks});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added rMaterial '); // dont do this res.json({ tag: data });
  });
};


exports.getMaterial = (req, res) => {
  

    rMaterial.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'rMaterial not found'
          });
      }
      res.json({
          "identifier": "get ALL rMaterial", allUser
      });
});
};

exports.getOneMaterial = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  rMaterial.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'rMaterial not found'
          });
      }
      res.json({
          "identifier": "get One rMaterial", allUser
      });
});
};


exports.updateMaterial = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  rMaterial.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update rMaterial'
          });
      }
      res.json( {"identifier" : "updated rMaterial"});
  });
};