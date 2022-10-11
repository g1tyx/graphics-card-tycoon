//Get canvas from document, resize to 16:9 ratio;
var screenCanvas = document.getElementById("canvas");
screenCanvas.width = window.innerWidth * 0.9;
screenCanvas.height = Math.floor(canvas.width * (9 / 16));
var screenCtx = canvas.getContext('2d');
screenCtx.imageSmoothingEnabled = false;
var boundingRect = screenCanvas.getBoundingClientRect();

var bufferCanvas = document.createElement("CANVAS");
bufferCanvas.width = 1280;
bufferCanvas.height = 720;
var cWidth = bufferCanvas.width;
var cHeight = bufferCanvas.height;
var bufferCtx = bufferCanvas.getContext('2d');
bufferCtx.imageSmoothingEnabled = false;

var textures = new Map();
var spritesheets = new Map();
Array.from(document.images).forEach(i => {
    if (i.src.includes("Sheets")) {
        var texSheet = new TextureSheet(i, 16);
        switch (i.id) {
            case "Land":
                TextureSheet.defineLand(texSheet);
                break;
            case "TM":
                TextureSheet.defineTM(texSheet);
                break;
            default:
                if (i.id.includes("FMK")) {
                    texSheet = new TextureSheet(i, 32);
                    TextureSheet.defineFourFrameAnimation(texSheet);
                } else if (i.id.includes("MMK")) {
                    texSheet = new TextureSheet(i, 32);
                    texSheet.defineSprite("0", 0, 0, 1, 1);
                }
                break;
        }
        spritesheets.set(i.id, texSheet);
    } else {
        textures.set(i.id, i);
    }
});

var isMouseDown = false;
var prevMouseDown = false;
var mPos = { x: 0, y: 0 };
document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});
document.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (e) => {
    var x = (e.clientX - boundingRect.left) / (boundingRect.right - boundingRect.left);
    var y = (e.clientY - boundingRect.top) / (boundingRect.bottom - boundingRect.top);
    if (x > 0 && x < boundingRect.width && y > 0 && y < boundingRect.height) {
        mPos = { x: x, y: y };
    }
});

var inputs = Input.new();
inputs.attachInput("MUTE", 'm');
inputs.attachInput("HELP", 'h');
inputs.attachInput("BUILD", 'b');
inputs.attachInput("REMOVE", 'r');
inputs.attachInput("Esc", 'Escape');
document.addEventListener('keydown', (e) => {
    inputs.update(e.key, true);
});
document.addEventListener('keyup', (e) => {
    inputs.update(e.key, false);
});

var sounds = Sound.new();
sounds.defineSounds();

var frameCounter = 0;

var scene = Scene.Game();

let mySongData = zzfxM(...bgMusic);
let myAudioNode = zzfxP(...mySongData);
myAudioNode.loop = true;
myAudioNode.start();
var music = true;

function nextFrame() {

    bufferCtx.clearRect(0, 0, cWidth, cHeight);
    switch (scene.name) {
        case "GAME":
            SceneUpdator.gameUpdator(scene);
            SceneRender.render(scene, bufferCtx);
            bufferCtx.font = "18px serif";
            bufferCtx.fillStyle = "#000000";
            bufferCtx.textAlign = "center";
            bufferCtx.fillText("切换 M:", 0.945 * cWidth, 0.92 * cHeight);
            bufferCtx.font = "22px serif";
            bufferCtx.fillText(sounds.isActive ? "🔊" : "🔈", 0.925 * cWidth, 0.95 * cHeight);
            bufferCtx.fillText(music ? "🎵" : "𝄺", 0.965 * cWidth, 0.95 * cHeight);
            if (inputs.currentKeyStates.includes("MUTE") && !inputs.previousKeyStates.includes("MUTE")) {
                if (music && sounds.isActive) {
                    sounds.isActive = !sounds.isActive;
                } else if (music && !sounds.isActive) {
                    music = !music;
                    myAudioNode.disconnect();
                } else if (!music && !sounds.isActive) {
                    sounds.isActive = !sounds.isActive;
                } else if (!music && sounds.isActive) {
                    music = !music;
                    var g = zzfxX.createGain();
                    g.gain.setValueAtTime(-0.3, zzfxX.currentTime);
                    g.connect(zzfxX.destination);
                    myAudioNode.connect(g);
                    myAudioNode.connect(zzfxX.destination);
                }
            }
            break;
    }

    screenCtx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    screenCtx.drawImage(bufferCanvas, 0, 0, cWidth, cHeight, 0, 0, screenCanvas.width, screenCanvas.height);
    //End of frame housekeeping;
    inputs.updateKeyStates();
    prevMouseDown = isMouseDown;
    frameCounter += 1;
}



var loadedImages = false;
var loadChecker;
loadChecker = setInterval(() => {

    if (loadedImages) {

        clearInterval(loadChecker);
        setInterval(() => nextFrame(), 50);

    } else {
        loadedImages = true;
        Array.from(textures.keys()).forEach(i => {
            if (!textures.get(i).complete) {
                loadedImages = false;
            }
        })
    }

}, 50);

function windowResize() {
    screenCanvas.width = window.innerWidth * 0.9;
    screenCanvas.height = Math.floor(canvas.width * (9 / 16));
    boundingRect = screenCanvas.getBoundingClientRect();
    screenCtx.imageSmoothingEnabled = false;
};

window.addEventListener('resize', windowResize);