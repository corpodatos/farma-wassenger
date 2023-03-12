const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();

const router = express.Router();

// function to get the data from the API 
let getFacts = async () => {
let response = await axios(`https://catfact.ninja/fact`);
return response;
};

router.get("/", async (req, res) => {
    console.log("edwin", req);
    let responseFact = await getFacts();
  res.json({
    result: "todo bien",
    msg: responseFact.data.fact
  });
});

router.get("/test", (req, res) => {
    res.json({
      result: "test",
    });
  });

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
