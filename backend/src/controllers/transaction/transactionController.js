import Transaction from '../../model/transaction.js';
import Holding from '../../model/holding.js';

// POST /api/holdings/:holdingId/transactions
export const addTransaction = async (req, res) => {
  try {
    const { type, quantity, price } = req.body;
    const holdingId = req.params.holdingId;

    const transaction = new Transaction({
      holding: holdingId,
      type,
      quantity,
      price,
    });

    await transaction.save();

    // Update holding
    const holding = await Holding.findById(holdingId);
    const oldQuantity = holding.quantity;
    const oldAvgBuyPrice = holding.avgBuyPrice;

    let newQuantity;
    let newAvgBuyPrice;

    if (type === 'buy') {
      newQuantity = oldQuantity + quantity;
      newAvgBuyPrice = (oldAvgBuyPrice * oldQuantity + price * quantity) / newQuantity;
    } else { // sell
      newQuantity = oldQuantity - quantity;
      newAvgBuyPrice = oldAvgBuyPrice; // Average buy price doesn't change on sell
    }

    holding.quantity = newQuantity;
    holding.avgBuyPrice = newAvgBuyPrice;
    await holding.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
