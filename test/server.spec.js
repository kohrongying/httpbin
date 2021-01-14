const request = require('supertest');
const server = require('../server')
const assert = require('assert')

isValidObject = (body) => {
  assert("id" in body)
  assert("timestamp" in body)
}

isValidList = (res) => {
  for (let obj of res.body) {
    isValidObject(obj)
  }
}


describe('GET /json', function() {
  it('responds with json', function(done) {
    request(server)
      .get('/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => isValidObject(res.body))
      .expect(200)
      .end(done);
  });

  it('responds with json list', function(done) {
      request(server)
        .get('/json/list')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(isValidList)
        .expect(200)
        .end(done);
   });

  it('responds with json and custom id', function(done) {
      const id = '123abc'
      request(server)
        .get(`/json/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
            isValidObject(res.body)
            assert.equal(res.body.id, id)
        })
        .expect(200)
        .end(done);
   });
});

describe('GET /status', function() {
  it('responds with 201', function(done) {
    request(server)
      .get('/status/201')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(done);
  });

  it('responds with 500', function(done) {
      request(server)
        .get('/status/500')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(done);
   });

  it('responds with bad request for invalid code', function(done) {
      request(server)
        .get('/status/abc')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done);
  });

  it('responds with bad request for invalid number', function(done) {
      request(server)
        .get('/status/888')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done);
  });
});


describe('GET /status', function() {
  it('responds with 201', function(done) {
    request(server)
      .get('/status/201')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(done);
  });

  it('responds with 500', function(done) {
      request(server)
        .get('/status/500')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(done);
   });

  it('responds with bad request for invalid code', function(done) {
      request(server)
        .get('/status/abc')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done);
  });

  it('responds with bad request for invalid number', function(done) {
      request(server)
        .get('/status/888')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done);
  });
});