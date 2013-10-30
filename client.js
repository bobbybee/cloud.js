/*
 cloud.js
 server.js
 WebSocket client
 Copyright (C) 2013 bobbybee
 */

function CloudClient(host, port){
    if(!host) host = "localhost";
    if(!port) port = 1337;
    
    this._sock = new WebSocket("ws://"+host+":"+port+"/");
    
    this._sock.onopen = function(e){
        console.log("Open");
    };
    
    this._sock.onclose = function(e){
        console.log("Close");
    };
    
    this._sock.onmessage = function(e){
        console.log(e.data);
    };
    
    this._sock.onerror = function(e){
        console.log("Error");
    };
}