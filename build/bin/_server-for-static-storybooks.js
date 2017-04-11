#!/usr/bin/env node

const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

const [,, publicFolder, port] = process.argv;
const serve = serveStatic(publicFolder);

// Create server
const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(port);
