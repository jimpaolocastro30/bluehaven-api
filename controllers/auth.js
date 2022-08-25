const User = require('../models/user');
const reminder = require('../models/reminder');
const employee = require('../models/employee');
const cutoff = require('../models/cutoff');
const earnD = require('../models/EarningsDeductions');
const detach = require('../models/detachments');
const jwt = require('jsonwebtoken');
const client = require('../models/client');
const expressJwt = require('express-jwt');
const moment = require('moment');
let mysql = require('mysql');
let config = require('../env.js');
const _ = require('lodash');
const fs = require('fs');
const db = require('../config/db.config.js');
const Detachments = db.Detachments;

const csv = require('fast-csv');

exports.signup = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                err: 'Email is taken'
            });
        }

        var active = 0;
        const { username,Firstname, Lastname, MobileNumber, email, password, role  } = req.body;
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;
        let DateCreated = new Date();
        let newUser = new User({ username,Firstname, Lastname,MobileNumber, email, password, profile, username, active, DateCreated,role});
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // res.json({
            //     user: success
            // });

            res.json({
                message: 'Signup success! Please signin.'
            });
        });
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    // check if user exist
    User.findOne({ username }).exec((err, user) => {
        console.log("dasda", user)
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that mobile does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'mobile number and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role, photo} = user;
        return res.json({
            token,
            user: { _id, username, name, email, role, photo}
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSigninUser = expressJwt({
    secret: process.env.JWT_SECRET
});

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 0) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};


exports.accountMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Accounting resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};

exports.payrollMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 2) {
            return res.status(400).json({
                error: 'Payroll resource. Access denied'
            });
        }
        
        req.profile = user;
        next();
    });
};

exports.userList = (req,res) => {
    //const operatorId = req.user._id;
    User.find({})
    .exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json(data);

    });
}

exports.getPaginatedSearchUser = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const Name = req.query.Name;
    const Code = req.query.Code;
    console.log(Code)
    if (Name) {
        User.count({}).exec((err, total) => {
            User.find({ $or: [{ username: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }

                res.json({
                    "identifier": "get all User list", tag,
                    pagination, page, total
                });

            });
        });
    } else if (Code) {
        User.count({}).exec((err, total) => {
            User.find({
                $or: [
                    { email: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }
                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });
            });
        });

    } else {

        User.count({}).exec((err, total) => {

            User.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                }
                for (let val of tag) {

                    console.log(val.TypeID)
                    let TypeID = (val.TypeID);
                    User.find({ _id: TypeID }).exec((err, tag) => {
                        for (let val of tag) {
                            let name = val.Name;
                            console.log(name)
                        }
                    });
                }
                res.json({ "identifier": "get all Product list", tag, pagination, page, total });

            });
        });
    }
};

exports.readUser = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log(slug)

    User.findOne({ _id: slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.resetPasswordUser = (req, res) => {
    const { userId, newPassword } = req.body;
            User.findOne({ _id: userId }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    userId: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
    
};
exports.updateUser = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery ={ _id: slug }
    
 
    var newV = req.body;

    User.updateOne(myquery,newV).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data.nModified + " Updated User");
    });
};

