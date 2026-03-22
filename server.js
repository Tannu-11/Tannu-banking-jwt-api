const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("🚀 Banking API is running successfully!");
});
app.get("/demo", (req, res) => {
    res.json({
        message: "API is working!",
        endpoints: {
            register: "/api/auth/register (POST)",
            login: "/api/auth/login (POST)",
            balance: "/api/bank/balance (GET - token required)",
            deposit: "/api/bank/deposit (POST - token required)"
        }
    });
});
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bank", require("./routes/bankRoutes"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});