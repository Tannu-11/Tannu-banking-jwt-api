const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// CHECK BALANCE
router.get("/balance", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ balance: user.balance });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// DEPOSIT
router.post("/deposit", auth, async (req, res) => {
    try {
        const { amount } = req.body;

        const user = await User.findById(req.user.id);
        user.balance += amount;

        await user.save();

        res.json({
            msg: "Amount deposited",
            balance: user.balance
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;