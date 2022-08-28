const asszabt41401045 = require('../models/anchorBold');
const asszabtCRS = require('../models/anchorBoldCrs');
const cyndicalS = require('../models/cyndical');
const fs = require('fs')
var moment = require("moment");
var _ = require("lodash");


exports.addAnchorSagrod = (req, res) => {
     let DateCreated = moment().format('l');
  const {size, cuttingCost, threading,  bending} = req.body;
  let completeId = new asszabt41401045({ size, cuttingCost, threading,  bending, DateCreated});


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

  asszabtCRS.findOne({ employeeId: slug }).exec((err, allUser) => {
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
  asszabtCRS.updateOne(myquery, newV).exec((err, tag) => {
      if (err) {
          return res.status(400).json({
              error: 'cant update client'
          });
      }
      res.json( {"identifier" : "updated EarningsDeductions"});
  });
};




exports.addAnchorSagrodCRS = (req, res) => {
    let DateCreated = moment().format('l');
    const {size, cuttingCost, threading,  bending} = req.body;
    let completeId = new asszabtCRS({ size, cuttingCost, threading,  bending, DateCreated});
    
  
  
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
  
  exports.getPaginatedSearchAsszabtCRS = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
  
    const Name = req.query.Name;
    const Code = req.query.Code;
    if (Name) {
        asszabtCRS.count({}).exec((err, total) => {
            asszabtCRS.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
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
        asszabtCRS.count({}).exec((err, total) => {
            asszabtCRS.find({
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
  
        asszabtCRS.count({}).exec((err, total) => {
  
            asszabtCRS.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'asszabt41401045 not found'
                    });
                }
                for (let val of tag) {
                    let TypeID = (val.TypeID);
                    asszabtCRS.find({ _id: TypeID }).exec((err, tag) => {
          
                    });
                }
                res.json({ "identifier": "get all asszabtCRS list", tag, pagination, page, total });
  
            });
        });
    }
  };
  
  exports.getAsszabtCRS = (req, res) => {
    
  
    asszabtCRS.find({}).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'asszabtCRS not found'
            });
        }
        res.json({
            "identifier": "get ALL asszabtCRS", allUser
        });
  });
  };
  
  exports.getOneAsszabtCRS = (req, res) => {
    const slug = req.params.slug.toLowerCase();
  
    asszabtCRS.findOne({ _id: slug }).exec((err, allUser) => {
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
  
  
  exports.updateAsszabtCRS = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
    var newV = req.body;
    asszabtCRS.updateOne(myquery, newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant update client'
            });
        }
        res.json( {"identifier" : "updated asszabtCRS"});
    });
  };



  exports.addCyndical = (req, res) => {
    let DateCreated = moment().format('l');
    const {cyndicalSize, price} = req.body;
    let completeId = new cyndicalS({ cyndicalSize, price, DateCreated});
  
  
    completeId.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err.errmsg
             
            });
        }
  
        res.json('Success : Added Cyndical'); // dont do this res.json({ tag: data });
    });
  };
  
  exports.getPaginatedSearchCyndical = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
  
    const Name = req.query.Name;
    const Code = req.query.Code;
    if (Name) {
        cyndicalS.count({}).exec((err, total) => {
            cyndicalS.find({ $or: [{ FirstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
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
        cyndicalS.count({}).exec((err, total) => {
            cyndicalS.find({
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
  
        cyndicalS.count({}).exec((err, total) => {
  
            cyndicalS.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'asszabt41401045 not found'
                    });
                }
                for (let val of tag) {
                    let TypeID = (val.TypeID);
                    asszabtCRS.find({ _id: TypeID }).exec((err, tag) => {
          
                    });
                }
                res.json({ "identifier": "get all Cyndical list", tag, pagination, page, total });
  
            });
        });
    }
  };
  
  exports.getCyndical = (req, res) => {
    
  
    cyndicalS.find({}).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'asszabtCRS not found'
            });
        }
        res.json({
            "identifier": "get ALL Cyndical", allUser
        });
  });
  };
  
  exports.getOneCyndical= (req, res) => {
    const slug = req.params.slug.toLowerCase();
  
    cyndicalS.findOne({ _id: slug }).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'Asszabt41401045 not found'
            });
        }
        res.json({
            "identifier": "get One Cyndical", allUser
        });
  });
  };
  
  
  exports.updateCyndical = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
    var newV = req.body;
    cyndicalS.updateOne(myquery, newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant update client'
            });
        }
        res.json( {"identifier" : "updated Cyndical"});
    });
  };