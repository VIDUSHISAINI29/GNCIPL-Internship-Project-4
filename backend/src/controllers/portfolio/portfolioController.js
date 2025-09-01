
// src/controllers/portfolioController.js
import Portfolio from '../../model/portfolio.js';
import Holding from '../../model/holding.js';
import Price from '../../model/price.js'
import Transaction from '../../model/transaction.js';

/**
 * Create portfolio for logged-in user
 */
export const createPortfolio = async (req, res, next) => {
  try {
    const { name, baseCurrency = 'INR', inventoryMethod = 'FIFO' } = req.body;
    const user = req.user._id;

    const p = await Portfolio.create({ user, name, baseCurrency, inventoryMethod });
    return res.status(201).json({ portfolio: p });
  } catch (err) {
    console.log('err in createPortfolio', err);
    next(err);
  }
};



export const getUserPortfolios = async (req, res) => {
  try {
    // fetch all portfolios + user info
    const portfolios = await Portfolio.find().populate("user", "name email");
    // const portfolios = await Portfolio.find().populate("user", "name email");

    const enrichedPortfolios = await Promise.all(
      portfolios.map(async (portfolio) => {
        // get holdings for this portfolio
        const holdings = await Holding.find({ portfolio: portfolio._id });

        let investedAmount = 0;
        let marketValue = 0;

        // enrich holdings with live price & PnL
        const enrichedHoldings = await Promise.all(
          holdings.map(async (holding) => {
            const { ticker, qty, avgBuyPrice } = holding;

            // invested per holding
            const invested = avgBuyPrice * qty;

            // fetch live price
            const priceDoc = await Price.findOne({ ticker });
            const currentPrice = priceDoc ? priceDoc.price : 0;

            const currentValue = currentPrice * qty;
            const profitLoss = currentValue - invested;

            investedAmount += invested;
            marketValue += currentValue;

            return {
              _id: holding._id,
              ticker: holding.ticker,
              qty,
              avgBuyPrice,
              invested,
              currentPrice,
              currentValue,
              profitLoss,
              profitLossPercentage:
                invested > 0 ? ((profitLoss / invested) * 100).toFixed(2) : 0,
            };
          })
        );

        const portfolioProfitLoss = marketValue - investedAmount;

        return {
          _id: portfolio._id,
          name: portfolio.name,
          user: portfolio.user, // {name, email}
          baseCurrency: portfolio.baseCurrency,
          inventoryMethod: portfolio.inventoryMethod,
          createdAt: portfolio.createdAt,
          updatedAt: portfolio.updatedAt,

          // totals
          investedAmount,
          marketValue,
          profitLoss: portfolioProfitLoss,
          profitLossPercentage:
            investedAmount > 0
              ? ((portfolioProfitLoss / investedAmount) * 100).toFixed(2)
              : 0,

          // detailed holdings with their own PnL
          holdings: enrichedHoldings,
        };
      })
    );

    res.status(200).json(enrichedPortfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ message: "Error fetching portfolios" });
  }
};



// """""""""""""   Portfolio By portfolio Id """"""""""""""""


export const getPortfolioByPortfolioId = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;

    // Fetch the portfolio by ID
    const portfolio = await Portfolio.findById(portfolioId).lean();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Fetch holdings for this portfolio
    const holdings = await Holding.find({ portfolio: portfolio._id }).lean();

    const enrichedHoldings = holdings.map((h) => {
      const invested = h.avgBuyPrice * h.qty;

      // --- Simulate current price with ±5% fluctuation ---
      const fluctuation = (Math.random() * 0.1 - 0.05); // -5% to +5%
      const latestPrice = +(h.avgBuyPrice * (1 + fluctuation)).toFixed(2);

      const marketValue = latestPrice * h.qty;
      const unrealizedPnl = marketValue - invested;

      return {
        _id: h._id,
        ticker: h.ticker,
        qty: h.qty,
        avgBuyPrice: +h.avgBuyPrice.toFixed(2),
        latestPrice,
        invested: +invested.toFixed(2),
        marketValue: +marketValue.toFixed(2),
        unrealizedPnl: +unrealizedPnl.toFixed(2),
        lots: h.lots || [],
        realizedPnl: +((h.realizedPnl || 0).toFixed(2)),
      };
    });

    // --- Portfolio totals ---
    const investedAmount = enrichedHoldings.reduce((sum, h) => sum + h.invested, 0);
    const marketValue = enrichedHoldings.reduce((sum, h) => sum + h.marketValue, 0);
    const profitLoss = marketValue - investedAmount;
    const profitLossPercentage =
      investedAmount > 0 ? ((profitLoss / investedAmount) * 100).toFixed(2) : 0;

    const enrichedPortfolio = {
      ...portfolio,
      holdings: enrichedHoldings,
      investedAmount: +investedAmount.toFixed(2),
      marketValue: +marketValue.toFixed(2),
      profitLoss: +profitLoss.toFixed(2),
      profitLossPercentage,
    };

    res.json(enrichedPortfolio);
  } catch (err) {
    console.error('Error in getPortfolioByPortfolioId:', err);
    next(err);
  }
};







