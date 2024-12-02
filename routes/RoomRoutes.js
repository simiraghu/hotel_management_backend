import { Router } from 'express';
import Authentication from '../middleware/Authentication.js';
import CreateRoom from '../controllers/room/CreateRoom.js';
import GetAllRoom from '../controllers/room/GetAllRoom.js';
import GetRoomByHotelId from '../controllers/room/GetRoomByHotelId.js';
import GetRoomByRoomId from '../controllers/room/GetRoomByRoomId.js';
import UpdateRoom from '../controllers/room/UpdateRoom.js';
import upload from '../multerConfig.js';
import DeleteRoom from '../controllers/room/DeleteRoom.js';
import SearchRooms from '../controllers/room/SearchRooms.js';

const router = Router()

router.post('/create_room', Authentication, upload.array('image', 10), CreateRoom)
router.get('/get_all_rooms', GetAllRoom)
router.get('/get_room_by_hotelid', GetRoomByHotelId)
router.get('/get_room_by_roomId', GetRoomByRoomId)
router.put('/update_room', upload.array('image', 10), UpdateRoom)
router.put('/delete_room', DeleteRoom)
router.get('/search_rooms', SearchRooms)

export default router;