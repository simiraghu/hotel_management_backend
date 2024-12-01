import { Router } from 'express';
import CreateHotel from '../controllers/hotel/CreateHotel.js';
import Authentication from '../middleware/Authentication.js';
import GetAllHotels from '../controllers/hotel/GetAllHotels.js';
import GetHotelRoom from '../controllers/hotel/GetHotelRoom.js';
import GetHotelByHotelid from '../controllers/hotel/GetHotelByHotelid.js';
import upload from '../multerConfig.js'
import UpdateHotel from '../controllers/hotel/UpdateHotel.js';
import DeleteHotel from '../controllers/hotel/DeleteHotel.js';

const router = Router()

router.post('/create_hotel', Authentication, upload.array('image', 10), CreateHotel)
router.get('/get_all_hotels', GetAllHotels)
router.get('/get_hotel_room', GetHotelRoom)
router.get('/get_hotel_by_hotelid/:hotelId', GetHotelByHotelid)
router.put('/update_hotel', upload.array('image', 10) ,UpdateHotel)
router.put('/delete_hotel', DeleteHotel)

export default router;