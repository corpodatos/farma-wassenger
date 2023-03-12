require("dotenv").config();
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/reply", async (req, res) => {
  console.log("req ->", req);
  const {body, fromNumber} = req.data;

  try {
    const WASSENGER_TOKEN = process.env.WASSENGER_TOKEN;
    const WASSENGER_API = process.env.WASSENGER_API;
    const MOBILE_REPLY = process.env.MOBILE_REPLY;
    var options = {
      method: "POST",
      url: WASSENGER_API,
      headers: {
        "Content-Type": "application/json",
        Token: WASSENGER_TOKEN,
      },
      data: {
        phone: fromNumber,
        message: `Escribieron: ${body} - ${new Date()}`,
      },
    };
    const response = await axios(options);
    console.log(response);
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    // let response = await axios('https://catfact.ninja/fact');
    //const posts = response.data;
    // //res.send(posts);
    //console.log("posts", posts);
    res.json({
      result: "Este es el reply",
      //msg: posts,
    });
  } catch (error) {
    console.error("errores ->", error);
    //res.status(500).send("Error retrieving posts");
    res.json({
      result: "error",
    });
  }
});

router.get("/", (req, res) => {
  res.json({
    result: "Success",
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
