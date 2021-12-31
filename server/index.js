// Import resources
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Create express app
const app = express();

// Define server port
const port = process.env.PORT || 5000;

// Use libraries
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Define variables
const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DB,
});

/********
HOME
*********/
app.get("/api", (req, res) => {
  res.send("Yappingkiwi API");
});

/***********
ALL PAIRS
************/
app.get("/api/all-pairs", (req, res) => {
  // Define sql
  const sql = "SELECT DISTINCT id, display FROM pairs";

  // Define query
  db.query(sql, (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/*******************
CURRENT PAIR PRICE
******************/
app.post("/api/current-pair-price", (req, res) => {
  // Define variables coming from frontend
  const currentPairID = req.body.currentPairID;

  // Debug
  //console.log("Debug: ", currentPairID);

  // Define sql
  const sql = `
    SELECT t3.buy_price, t3.sell_price, t3.created_at
    FROM pairs AS t1
    INNER JOIN pair_to_dex AS t2 ON t1.id = t2.pair_id
    INNER JOIN prices AS t3 ON t2.id = t3.id
    WHERE t1.id = ?
  `;

  // Define query
  db.query(sql, [currentPairID], (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/****************
ALL BUY EXCHANGE
****************/
app.get("/api/all-buyex", (req, res) => {
  // Define sql
  const sql = "SELECT DISTINCT buy_exchange FROM compare_prices";

  // Define query
  db.query(sql, (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/****************
ALL SELL EXCHANGE
****************/
app.get("/api/all-sellex", (req, res) => {
  // Define sql
  const sql = "SELECT DISTINCT sell_exchange FROM compare_prices";

  // Define query
  db.query(sql, (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/*******************
COMPARE CURRENT PRICES 
******************/
app.post("/api/current-price-diff", (req, res) => {
  // Define variables coming from frontend
  const currentBuyEx = req.body.currentBuyEx;
  const currentSellEx = req.body.currentSellEx;
  const currentPair = req.body.currentPair;

  // Debug
  //console.log("Debug: Buy - ", currentBuyEx, " Sell - ", currentSellEx);

  // Define sql
  const sql = `
  SELECT DISTINCT t1.compare_id, t1.difference, t1.buy_exchange, t1.sell_exchange, t1.created_on, t4.display
  FROM compare_prices AS t1
  INNER JOIN compare_mapping AS t2 ON t1.compare_id = t2.id
  INNER JOIN pair_to_dex AS t3 ON t2.pair_dex_one = t3.dex_id
  INNER JOIN pairs AS t4 ON t3.pair_id = t4.id
  WHERE t1.buy_exchange = ?
  AND t1.sell_exchange = ?
  AND t4.id = ?
  `;

  // Define query
  db.query(sql, [currentBuyEx, currentSellEx, currentPair], (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/***********
ALL PROFITS
************/
app.get("/api/all-profit", (req, res) => {
  // Define sql
  const sql = `
    SELECT t1.id AS comparePricesID, t1.compare_id, t1.buy_exchange, t1.sell_exchange, t1.profit_loss, t1.created_on, t4.display AS pairID, t4.display
    FROM compare_prices AS t1
    INNER JOIN compare_mapping AS t2 ON t2.id = t1.compare_id 
    INNER JOIN pair_to_dex AS t3 ON t3.id = t2.id
    INNER JOIN pairs AS t4 ON t4.id = t3.pair_id
    WHERE t1.profit_loss = ?
    ORDER BY t1.id DESC
  `;

  // Define query
  db.query(sql, ["profit"], (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/***********
ALL LOSSES
************/
app.get("/api/all-loss", (req, res) => {
  // Define sql
  const sql = `
    SELECT t1.id AS comparePricesID, t1.compare_id, t1.buy_exchange, t1.sell_exchange, t1.profit_loss, t1.created_on, t4.display AS pairID, t4.display
    FROM compare_prices AS t1
    INNER JOIN compare_mapping AS t2 ON t2.id = t1.compare_id 
    INNER JOIN pair_to_dex AS t3 ON t3.id = t2.id
    INNER JOIN pairs AS t4 ON t4.id = t3.pair_id
    WHERE t1.profit_loss = ?
    ORDER BY t1.id DESC
  `;

  // Define query
  db.query(sql, ["loss"], (err, result) => {
    // Debug
    //console.log("Result: ", result);
    // If err, send err
    if (err) res.send({ errMsg: err });

    // if result.length > 0
    if (result.length > 0) {
      // Send result
      res.send(result);
    }
  });
});

/*************************
LISTEN TO SERVER PORT
**************************/
app.listen(port, () => {
  // Debug
  console.log(`Server running on ${port}`);
});
