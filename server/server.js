const http = require('http');
const fs = require('fs');
const express = require('express');
const ss = require('socket.io-stream');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');
//const audio = require('./audiosample');

const app = express();
app.use(cors());
const api = express();
api.use(cors());

api.get('/track', (req, res, err) => {
  // generate file path
  const filePath = path.resolve(__dirname, 'private', 'track.wav');
  // get file size info
  const stat = fs.statSync(filePath);

  // set response header info
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size,
    'Access-Control-Allow-Origin': '*'
  });
  //create read stream
  const readStream = fs.createReadStream(filePath);
  // attach this stream with response stream
  readStream.pipe(res);
});

//register api calls
app.use('/api/v1/', api);

const server = http.createServer(app);
const io = socket().listen(server, {
  log: false,
  agent: false,
  origins: '*:*',
  transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

io.on('connection', client => {

  const stream = ss.createStream();

  client.on('track', () => {
    const filePath = path.resolve(__dirname, 'private', 'track.wav');
    const stat = fs.statSync(filePath);
    const readStream = fs.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);
    console.log('Id: ', stream.id);

    ss(client).emit('track-stream', stream, { stat });
  });
  client.on('disconnect', () => {});
});

server.listen('3333', function () {
  console.log('Server app listening on port 3333!');
});
