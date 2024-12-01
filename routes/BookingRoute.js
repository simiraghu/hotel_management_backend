import { Router } from 'express';
const router = Router()
import CreateBookingWithPayment from '../controllers/booking/CreateBookingWIthPayment.js';
import Auth from '../middleware/Authentication.js';
import GetAllBooking from '../controllers/booking/GetAllBooking.js'
import GetBookingByroomId from '../controllers/booking/GetBookingByroomId.js';
import GetBookingByuserId from '../controllers/booking/GetBookingByuserId.js'
// import CreateBooking from '../controllers/booking/CreatePaymentIntent.js'

router.post('/create_booking', Auth, CreateBookingWithPayment)
router.get('/get_all_booking', GetAllBooking)
router.get('/get_booking_by_userId', Auth, GetBookingByuserId)
router.get('/get_booking_by_roomId', Auth, GetBookingByroomId)
// router.post('/create_payment', CreateBooking)

export default router;