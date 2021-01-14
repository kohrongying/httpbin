const server = require('./server')

const port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log(`Httpbin listening on port ${port}!`)
})
