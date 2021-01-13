const express = require('express');
const app = express();
const crypto = require("crypto")

const port = process.env.PORT || 8080;

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
  if (!!statusCode) {
    res.status(statusCode).send({ message: `${statusCode} encountered` })
  } else {
    res.status(502).send({ message: `${req.params.statusCode} is not a valid status code. Please input a number`})
  }
})

app.get('/', (req,res) => {
  console.log(req)
  const response = {
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body
  }
  res.send(response);
});

app.listen(port, function () {
  console.log(`Httpbin listening on port ${port}!`)
})
