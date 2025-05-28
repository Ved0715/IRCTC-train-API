const { addTrain } = require('../controllers/adminController');


const express = require('express');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.post('/addTrain',adminAuth, addTrain);

module.exports = router;