/**
 * Get a single portfolio with enriched holdings (latest price, invested, marketValue, realized)
 */
export const getPortfolioByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch portfolios for this user
    const portfolios = await Portfolio.find({ user: userId }).lean();
    // if(!portfolios) {
    //   return res.json({message: "No portfolio created"});
    // }
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: 'No portfolio Created yet.' });
    }

    const enrichedPortfolios = await Promise.all(
      portfolios.map(async (portfolio) => {
        const holdings = await Holding.find({ portfolio: portfolio._id }).lean();

        const enrichedHoldings = holdings.map((h) => {
          const invested = h.avgBuyPrice * h.qty;

          // --- Simulate current price with ±5% fluctuation ---
          const fluctuation = (Math.random() * 0.1 - 0.05); // -5% to +5%
          const latestPrice = +(h.avgBuyPrice * (1 + fluctuation)).toFixed(2);

          const marketValue = latestPrice * h.qty;
          const unrealizedPnl = marketValue - invested;

          return {
            _id: h._id,
            ticker: h.ticker,
            qty: h.qty,
            avgBuyPrice: +h.avgBuyPrice.toFixed(2),
            latestPrice,
            invested: +invested.toFixed(2),
            marketValue: +marketValue.toFixed(2),
            unrealizedPnl: +unrealizedPnl.toFixed(2),
            lots: h.lots || [],
            realizedPnl: +((h.realizedPnl || 0).toFixed(2)),
          };
        });

        // --- Portfolio totals ---
        const investedAmount = enrichedHoldings.reduce((sum, h) => sum + h.invested, 0);
        const marketValue = enrichedHoldings.reduce((sum, h) => sum + h.marketValue, 0);
        const profitLoss = marketValue - investedAmount;
        const profitLossPercentage =
          investedAmount > 0 ? ((profitLoss / investedAmount) * 100).toFixed(2) : 0;

        return {
          ...portfolio,
          holdings: enrichedHoldings,
          investedAmount: +investedAmount.toFixed(2),
          marketValue: +marketValue.toFixed(2),
          profitLoss: +profitLoss.toFixed(2),
          profitLossPercentage,
        };
      })
    );

    // --- User-level totals across all portfolios ---
    const totalInvested = enrichedPortfolios.reduce((sum, p) => sum + p.investedAmount, 0);
    const totalMarketValue = enrichedPortfolios.reduce((sum, p) => sum + p.marketValue, 0);
    const totalProfitLoss = totalMarketValue - totalInvested;
    const totalProfitLossPercentage =
      totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(2) : 0;

    res.json({
      portfolios: enrichedPortfolios,
      totals: {
        investedAmount: +totalInvested.toFixed(2),
        marketValue: +totalMarketValue.toFixed(2),
        profitLoss: +totalProfitLoss.toFixed(2),
        profitLossPercentage: totalProfitLossPercentage,
      },
    });
  } catch (err) {
    console.error('Error in getPortfolioByUser:', err);
    next(err);
  }
};


/**
 * Add a holding (BUY) or process SELL for a portfolio.
 * Body: { ticker, qty, price, type: 'BUY'|'SELL', date?, notes? }
 * This updates the Holding doc (lots + qty + avgBuyPrice + realizedPnl) and creates a Transaction record.
 */
