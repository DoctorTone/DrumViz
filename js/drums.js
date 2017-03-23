/**
 * Created by DrTone on 01/06/2015.
 */

//Extend app from base
let HIHAT=0, SNARE=1, UPPERTOM=2, MIDTOM=3;
let FLOORTOM=4, KICK=5, CRASH=6, RIDE=7;

let soundManager = null;

//DEBUG
/*
var score = [
    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ]
];
*/


let score = [
    [
        { time: 0, drum: HIHAT },
        { time: 0, drum: KICK },
        { time: 0.5, drum: HIHAT },
        { time: 1, drum: HIHAT },
        { time: 1, drum: SNARE },
        { time: 1.5, drum: HIHAT },
        { time: 2, drum: HIHAT },
        { time: 2, drum: KICK },
        { time: 2.5, drum: HIHAT },
        { time: 3, drum: HIHAT },
        { time: 3, drum: SNARE },
        { time: 3.5, drum: HIHAT }
    ],
    [
        { time: 0, drum: HIHAT },
        { time: 0, drum: KICK },
        { time: 0.5, drum: HIHAT },
        { time: 1, drum: HIHAT },
        { time: 1, drum: SNARE },
        { time: 1.5, drum: HIHAT },
        { time: 2, drum: HIHAT },
        { time: 2, drum: KICK },
        { time: 2.5, drum: HIHAT },
        { time: 3, drum: HIHAT },
        { time: 3, drum: SNARE },
        { time: 3.5, drum: HIHAT }
    ]
];

/*
var score = [
    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 1.75, 2.25, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 1.75, 2.25, 3] },
        { drum: KICK, notes: [0, 2] }
    ]

    ];
*/

class DrumApp extends BaseApp {
    constructor() {
        super();
    }

    init(container) {
        BaseApp.prototype.init.call(this, container);
        this.scoreLoaded = false;
        const NUM_DRUMS = 8;
        this.drumIndex = [];
        for(let i=0; i<NUM_DRUMS; ++i) {
            this.drumIndex.push(0);
        }
        this.currentBar = 0;
        this.notesThisBar = score[this.currentBar].length;
        this.numBars = score.length;
        this.barTime = 0;
        this.currentNote = 0;
        this.duration = 0;
        this.hitDelay = 0.1;
        this.currentScore = [];
        this.timeNow = 0;
        this.playNow = false;
        this.playing = false;
        this.playingTime = 0;
        this.trackCompleted = false;
    }

    createScene() {
        //Create scene
        super.createScene();

        //Drums
        let drumNames = ["hihat", "snare", "uppertom", "midtom",
            "floortom", "kick", "crash", "ride"];
        let pos = [
            -207, 237, 64, //Hihat
            -100, 190, 96, //Snare
            -88, 259, -20, //Upper tom
            50, 259, -23,  //Mid tom
            153, 161, 66,  //Floor tom
            -23, 14, 20,   //Kick
            -197, 291, -56,//Crash
            161, 313, -77
        ];
        let drumPos = [];
        let visPos, i, len;
        for(i=0, len = pos.length; i<len; i+=3) {
            visPos = new THREE.Vector3(pos[i], pos[i+1], pos[i+2]);
            drumPos.push(visPos);
        }

        //Create floor
        let floorGeom = new THREE.CylinderBufferGeometry(400, 400, 10, 24, 1);
        let floorMat = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
        let floor = new THREE.Mesh(floorGeom, floorMat);
        floor.position.y = -90;

        this.scenes[this.currentScene].add(floor);

        //Load in model
        this.loader = new THREE.JSONLoader();
        this.loader.load("./models/luis_drumset.json", (geometry, materials) => {
            this.drumMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
            this.scenes[this.currentScene].add(this.drumMesh);
        });

        //Hit visualisations
        let hitGeom, hitMesh, hitHeight = 50;
        let hitMat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
        this.hitMeshes = [];
        for(i=0, len=drumPos.length; i<len; ++i) {
            hitGeom = new THREE.CylinderBufferGeometry(1, 1, hitHeight, 8, 1);
            hitMesh = new THREE.Mesh(hitGeom, hitMat);
            hitMesh.position.set(drumPos[i].x, drumPos[i].y+(hitHeight/2), drumPos[i].z);
            hitMesh.name = drumNames[i];
            hitMesh.visible = false;
            this.scenes[this.currentScene].add(hitMesh);
            this.hitMeshes.push(hitMesh);
            this.hitMeshes.timerStart = 0;
        }

        this.hitMeshes[KICK].rotation.x = Math.PI/2;
        //DEBUG
        //Positioning helper
        let boxGeom = new THREE.BoxBufferGeometry(10, 10, 10);
        let boxMat = new THREE.MeshBasicMaterial( {color: 0xffffff});
        let box = new THREE.Mesh(boxGeom, boxMat);
        this.scenes[this.currentScene].add(box);
        box.name = "Box";
        box.visible = false;

        //Timeline
        //See if score has loaded and set canvas height accordingly
        let scoreElem = document.getElementById("score");
        this.setCanvasSize(scoreElem);
    }

