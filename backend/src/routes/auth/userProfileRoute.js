import {Router} from 'express';

import { getUserById } from '../../controllers/auth/userProfileController.js';

const router = Router();

router.get('/profile', getUserById);

export default router;