export const upsertHoldingTransaction = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const userId = req.user._id;
    const { ticker: rawTicker, qty: rawQty, price: rawPrice, type = 'BUY', date, notes } = req.body;

    const ticker = String(rawTicker).toUpperCase();
    const qty = Number(rawQty);
    const price = Number(rawPrice);
    if (!ticker || !qty || qty <= 0 || isNaN(price) || price < 0) {
      return res.status(422).json({ message: 'Invalid input: ticker, qty (>0), price (>=0) required' });
    }

    const portfolio = await Portfolio.findOne({ _id: portfolioId, user: userId });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    let holding = await Holding.findOne({ portfolio: portfolioId, ticker });

    if (type === 'BUY') {
      // Create or update holding: push lot, update qty and avgBuyPrice (weighted)
      if (!holding) {
        holding = await Holding.create({
          portfolio: portfolioId,
          ticker,
          qty,
          avgBuyPrice: price,
          realizedPnl: 0,
          lots: [{ qty, price, date: date ? new Date(date) : new Date() }]
        });
      } else {
        // weighted average
        const prevQty = holding.qty || 0;
        const prevCost = (holding.avgBuyPrice || 0) * prevQty;
        const newCost = price * qty;
        const newQty = prevQty + qty;
        const newAvg = newQty > 0 ? (prevCost + newCost) / newQty : 0;

        // push lot
        holding.lots = holding.lots || [];
        holding.lots.push({ qty, price, date: date ? new Date(date) : new Date() });

        holding.qty = newQty;
        holding.avgBuyPrice = newAvg;
        await holding.save();
      }

      // create a transaction record
      await Transaction.create({
        portfolio: portfolioId,
        type: 'BUY',
        ticker,
        qty,
        price,
        date: date ? new Date(date) : new Date(),
        notes
      });

      return res.status(200).json({ holding });
    }

    // SELL flow: FIFO over lots, compute realizedPnL
    if (type === 'SELL') {
      if (!holding || (holding.qty || 0) < qty) {
        return res.status(400).json({ message: `Insufficient quantity to sell: have ${holding ? holding.qty : 0}` });
      }

      let remaining = qty;
      let realized = 0;
      // make sure lots is an array of objects {qty, price}
      holding.lots = holding.lots || [];

      for (let i = 0; i < holding.lots.length && remaining > 0; i++) {
        const lot = holding.lots[i];
        const lotQty = Number(lot.qty);
        if (lotQty <= 0) continue;
        if (lotQty <= remaining) {
          // consume entire lot
          realized += (price - lot.price) * lotQty;
          remaining -= lotQty;
          lot.qty = 0;
        } else {
          // partial consume
          realized += (price - lot.price) * remaining;
          lot.qty = lotQty - remaining;
          remaining = 0;
        }
      }

      // remove zero-qty lots
      holding.lots = holding.lots.filter(l => Number(l.qty) > 0);

      // update qty
      holding.qty = Number(holding.qty) - qty;

      // update realizedPnl
      holding.realizedPnl = (holding.realizedPnl || 0) + realized;

      // recompute avgBuyPrice from remaining lots (if any)
      if ((holding.qty || 0) > 0) {
        const totalCost = holding.lots.reduce((s, L) => s + (Number(L.qty) * Number(L.price)), 0);
        holding.avgBuyPrice = totalCost / holding.qty;
      } else {
        holding.avgBuyPrice = 0;
      }

      await holding.save();

      // create transaction record
      await Transaction.create({
        portfolio: portfolioId,
        type: 'SELL',
        ticker,
        qty,
        price,
        date: date ? new Date(date) : new Date(),
        notes
      });

      return res.status(200).json({ holding, realizedPnlFromThisSell: +realized.toFixed(2) });
    }

    return res.status(422).json({ message: 'Unsupported transaction type. Use BUY or SELL.' });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove a holding entirely (delete the Holding doc)
 */
export const removeHolding = async (req, res, next) => {
  try {
    const { portfolioId, holdingId } = req.params;
    const userId = req.user._id;

    // verify portfolio belongs to user
    const portfolio = await Portfolio.findOne({ _id: portfolioId, user: userId });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const deleted = await Holding.findOneAndDelete({ _id: holdingId, portfolio: portfolioId });
    if (!deleted) return res.status(404).json({ message: 'Holding not found' });

    res.status(200).json({ message: 'Holding removed', holding: deleted });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete portfolio and related holdings & transactions (cleanup)
 */
export const deletePortfolio = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    // const userId = req.user._id;

    const removed = await Portfolio.findOneAndDelete({ _id: portfolioId });
    if (!removed) return res.status(404).json({ message: 'Portfolio not found' });

    // cascade delete holdings & transactions
    await Holding.deleteMany({ portfolio: portfolioId });
    await Transaction.deleteMany({ portfolio: portfolioId });

    res.status(200).json({ message: 'Portfolio deleted' });
  } catch (err) {
    next(err);
  }
};




export const getAllTransactionsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Fetch all portfolios for this user
    const portfolios = await Portfolio.find({ user: userId }, '_id').lean();
    const portfolioIds = portfolios.map(p => p._id);

    // 2️⃣ Fetch all transactions for these portfolios
    const transactions = await Transaction.find({ portfolio: { $in: portfolioIds } }).sort({ date: -1 });

    res.status(200).json({ transactions });
  } catch (err) {
    console.error('Error fetching transactions for user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTransactionsByPortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params;

    const transactions = await Transaction.find({ portfolio: portfolioId }).sort({ date: 1 });
    // console.log('tans = ', transactions);
    // console.log('userID = ', userId);
    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
