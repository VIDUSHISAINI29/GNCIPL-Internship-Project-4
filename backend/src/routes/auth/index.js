import {Router} from 'express';

import registerRoute from './registerRoute.js';
import loginRoute from './loginRoute.js';
import userProfileRoute from './userProfileRoute.js';

const router = Router();

router.use('/auth', registerRoute);
router.use('/auth', loginRoute);
router.use('/auth', userProfileRoute);

export default router;
