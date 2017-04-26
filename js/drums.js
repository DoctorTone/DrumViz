/**
 * Created by DrTone on 01/06/2015.
 */

//Extend app from base
let HIHAT=0, SNARE=1, UPPERTOM=2, MIDTOM=3;
let FLOORTOM=4, KICK=5, CRASH=6, RIDE=7;
let NONE=-1;

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


let score0 = [
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
        { time: 3.5, drum: HIHAT },
        { time: 4.0, drum: NONE}
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
        { time: 3.5, drum: HIHAT },
        { time: 4.0, drum: NONE}
    ]
];

let score1 = [
    [
        { time: 0, drum: HIHAT },
        { time: 0, drum: KICK },
        { time: 0.5, drum: HIHAT },
        { time: 1, drum: HIHAT },
        { time: 1, drum: SNARE },
        { time: 1.5, drum: HIHAT },
        { time: 2, drum: HIHAT },
        { time: 2.5, drum: HIHAT },
        { time: 2.5, drum: KICK },
        { time: 3, drum: HIHAT },
        { time: 3, drum: SNARE },
        { time: 3.5, drum: HIHAT },
        { time: 4.0, drum: NONE}
    ],
    [
        { time: 0, drum: HIHAT },
        { time: 0, drum: KICK },
        { time: 0.5, drum: HIHAT },
        { time: 1, drum: HIHAT },
        { time: 1, drum: SNARE },
        { time: 1.5, drum: HIHAT },
        { time: 2, drum: HIHAT },
        { time: 2.5, drum: HIHAT },
        { time: 2.5, drum: KICK },
        { time: 3, drum: HIHAT },
        { time: 3, drum: SNARE },
        { time: 3.5, drum: HIHAT },
        { time: 4.0, drum: NONE}
    ]
];

