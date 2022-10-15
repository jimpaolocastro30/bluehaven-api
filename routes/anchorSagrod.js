const express = require('express');
const router = express.Router();


const {addAnchorSagrod,  getPaginatedSearchAsszabt41401045, getAsszabt41401045, getOneAsszabt41401045, updateAsszabt41401045,
  addCyndical, getPaginatedSearchCyndical, getOneCyndical, updateCyndical, updateAsszabtCRS, getOneAsszabtCRS,getPaginatedSearchAsszabtCRS, addAnchorSagrodCRS, getCyndical, getAsszabtCRS} = require('../controllers/anchorSagrodCont');

const {addDynabolt, getDynabolt, getOneDynabolt, getPaginatedSearchDynabolt, updateDynabolt} = require('../controllers/dynabolt'); 
const {addTurnBuckle, getOneTurnBuckle, getPaginatedSearchTurnBuckle, getTurnBuckle, updateTurnBuckle} = require('../controllers/turnBuckle');

const {addLoopClevis, getLoopClevis, getOneLoopClevis, getPaginatedSearchLoopClevis, updateLoopClevis} = require('../controllers/loopClevis');

const {addEShield, getEShield, getOneEShield, getPaginatedSearchEShield, updateEShield,
addLScew, getLScew,getOneLScew, getPaginatedSearchLScew,updateLScew} = require('../controllers/expansionShield');

const {addJbolt, getJbolt, getOneJbolt, getPaginatedSearchJbolt, updateJbolt} = require('../controllers/jbolt');

const {adduboltCM, adduboltMM,getOneuboltCM, getOneuboltMM,
getPaginatedSearchuboltMM, getPaginatedSearchuboltCM, getuboltCM, getuboltMM,
updateuboltCM,updateuboltMM } = require('../controllers/ubolt');


const {addHexBolt, getOneHexBolt, getPaginatedSearchhexBolt,
gethexBolt,updatehexBolt} =require('../controllers/hexbolt');


const {addAnchorBolt, getAnchorBolt, getOneAnchorBolt, 
  getPaginatedSearchAnchorBolt, updateAnchorBolt} =require('../controllers/anchorBolt');
 
const {addPlates, getOnePlates, getOneUpdatedPlates, getPaginatedSearchPlates, getPlates, updatePlates} = require('../controllers/plates');  

const {addQuotation, getOneQuotation, 
  getPaginatedSearchQuotation, getQuotation, updateQuotation} = require('../controllers/quotation');

const {addrawMaterial, getMaterial, getOneMaterial, updateMaterial} = require('../controllers/rawMaterial');

router.post('/admin/add/Asszabt41401045',  addAnchorSagrod);
router.get('/admin/get/query/Asszabt41401045', getAsszabt41401045);
router.get('/admin/get/one/Asszabt41401045/:slug',  getOneAsszabt41401045);
router.put('/admin/update/Asszabt41401045/:slug', updateAsszabt41401045);

router.post('/admin/add/Asszabtcrs',  addAnchorSagrodCRS);
router.get('/admin/get/query/Asszabtcrs', getAsszabtCRS);
router.get('/admin/get/one/Asszabtcrs/:slug',  getOneAsszabtCRS);
router.put('/admin/update/Asszabtcrs/:slug', updateAsszabtCRS);


router.post('/admin/add/cyndical',  addCyndical);
router.get('/admin/get/query/cyndical', getCyndical);
router.get('/admin/get/one/cyndical/:slug',  getOneCyndical);
router.put('/admin/update/cyndical/:slug', updateCyndical);

router.post('/admin/add/dynabolt',  addDynabolt);
router.get('/admin/get/query/dynabolt', getDynabolt);
router.get('/admin/get/one/dynabolt/:slug',  getOneDynabolt);
router.put('/admin/update/dynabolt/:slug', updateDynabolt);

router.post('/admin/add/turnBuckles',  addTurnBuckle);
router.get('/admin/get/query/turnBuckle', getTurnBuckle);
router.get('/admin/get/one/turnBuckle/:slug',  getOneTurnBuckle);
router.put('/admin/update/turnBuckle/:slug', updateTurnBuckle);

router.post('/admin/add/loopClevis',  addLoopClevis);
router.get('/admin/get/query/loopClevis', getLoopClevis);
router.get('/admin/get/one/loopClevis/:slug',  getOneLoopClevis);
router.put('/admin/update/loopClevis/:slug', updateLoopClevis);

router.post('/admin/add/EShield',  addEShield);
router.get('/admin/get/query/EShield', getEShield);
router.get('/admin/get/one/EShield/:slug',  getOneEShield);
router.put('/admin/update/EShield/:slug', updateEShield);

router.post('/admin/add/LScew',  addLScew);
router.get('/admin/get/query/LScew', getLScew);
router.get('/admin/get/one/LScew/:slug',  getOneLScew);
router.put('/admin/update/LScew/:slug', updateLScew);

router.post('/admin/add/Jbolt',  addJbolt);
router.get('/admin/get/query/Jbolt', getJbolt);
router.get('/admin/get/one/Jbolt/:slug',  getOneJbolt);
router.put('/admin/update/Jbolt/:slug', updateJbolt);

router.post('/admin/add/uboltCM',  adduboltCM);
router.get('/admin/get/query/uboltCM', getuboltCM);
router.get('/admin/get/one/uboltCM/:slug',  getOneuboltCM);
router.put('/admin/update/uboltCM/:slug', updateuboltCM);

router.post('/admin/add/uboltMM',  adduboltMM);
router.get('/admin/get/query/uboltMM', getuboltMM);
router.get('/admin/get/one/uboltMM/:slug',  getOneuboltMM);
router.put('/admin/update/uboltMM/:slug', updateuboltMM);

router.post('/admin/add/hexbolt',  addHexBolt);
router.get('/admin/get/query/hexbolt', gethexBolt);
router.get('/admin/get/one/hexbolt/:slug',  getOneHexBolt);
router.put('/admin/update/hexbolt/:slug', updatehexBolt);

router.post('/admin/add/anchorBolt',  addAnchorBolt);
router.get('/admin/get/query/anchorBolt', getAnchorBolt);
router.get('/admin/get/one/anchorBolt/:slug',  getOneAnchorBolt);
router.put('/admin/update/anchorBolt/:slug', updateAnchorBolt);


router.post('/admin/add/quotation',  addQuotation);
router.get('/admin/get/query/quotation', getQuotation);
router.get('/admin/get/one/quotation/:slug',  getOneQuotation);
router.put('/admin/update/quotation/:slug', updateQuotation);

router.post('/admin/add/plates', addPlates);
router.get('/admin/get/query/plates', getPlates);
router.get('/admin/get/latest/plates/price', getOneUpdatedPlates);
router.get('/admin/get/one/plates/:slug',  getOnePlates);
router.put('/admin/update/plates/:slug', updatePlates);

router.post('/admin/add/rawMaterial', addrawMaterial);
router.get('/admin/get/rawMaterial', getMaterial);
router.get('/admin/get/one/rawMaterial/:slug', getOneMaterial);
router.put('/admin/update/rawMaterial/:slug', updateMaterial);
module.exports = router;