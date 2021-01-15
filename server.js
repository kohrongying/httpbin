const express = require('express');
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { validStatusCodes } = require('./constants');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const generatePlaceholder = (count) => {
  let arr = []
  for (let i=0;i<count;i+=1) {
    arr.push({
      id: crypto.randomBytes(16).toString("hex"),
      timestamp: new Date()
    })
  }
  return arr;
}

app.get('/json', (req, res) => {
  console.log("Htpbin received GET /json")
  res.send(generatePlaceholder(1)[0])
})

app.get('/json/list', (req, res) => {
  console.log("Htpbin received GET /json/list")
  res.send(generatePlaceholder(4))
})

app.get('/json/:id', (req, res) => {
  console.log("Htpbin received GET /json/:id")
  res.send({
    id: req.params.id,
    timestamp: new Date()
  })
})

app.get('/status/:statusCode', (req, res) => {
  console.log("Htpbin received GET /status/:statusCode")
  const statusCode = Number(req.params.statusCode)
  if (validStatusCodes.includes(statusCode)) {
    res.status(statusCode).send({ message: `${statusCode} encountered` })
  } else {
    res.status(400).send({ message: `${req.params.statusCode} is not a valid status code. Please input a number`})
  }
})

app.get('/:echo', (req,res) => {
  console.log("Htpbin received GET /:echo")
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
  }
  res.send(response);
});

app.post('/:echo', (req,res) => {
  console.log("Htpbin received POST /:echo")
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  res.send(response);
});

app.put('/:echo', (req,res) => {
  console.log("Htpbin received PUT /:echo")
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  res.send(response);
});

app.delete('/:echo', (req,res) => {
  console.log("Htpbin received DELETE /:echo")
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  res.send(response);
});


module.exports = app;