let score2 = [
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
        { time: 3.5, drum: HIHAT },
        { time: 3.5, drum: SNARE },
        { time: 4.0, drum: NONE}
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
        { time: 3.5, drum: HIHAT },
        { time: 3.5, drum: SNARE },
        { time: 4.0, drum: NONE}
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

const X_AXIS = 0, Y_AXIS = 1, Z_AXIS = 2;

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
        this.currentScore = score0;
        this.notesThisBar = this.currentScore[this.currentBar].length;
        this.numBars = this.currentScore.length;
        this.barTime = 0;
        this.currentNote = 0;
        this.duration = 0;
        this.hitDelay = 0.1;
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
            -14.2, 21.25, 7.5, //Hihat
            -5.7, 19.8, 8.5, //Snare
            -4.7, 22.6, -0.9, //Upper tom
            5.7, 22.6, -0.9,  //Mid tom
            12.3, 18.9, 7.5,  //Floor tom
            0, 2.8, 0,   //Kick
            -8.5, 25.5, -4.7,//Crash
            11.3, 25.5, -1.9 //Ride
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
        this.loader.load("./models/drumset.json", (geometry, materials) => {
            this.drumMesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
            this.drumMesh.position.set(0, 0, 0);
            this.drumMesh.scale.set(10, 10, 10);
            this.scenes[this.currentScene].add(this.drumMesh);
        });

        //Hit visualisations
        let hitMeshConfig = {
            radius: 0.35,
            widthSegments: 8,
            heightSegments: 8,
            hitTime: 0.1
        };
        let hitGeom, hitMesh;
        let hitMat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
        this.hitMeshes = [];
        for(i=0, len=drumPos.length; i<len; ++i) {
            hitGeom = new THREE.SphereBufferGeometry(hitMeshConfig.radius, hitMeshConfig.widthSegments, hitMeshConfig.heightSegments);
            hitMesh = new THREE.Mesh(hitGeom, hitMat);
            hitMesh.position.set(drumPos[i].x, drumPos[i].y, drumPos[i].z);
            hitMesh.name = drumNames[i];
            hitMesh.visible = false;
            hitMesh.hitStart = -1;
            hitMesh.hitTime = hitMeshConfig.hitTime;
            this.scenes[this.currentScene].add(hitMesh);
            this.hitMeshes.push(hitMesh);
            this.hitMeshes.timerStart = 0;
        }

        //Positioning helper
        let boxGeom = new THREE.BoxBufferGeometry(1, 1, 1);
        let boxMat = new THREE.MeshBasicMaterial( {color: 0xffffff});
        let box = new THREE.Mesh(boxGeom, boxMat);
        this.scenes[this.currentScene].add(box);
        box.name = "Box";
        box.visible = false;

        //Timeline
        //See if score has loaded and set canvas height accordingly
        //let scoreElem = document.getElementById("score");
        this.setCanvasSize();
    }

    setCanvasSize() {
        //DEBUG
        //console.log("Height =",height, "Width =", width);
        let container = $("#timeLineContainer");
        let width = container.width();
        let height = container.height();

        //Create canvas
        let canvas = document.createElement("canvas");
        canvas.id = "timeLine";
        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
        container.append(canvas);

        //Create score
        let score = document.createElement("img");
        score.id = "scoreImage";
        score.src = "images/drumScore1.jpg";
        $('#scoreContainer').append(score);

        let secondsPerBar = 4;
        let startOffset = 0.13, endOffset = 0.975;
        let moveScale = (endOffset - startOffset) * width;
        moveScale /= secondsPerBar;

        let timeLineProps = {
            start: width*startOffset,
            moveScale: moveScale,
            yPos: 10,
            width: 5,
            height: height*0.9
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
        //DEBUG
        //console.log("Duration = ", duration);
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
        this.notesThisBar = this.currentScore[this.currentBar].length;
        this.playing = false;
        this.playingTime = 0;
        $('#play').attr("src", "images/play-button.png");
        this.resetTimeLine();
    }

    getNextTime() {
        //Get next note at current time index
        let bar = this.currentScore[this.currentBar];
        return bar[this.currentNote].time;
    }

    getNextNotes() {
        let notes = [];
        let bar = this.currentScore[this.currentBar], i;
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
                this.notesThisBar = this.currentScore[this.currentBar].length;
                //Bit of a hack as need to know length of note before starting next bar
                this.playingTime = 0;
            }
        }
    }

    createGUI() {
        //Create GUI - controlKit
        let drumConfig = {
            xPos: 0,
            yPos: 0,
            zPos: 0,
            posRange : [-50, 50]
        };

        let controlKit = new ControlKit();

        controlKit.addPanel( {width: 250, align: 'left'} )
            .addGroup( {label: 'Position', enable: false} )
            .addSlider(drumConfig, 'xPos', 'posRange', { label: 'XPos', dp: 1, step: 0.1, onChange: () => {
                this.changeBoxPos(X_AXIS, drumConfig.xPos);
            }})
            .addSlider(drumConfig, 'yPos', 'posRange', { label: 'YPos', dp: 1, step: 0.1, onChange: () => {
                this.changeBoxPos(Y_AXIS, drumConfig.yPos);
            }})
            .addSlider(drumConfig, 'zPos', 'posRange', { label: 'ZPos', dp: 1, step: 0.1, onChange: () => {
                this.changeBoxPos(Z_AXIS, drumConfig.zPos);
            }})
    }

    changeBoxPos(axis, pos) {
        //Move box around scene
        let box = this.scenes[this.currentScene].getObjectByName("Box", true);
        if(!box) {
            console.log("No box in scene");
        }

        switch(axis) {
            case X_AXIS:
                //X-axis
                box.position.x = pos;
                break;

            case Y_AXIS:
                //Y-axis
                box.position.y = pos;
                break;

            case Z_AXIS:
                //Z-axis
                box.position.z = pos;
                break;

            default:
                break;
        }
    }

    update() {
        super.update();
        let delta = this.clock.getDelta();
        this.elapsedTime += delta;

        if(this.playing && soundManager.soundsLoaded() && !this.trackCompleted) {
            this.playingTime += delta;
            //DEBUG
            //console.log("Playing time =", this.playingTime);

            //Update timeline
            let duration = soundManager.getDuration();
            let moveScaleAdjust = 1/duration;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillRect(this.timeLineProps.start + (this.playingTime * this.timeLineProps.moveScale * moveScaleAdjust), this.timeLineProps.yPos,
                this.timeLineProps.width, this.timeLineProps.height);

            let nextTime = this.getNextTime(), i;
            if(this.playingTime >= (nextTime * duration)) {
                //Get all notes playing at this time
                let notes = this.getNextNotes();
                let currentNote;
                for(i=0; i<notes.length; ++i) {
                    currentNote = notes[i];
                    soundManager.playSound(currentNote);
                    if(currentNote >= 0) {
                        this.hitMeshes[currentNote].visible = true;
                        this.hitMeshes[currentNote].hitStart = this.playingTime;
                    }
                }
                this.updateNoteIndex(notes.length);
            }

            let numHitMeshes = this.hitMeshes.length, currentHitMesh;
            for(i=0; i<numHitMeshes; ++i) {
                currentHitMesh = this.hitMeshes[i];
                if(currentHitMesh.hitStart >= 0) {
                    if(this.playingTime > (currentHitMesh.hitStart + currentHitMesh.hitTime)) {
                        currentHitMesh.visible = false;
                        currentHitMesh.hitStart = -1;
                    }
                }
            }
        }
    }

    changeScore(option) {
        $('#scoreNum').html(option);
        $('#scoreImage').attr("src", "images/drumScore"+option+".jpg");
        //Doo this properly later
        switch (option) {
            case "1":
                this.currentScore = score0;
                break;

            case "2":
                this.currentScore = score1;
                break;

            case "3":
                this.currentScore = score2;
                break;

            default:
                break;
        }
        this.resetScore();
    }

    canvasResize() {
        let container = $("#timeLineContainer");
        let width = container.width();
        let height = container.height();
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
        this.ctx.fillStyle = "#ff0000";
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillRect(this.timeLineProps.start, this.timeLineProps.yPos,
            this.timeLineProps.width, this.timeLineProps.height);
    }

    windowResize(event) {
        //Handle window resize
        super.windowResize(event);
        this.canvasResize();
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

    $(".dial").knob({
        "change": value => {
            app.setDuration(value);
        },
        "release": value => {
            app.setDuration(value);
        }
    });

    $('#track').on("change", function() {
        app.changeScore(this.value);
    });

    app.run();
});
