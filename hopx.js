const http = require('http');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

function server(port, handler) {
  http.createServer((req, res) => {
    handler(req, res);
  }).listen(port, () => {
    console.log(`
    [ HopXJS Webserver ] HopX Webserver is starting please wait...
    [ HopXJS Webserver ] Server is listening on port ${port}
    [ HopXJS Webserver ] Press Ctrl+C to stop the server
    WARNING: This is a development server, check the documentation for production deployment.
    `);
  });
}

function post(filePath, data, res) {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404: File Not Found`);
      return;
    }
    const template = handlebars.compile(content);
    const output = template(data);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(output);
  });
} 

function loadEvent(eventName, ...args) {
    console.log(`Event: ${eventName}`);
    console.log(args);
}

class ClientInfo {
    constructor(req) {
      this.req = req;
    }
  
    get ip() {
      return this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress;
    }
  
    get userAgent() {
      return this.req.headers['user-agent'];
    }
  
    get referrer() {
      return this.req.headers['referer'];
    }
}
  
  

module.exports = {
  server: server,
  post: post,
  loadEvent: loadEvent,
  ClientInfo: ClientInfo
};
