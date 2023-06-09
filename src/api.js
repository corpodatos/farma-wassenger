require("dotenv").config();
const express = require("express");
const axios = require("axios");
const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    result: "Success",
  });
});

router.post("/offline", async (req, res) => {
  const { data } = JSON.parse(req.body);
  const opcion = data.body;
  const fromNumber = data.fromNumber;
  console.error("opcion ->", opcion);
  console.error("fromNumber ->", fromNumber);

  let respuesta = "";

  if (opcion.substr(0, 3).toUpperCase() === "MED") {
    const busqueda = opcion.substr(4, opcion.length);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        process.env.BACKEND
      }/apirestserver/api/productos/${encodeURIComponent(busqueda)}`,
    };

    await axios(config)
      .then((response) => {
        console.log("response ->", response.data);
        let mensaje = "";
        response.data.forEach((item) => {
          mensaje += `${item.descripcion} Precio: Bs ${item.precio} Existencia: ${item.stock}\n\n`;
        });
        res.json({
          result: mensaje,
          // phone: response.data.phone,
          // createdAt: response.data.createdAt,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    switch (opcion) {
      case "1":
        respuesta = `Con la opción ${opcion} se consulta precio y disponibilidad`;
        break;
      case "2":
        respuesta = `Con la opción ${opcion} se informan los métodos de pago`;
        break;
      case "3":
        respuesta = `Con la opción ${opcion} se indican los horarios`;
        break;
      case "4":
        respuesta = `Con la opción ${opcion} se contacta a un especialista`;
        break;
      case "5":
        respuesta = `Con la opción ${opcion} se concreta la compra`;
        break;
      default:
        respuesta = `Bienvenido, escribe el número de la opción del Menu\n1. Consultar precio y disponibilidad de Medicamentos 💊\n2. Métodos de pago 💳💵📲\n3. Para saber nuestros horarios ⏰ y canales de atención 👩🏻‍💻\n4. Para hablar con nuestros especialistas en Farmacia👨🏻‍⚕️\n5. Concretar compra 🛒💳 🤝`;
    }

    res.json({
      result: `${respuesta}`,
      // phone: response.data.phone,
      // createdAt: response.data.createdAt,
    });
  }
});

router.post("/wassenger", async (req, res) => {
  const { data } = JSON.parse(req.body);
  const opcion = data.body;
  const fromNumber = data.fromNumber;
  console.error("opcion ->", opcion);
  console.error("fromNumber ->", fromNumber);

  let respuesta = "";

  if (opcion.substr(0, 3).toUpperCase() === "MED") {
    const busqueda = opcion.substr(4, opcion.length);
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        process.env.BACKEND
      }/apirestserver/api/productos/${encodeURIComponent(busqueda)}`,
    };

    await axios(config)
      .then(async (response) => {
        console.log("response ->", response.data);
        response.data.forEach((item) => {
          respuesta += `${item.descripcion} Precio: Bs ${item.precio} Existencia: ${item.stock}\n\n`;
        });
        console.log("respuesta ->", respuesta);
        if (!respuesta){
          respuesta = `${busqueda} no encontrado`;
        }

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
              message: respuesta,
            },
          };
          const response = await axios(options);
          res.json({
            result: respuesta,
            phone: response.data.phone,
            createdAt: response.data.createdAt,
          });
        } catch (error) {
          console.error("errores ->", error);
          res.json({
            result: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    switch (opcion) {
      case "1":
        respuesta = `Con la opción ${opcion} se consulta precio y disponibilidad`;
        break;
      case "2":
        respuesta = `Con la opción ${opcion} se informan los métodos de pago`;
        break;
      case "3":
        respuesta = `Con la opción ${opcion} se indican los horarios`;
        break;
      case "4":
        respuesta = `Con la opción ${opcion} se contacta a un especialista`;
        break;
      case "5":
        respuesta = `Con la opción ${opcion} se concreta la compra`;
        break;
      default:
        respuesta = `Bienvenido, escribe el número de la opción del Menu\n1. Consultar precio y disponibilidad de Medicamentos 💊\n2. Métodos de pago 💳💵📲\n3. Para saber nuestros horarios ⏰ y canales de atención 👩🏻‍💻\n4. Para hablar con nuestros especialistas en Farmacia👨🏻‍⚕️\n5. Concretar compra 🛒💳 🤝`;
    }

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
          message: respuesta,
        },
      };
      const response = await axios(options);
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
  }
});

router.post("/wassenger2", async (req, res) => {
  const { data } = JSON.parse(req.body);
  const opcion = data.body;
  const fromNumber = data.fromNumber;
  console.error("opcion ->", opcion);
  console.error("fromNumber ->", fromNumber);

  let respuesta = "";

  switch (opcion) {
    case "1":
      respuesta = `Con la opción ${opcion} se consulta precio y disponibilidad`;
      break;
    case "2":
      respuesta = `Con la opción ${opcion} se informan los métodos de pago`;
      break;
    case "3":
      respuesta = `Con la opción ${opcion} se indican los horarios`;
      break;
    case "4":
      respuesta = `Con la opción ${opcion} se contacta a un especialista`;
      break;
    case "5":
      respuesta = `Con la opción ${opcion} se concreta la compra`;
      break;
    default:
      respuesta = `Bienvenido, escribe el número de la opción del Menu\n1. Consultar precio y disponibilidad de Medicamentos 💊\n2. Métodos de pago 💳💵📲\n3. Para saber nuestros horarios ⏰ y canales de atención 👩🏻‍💻\n4. Para hablar con nuestros especialistas en Farmacia👨🏻‍⚕️\n5. Concretar compra 🛒💳 🤝`;
  }

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
        message: respuesta,
      },
    };
    const response = await axios(options);
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

router.get("/buscar", async (req, res) => {
  const { busqueda } = JSON.parse(req.body);
  if (busqueda) {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.BACKEND}/apirestserver/api/productos/${busqueda}`,
    };

    await axios(config)
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

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
