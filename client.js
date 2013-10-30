/*
 cloud.js
 server.js
 WebSocket client
 Copyright (C) 2013 bobbybee
 */

function CloudClient(host, port){
    if(!host) host = "localhost";
    if(!port) port = 1337;
    
    var cc = this; // javascript has some funny problems
    
    this._sock = new WebSocket("ws://"+host+":"+port+"/");
    
    this._sock.onopen = function(e){
        console.log("Open");
    };
    
    this._sock.onclose = function(e){
        console.log("Close");
    };
    
    this._sock.onmessage = function(e){
        cc.parseMessage(e.data);
    };
    
    this._sock.onerror = function(e){
        console.log("Error");
    };
}

CloudClient.prototype.parseMessage = function(data){
    // parse message
    // mimic official JSON protocol
    var msg = JSON.parse(data);
    console.log(msg);
    
    if(msg.method == 'set'){
        this.handleSetVariable(msg.name, msg.value);
    }
};

CloudClient.prototype.setVariable = function(name, value){
    this._sock.send(JSON.stringify({"method":"set", "name":name, "value":value}));
};

CloudClient.prototype.handleSetVariable = function(name, value){
    console.log("Setting "+name+" to "+value);
    
    // STUB: call high-level scrath handlers or over-ride
};