import Holding from "../models/holding.js";

// POST /api/portfolios/:portfolioId/holdings
export const addHolding = async (req, res) => {
  try {
    const { stockSymbol, quantity, avgBuyPrice } = req.body;

    const holding = new Holding({
      portfolio: req.params.portfolioId,
      stockSymbol,
      quantity,
      avgBuyPrice,
    });

    await holding.save();
    res.status(201).json(holding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/holdings/:id
export const updateHolding = async (req, res) => {
  try {
    const { quantity, avgBuyPrice } = req.body;

    const holding = await Holding.findByIdAndUpdate(
      req.params.id,
      { quantity, avgBuyPrice },
      { new: true }
    );

    if (!holding) return res.status(404).json({ message: "Holding not found" });
    res.json(holding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/holdings/:id
export const deleteHolding = async (req, res) => {
  try {
    const holding = await Holding.findByIdAndDelete(req.params.id);
    if (!holding) return res.status(404).json({ message: "Holding not found" });
    res.json({ message: "Holding deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
