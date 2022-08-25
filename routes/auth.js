const express = require('express');
const router = express.Router();
const multer = require('multer');
let uploads = require('../config/multer.config.js');
const { signup, signin, signout, requireSigninUser, payrollMiddleware, adminMiddleware, accountMiddleware,
  wallets, getPaginatedSearchEmployee,
  uploadPictureUser,uploadPictureEmployee,
  getOneUserWallet, getUserProfile, addEmployees, 
  getPaginatedSearchUser,readUser,updateUser,
  getEmployee, getOneEmployee,updateEmployee,
  getSQLReportATM,updateEmployeeDeductions,
  addEmployeeEmergency,updateEmployeeEmergency,
  uploadFileDetachments,getSQLPayrollEmplyeeDetails,
addCutoff,deleteCutoff,updateCutoff,getCutoff,getFinalPayroll,
getSQLEarningsDeduction,getSQLDeduction,getSQLDetachmentsReport,

addReminder,deleteReminder,updateReminder,getReminder,deleteEmployee,getSQLPayroll, getAllEmployeesPagination} = require('../controllers/auth');

const {addPayroll, getPaginatedSearchPayroll, getOnePayroll, updatePayroll} = require('../controllers/accounting');
const {uploadEmployeeCSV} = require('../controllers/upload');
 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const now = new Date().toISOString();
      const date = now.replace(/:/g, '-');
      cb(null, date + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


// validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.get('/user/profile/:slug', requireSigninUser, readUser);
router.put('/user/upload/avatar/:slug', requireSigninUser, upload.single('productImage'), uploadPictureUser);


router.post('/admin/add/user', requireSigninUser, adminMiddleware, signup)
router.get('/admin/get/query/user', requireSigninUser, adminMiddleware, getPaginatedSearchUser)
router.get('/admin/get/one/user/:slug', requireSigninUser, adminMiddleware, readUser)
router.put('/admin/update/user/:slug', requireSigninUser, adminMiddleware, updateUser)

router.post('/admin/add/employee', requireSigninUser, adminMiddleware, addEmployees)
router.post('/admin/add/employee/emergencycontact', requireSigninUser, adminMiddleware, addEmployeeEmergency)
router.put('/admin/update/employee/emergencycontact', requireSigninUser, adminMiddleware, updateEmployeeEmergency)
router.put('/admin/update/employee/deduction', requireSigninUser, adminMiddleware,updateEmployeeDeductions)
router.get('/admin/get/all/employee', requireSigninUser, adminMiddleware, getEmployee)
router.get('/admin/get/query/employee', requireSigninUser, adminMiddleware, getAllEmployeesPagination)
router.get('/admin/get/one/employee', requireSigninUser, adminMiddleware, getOneEmployee)
router.put('/admin/update/employee', requireSigninUser, adminMiddleware, updateEmployee)
router.put('/admin/employee/upload/avatar/:slug', requireSigninUser, adminMiddleware, upload.single('productImage'), uploadPictureEmployee);
router.delete('/admin/delete/employee', requireSigninUser, adminMiddleware, deleteEmployee);

router.post('/admin/add/cutoff', requireSigninUser, adminMiddleware, addCutoff)
router.get('/admin/get/cutoff', requireSigninUser, adminMiddleware, getCutoff)
router.put('/admin/update/cutoff', requireSigninUser, adminMiddleware, updateCutoff);
router.delete('/admin/delete/cutoff', requireSigninUser, adminMiddleware, deleteCutoff);

router.post('/admin/add/reminder', requireSigninUser, adminMiddleware, addReminder)
router.get('/admin/get/reminder', requireSigninUser, adminMiddleware, getReminder)
router.put('/admin/update/reminder/:slug', requireSigninUser, adminMiddleware, updateReminder);
router.delete('/admin/delete/reminder/:slug', requireSigninUser, adminMiddleware, deleteReminder);


router.post('/admin/add/payroll', requireSigninUser, adminMiddleware, addPayroll)
router.get('/admin/get/query/payroll', requireSigninUser, adminMiddleware, getPaginatedSearchPayroll)
router.get('/admin/get/one/payroll/:slug', requireSigninUser, adminMiddleware, getOnePayroll)
router.put('/admin/update/payroll/:slug', requireSigninUser, adminMiddleware, updatePayroll);


router.get('/admin/get/one/final/payroll/:slug&:cutoffId&:cutoff30Id', requireSigninUser, adminMiddleware, getFinalPayroll);


router.post('/payroll/add/employee', requireSigninUser, payrollMiddleware, addEmployees)
router.get('/payroll/get/all/employee', requireSigninUser, payrollMiddleware, getEmployee)
router.get('/payroll/get/query/employee', requireSigninUser, payrollMiddleware, getPaginatedSearchEmployee)
router.get('/payroll/get/one/employee/:slug', requireSigninUser, payrollMiddleware, getOneEmployee)
router.put('/payroll/update/employee/:slug', requireSigninUser, payrollMiddleware, updateEmployee)
router.put('/payroll/employee/upload/avatar/:slug', requireSigninUser, payrollMiddleware, upload.single('productImage'), uploadPictureEmployee);
router.post('/api/file/upload/detachments', uploads.single("file"), uploadFileDetachments);
router.post('/api/file/add/single/detachments', requireSigninUser, uploadFileDetachments);


router.get('/report/payroll/get/query', requireSigninUser, getSQLPayroll);
router.get('/report/payroll/get/employee', requireSigninUser, getSQLPayrollEmplyeeDetails);
router.get('/report/employee/earnings/deduction', requireSigninUser, getSQLEarningsDeduction);
router.get('/report/employee/deduction', requireSigninUser, getSQLDeduction);
router.get('/report/employee/detachments', requireSigninUser, getSQLDetachmentsReport);
router.get('/report/employee/atm/salary', requireSigninUser, getSQLReportATM);



module.exports = router;
