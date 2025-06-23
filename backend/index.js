require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const authRoute = require('./Routes/AuthRoute');

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ Needed for req.body
app.use(cookieParser());
app.use("/", authRoute);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order saved!");
});

// ✅ Connect to DB and Start server
mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to database successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
