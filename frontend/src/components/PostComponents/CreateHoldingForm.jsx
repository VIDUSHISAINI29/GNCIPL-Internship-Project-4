import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HoldingFormModal({ isOpen, onClose, portfolioId, token, onHoldingAdded }) {
    const [ticker, setTicker] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("BUY");

    const API = import.meta.env.VITE_BACKEND_URL;

    // Reset form fields whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setTicker("");
            setQty("");
            setPrice("");
            setType("BUY");
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API}/portfolio/${portfolioId}/holdings`,
                {
                    ticker,
                    qty: Number(qty),
                    price: Number(price),
                    type,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onHoldingAdded();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-xl w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-textLight">Add Holding</h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ticker Symbol"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        className="w-full p-2 rounded border dark:bg-background dark:text-textLight"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={qty}
                        min="1"                  // HTML restriction: minimum value 1
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 0 || e.target.value === "") setQty(e.target.value); // allow only positive numbers or empty
                        }}
                        className="w-full p-2 rounded border dark:bg-background dark:text-textLight"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 rounded border dark:bg-background dark:text-textLight"
                        required
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 rounded border dark:bg-background dark:text-textLight"
                    >
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full py-2 bg-gold dark:bg-brightGold text-background rounded-lg font-semibold hover:bg-brightGold transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
