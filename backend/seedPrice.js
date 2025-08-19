// src/seed/seedPrices.js
import mongoose from "mongoose";
import Price from "../backend/src/model/price.js";

const seedPrices = async () => {
  try {
    await mongoose.connect('mongodb+srv://vidushisaini29:JFp54ctTwPyMlJFX@stockportfoliotracker.xhceaqu.mongodb.net/StockPortfolioTrackerDb?retryWrites=true&w=majority&appName=StockPortfolioTracker');

    await Price.insertMany([
      { ticker: "AAPL", price: 170.50, currency: "USD", asOf: new Date() },
      { ticker: "MSFT", price: 360.00, currency: "USD", asOf: new Date() },
      { ticker: "INFY", price: 1500.00, currency: "INR", asOf: new Date() }
    ]);

    console.log("✅ Prices seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding prices:", err);
    mongoose.connection.close();
  }
};

seedPrices();
