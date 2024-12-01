import { Router } from "express";
const router = Router()
import UserRoutes from '../routes/UserRoutes.js';
import HotelRoutes from '../routes/HotelRoutes.js';
import RoomRoutes from '../routes/RoomRoutes.js';
import BookingRoute from '../routes/BookingRoute.js';

router.use('/user', UserRoutes)
router.use('/hotel', HotelRoutes)
router.use('/room', RoomRoutes)
router.use('/booking', BookingRoute)

export default router;