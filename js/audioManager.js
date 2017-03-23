/**
 * Created by DrTone on 03/06/2015.
 */

//Manage all web audio

let drumManager = function() {
    this.context = null;
    this.url = "sounds/";
    this.extension = ".wav";
    this.numSoundsLoaded = 0;
    this.allSoundsLoaded = false;
    this.bpm = 100;
    this.beatDuration = 60/this.bpm;
    this.sources = [];
};

function onError() {
    alert("Error loading sound file");
}

drumManager.prototype = {

    constructor: drumManager,

    init: function(sounds) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
        }
        catch (error) {
            alert("Web Audio API not supported");
        }
        //Load drum sounds
        let i, numSounds = sounds.length;
        this.soundBuffers = new Array(numSounds);
        for(i=0; i<numSounds; ++i) {
            this.loadSound(sounds[i], i);
        }
    },

    loadSound: function(sound, id) {
        //Load all sounds asynchronously
        let _this = this;
        let request;

        request = new XMLHttpRequest();
        request.open("GET", this.url + sound + this.extension, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
            _this.context.decodeAudioData(request.response, function(buffer) {
                _this.soundBuffers[id] = buffer;
                if(++_this.numSoundsLoaded >= _this.soundBuffers.length) _this.allSoundsLoaded = true;
            }, onError);
        };

        request.send();
    },

    soundsLoaded: function() {
        return this.allSoundsLoaded;
    },

    getDuration: function() {
        return this.beatDuration;
    },

    setDuration: function(bpm) {
        this.bpm = bpm;
        this.beatDuration = 60/this.bpm;
    },

    playSound: function(sound) {
        if(sound === -1) return;
        let source = this.context.createBufferSource();
        this.sources.push(source);
        source.buffer = this.soundBuffers[sound];
        source.connect(this.context.destination);
        source.start(this.context.currentTime);
    },

    pause: function() {
        this.source.stop(this.context.currentTime);
    },

    resume: function() {
        this.context.resume();
    }
};
