var APP_ID = null; //replace this with your app ID to make use of APP_ID verification

var AlexaSkill = require("./AlexaSkill");
var serverinfo = require("./serverinfo");
var http = require("http");
const querystring = require('querystring');

if (serverinfo.host == "127.0.0.1") {
    throw "Default hostname found, edit your serverinfo.js file to include your server's external IP address";
}

function getChannels(intent,session,response) {
    var options = {
        host: 'vezcore-qvtwdtbnjp.dynamic-m.com',
        port: 1234,
        path: '/roku/getListofChannels',
        headers: {'Authorization': serverinfo.pass}
    };

    http.get(options, function(res) {
        //need to do a try/catch block to try and make the error message more helpful.
            res.on('data', function (chunk) {
                var jsonContent = JSON.parse(chunk);
                var chan = intent.slots.Channel.value;
                var id = chan.toLowerCase();
                console.log("BODY: " + jsonContent[id]);
                sendCommand("/roku/launch/"+jsonContent[id],null,function(){
                    response.tellWithCard("Launching "+intent.slots.Channel.value);
                });
                //return jsonContent;
            });
    });
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

//need to adjust responses to respond with name of roku device being used, ie "Going Home on Upstairs Roku"
AlexaRoku.prototype.intentHandlers = {
    Home: function (intent, session, response) {
        sendCommand("/roku/keypress/home",null,function() {
            response.tellWithCard("Going Home");
        });
    },
    PlayChannel: function (intent, session, response) {
        getChannels(intent, session, response);
    },
    RokuSearch: function (intent, session, response) {
        var query = intent.slots.Search.value;
        var searchString = querystring.stringify({title : query});
        console.log("Show searched for = "+intent.slots.Search.value);
        sendCommand("/roku/search/browse?"+searchString,null,function() {
            response.tellWithCard("Searching for "+intent.slots.Search.value);
        });
    },
    BloombergTV: function (intent, session, response) {
        sendCommand("/roku/launch/54000",null,function() {
            response.tellWithCard("Launching Bloomberg News");
        });
    },
    History: function (intent, session, response) {
        sendCommand("/roku/launch/35059",null,function() {
            response.tellWithCard("Launching The History Channel");
        });
    },
    Amazon: function (intent, session, response) {
        sendCommand("/roku/launch/13",null,function() {
            response.tellWithCard("Launching Amazon");
        });
    },
    WatchESPN: function (intent, session, response) {
        sendCommand("/roku/launch/34376",null,function() {
            response.tellWithCard("OK, let's watch some sports");
        });
    },
    CNNGo: function (intent, session, response) {
        sendCommand("/roku/launch/65978",null,function() {
            response.tellWithCard("Launching CNN News");
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
    btngo: function (intent, session, response) {
        sendCommand("/roku/launch/66258",null,function() {
            response.tellWithCard("Launching The Big Ten Network");
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
        sendCommand("/roku/keypress/Up",null,function() {
            response.tellWithCard("Up");
        });
    },
    UpTwo: function (intent, session, response) {
        sendCommand("/roku/keypress/Up",null,function() {});
        sendCommand("/roku/keypress/Up",null,function() {
            response.tellWithCard("Up Two");
        });
    },
    UpThree: function (intent, session, response) {
        sendCommand("/roku/keypress/Up",null,function() {});
        sendCommand("/roku/keypress/Up",null,function() {});
        sendCommand("/roku/keypress/Up",null,function() {
            response.tellWithCard("Up Three");
        });
    },
    Down: function (intent, session, response) {
        sendCommand("/roku/keypress/Down",null,function() {
            response.tellWithCard("Down");
        });
    },
    DownTwo: function (intent, session, response) {
        sendCommand("/roku/keypress/Down",null,function() {});
        sendCommand("/roku/keypress/Down",null,function() {
            response.tellWithCard("Down Two");
        });
    },
    DownThree: function (intent, session, response) {
        sendCommand("/roku/keypress/Down",null,function() {});
        sendCommand("/roku/keypress/Down",null,function() {});
        sendCommand("/roku/keypress/Down",null,function() {
            response.tellWithCard("Down Three");
        });
    },
    PowerOn: function (intent, session, response) {
        sendCommand("/roku/keypress/poweron",null,function() {
            response.tellWithCard("OK, fasten your seat belts.  Here comes the fun");
        });
    },
    PowerOff: function (intent, session, response) {
        sendCommand("/roku/keypress/poweroff",null,function() {
            response.tellWithCard("OK, I turned off the Roku TV");
        });
    },
    Left: function (intent, session, response) {
        sendCommand("/roku/keypress/Left",null,function() {
            response.tellWithCard("Left");
        });
    },
    LeftTwo: function (intent, session, response) {
        sendCommand("/roku/keypress/Left",null,function() {});
        sendCommand("/roku/keypress/Left",null,function() {
            response.tellWithCard("Left Two");
        });
    },
    LeftThree: function (intent, session, response) {
        sendCommand("/roku/keypress/Left",null,function() {});
        sendCommand("/roku/keypress/Left",null,function() {});
        sendCommand("/roku/keypress/Left",null,function() {
            response.tellWithCard("Left Three");
        });
    }, 
    Right: function (intent, session, response) {
        sendCommand("/roku/keypress/right",null,function() {
            response.tellWithCard("Right");
        });
    },
    RightTwo: function (intent, session, response) {
        sendCommand("/roku/keypress/right",null,function() {});
        sendCommand("/roku/keypress/right",null,function() {
            response.tellWithCard("Right Two");
        });
    },
    RightThree: function (intent, session, response) {
        sendCommand("/roku/keypress/right",null,function() {});
        sendCommand("/roku/keypress/right",null,function() {});
        sendCommand("/roku/keypress/right",null,function() {
            response.tellWithCard("Right Three");
        });
    },
    Type: function (intent, session, response) {
        sendCommand("/roku/type",intent.slots.Text.value,function() {
            response.tellWithCard("Typing text: "+intent.slots.Text.value,"Roku","Typing text: "+intent.slots.Text.value);
        });
    },
    VolumeUp: function (intent, session, response) {
        sendCommand("/roku/keypress/VolumeUp",null,function() {
            response.tellWithCard("Ok, turning it up");
        });
    },
    VolumeDown: function (intent, session, response) {
        sendCommand("/roku/keypress/VolumeDown",null,function() {
            response.tellWithCard("Ok, turning it down");
        });
    },
    Mute: function (intent, session, response) {
        sendCommand("/roku/keypress/VolumeMute",null,function() {
            response.tellWithCard("Muted");
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