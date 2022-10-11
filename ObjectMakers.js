class Makers {
    static makeButton(x, y, width, height, text, visable, normalStyle, hoverStyle, textStyle, onClick) {
        return { type: "BUTTON", x, y, width, height, text, normalStyle, hoverStyle, textStyle, onClick, visable, hover: false };
    }

    static makeLabel(x, y, width, height, visable, style, textStyle, textFunc) {
        return { type: "LABEL", x, y, width, height, visable, style, textStyle, textFunc };
    }

    static makeImgLabel(x, y, width, height, visable, anim, textStyle, textFunc) {
        return { type: "LABEL", x, y, width, height, visable, anim, textStyle, textFunc };
    }

    static makeAnimation(imgSource, sourceType, frames, rate) {
        return { imgSource, sourceType, frames, rate, currentFrame: 0, lastFrameTime: 0 }
    }

    static makeUIImage(x, y, width, height, anim, visable) {
        return { type: "IMAGE", x, y, width, height, anim, visable };
    }

    static makeImageButton(x, y, width, height, anim, visable, onHover, onClick) {
        return { type: "IMAGE", x, y, width, height, anim, visable, onHover, onClick };
    }

    static makeTile(x, y, tileSize, anim, num, obstacle) {
        return { type: "TILE", x: x * tileSize, y: y * tileSize, width: tileSize, height: tileSize, anim, num, tileX: x, tileY: y, obstacle, building: null, hasBuilding: false, highlight: false };
    }

    static makeIndicator(text, x, y, vx, vy, col, lifetime) {
        return { type: "INDIC", x, y, vx, vy, text, col, lifetime };
    }

    static makeBuilding(type) {
        switch (type) {
            case "PFMK1":
                var anim = Makers.makeAnimation("PFMK1", "SHEET", ["0", "1", "2", "3"], 5);
                return { type, output: 1, cost: 10, restock: 2, anim, speed: 1, counter: 0, active: false };
            case "PFMK2":
                var anim = Makers.makeAnimation("PFMK2", "SHEET", ["0", "1", "2", "3"], 3);
                return { type, output: 100, cost: 500, restock: 25, anim, speed: 2, counter: 0, active: false };
            case "PFMK3":
                var anim = Makers.makeAnimation("PFMK3", "SHEET", ["0", "1", "2", "3"], 1);
                return { type, output: 1000, cost: 50000, restock: 250, anim, speed: 4, counter: 0, active: false };
            case "GCFMK1":
                var anim = Makers.makeAnimation("GCFMK1", "SHEET", ["0", "1", "2", "3"], 5);
                return { type, output: 1, cost: 10, stock: 0, required: 3, anim, speed: 1, counter: 0, active: false };
            case "GCFMK2":
                var anim = Makers.makeAnimation("GCFMK2", "SHEET", ["0", "1", "2", "3"], 3);
                return { type, output: 200, cost: 1000, stock: 0, required: 400, anim, speed: 2, counter: 0, active: false };
            case "GCFMK3":
                var anim = Makers.makeAnimation("GCFMK3", "SHEET", ["0", "1", "2", "3"], 1);
                return { type, output: 4000, cost: 500000, stock: 0, required: 4000, anim, speed: 4, counter: 0, active: false };
            case "MMK1":
                var anim = Makers.makeAnimation("MMK1", "SHEET", ["0"], 0);
                return { type, output: 1, cost: 50, anim, speed: 5, multi: 2, counter: 0, active: false };
            case "MMK2":
                var anim = Makers.makeAnimation("MMK2", "SHEET", ["0"], 0);
                return { type, output: 1, cost: 5000, anim, speed: 25, multi: 10, counter: 0, active: false };
            case "MMK3":
                var anim = Makers.makeAnimation("MMK3", "SHEET", ["0"], 0);
                return { type, output: 1, cost: 1000000, anim, speed: 50, multi: 50, counter: 0, active: false };
        }
    }

    static makeMap() {
        var mapDef = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 10, 2, 2, 11, 0, 0, 0, 10, 2, 2, 2, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 11, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 10, 8, 1, 1, 9, 2, 11, 10, 8, 1, 1, 1, 9, 2, 2, 2, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 8, 1, 9, 2, 11, 0, 0, 0],
            [0, 0, 10, 2, 2, 11, 5, 1, 1, 1, 1, 1, 9, 8, 1, 1, 1, 1, 1, 1, 1, 1, 9, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 9, 2, 11, 0],
            [0, 10, 8, 1, 1, 9, 8, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 11, 0, 0, 0, 0, 0, 0, 0, 0, 10, 8, 1, 1, 1, 1, 1, 1, 1, 3, 0],
            [0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 10, 8, 1, 1, 1, 6, 4, 4, 7, 1, 9, 11],
            [0, 13, 7, 1, 1, 21, 22, 22, 22, 22, 22, 22, 23, 1, 1, 15, 1, 1, 1, 1, 14, 1, 1, 1, 9, 11, 0, 0, 0, 0, 10, 2, 8, 1, 1, 1, 1, 3, 0, 0, 5, 1, 1, 3],
            [0, 0, 13, 7, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 11, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 3, 0, 0, 5, 1, 1, 3],
            [0, 0, 0, 5, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 11, 0, 10, 8, 1, 1, 1, 1, 1, 1, 9, 18, 2, 8, 1, 1, 3],
            [0, 0, 0, 5, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 11, 5, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 1, 3],
            [0, 0, 0, 5, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 1, 6, 12],
            [0, 0, 10, 8, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 9, 8, 1, 1, 1, 1, 14, 1, 1, 1, 16, 1, 1, 6, 12, 0],
            [0, 0, 5, 1, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 3, 0, 0],
            [0, 0, 5, 1, 1, 28, 1, 1, 1, 1, 1, 1, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 9, 11, 0],
            [0, 0, 5, 1, 1, 25, 26, 26, 26, 26, 26, 26, 27, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 17, 17, 17, 20, 0],
            [0, 0, 5, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
            [0, 0, 5, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 3, 0],
            [0, 10, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 12, 0],
            [0, 5, 1, 1, 1, 1, 1, 1, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 12, 0, 0],
            [0, 5, 1, 1, 1, 1, 1, 6, 12, 13, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 4, 4, 4, 4, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0],
            [0, 13, 7, 1, 1, 1, 1, 3, 0, 0, 5, 1, 1, 1, 1, 15, 1, 1, 1, 1, 3, 0, 0, 0, 0, 13, 4, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 12, 0, 0, 0],
            [0, 0, 5, 1, 1, 6, 4, 12, 0, 0, 13, 7, 1, 1, 1, 1, 1, 1, 1, 6, 12, 0, 0, 0, 0, 0, 0, 13, 4, 7, 1, 1, 1, 1, 1, 1, 1, 6, 4, 12, 0, 0, 0, 0],
            [0, 0, 13, 4, 4, 12, 0, 0, 0, 0, 0, 13, 7, 1, 1, 6, 4, 4, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 7, 1, 1, 1, 6, 4, 4, 12, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 4, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 4, 4, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        var tileSize = Math.floor(bufferCanvas.width / mapDef[0].length);

        var tileObjects = [];
        var x = 0;
        var y = 0;
        mapDef.forEach(row => {
            row.forEach(tile => {
                var anim;
                switch (tile) {
                    case 0:
                        if (Math.random() > 0.2 || y < 4) {
                            anim = Makers.makeAnimation("Land", "SHEET", ["Ocean0"], 0);
                        } else {
                            anim = Makers.makeAnimation("Land", "SHEET", Math.random() > 0.5 ? ["Ocean0", "Ocean1"] : ["Ocean1", "Ocean0"], 50);
                        }

                        break;
                    case 1:
                        anim = Makers.makeAnimation("Land", "SHEET", ["Grass"], 0);
                        break;
                        //Shore Middles
                    case 2:
                        anim = Makers.makeAnimation("Land", "SHEET", ["ST"], 0);
                        break;
                    case 3:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SR"], 0);
                        break;
                    case 4:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SB"], 0);
                        break;
                    case 5:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SL"], 0);
                        break;
                        //Shore Inners
                    case 6:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SITL"], 0);
                        break;
                    case 7:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SITR"], 0);
                        break;
                    case 8:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SIBR"], 0);
                        break;
                    case 9:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SIBL"], 0);
                        break;
                        //Shore Outers
                    case 10:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SOTL"], 0);
                        break;
                    case 11:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SOTR"], 0);
                        break;
                    case 12:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SOBR"], 0);
                        break;
                    case 13:
                        anim = Makers.makeAnimation("Land", "SHEET", ["SOBL"], 0);
                        break;
                        //Objects
                    case 14:
                        anim = Makers.makeAnimation("Land", "SHEET", ["Flower"], 0);
                        break;
                    case 15:
                        anim = Makers.makeAnimation("Land", "SHEET", ["Rock"], 0);
                        break;
                        //River
                    case 16:
                        anim = Makers.makeAnimation("Land", "SHEET", ["RV"], 0);
                        break;
                    case 17:
                        anim = Makers.makeAnimation("Land", "SHEET", ["RS"], 0);
                        break;
                    case 18:
                        anim = Makers.makeAnimation("Land", "SHEET", ["RI"], 0);
                        break;
                    case 19:
                        anim = Makers.makeAnimation("Land", "SHEET", ["RTR"], 0);
                        break;
                    case 20:
                        anim = Makers.makeAnimation("Land", "SHEET", ["RO"], 0);
                        break;
                        //Hill
                    case 21:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HTL"], 0);
                        break;
                    case 22:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HT"], 0);
                        break;
                    case 23:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HTR"], 0);
                        break;
                    case 24:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HR"], 0);
                        break;
                    case 25:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HBR"], 0);
                        break;
                    case 26:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HB"], 0);
                        break;
                    case 27:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HBL"], 0);
                        break;
                    case 28:
                        anim = Makers.makeAnimation("Land", "SHEET", ["HL"], 0);
                        break;
                }
                if ((x < 13 || x > 28) && tile == 1) {
                    if (Math.random() > 0.8) {
                        tileObjects.push(Makers.makeTile(x, y, tileSize, anim, tile, "ROCK"));
                    } else {
                        tileObjects.push(Makers.makeTile(x, y, tileSize, anim, tile, "TREE"));
                    }

                } else if ((x < 15 || x > 25) && tile == 1 && Math.random() > 0.5) {
                    if (Math.random() > 0.8) {
                        tileObjects.push(Makers.makeTile(x, y, tileSize, anim, tile, "ROCK"));
                    } else {
                        tileObjects.push(Makers.makeTile(x, y, tileSize, anim, tile, "TREE"));
                    }

                } else {
                    var tile = Makers.makeTile(x, y, tileSize, anim, tile, "NONE");
                    if (x == 19 && y == 12) {
                        tile.hasBuilding = true;
                        tile.building = Makers.makeBuilding("PFMK1");
                    } else if (x == 19 && y == 11) {
                        tile.hasBuilding = true;
                        tile.building = Makers.makeBuilding("GCFMK1");
                    }
                    tileObjects.push(tile);
                }

                x += 1;
            });
            x = 0;
            y += 1;
        });

        return tileObjects;
    }

}