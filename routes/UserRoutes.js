import { Router } from 'express';
import CreateUser from '../controllers/user/CreateUser.js';
import LoginUser from '../controllers/user/LoginUser.js';
import GetUserDetails from '../controllers/user/GetUserDetails.js';
import Auth from '../middleware/Authentication.js'
import UpdateUser from '../controllers/user/UpdateUser.js';

const router = Router()

router.post('/create_user', CreateUser)
router.post('/login_user', LoginUser)
router.get('/get_user_details', Auth, GetUserDetails)
router.put('/update_user', Auth, UpdateUser)

export default router;