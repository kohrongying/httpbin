const express = require('express');
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { validStatusCodes } = require('./constants');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/json', (req, res) => {
  res.send({
    id: crypto.randomBytes(16).toString("hex"),
    timestamp: new Date()
  })
})

app.get('/json/list', (req, res) => {
  res.send([
    {
      id: crypto.randomBytes(16).toString("hex"),
      timestamp: new Date()
    },
    {
      id: crypto.randomBytes(16).toString("hex"),
      timestamp: new Date()
    }
    ])
})

app.get('/json/:id', (req, res) => {
  res.send({
    id: req.params.id,
    timestamp: new Date()
  })
})

app.get('/status/:statusCode', (req, res) => {
  const statusCode = Number(req.params.statusCode)
  if (validStatusCodes.includes(statusCode)) {
    res.status(statusCode).send({ message: `${statusCode} encountered` })
  } else {
    res.status(400).send({ message: `${req.params.statusCode} is not a valid status code. Please input a number`})
  }
})

app.get('/:echo', (req,res) => {
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
  }
  res.send(response);
});

app.post('/:echo', (req,res) => {
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  res.send(response);
});


module.exports = app;
