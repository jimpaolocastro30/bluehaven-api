const uboltMM = require('../models/uboltMM');
const uboltCM = require('../models/uboltCM');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.adduboltMM = (req, res) => {
  const {material, uboltSize, pipeSize, price} = req.body;
  let DateCreated = moment().format('l');
  let completeId = new uboltMM({ material, uboltSize, pipeSize, price, DateCreated});
  

  completeId.save((err, data) => {
      if (err) {
          console.log(err)
          return res.status(400).json({
              error: err.errmsg
           
          });
      }

      res.json('Success : Added jBolt '); // dont do this res.json({ tag: data });
  });
};

exports.getPaginatedSearchuboltMM = (req, res) => {
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const Name = req.query.Name;
  const Code = req.query.Code;
  if (Name) {
    uboltMM.count({}).exec((err, total) => {
        uboltMM.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                  return res.status(400).json({
                      error: 'uboltMM not found'
                  });
              }

              res.json({
                  "identifier": "get all uboltMM list", tag,
                  pagination, page, total
              });

          });
      });
  } else if (Code) {
    uboltMM.count({}).exec((err, total) => {
        uboltMM.find({
              $or: [
                  { IdNumber: { $regex: Code, $options: 'i' } }
              ]
          }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'uboltMM not found'
                  });
              }
              res.json({
                  "identifier": "get all uboltMM list", tag,
                  pagination, page, total
              });
          });
      });

  } else {

    uboltMM.count({}).exec((err, total) => {

        uboltMM.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
              if (err) {
                  return res.status(400).json({
                      error: 'uboltMM not found'
                  });
              }
              for (let val of tag) {
                  let TypeID = (val.TypeID);
                  uboltMM.find({ _id: TypeID }).exec((err, tag) => {
        
                  });
              }
              res.json({ "identifier": "get all uboltMM list", tag, pagination, page, total });

          });
      });
  }
};

exports.getuboltMM = (req, res) => {
  

    uboltMM.find({}).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'turnBuckle not found'
          });
      }
      res.json({
          "identifier": "get ALL uboltMM", allUser
      });
});
};

exports.getOneuboltMM = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  uboltMM.findOne({ _id: slug }).exec((err, allUser) => {
      if (err) {
          return res.status(400).json({
              error: 'uboltMM not found'
          });
      }
      res.json({
          "identifier": "get One uboltMM", allUser
      });
});
};


exports.updateuboltMM = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  var myquery = { _id: slug }
  var newV = req.body;
  uboltMM.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated uboltMM"});
  });
};


exports.adduboltCM = (req, res) => {
    const {material, uboltSize, pipeSize, price} = req.body;
    let DateCreated = moment().format('l');
    let completeId = new uboltCM({ material, uboltSize, pipeSize, price, DateCreated});
    
  
    completeId.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err.errmsg
             
            });
        }
  
        res.json('Success : Added jBolt '); // dont do this res.json({ tag: data });
    });
  };
  
  exports.getPaginatedSearchuboltCM = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
  
    const Name = req.query.Name;
    const Code = req.query.Code;
    if (Name) {
        uboltCM.count({}).exec((err, total) => {
            uboltCM.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                  if (err) {
                    return res.status(400).json({
                        error: 'uboltCM not found'
                    });
                }
  
                res.json({
                    "identifier": "get all uboltCM list", tag,
                    pagination, page, total
                });
  
            });
        });
    } else if (Code) {
        uboltCM.count({}).exec((err, total) => {
            uboltCM.find({
                $or: [
                    { IdNumber: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'uboltCM not found'
                    });
                }
                res.json({
                    "identifier": "get all uboltCM list", tag,
                    pagination, page, total
                });
            });
        });
  
    } else {
  
        uboltCM.count({}).exec((err, total) => {
  
            uboltCM.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'uboltCM not found'
                    });
                }
                for (let val of tag) {
                    let TypeID = (val.TypeID);
                    uboltCM.find({ _id: TypeID }).exec((err, tag) => {
          
                    });
                }
                res.json({ "identifier": "get all uboltCM list", tag, pagination, page, total });
  
            });
        });
    }
  };
  
  exports.getuboltCM = (req, res) => {
    
  
    uboltCM.find({}).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'turnBuckle not found'
            });
        }
        res.json({
            "identifier": "get ALL uboltCM", allUser
        });
  });
  };
  
  exports.getOneuboltCM = (req, res) => {
    const slug = req.params.slug.toLowerCase();
  
    uboltCM.findOne({ _id: slug }).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'uboltCM not found'
            });
        }
        res.json({
            "identifier": "get One uboltCM", allUser
        });
  });
  };
  
  
  exports.updateuboltCM = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
    var newV = req.body;
    uboltCM.updateOne(myquery, newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant update client'
            });
        }
        res.json( {"identifier" : "updated uboltCM"});
    });
  };