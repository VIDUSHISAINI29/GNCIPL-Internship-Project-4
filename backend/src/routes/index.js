import {Router} from 'express';
import express from 'express';

import {auth} from '../middleware/auth.js';

import authRoutes from './auth/index.js'
import portfolioRoutes from './portfolio/index.js'

const router = Router();

router.use('/', authRoutes);

router.use(auth)
router.use('/', portfolioRoutes);


export default router ;