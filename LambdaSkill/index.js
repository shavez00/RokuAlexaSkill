var APP_ID = null; //replace this with your app ID to make use of APP_ID verification

var AlexaSkill = require("./AlexaSkill");
var serverinfo = require("./serverinfo");
var http = require("http");

if (serverinfo.host == "127.0.0.1") {
    throw "Default hostname found, edit your serverinfo.js file to include your server's external IP address";
}

var AlexaRoku = function () {
    AlexaSkill.call(this, APP_ID);
};

AlexaRoku.prototype = Object.create(AlexaSkill.prototype);
AlexaRoku.prototype.constructor = AlexaRoku;

function sendCommand(path,body,callback) {
    var opt = {
        host:serverinfo.host,
        port:serverinfo.port,
        path: path,
        method: 'POST',
        headers: {'Authorization': serverinfo.pass},
    };

    var req = http.request(opt, function(res) {
        callback();
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    if (body) req.write(body);
    req.end();
}

AlexaRoku.prototype.intentHandlers = {
    Home: function (intent, session, response) {
        sendCommand("/roku/keypress/home",null,function() {
            response.tellWithCard("Going Home");
        });
    },
    History: function (intent, session, response) {
        sendCommand("/roku/launch/12",null,function() {
            response.tellWithCard("Launching Netflix");
        });
    },
    Netflix: function (intent, session, response) {
        sendCommand("/roku/launch/35059",null,function() {
            response.tellWithCard("Launching The History Channel");
        });
    },
    Vevo: function (intent, session, response) {
        sendCommand("/roku/launch/20445",null,function() {
            response.tellWithCard("Launching Vevo");
        });
    },
    Amazon: function (intent, session, response) {
        sendCommand("/roku/launch/13",null,function() {
            response.tellWithCard("Launching Amazon");
        });
    },
    Pandora: function (intent, session, response) {
        sendCommand("/roku/launch/28",null,function() {
            response.tellWithCard("Launching Pandora");
        });
    },
    Select: function (intent, session, response) {
        sendCommand("/roku/keypress/select",null,function() {
            response.tellWithCard("Ok");
        });
    },
    Back: function (intent, session, response) {
        sendCommand("/roku/keypress/back",null,function() {
            response.tellWithCard("Going Back");
        });
    },
    TV: function (intent, session, response) {
        sendCommand("/roku/keypress/inputtuner",null,function() {
            response.tellWithCard("TV");
        });
    },
    YouTube: function (intent, session, response) {
        sendCommand("/roku/launch/837",null,function() {
            response.tellWithCard("Launching YouTube");
        });
    
    },
    FX: function (intent, session, response) {
        sendCommand("/roku/launch/47389",null,function() {
            response.tellWithCard("Launching FX");
        });
    
    },
    FourK: function (intent, session, response) {
        sendCommand("/roku/launch/69091",null,function() {
            response.tellWithCard("Launching Four K");
        });
    
    },
    Rewind: function (intent, session, response) {
        sendCommand("/roku/keypress/rewind",null,function() {
            response.tellWithCard("Rewinding");
        });
    
    },
    Fastforward: function (intent, session, response) {
        sendCommand("/roku/keypress/fastforward",null,function() {
            response.tellWithCard("Fast forwarding");
        });
    
    },
    Instantreplay: function (intent, session, response) {
        sendCommand("/roku/keypress/instantreplay",null,function() {
            response.tellWithCard("Instant Replay");
        });
    
    },
    Up: function (intent, session, response) {
        sendCommand("/roku/keypress/up",null,function() {
            response.tellWithCard("Up");
        });
    },
    Down: function (intent, session, response) {
        sendCommand("/roku/keypress/down",null,function() {
            response.tellWithCard("Down");
        });
    },
    PowerOn: function (intent, session, response) {
        sendCommand("/roku/keypress/poweron",null,function() {
            response.tellWithCard("Power On");
        });
    },
    PowerOff: function (intent, session, response) {
        sendCommand("/roku/keypress/poweroff",null,function() {
            response.tellWithCard("Power Off");
        });
    },
    Left: function (intent, session, response) {
        sendCommand("/roku/keypress/left",null,function() {
            response.tellWithCard("Left");
        });
    
    }, 
    Right: function (intent, session, response) {
        sendCommand("/roku/keypress/right",null,function() {
            response.tellWithCard("Right");
        });
    
    },   
    Type: function (intent, session, response) {
        sendCommand("/roku/type",intent.slots.Text.value,function() {
            response.tellWithCard("Typing text: "+intent.slots.Text.value,"Roku","Typing text: "+intent.slots.Text.value);
        });
    },
    PlayPause: function (intent, session, response) {
        sendCommand("/roku/keypress/play",null,function() {
            response.tell("OK");
        });
    },
    SearchRoku: function (intent, session, response) {
        sendCommand("/roku/searchroku",intent.slots.Text.value,function() {
            response.tellWithCard("Playing: "+intent.slots.Text.value,"Roku","Playing: "+intent.slots.Text.value);
        });
    },
    Search: function (intent, session, response) {
        sendCommand("/roku/search",intent.slots.Text.value,function() {
            response.tellWithCard("Typing: "+intent.slots.Text.value,"Roku","Playing: "+intent.slots.Text.value);
        });
    },
    HelpIntent: function (intent, session, response) {
        response.tell("No help available at this time.");
    }
};

exports.handler = function (event, context) {
    var roku = new AlexaRoku();
    roku.execute(event, context);
};


