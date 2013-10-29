/*
cloud.js
server.js
WebSocket server
Copyright (C) 2013 bobbybee
*/

var WebSocketServer = require('websocket').server;
var http = require('http');

var httpServer = http.createServer(function(req, res){
     res.end('1337 WebSocket');
});

var wsServer = new WebSocketServer({httpServer:httpServer});
wsServer.on('request', function(req){
            var conn = req.accept(null, req.origin); // TODO: add origin verification
            
            conn.on('message', function(m){
                    var data = m.utf8Data; // TODO: add binary support
                    console.log("Received "+data); // TODO: add parsing
                    });
            
            conn.on('end', function(){
                    console.log("Disconnected"); // TODO: add logic
                    });
            });