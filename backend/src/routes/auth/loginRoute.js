import {Router} from 'express';

import { loginUser } from '../../controllers/auth/loginController.js';
import { logout } from '../../controllers/auth/loginController.js';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logout);

export default router;
