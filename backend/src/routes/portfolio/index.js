import {Router} from 'express';

import portfolioRoute from './portfolioRoute.js'

const router = Router();

router.use('/portfolio', portfolioRoute);

export default router;