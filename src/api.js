const express = require("express");

const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    console.log("edwin", req);
  res.json({
    result: req,
  });
});

router.get("/test", (req, res) => {
    res.json({
      result: "test",
    });
  });

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
