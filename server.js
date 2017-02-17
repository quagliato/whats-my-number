// What's my number
// 2017-02-17, Curitiba - Brazil
// Author: Eduardo Quagliato<eduardo@quagliato.me>

// This piece of software is licensed by MIT License. Refer to license.txt to
// more information about it.

const express                = require('express');
const fs                     = require('fs');
const moment                 = require('moment');

const expressApp = new express();

const EXPRESS_PORT = process.env.WHATS_MY_NUMBER_PORT || 80;
const LOG_FILE = process.env.WHATS_MY_NUMBER_LOGFILE || 'requests.log';
const WRITE_FILE = process.env.WHATS_MY_NUMBER_LOG || false;

// Listens to every method
expressApp.all('/', function(req, res){
  // Saves log
  const logLine = JSON.stringify({
    date: moment().format('YYYY-MM-DD HH:mm:ss.SSS Z'),
    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
  });

  console.log(logLine);

  if (WRITE_FILE !== false) {
    fs.appendFileSync(LOG_FILE, logLine + '\n', {
      encoding: 'utf8'
    });
  }

  // Answer the address
  res.json({
    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress
  });
});

expressApp.all('/*', function(req, res){
  res.sendStatus(404).end();
});

expressApp.listen(EXPRESS_PORT);
