require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");

// Middleware
app.use(bodyParser.json());


app.get("/buscar", async (req, res) => {
  const { busqueda } = req.body;
  if (busqueda) {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND}/apirestserver/api/productos/${busqueda}`,
    };

    axios(config)
      .then(function (response) {
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(404).send("busqueda vacía");
  }
});


// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
