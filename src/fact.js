const axios = require("axios");
// function to get the data from the API
const getFacts = async () => {
  let response = await axios('https://catfact.ninja/fact');
  return response;
};
//controller function
module.exports.fact = async (req, res) => {
  let responseFact = await getFacts();
  return res.send(responseFact.data.fact);
};
