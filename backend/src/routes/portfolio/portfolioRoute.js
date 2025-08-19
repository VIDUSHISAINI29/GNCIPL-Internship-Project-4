// src/routes/portfolioRoutes.js
import { Router } from 'express';
import {
  createPortfolio,
  getUserPortfolios,
  getPortfolioByUser,
  upsertHoldingTransaction,
  removeHolding,
  deletePortfolio,
  getAllTransactionsForUser,
  getPortfolioByPortfolioId,
  getTransactionsByPortfolio
} from '../../controllers/portfolio/portfolioController.js';

// adjust to your auth middleware name/path
import { auth } from '../../middleware/auth.js';

const router = Router();

// router.use(auth);

// portfolio CRUD
router.post('/create-portfolio', auth, createPortfolio);                      // create portfolio
router.get('/portfolios-list', getUserPortfolios);                     // list user's portfolios
router.get('/:userId', getPortfolioByUser);          // get portfolio with holdings
router.get('/portfolio-by-id/:portfolioId', getPortfolioByPortfolioId);          // get portfolio with holdings
router.delete('/:portfolioId', deletePortfolio);        // delete portfolio & cleanup

// holdings transactions (BUY/SELL)
router.post('/:portfolioId/holdings', upsertHoldingTransaction); 
// request body: { ticker, qty, price, type: 'BUY'|'SELL', date?, notes? }

router.delete('/:portfolioId/holdings/:holdingId', removeHolding);
router.get('/transaction/user/:userId', getAllTransactionsForUser)
router.get('/transaction/portfolio/:portfolioId', getTransactionsByPortfolio)


export default router;
