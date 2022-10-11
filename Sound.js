class Sound {
    constructor(soundMap) {
        this.soundMap = soundMap;
        this.isActive = true;
    }
    static new() {
        return new Sound(new Map());
    }
    addSound(name, soundArr) {
        this.soundMap.set(name, soundArr);
    }
    playSound(name) {
        var soundArr = this.soundMap.get(name);
        if (soundArr != null && this.isActive) {
            zzfx(...soundArr).start();
        }
    }
    defineSounds() {
        this.addSound("test", [1.04, , 235, .02, .04, .05, 3, 1.07, -6.4, .6, , , , , , .1, , .84, , .22]);
        this.addSound("Coin", [1.09, , 1626, , .05, .26, 1, .62, , , 257, .04, , , , , , .91]);
        //this.addSound("Blip1", [, , 764, .04, .05, 0, 1, .24, , , -643, , .08, , , , , , .05]);
        this.addSound("Blip1", [, 0, , .01, .01, .03, , 1.77, , , , , , , , , , , .03]);
        this.addSound("Blip2", [2, , 6, .01, , .01, 2, 1.68, 10, , , , , , , , .02, , .01]);
        this.addSound("Nope", [2.21, 0, 273, , .05, .3, 2, 1.69, -3.1, , , , .02, .9, , .5, .01, .51, .03]);
        this.addSound("Place", [2.04, , 183, , .02, .03, 1, .71, -1.9, , , , , , , .2, , .69, .05, .28]);
        this.addSound("Remove", [1.2, 0, 410, , , 0, 1, 2.44, -0.1, , , , , .1, , .5, , .64, .07]);
        this.addSound("Complete", [1.65, , 433, .04, , .23, 1, 1.23, .1, , 74, .09, , , , , .06, .65, .08]);
    }
}