const express = require('express');
const dataController = require('../controllers/data');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/data',  isAuth,dataController.getData);
router.post('/data', isAuth,dataController.postData);

module.exports = router;