    setCanvasSize(img) {
        let height = img.clientHeight;
        let width = img.clientWidth;
        //DEBUG
        //console.log("Height =",height, "Width =", width);

        let c = document.getElementById("timeLine");
        this.ctx = c.getContext('2d');
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;

        let timeLineProps = {
            start: 128,
            moveScale: 220,
            yPos: 10,
            width: 5,
            height: height
        };

        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(timeLineProps.start, timeLineProps.yPos, timeLineProps.width, timeLineProps.height);
        this.timeLineProps = timeLineProps;
    }

    resetTimeLine() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillRect(this.timeLineProps.start, this.timeLineProps.yPos,
            this.timeLineProps.width, this.timeLineProps.height);
    }

    setDuration(duration) {
        soundManager.setDuration(duration);
    }

    playScore() {
        //Set play button to pause
        this.trackCompleted = false;
        this.playing = !this.playing;
        let elem = $('#play');
        elem.attr("src", this.playing ? "images/pause-button.png" : "images/play-button.png");
    }

    resetScore() {
        //Reset everything
        this.currentBar = 0;
        this.currentNote = 0;
        this.notesThisBar = score[this.currentBar].length;
        this.playing = false;
        this.playingTime = 0;
        $('#play').attr("src", "images/play-button.png");
        this.resetTimeLine();
    }

    getNextTime() {
        //Get next note at current time index
        let bar = score[this.currentBar];
        return bar[this.currentNote].time;
    }

    getNextNotes() {
        let notes = [];
        let bar = score[this.currentBar], i;
        let currentTime = bar[this.currentNote].time;
        for(i=0; i<bar.length; ++i) {
            if(bar[i].time === currentTime) {
                notes.push(bar[i].drum);
            }
        }

        return notes;
    }

    updateNoteIndex(offset) {
        this.currentNote += offset;
        if(this.currentNote >= this.notesThisBar) {
            if(++this.currentBar >= this.numBars) {
                this.trackCompleted = true;
                this.resetScore();
            } else {
                this.currentNote = 0;
                this.notesThisBar = score[this.currentBar].length;
                //Bit of a hack as need to know length of note before starting next bar
                this.playingTime = -0.5 * soundManager.getDuration();
            }
        }
    }

    createGUI() {
        //Create GUI - use dat.GUI for now
        this.guiControls = new function() {
            this.X = 0;
            this.Y = 0;
            this.Z = 0;
        };

        let gui = new dat.GUI();
        gui.add(this.guiControls, "X", -500, 500).onChange(value => {
            this.changeBoxPos(value, -1);
        });
        gui.add(this.guiControls, "Y", -500, 500).onChange(value => {
            this.changeBoxPos(value, 0);
        });
        gui.add(this.guiControls, "Z", -500, 500).onChange(value =>{
            this.changeBoxPos(value, 1);
        });
    }

    changeBoxPos(pos, axis) {
        //Move box around scene
        let box = this.scene.getObjectByName("Box", true);
        if(!box) {
            console.log("No box in scene");
        }

        switch(axis) {
            case -1:
                //X-axis
                box.position.x = pos;
                break;

            case 0:
                //Y-axis
                box.position.y = pos;
                break;

            case 1:
                //Z-axis
                box.position.z = pos;
                break;

            default:
                break;
        }
    }

    update() {
        BaseApp.prototype.update.call(this);
        let delta = this.clock.getDelta();
        this.elapsedTime += delta;

        if(this.playing && soundManager.soundsLoaded() && !this.trackCompleted) {
            this.playingTime += delta;

            //Update timeline
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillRect(this.timeLineProps.start + (this.playingTime * this.timeLineProps.moveScale), this.timeLineProps.yPos,
                this.timeLineProps.width, this.timeLineProps.height);

            let nextTime = this.getNextTime(), i;
            if(this.playingTime >= (nextTime * soundManager.getDuration())) {
                //Get all notes playing at this time
                let notes = this.getNextNotes();
                for(i=0; i<notes.length; ++i) {
                    soundManager.playSound(notes[i]);
                }
                this.updateNoteIndex(notes.length);
            }
        }
    }

    keydown(event) {
        //Do any key processing
        switch(event.keyCode) {
            case 80: //P
                console.log("Cam =", this.camera.position);
                console.log("Look =", this.controls.getLookAt());
                break;

            default :
                break;
        }
    }
}

$(document).ready(() => {
    //Drums
    const defaultBPM = 60;
    let drumNames = ["hihat", "snare", "uppertom", "midtom",
        "floortom", "kick", "crash", "ride"];
    let container = document.getElementById("WebGL-output");
    soundManager = new drumManager();
    soundManager.init(drumNames);
    soundManager.setDuration(defaultBPM);

    let app = new DrumApp();
    app.init(container);
    //app.createGUI();
    app.createScene();

    $(document).keydown(event => {
        app.keydown(event);
    });

    $('#play').on('click', () => {
        app.playScore();
    });

    $('#rewind').on('click', () => {
        app.resetScore()
    });

    $('.dial').knob({
        "min": 5,
        "max": 220,
        "inputColor": "#000000",
        "fgColor": "#632523",
        "width": 200,
        "change": value => {
            app.setDuration(value);
        }
    });

    app.run();
});
