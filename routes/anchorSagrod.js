const express = require('express');
const router = express.Router();


const {addAnchorSagrod,  getPaginatedSearchAsszabt41401045, getAsszabt41401045, getOneAsszabt41401045, updateAsszabt41401045,
  addCyndical, getPaginatedSearchCyndical, getOneCyndical, updateCyndical, updateAsszabtCRS, getOneAsszabtCRS,getPaginatedSearchAsszabtCRS, addAnchorSagrodCRS} = require('../controllers/anchorSagrodCont');

const {addDynabolt, getDynabolt, getOneDynabolt, getPaginatedSearchDynabolt, updateDynabolt} = require('../controllers/dynabolt'); 
const {addTurnBuckle, getOneTurnBuckle, getPaginatedSearchTurnBuckle, getTurnBuckle, updateTurnBuckle} = require('../controllers/turnBuckle');

const {addLoopClevis, getLoopClevis, getOneLoopClevis, getPaginatedSearchLoopClevis, updateLoopClevis} = require('../controllers/loopClevis');

const {addEShield, getEShield, getOneEShield, getPaginatedSearchEShield, updateEShield} = require('../controllers/expansionShield');

const {addJbolt, getJbolt, getOneJbolt, getPaginatedSearchJbolt, updateJbolt} = require('../controllers/jbolt');

const {adduboltCM, adduboltMM,getOneuboltCM, getOneuboltMM,
getPaginatedSearchuboltMM, getPaginatedSearchuboltCM, getuboltCM, getuboltMM,
updateuboltCM,updateuboltMM } = require('../controllers/ubolt');


const {addHexBolt, getOneHexBolt, getPaginatedSearchhexBolt,
gethexBolt,updatehexBolt} =require('../controllers/hexbolt');

router.post('/admin/add/Asszabt41401045',  addAnchorSagrod);
router.get('/admin/get/query/Asszabt41401045', getAsszabt41401045);
router.get('/admin/get/one/Asszabt41401045/:slug',  getOneAsszabt41401045);
router.put('/admin/update/Asszabt41401045/:slug', updateAsszabt41401045);

router.post('/admin/add/Asszabtcrs',  addAnchorSagrodCRS);
router.get('/admin/get/query/Asszabtcrs', getPaginatedSearchAsszabtCRS);
router.get('/admin/get/one/Asszabtcrs/:slug',  getOneAsszabtCRS);
router.put('/admin/update/Asszabtcrs/:slug', updateAsszabtCRS);


router.post('/admin/add/cyndical',  addCyndical);
router.get('/admin/get/query/cyndical', getPaginatedSearchCyndical);
router.get('/admin/get/one/cyndical/:slug',  getOneCyndical);
router.put('/admin/update/cyndical/:slug', updateCyndical);

router.post('/admin/add/dynabolt',  addDynabolt);
router.get('/admin/get/query/dynabolt', getPaginatedSearchDynabolt);
router.get('/admin/get/one/dynabolt/:slug',  getOneDynabolt);
router.put('/admin/update/dynabolt/:slug', updateDynabolt);

router.post('/admin/add/turnBuckles',  addTurnBuckle);
router.get('/admin/get/query/turnBuckle', getPaginatedSearchTurnBuckle);
router.get('/admin/get/one/turnBuckle/:slug',  getOneTurnBuckle);
router.put('/admin/update/turnBuckle/:slug', updateTurnBuckle);

router.post('/admin/add/loopClevis',  addLoopClevis);
router.get('/admin/get/query/loopClevis', getPaginatedSearchLoopClevis);
router.get('/admin/get/one/loopClevis/:slug',  getOneLoopClevis);
router.put('/admin/update/loopClevis/:slug', updateLoopClevis);

router.post('/admin/add/EShield',  addEShield);
router.get('/admin/get/query/EShield', getPaginatedSearchEShield);
router.get('/admin/get/one/EShield/:slug',  getOneEShield);
router.put('/admin/update/EShield/:slug', updateEShield);

router.post('/admin/add/Jbolt',  addJbolt);
router.get('/admin/get/query/Jbolt', getPaginatedSearchJbolt);
router.get('/admin/get/one/Jbolt/:slug',  getOneJbolt);
router.put('/admin/update/Jbolt/:slug', updateJbolt);

router.post('/admin/add/uboltCM',  adduboltCM);
router.get('/admin/get/query/uboltCM', getPaginatedSearchuboltCM);
router.get('/admin/get/one/uboltCM/:slug',  getOneuboltCM);
router.put('/admin/update/uboltCM/:slug', updateuboltCM);

router.post('/admin/add/uboltMM',  adduboltMM);
router.get('/admin/get/query/uboltMM', getPaginatedSearchuboltMM);
router.get('/admin/get/one/uboltMM/:slug',  getOneuboltMM);
router.put('/admin/update/uboltMM/:slug', updateuboltMM);

router.post('/admin/add/hexbolt',  addHexBolt);
router.get('/admin/get/query/hexbolt', getPaginatedSearchhexBolt);
router.get('/admin/get/one/hexbolt/:slug',  getOneHexBolt);
router.put('/admin/update/hexbolt/:slug', updatehexBolt);

module.exports = router;