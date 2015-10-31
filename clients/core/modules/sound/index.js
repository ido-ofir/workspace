
var BufferLoader = require('./BufferLoader.js');
var sounds = {};
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var loaded = false;

new BufferLoader(
    context,[
        '/resources/sounds/call.mp3',
        '/resources/sounds/notification.mp3'
    ],
    function (bufferList) {
        sounds.call = {buffer: bufferList[0]};
        sounds.notification = {buffer: bufferList[1]};
        loaded = true;

    }
).load();

function play(name) {
  if(!loaded) return;
  var sound = context.createBufferSource();
  sound.buffer = sounds[name].buffer;
  sound.connect(context.destination);
  sounds[name].sound = sound;
  sound.start(0);
}

function stop(name) {
    if(sounds[name]){
        if(sounds[name].sound) sounds[name].sound.stop();
    }
}

module.exports = {
    ring: function () {
        console.log('ringing');
        play('call');
    },
    notify: function () {
        console.log('notify');
        play('notification');
    },
    stop: function () {
        stop('call');
    }
};

/*

var platform, context;
var sounds = {};
var callback;
var success = function (a, b, c) {
    console.log('success');
    console.log(arguments);
};
var err = function (a, b, c) {
    console.log('err');
    console.log(arguments);
};

function getMediaURL(s) {
    if (platform === "android") return "/android_asset/www/" + s;
    return s;
}
$ionicPlatform.ready(function () {
    platform = window.device.platform.toLowerCase();
    if(platform === 'browser'){
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();

        new BufferLoader(
            context,[
                'sounds/call.mp3',
                'sounds/notification.mp3'
            ],
            function (bufferList) {
                sounds.call = {buffer: bufferList[0]};
                sounds.notification = {buffer: bufferList[1]};
                if(callback) callback();

            }
        ).load();
    }
    else{
        sounds = {
            call: new window.Media(getMediaURL('sounds/call.mp3'), success, err),
            notification: new window.Media(getMediaURL('sounds/notification.mp3'), success, err)
        };
    }
});
function play(name) {
    if(sounds[name]){
        if(platform === 'browser'){

            var sound = context.createBufferSource();
            sound.buffer = sounds[name].buffer;
            sound.connect(context.destination);
            sounds[name].sound = sound;
            sound.start(0);
        }
        else{
            sounds[name].seekTo(0);
            sounds[name].play();
        }
    }
    else{
        callback = function () {
            play(name);
        }
    }
}

function stop(name) {
    if(sounds[name]){
        if(platform === 'browser'){
            if(sounds[name].sound) sounds[name].sound.stop();
        }
        else{
            sounds[name].stop();
        }
    }
}
var srv = window.soundSrv = {
    ring: function () {
        console.log('ringing');
        play('call');
    },
    notify: function () {
        play('notification');
    },
    stop: function () {
        stop('call');
    }
};
return srv; */
