const express = require('express');
const router = express.Router();

const {adminMiddleware, requireSigninUser} = require('../controllers/auth');
const {addClient,  getOneClient, getPaginatedSearchClient, updateClient} = require('../controllers/clientManagements');


router.post('/admin/add/client', requireSigninUser, adminMiddleware, addClient);
router.get('/admin/get/query/client', requireSigninUser, adminMiddleware, getPaginatedSearchClient);
router.get('/admin/get/one/client', requireSigninUser, adminMiddleware, getOneClient);
router.put('/admin/update/client', requireSigninUser, adminMiddleware, updateClient);


module.exports = router;