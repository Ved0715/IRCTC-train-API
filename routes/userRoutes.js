const { bookSeat, getBookings, getTrain } = require('../controllers/userController');
const auth = require('../middleware/auth');

const express = require('express');


const router = express.Router();

router.get('/trains',auth, getTrain);
router.get('/bookings',auth, getBookings);
router.post('/book',auth, bookSeat);

module.exports = router;