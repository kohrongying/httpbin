# httpbin

Inspired by [original httpbin](https://httpbin.org/)
Still a work in progress

## How to build

```bash
$ git clone https://github.com/kohrongying/httpbin

$ docker build -t httpbin .
$ docker run -p 8080:8080 httpbin:latest

Httpbin listening on port 8080!
Htpbin received GET /json
...
```

## How to use

### GET echo
```
$ curl 'http://localhost:8080/anything?name=test'

{
  "headers": {
    "host": "localhost:8080",
    "user-agent": "curl/7.64.1",
    "accept": "*/*"
  },
  "params": {
    "echo": "anything"
  },
  "query": {
    "name": "test"
  }
}
```

## POST echo
```bash
$ curl --request POST http://localhost:8080/anything \
  --header 'Content-Type: application/json' \
  --data '{ 
	"CreatedAt": "2020-11-02",
	"UserId": "1",
	"Event": "P"
}'

{
  "headers": {
    "host": "localhost:8080",
    "user-agent": "curl/7.64.1",
    "accept": "*/*",
    "content-type": "application/json",
    "content-length": "59"
  },
  "params": {
    "echo": "anything"
  },
  "query": {},
  "body": {
    "CreatedAt": "2020-11-02",
    "UserId": "1",
    "Event": "P"
  }
}
```

### GET Status Code
```bash
$ curl -I localhost:8080/status/502

HTTP/1.1 502 Bad Gateway
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 29
Date: Fri, 15 Jan 2021 11:00:52 GMT
Connection: keep-alive
```

### GET placeholder json
```
$ curl localhost:8080/json
{
  "id": "1bebf4d87af1abe27ef9a059cf1b784d",
  "timestamp": "2021-01-15T10:53:33.976Z"
}

$ curl localhost:8080/json/abc123
{
  "id": "abc123",
  "timestamp": "2021-01-15T10:54:17.173Z"
}


$ curl localhost:8080/json/list
[
  {
    "id": "fa7f25d9f084b93323d026a6522ea2ec",
    "timestamp": "2021-01-15T10:53:57.161Z"
  },
  {
    "id": "ecb7e56f16524ea1f17e432413966d80",
    "timestamp": "2021-01-15T10:53:57.161Z"
  },
  {
    "id": "37384994c9c59dad5cc980bbc6a1df5f",
    "timestamp": "2021-01-15T10:53:57.161Z"
  },
  {
    "id": "fd6912c6c45ae5cb3baf27dc7389bfd9",
    "timestamp": "2021-01-15T10:53:57.161Z"
  }
]

```