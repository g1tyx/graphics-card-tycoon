class TextureSheet {
    constructor(textureSheetImage, spriteSize) {
        this.sheetImage = textureSheetImage;
        this.spriteSize = spriteSize;
        this.spriteDefs = new Map();
    }
    defineSprite(name, xIndex, yIndex, width, height) {
        this.spriteDefs.set(name, {
            x: xIndex * this.spriteSize,
            y: yIndex * this.spriteSize,
            width: width * this.spriteSize,
            height: height * this.spriteSize
        })
    };
    drawSprite(name, ctx, x, y, w, h) {
        var sDef = this.spriteDefs.get(name);
        if (sDef != null) {
            ctx.drawImage(
                this.sheetImage,
                sDef.x,
                sDef.y,
                sDef.width,
                sDef.height,
                x,
                y,
                w,
                h
            )
        }
    }

    static defineLand(texSheet) {
        texSheet.defineSprite("Grass", 0, 2, 1, 1);
        texSheet.defineSprite("Flower", 1, 1, 1, 1);
        texSheet.defineSprite("Rock", 3, 2, 1, 1);


        texSheet.defineSprite("SB", 6, 1, 1, 1); //Shore Bottom
        texSheet.defineSprite("SL", 7, 2, 1, 1); //Shore Left
        texSheet.defineSprite("ST", 6, 3, 1, 1); //Shore Top
        texSheet.defineSprite("SR", 5, 2, 1, 1); //Shore Right

        texSheet.defineSprite("SITL", 5, 1, 1, 1); //Shore Inner Top Left
        texSheet.defineSprite("SITR", 7, 1, 1, 1); //Shore Inner Top Right
        texSheet.defineSprite("SIBR", 7, 3, 1, 1); //Shore Inner Bottom Right
        texSheet.defineSprite("SIBL", 5, 3, 1, 1); //Shore Inner Bottom Left


        texSheet.defineSprite("SOTL", 1, 3, 1, 1); //Shore Outer Top Left
        texSheet.defineSprite("SOTR", 2, 3, 1, 1); //Shore Outer Top Right
        texSheet.defineSprite("SOBR", 2, 4, 1, 1); //Shore Outer Bottom Right
        texSheet.defineSprite("SOBL", 1, 4, 1, 1); //Shore Outer Bottom Left

        texSheet.defineSprite("RV", 0, 8, 1, 1); //River Vertical
        texSheet.defineSprite("RS", 1, 8, 1, 1); //River Sideways
        texSheet.defineSprite("RI", 6, 8, 1, 1); //River Inlet
        texSheet.defineSprite("RO", 7, 9, 1, 1); //River Outlet
        texSheet.defineSprite("RTR", 2, 9, 1, 1); //River Turn Right

        texSheet.defineSprite("HTL", 5, 5, 1, 1); //Hill Top Left
        texSheet.defineSprite("HT", 6, 5, 1, 1); //Hill Top
        texSheet.defineSprite("HTR", 7, 5, 1, 1); //Hill Top Right

        texSheet.defineSprite("HR", 7, 6, 1, 1); //Hill Right

        texSheet.defineSprite("HBL", 7, 7, 1, 1); //Hill Bottom Left
        texSheet.defineSprite("HB", 6, 7, 1, 1); //Hill Bottom
        texSheet.defineSprite("HBR", 5, 7, 1, 1); //Hill Bottom Right

        texSheet.defineSprite("HL", 5, 6, 1, 1); //Hill Left

        texSheet.defineSprite("Ocean0", 6, 2, 1, 1);
        texSheet.defineSprite("Ocean1", 7, 4, 1, 1);
    }

    static defineTM(texSheet) {
        texSheet.defineSprite("Tree", 1, 1, 1, 1);
        texSheet.defineSprite("Rock", 1, 10, 1, 1);
    }

    static defineFourFrameAnimation(texSheet) {
        texSheet.defineSprite("0", 0, 0, 1, 1);
        texSheet.defineSprite("1", 1, 0, 1, 1);
        texSheet.defineSprite("2", 2, 0, 1, 1);
        texSheet.defineSprite("3", 3, 0, 1, 1);
    }

}