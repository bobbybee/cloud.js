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
}).listen(1337);

var wsServer = new WebSocketServer({httpServer:httpServer});
wsServer.on('request', function(req){
            var conn = req.accept(null, req.origin); // TODO: add origin verification
            
            // user details
            var username;
            var token;
            var projectID;
            
            var handshaked = true;
            
            conn.on('message', function(m){
                    try{
                        var data = m.utf8Data; // TODO: add binary support
                        console.log("Received "+data);
                        var msg = JSON.parse(data);
                    
                    if(msg.method == 'handshake'){
                        if(VerifyToken(msg.username, msg.token)){
                            username = msg.username;
                            token = msg.token;
                        } else {
                            // fail silently
                            return;
                        }
                        if(VerifyProjectID(msg.projectID)){
                            projectID = msg.projectID;
                        } else {
                            return;
                        }
                        handshaked = true;
                        console.log("Handshake from "+username+" accepted");
                    } else if(msg.method == 'set' && handshaked){
                    
                    }
                    } catch(e){
                        console.log(e); // fail silently
                    }
                    });
            
            conn.on('end', function(){
                    console.log("Disconnected"); // TODO: add logic
                    });
            });

function VerifyToken(username, token){
    if(username == "" || token == "") return false;
    // TO-DO: Check token
    return true; // auto accept
}

function VerifyProjectID(projectID){
    return true;
}