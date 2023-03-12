require("dotenv").config();
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.post("/reply", async (req, res) => {
  const body = JSON.parse(req.body);
  console.log("edwin ->", body);

  const { data } = JSON.parse(req.body);

  console.error("body ->", data.body);
  console.error("fromNumber ->", data.fromNumber);

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
        //phone: fromNumber,
        //message: `Escribieron: ${body} - ${new Date()}`,
        phone: MOBILE_REPLY,
        message: `Escribieron: ${new Date()}`,
      },
    };
    const response = await axios(options);
    //console.log(response);
    // const response = await axios.get(
    //   "https://jsonplaceholder.typicode.com/posts"
    // );
    // let response = await axios('https://catfact.ninja/fact');
    //const posts = response.data;
    // //res.send(posts);
    //console.log("posts", posts);
    res.json({
      result: "Este es el reply",
      phone: response.data.phone,
      createdAt: response.data.createdAt,
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
