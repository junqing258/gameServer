
const fs = require('fs');
const path = require('path');
const http = require('http');
const Primus = require('primus');
const querystring = require('querystring');
const chalk = require('chalk');
const Controller = require('./ctrl/index');
// const jwt = require('jsonwebtoken');
// const async = require('async');
// const _ = require('lodash');

// const { publicKey, privateKey } = require('./config/rsa');



exports.app = function(app_server) {
    let server = http.createServer(app_server);
    let primus = new Primus(server, { parser: 'binary' });
    // primus.library();
    // primus.save(__dirname +'/primus.js');
    server.listen(3000, () => {
        console.log(chalk.green('primus启动端口: 3000\n')); 
    });

    primus.on('connection', spark => {
        spark.write(JSON.stringify({ "cmd": "conn::init" }));
        this.controller = new Controller(spark);
    });

}