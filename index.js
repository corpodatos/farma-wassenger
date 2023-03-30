require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const axios = require("axios");

// Middleware
app.use(bodyParser.json());

async function busquedaFn(texto) {
  var config = {
    method: "get",
    url: `${process.env.BACKEND}/apirestserver/api/productos/${texto}`,
  };
  return await axios(config);
}

app.get("/buscar", async (req, res) => {
  const { busqueda } = req.body;
  if (busqueda) {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        process.env.BACKEND
      }/apirestserver/api/productos/${encodeURIComponent(busqueda)}`,
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

app.post("/offline", async (req, res) => {
  //const { data } = JSON.parse(req.body);
  const { data } = req.body;
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
      result: `Este es el reply: ${respuesta}`,
      // phone: response.data.phone,
      // createdAt: response.data.createdAt,
    });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
