const fs = require('fs');
const path = require('path');
const express = require('express');

const { app: socket } = require('./app/main');

var app = express();
app.use('/assets', express.static('./bin/assets'));

app.get('/', function (req, res) {
  res.type('html');
  res.sendFile(path.resolve(__dirname, 'bin/index.html'));
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

socket(app);