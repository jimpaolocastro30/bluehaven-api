const express = require('express');
const router = express.Router();


const {addAnchorSagrod,  getPaginatedSearchAsszabt41401045, getAsszabt41401045, getOneAsszabt41401045, updateAsszabt41401045} = require('../controllers/anchorSagrodCont');


router.post('/admin/add/client',  addAnchorSagrod);
router.get('/admin/get/query/client', getAsszabt41401045);
router.get('/admin/get/one/client',  getOneAsszabt41401045);
router.put('/admin/update/client', updateAsszabt41401045);


module.exports = router;