exports.addEmployees = (req, res) => {
    const { employeeId, empStatus, accountNumber, firstName, lastName, middleName, 
        sssId, pagibigId, tinId ,philhealthId, phoneNumber, 
        nationality, religion, maritalStatus, 
        sssRefund, sss, sssSalaryloan, sssCl, aroe, deathContribution, eName, eRelationship, ePhone} = req.body;
    let fullName = firstName +" "+ lastName;
    let photo = " ";

    let sql = `CALL InsertEmployeeDetailsDeductionEmergencyContact (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let sql2 = `select * from employees order by id desc;`;
     
    let connection = mysql.createConnection(config);
    let connections = mysql.createConnection(config);
    connection.query(sql,[employeeId, empStatus, accountNumber, firstName, lastName, middleName, 
        sssId, pagibigId, tinId ,philhealthId, phoneNumber, 
        nationality, religion, maritalStatus, fullName,
        sssRefund, sss, sssSalaryloan, sssCl, aroe, deathContribution, eName, eRelationship, ePhone], (error, results, fields) => {
        if (error) return console.error(error.message);
    });
    connection.end();
    connections.query(sql2,[], (error, result, fields) => {
        if (error) return console.error(error.message);
        return res.json(result);
    });
    connections.end();
  
    
    // let completeId = new employee({ employeeId, empStatus, firstName, lastName, middleName, sssId, pagibigId, tinId ,philhealthId, phoneNumber, nationality, religion, MaritalStatus, maritalStatus, emergencyContact,photo });
    // let earningsDeduc = new earnD({ employeeId, empStatus, fullName, sssRefund, sss, sssSalaryloan, sssCl, aroe, deathContribution });

    // completeId.save((err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(400).json({
    //             error: err.errmsg
             
    //         });
    //     }


    //     earningsDeduc.save((err, atda) => {
    //         if (err) {
    //             console.log(err)
    //             return res.status(400).json({
    //                 error: err.errmsg
                 
    //             });
    //         }
    //     });
    //     res.json('Success : Added one employee details'+  " " + fullName); // dont do this res.json({ tag: data });
    // });
        

};

exports.addEmployeeEmergency = (req, res) => {
    const {employeeId,eName,eRelationship,ePhone } = req.body;


    let sql = `insert into emergencyContactsEmployee(employeeId,eName,eRelationship,ePhone) values(?,?,?,?)`;
    let sql2 = `select * from emergencyContactsEmployee order by id desc;`;
     
    let connection = mysql.createConnection(config);
    let connections = mysql.createConnection(config);
    connection.query(sql,[employeeId,eName,eRelationship,ePhone], (error, results, fields) => {
        if (error) return console.error(error.message);
    });
    connection.end();
    connections.query(sql2,[], (error, result, fields) => {
        if (error) return console.error(error.message);
        return res.json(result);
    });
    connections.end();
};


exports.updateEmployeeEmergency = (req, res) => {
    const empId = req.query.empId;
    const {employeeId,eName,eRelationship,ePhone } = req.body;

    let sql = `UPDATE emergencyContactsEmployee SET employeeId=?, eName=?,eRelationship=?,ePhone=? WHERE id = ?`;

    let connection = mysql.createConnection(config);

    connection.query(sql,[employeeId,eName,eRelationship,ePhone,empId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("updated emergency employee" + employeeId + eName);
    });
    connection.end();
};

exports.getPaginatedSearchEmployee = (req, res) => {
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const Name = req.query.Name;
    const Code = req.query.Code;
    console.log(Code)
    if (Name) {
        employee.count({}).exec((err, total) => {
            employee.find({ $or: [{ firstName: { $regex: Name, $options: 'i' } }] }).skip((page - 1) * pagination).limit(pagination).sort({ "Name": 1 }).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'employee not found'
                    });
                }

                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });

            });
        });
    } else if (Code) {
        employee.count({}).exec((err, total) => {
            employee.find({
                $or: [
                    { employeeId: { $regex: Code, $options: 'i' } }
                ]
            }).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'employee not found'
                    });
                }
                res.json({
                    "identifier": "get all employee list", tag,
                    pagination, page, total
                });
            });
        });

    } else {

        employee.count({}).exec((err, total) => {

            employee.find({}).skip((page - 1) * pagination).limit(pagination).exec((err, tag) => {
                if (err) {
                    return res.status(400).json({
                        error: 'product not found'
                    });
                }
                for (let val of tag) {

                    console.log(val.TypeID)
                    let TypeID = (val.TypeID);
                    employee.find({ _id: TypeID }).exec((err, tag) => {
                        for (let val of tag) {
                            let name = val.Name;
                            console.log(name)
                        }
                    });
                }
                res.json({ "identifier": "get all Product list", tag, pagination, page, total });

            });
        });
    }
};

exports.getAllEmployeesPagination = (req, res) =>{
    // limit as 20
    const limit = req.query.limit
    // page number
    const page = req.query.page
    // calculate offset
    const offset = (page - 1) * limit
    // query for fetching data with page number and offset+
    let connection = mysql.createConnection(config);
    const prodsQuery = "select * from employees limit "+limit+" OFFSET "+offset
      connection.query(prodsQuery, (error, results, fields) => {
        // When done with the connection, release it.
        connection.end();
             if (error) throw error;
        // create payload
        var jsonResult = {
          'products_page_count':results.length,
          'page_number':page,
          'products':results
        }
        // create response
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Products for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      })

}

exports.getEmployee = (req, res) => {
    

    // employee.find({}).exec((err, allUser) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'inventory not found'
    //         });
    //     }
   
    
    //         res.json({
    //             "identifier": "get ALL Employee", allUser
    //         });

//});
let sql = `select * from employees;`;

let connection = mysql.createConnection(config);

    connection.query(sql, (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json(results);
    });
    connection.end();
};

exports.getOneEmployee = (req, res) => {
    const empId = req.query.empId;
//     employee.findOne({employeeId: slug }).exec((err, allUser) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'inventory not found'
//             });
//         }
//         console.log("user " + allUser);

//         let UserId = allUser.employeeId;
//         earnD.findOne({employeeId: UserId}).exec((err, earD) => {
//       res.json({
//             "identifier": "get One Employee", allUser, earD
//         });
//     });
// });

let sql = `CALL GetEmployeeDetails(?)`;

let connection = mysql.createConnection(config);

connection.query(sql,[empId], (error, results, fields) => {
    if (error) return console.error(error.message);
    return res.json(results);
});
connection.end();
};


exports.updateEmployee = (req, res) => {

    const empId = req.query.empId;

    const { empStatus, accountNumber, firstName, lastName, middleName, sssId, 
        pagibigId, philhealthId, tinId, phoneNumber, nationality, religion,maritalStatus} = req.body;
    // var myquery = { employeeId: slug }
    // var newV = req.body;
    // employee.updateOne(myquery, newV).exec((err, tag) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'cant update employee ' + slug 
    //         });
    //     }
    //     res.json(tag);
    // });

    let sql = `UPDATE employees SET empStatus=?, accountNumber=?,firstName=?,lastName=?,middleName=?,sssId=?,
    pagibigId=?,philhealthId=?,tinId=?,phoneNumber=?,nationality=?,religion=?,maritalStatus=? 
    WHERE id = ?`;

    let connection = mysql.createConnection(config);

    connection.query(sql,[empStatus, accountNumber, firstName, lastName, middleName, sssId, pagibigId, philhealthId, tinId, phoneNumber, nationality, religion,maritalStatus,empId], (error, results, fields) => {
        if (error) return console.error("there a problem updating the employee" , error);
        return res.json("successfull update employee!");
    });
    connection.end();
    };



    exports.updateEmployeeDeductions = (req, res) => {

        const empId = req.query.empId;
    
        const { sssRefund, sss, sssCl, aroe, deathContribution} = req.body;
    
        let sql = `UPDATE deductions SET sssRefund=?, sss=?,sssCl=?,aroe=?,deathContribution=? WHERE id = ? `; 
    
        let connection = mysql.createConnection(config);
    
        connection.query(sql,[sssRefund, sss, sssCl, aroe, deathContribution,empId], (error, results, fields) => {
            if (error) return console.error("there a problem updating the employee" , error);
            return res.json("successfull update employee deduction records!");
        });
        connection.end();
        };
    

exports.deleteEmployee = (req, res) => {
        // var newV = req.body;
 
    // employee.deleteOne(newV).exec((err, tag) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'cant Deleted employee '
    //         });
    //         console.log(err)
    //     }
        
    //     res.json('Success : Deleted employee ' + newV);
    // });

    const empId = req.query.empId;
    let sql = `DELETE FROM employees WHERE id=?`;

    let connection = mysql.createConnection(config);

    connection.query(sql,[empId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("successfull delete employee :" + empId );
    });
    connection.end();
    };


exports.getOneUserWallet = (req, res) => {
    
    const slug = req.params.slug.toLowerCase();
    console.log(slug)
    wallets.findOne({ OwnerID: slug }).exec((err, allUser) => {
        if (err) {
            return res.status(400).json({
                error: 'inventory not found'
            });
        }
        res.json({
            "identifier": "get One user wallet", allUser
        });
});
};

exports.getUserProfile = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    console.log(slug)
    User.findOne({ _id: slug }).exec((err, allUser) => {
        if (err) {  
            return res.status(400).json({
                error: 'inventory not found'
            });
        }
        res.json({
            "identifier": "get One user wallet", allUser
        });
});
};

exports.uploadPictureUser = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const image = req.file.destination + req.file.filename
    var myquery ={ _id: slug } 
    let newV = {photo : image};
    User.updateOne(myquery,newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: err.errmsg
            });
        }
        res.json({status: "Success", message: "Successfully uploaded avatar!",image});
    });
};

exports.uploadPictureEmployee = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const image = req.file.destination + req.file.filename
    var myquery ={ _id: slug } 
    let newV = {photo : image};
    employee.updateOne(myquery,newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: err.errmsg
            });
        }
        res.json({status: "Success", message: "Successfully uploaded avatar!",image});
    });
};



exports.addCutoff = (req, res) => {
    const {cutOff, month, year, quarter,cutoffTerm} = req.body;

    let sqlCheck = `select * from cutoffs where cmonth =? and cutoffTerm = ?;`;

    let connections = mysql.createConnection(config);

    connections.query(sqlCheck,[month, cutoffTerm], (error, results, fields) => {
        console.log("dasda " + sqlCheck + cutoffTerm + month)
        console.log(results)
        if (_.isEmpty(results)) { 
     
            let sql = `insert into cutoffs(cmonth,cyear,quarter,cutOff,cutoffTerm) values (?,?,?,?,?);`;

            let connection = mysql.createConnection(config);
            
            connection.query(sql,[month, year, quarter, cutOff,cutoffTerm], (error, results, fields) => {
                if (error) return console.error(error.message);
                return res.json(results);
        
    });
    connection.end();
        } else {

            return res.json("CutoffExist");
        }
        
        connections.end();
        
    
    });
    
    // let completeId = new cutoff({cutOff, month, year, quarter});

    // completeId.save((err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(400).json({
    //             error: err.errmsg
             
    //         });
    //     }

    //     res.json('Success : Added cutoff'); // dont do this res.json({ tag: data });
    // });

};

exports.getCutoff = (req, res) => {
//     cutoff.find({}).exec((err, allUser) => {
//         if (err) {  
//             return res.status(400).json({
//                 error: 'Cutoff not found'
//             });
//         }
//         res.json({
//             "identifier": "get Cutoff", allUser
//         });
// });
    
let sql = `select * from cutoffs;`;

let connection = mysql.createConnection(config);

connection.query(sql, (error, results, fields) => {
    if (error) return console.error(error.message);
    return res.json(results);
});
connection.end();

}

exports.updateCutoff = (req, res) => {
    const cutoffId = req.query.cutoffId;
    
    const { cmonth, cyear, quarter, cutOff,cutoffTerm} = req.body;

    let sql = `UPDATE cutoffs SET cmonth=?, cyear=?,quarter=?,cutOff=? WHERE id = ? `; 

    let connection = mysql.createConnection(config);

    connection.query(sql,[cmonth, cyear, quarter, cutOff, cutoffTerm, cutoffId], (error, results, fields) => {
        if (error) return console.error("there a problem updating the employee" , error);
        return res.json("successfull update cutoff!");
    });
    connection.end();
}


exports.deleteCutoff = (req, res) => {
    const cutoffId = req.query.cutoffId;
    let sql = `DELETE FROM cutoffs WHERE id=?`;

    let connection = mysql.createConnection(config);

    connection.query(sql,[empId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json("successfull delete employee :" + empId );
    });
    connection.end();
}



exports.addReminder = (req, res) => {
    const { title, description, date} = req.body;
    let completeId = new reminder({ title, description, date});


    completeId.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err.errmsg
             
            });
        }

        reminder.find({}).exec((err, allUser) => {
            if (err) {  
                return res.status(400).json({
                    error: 'reminder not found'
                });
            }
            res.json({
                "identifier": "get Reminder", allUser
            });
    });
});
};

exports.getReminder = (req, res) => {
    reminder.find({}).exec((err, allUser) => {
        if (err) {  
            return res.status(400).json({
                error: 'reminder not found'
            });
        }
        res.json({
            "identifier": "get Cutoff", allUser
        });
});
}

exports.updateReminder = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
    var newV = req.body;
    reminder.updateOne(myquery, newV).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant update reminder'
            });
        }
        res.json('Success : Updated reminder');
    });
}


exports.deleteReminder = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    var myquery = { _id: slug }
 
    reminder.findByIdAndRemove(myquery).exec((err, tag) => {
        if (err) {
            return res.status(400).json({
                error: 'cant Deleted reminder'
            });
        }

        reminder.find({}).exec((err, allUser) => {
            if (err) {  
                return res.status(400).json({
                    error: 'reminder not found'
                });
            }
            res.json({
                "identifier": "get Deleted reminder", allUser
            });
    });

    });

}


exports.getReminder = (req, res) => {
    reminder.find({}).exec((err, allUser) => {
        if (err) {  
            return res.status(400).json({
                error: 'reminder not found'
            });
        }
        res.json({
            "identifier": "get Cutoff", allUser
        });
});
}

exports.getReminder = (req, res) => {
    reminder.find({}).exec((err, allUser) => {
        if (err) {  
            return res.status(400).json({
                error: 'reminder not found'
            });
        }
        res.json({
            "identifier": "get Cutoff", allUser
        });
});
}



exports.getFinalPayroll = (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const cutoffId = req.params.cutoffId.toLowerCase();
    const cutoff30Id = req.params.cutoff30Id.toLowerCase();
    const createdAt = moment().format('MM/DD/YYYY');


    employee.findOne({employeeId: slug }).exec((err, allUser) => {
        
  

        if (err) {
            return res.status(400).json({
                error: 'inventory not found'
            });
        }

        let UserId = allUser.employeeId;
        let detachments = [];
        detach.find({ $and: [ { employeeId: slug }, { cutoffId: cutoffId } ] }).exec((err, detachments15) => {
        let detachName = detachments15.daysWorkcount;
        console.log("DS " + detachName);
        detach.find({ $and: [ { employeeId: slug }, { cutoffId: cutoff30Id } ] }).exec((err, detachments30) => {
       
        cutoff.findOne({_id: cutoffId}).exec((err, cutoffPeriod) => {
        cutoff.findOne({_id: cutoff30Id}).exec((err, cutoff30Period) => {
        

        earnD.findOne({employeeId: UserId}).exec((err, earningsDedicutions) => {
                
              

      res.json({
            "identifier": "Payroll",  earningsDedicutions,detachments15, createdAt, detachments30, cutoffPeriod, cutoff30Period
        });
    });
});
});
});
});
});
};


exports.getSQLEarningsDeduction = (req, res) => { 
    let cutoffId = req.query.cutoffId;

    let sql = `select c.cutOff, empId, empName, basicPay, overtimePay, 
    holidayPay, nightDayPay, sss,sssSalaryLoan,sssCl,aroe,deathContribution,totalDeduction,grossPay,netPay from payroll  as d left join cutoffs as c on d.cutoffId=c.id  where cutoffId = ?`;

    let connection = mysql.createConnection(config);
    connection.query(sql,[cutoffId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json(results);
    });
    connection.end();

};



exports.getSQLDeduction = (req, res) => { 
    let cutoffId = req.query.cutoffId;

    let sql = `select payrollCutoff, empId, empName, sss,sssSalaryLoan,sssCl,aroe,deathContribution,totalDeduction from payroll where cutoffId = ?`;

    let connection = mysql.createConnection(config);
    connection.query(sql,[cutoffId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json(results);
    });
    connection.end();

};


exports.getSQLDetachmentsReport = (req, res) => { 
    let monthId = req.query.monthId;
    let customerId = req.query.customerId;

    let sql1 = `select payr.empId,payr.empName, payr.payrollCutoff,  c.wageRate, c.otRate , c.nightDifferentialRate ,
    c.holidayRate, payr.basicPay, payr.overtimePay, payr.holidayPay, payr.specialHolidayPay,payr.nightDayPay,
    payr.netPay,payr.clientId from payroll as payr left join customers as c on payr.clientId=c.id  
    where monthId =? and cutOffTerm=1 and payr.clientId = ?;
    ;`;
    let sql2 = `select payr.empId,payr.empName, payr.payrollCutoff,  c.wageRate, c.otRate , c.nightDifferentialRate ,
    c.holidayRate, payr.basicPay, payr.overtimePay, payr.holidayPay, payr.specialHolidayPay,payr.nightDayPay,
    payr.netPay,payr.clientId from payroll as payr left join customers as c on payr.clientId=c.id  
    where monthId =? and cutOffTerm=2 and payr.clientId = ?;
    ;`;

    let connection = mysql.createConnection(config);
    let connection2 = mysql.createConnection(config);
    connection.query(sql1,[monthId,customerId], (error, detachment1, fields) => {
        if (error) return console.error(error.message);
    
        connection2.query(sql2,[monthId,customerId], (error, detachment2, fields) => {
            if (error) return console.error(error.message);
            return res.json({detachment1,detachment2});
        });
        connection2.end();
    });
    connection.end();

};



exports.getSQLReportATM = (req, res) => { 
    let cutoffId = req.query.cutoffId;

    let sql = `select c.cutOff, e.accountNumber, empName, netPay as salary  from payroll  as d left join cutoffs as c on d.cutoffId=c.id left join employees as e on d.empId=e.employeeId where cutoffId =(?);`;

    let connection = mysql.createConnection(config);
    connection.query(sql,[cutoffId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json(results);
    });
    connection.end();

};



exports.addDetachmentRecordCSV = (req, res) => {

    const customerName = req.body.customerName;
    const customerId = req.body.customerId;
    const cutoffId = req.body.cutoffId;
    const cutoffTerm = req.body.cutoffTerm;

    detachments.push({customerName,customerId,employeeId,employeeName,cutoffId,daysWorkcount,overtimeCount ,holidaysCount,nightDifferetialCount,cutoffTerm,specialHolidayCount});
   let connection = mysql.createConnection(config);

   let sql = `CALL GetCutoffEarningsInsertToPayrollTableEvery1stCutoff(?)`;
   connection.query(sql,[cutoffId], (error, results, fields) => {

    if(cutoffTerm == 1){
        let connection = mysql.createConnection(config);
    
        let sql = `CALL GetCutoffEarningsInsertToPayrollTableEvery1stCutoff(?)`;
        connection.query(sql,[cutoffId], (error, results, fields) => {
        const result = {
            status: "ok",
            filename: req.file.originalname,
            message: "Upload Successfully!",
        }
        connection.end();
        res.json(result);
    });
    } else {
        let connection = mysql.createConnection(config);
    
        let sql = `CALL GetCutoffEarningsInsertToPayrollTableEvery2ndCutoff(?)`;
        connection.query(sql,[cutoffId], (error, results, fields) => {
        const result = {
            status: "ok",
            filename: req.file.originalname,
            message: "Upload Successfully!",
        }
        connection.end();
        res.json(result);
    });
    connection.end();
}
connection.end();
});
}


exports.uploadFileDetachments = (req, res) => {
    try{
        const detachments = [];
        // const customerName = "ANGL     : CARTIMAR - ANGELUS PLA";
        // const customerId = 3;
        // const cutoffId = 2;
        // const cutoffTerm = 2;
        const customerName = req.body.customerName;
        const customerId = req.body.customerId;
        const cutoffId = req.body.cutoffId;
        const cutoffTerm = req.body.cutoffTerm;
        res.header("Access-Control-Allow-Origin", "*");
        fs.createReadStream(__basedir + "/uploads/" +  req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {
                let employeeId = parseInt(row.employeeId);
                let employeeName= row.employeeName;
                let daysWorkcount = parseInt(row.daysWorkcount);
                let overtimeCount = parseInt(row.overtimeCount);
                let holidaysCount = parseInt(row.holidaysCount);
                let nightDifferetialCount = parseInt(row.nightDifferetialCount);
                let specialHolidayCount = parseInt(row.specialHolidayCount);


                detachments.push({customerName,customerId,employeeId,employeeName,cutoffId,daysWorkcount,overtimeCount ,holidaysCount,nightDifferetialCount,cutoffTerm,specialHolidayCount});
                //console.log({customerName,customerId,empId,empName,cutoffId,dayWork,overtimeCount ,holidaysCount,nightDifferetialCount,cutoffTerm});
            })
            .on('end', () => {
                // Save customers to MySQL/PostgreSQL database
                Detachments.bulkCreate(detachments).then(() => {
                if(cutoffTerm == 1){
                    let connection = mysql.createConnection(config);
                
                    let sql = `CALL GetCutoffEarningsInsertToPayrollTableEvery1stCutoff(?)`;
                    connection.query(sql,[cutoffId], (error, results, fields) => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }
                    connection.end();
                    res.json(result);
                });
                } else {
                    let connection = mysql.createConnection(config);
                
                    let sql = `CALL GetCutoffEarningsInsertToPayrollTableEvery2ndCutoff(?)`;
                    connection.query(sql,[cutoffId], (error, results, fields) => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }
                    connection.end();
                    res.json(result);
                });
                }
     
        });    
          
            });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}


exports.getSQLPayroll = (req, res) => { 
    let cutoffId = req.query.cutoffId;

    let sql = `select cu.cutOff,d.empId, c.id, c.firstName, c.lastName, c.middleName, d.grossPay as totalEarnings, d.totalDeduction as totalDeduction, d.netPay as netIncome 
    from payroll as d left join employees as c on d.empId=c.employeeId left join cutoffs as cu on d.cutoffId=cu.id where d.cutoffId =? group by empName; `;

    let connection = mysql.createConnection(config);
    connection.query(sql,[cutoffId], (error, results, fields) => {
        if (error) return console.error(error.message);
        return res.json(results);
    });
    connection.end();

};

exports.getSQLPayrollEmplyeeDetails = (req, res) => { 
    let cutoffId = req.query.cutoffId;
    let empId = req.query.empId;
    let sql = `select cu.cutOff,d.empId, concat(c.lastName, ',',c.firstName,' ', c.middleName) as fullname, c.employeeId,  d.grossPay as totalEarnings, det.daysWorkcount, basicPay, det.overtimeCount, overtimePay, det.holidaysCount,holidayPay, 
    nightDiffDayCount,nightDayPay, specialHolidayPay, IFNULL(adjustment,0) as adjustment,IFNULL(sssRefund,0) as sssRefund,IFNULL(sss,0) as sss,IFNULL(sssSalaryLoan,0) as sssSalaryLoan, IFNULL(hdmfloan,0) as hdmfloan, IFNULL(pagibigloan,0) as pagibigloan,
    IFNULL(taxableIncomeYTD,0) as taxableIncomeYTD, IFNULL(taxableDeductionYTD,0) as taxableDeductionYTD, IFNULL(pagibigDeductionYTD,0) as pagibigDeductionYTD, IFNULL(sssDeductionYTD,0) as sssDeductionYTD, IFNULL(philhealthDeductionYTD,0) as philhealthDeductionYTD,
    sssCl,aroe,deathContribution, grossPay,
    totalDeduction as totalDeduction, d.netPay as netIncome
    from payroll as d left join employees as c on d.empId=c.employeeId left join cutoffs as cu on d.cutoffId=cu.id left join detachments as det on det.cutoffId=cu.id  where d.cutoffId =? and empId=? group by empName; `;
    
    let earnings = [];
    let deduction = [];
    let loans = [];
    let ytd = [];

    let connection = mysql.createConnection(config);
    connection.query(sql,[cutoffId,empId], (error, results, fields) => {
        for (let val of results) {
        let employeeId = val.empId;
        let fullName = val.fullname;
        let cutOff = val.cutOff;
        let grossPay = val.grossPay;
        let netPay = val.totalEarnings;
        let totaldeduction = val.totalDeduction;
        //loan
        let hdmfloan = val.hdmfloan;
        let pagibigloan = val.pagibigloan;
        let sssSalaryLoan = val.sssSalaryLoan;
        //deduction
        let sss = val.sss;
        let sssCl = val.sssCl;
        let deathContribution = val.deathContribution;
        let aroe = val.aroe;

        //earnings
        let daysWorkcount = val.daysWorkcount;
        let basicPay = val.basicPay;
        let overtimePay = val.overtimePay;
        let overtimeCount = val.overtimeCount;
        let holidaysCount = val.holidaysCount;
        let holidayPay = val.holidayPay;
        let nightDiffDayCount = val.nightDiffDayCount;
        let nightDayPay = val.nightDayPay;
        let specialHolidayPay = val.specialHolidayPay;
        let sssRefund = val.sssRefund;
        let philhealthDeductionYTD = val.philhealthDeductionYTD;
        let taxableIncomeYTD = val.taxableIncomeYTD;
        let taxableDeductionYTD = val.taxableDeductionYTD;
        let pagibigDeductionYTD = val.pagibigDeductionYTD;
        let sssDeductionYTD = val.sssDeductionYTD;
     

       earnings.push({daysWorkcount, basicPay, overtimePay, overtimeCount, holidaysCount,holidayPay,nightDiffDayCount, nightDayPay, specialHolidayPay, sssRefund})     
       loans.push({hdmfloan,pagibigloan,sssSalaryLoan})     
       deduction.push({sss,sssCl,deathContribution,aroe})   
       ytd.push({philhealthDeductionYTD, taxableIncomeYTD, taxableDeductionYTD, pagibigDeductionYTD,pagibigDeductionYTD,sssDeductionYTD })
       
        if (error) return console.error(error.message);
        return res.json({cutOff, employeeId, fullName, earnings, deduction , loans, ytd, grossPay, totaldeduction, netPay});
    }
    });
    connection.end();

};

