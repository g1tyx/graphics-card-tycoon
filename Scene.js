class Scene {
    constructor(name) {
        this.UIElements = [];
        this.gameobjects = [];
        this.rootQuadNode;
        this.data;
        this.name = name;
    }

    static Menu() {
        var s = new Scene("MENU");
        s.UIElements.push(Makers.makeButton(0.4, 0.45, 0.2, 0.1, "Play", true,
            (ctx) => {
                ctx.fillStyle = "#00FF00";
                ctx.strokeStyle = "#00F000";
            },
            (ctx) => {
                ctx.fillStyle = "#00F000";
                ctx.strokeStyle = "#005000";
                ctx.lineWidth = Math.floor(cHeight * 0.01);
            },
            (ctx) => {
                ctx.font = Math.floor(cHeight * 0.05) + "px Georgia";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
            },
            (s) => {
                s.data.playFlag = true;
            }));
        s.data = {
            playFlag: false
        }
        return s;
    }

    static Game() {
        var s = new Scene("GAME");
        s.gameobjects = s.gameobjects.concat(Makers.makeMap());


        /*0*/
        s.UIElements.push(Makers.makeUIImage(0.55, 0.008, 0.08, 0.08 * 0.5 * 1.77, Makers.makeAnimation("", "", ["GraphicsCardIcon"], 0), false));
        /*1*/
        s.UIElements.push(Makers.makeLabel(0.58, 0, 0.11, 0.1, false, (ctx) => {
            //Background Rect Style
            ctx.fillStyle = "#00000000";
            ctx.strokeStyle = "#00000000";
        }, (ctx) => {
            //Text Style
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '40px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }, (scene) => {
            //What text to display given a scene state
            return numToDisplayString(Math.floor(scene.data.graphicsCardsDisplay));
        }));

        //This label always has to be the third item added to acount for the flashing red animation
        /*2*/
        s.UIElements.push(Makers.makeLabel(0.8, 0, 0.11, 0.1, false, (ctx) => {
            //Background Rect Style
            ctx.fillStyle = "#00000000";
            ctx.strokeStyle = "#00000000";
        }, (ctx) => {
            //Text Style
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '40px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }, (scene) => {
            //What text to display given a scene state
            return "$" + numToDisplayString(Math.floor(scene.data.playerCashDisplay));
        }));

        /*3*/
        s.UIElements.push(Makers.makeButton(0.75, 0.02, 0.1, 0.05, "出售", false,
            (ctx) => {
                ctx.fillStyle = "#00FF00";
                ctx.strokeStyle = "#001000";
                ctx.lineWidth = Math.floor(cHeight * 0.001);
            },
            (ctx) => {
                ctx.fillStyle = "#00FF00";
                ctx.strokeStyle = "#001000";
                ctx.lineWidth = Math.floor(cHeight * 0.005);
            },
            (ctx) => {
                ctx.font = Math.floor(cHeight * 0.04) + "px Georgia";
                ctx.fillStyle = "#004400";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
            },
            (scene) => {
                if (scene.data.graphicsCards > 0) {
                    scene.data.graphicsCards -= 1;
                    scene.data.playerCash += scene.data.cardPrice;
                    sounds.playSound("Coin");
                } else {
                    sounds.playSound("Nope");
                }
            }));

        /*4*/
        s.UIElements.push(Makers.makeButton(0.12, 0.03, 0.03, 0.03 * 1.77, "→", false,
            (ctx) => {
                ctx.fillStyle = "#00000000";
                ctx.strokeStyle = "#00000000";
            },
            (ctx) => {
                ctx.fillStyle = "#00000011";
                ctx.strokeStyle = "#00000000";
            },
            (ctx) => {
                ctx.font = Math.floor(cHeight * 0.07) + "px Georgia";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
            },
            (scene) => {
                scene.data.placeObject = scene.data.placeObject == scene.data.objectOptions.length - 1 ? 0 : scene.data.placeObject + 1;
                sounds.playSound("Blip1");
            }));
        /*5*/
        s.UIElements.push(Makers.makeButton(0.02, 0.03, 0.03, 0.03 * 1.77, "←", false,
            (ctx) => {
                ctx.fillStyle = "#00000000";
                ctx.strokeStyle = "#00000000";
            },
            (ctx) => {
                ctx.fillStyle = "#00000011";
                ctx.strokeStyle = "#00000000";
            },
            (ctx) => {
                ctx.font = Math.floor(cHeight * 0.07) + "px Georgia";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
            },
            (scene) => {
                scene.data.placeObject = scene.data.placeObject == 0 ? scene.data.objectOptions.length - 1 : scene.data.placeObject - 1;
                sounds.playSound("Blip1");
            }));
        /*6*/
        s.UIElements.push(Makers.makeLabel(0.05, 0, 0.2, 0.05, false, (ctx) => {
            ctx.fillStyle = "#00000000";
            ctx.strokeStyle = "#00000000";
        }, (ctx) => {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '15px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }, (scene) => {
            var options = ["PFMK1", "PFMK2", "PFMK3", "GCFMK1", "GCFMK2", "GCFMK3", "MMK1", "MMK2", "MMK3"]
            var names = ["Processor Factory Mk1",
                "Processor Factory Mk2",
                "Processor Factory Mk3",
                "Graphics Card Fabricator Mk1",
                "Graphics Card Fabricator Mk2",
                "Graphics Card Fabricator Mk3",
                "Market Mk1",
                "Market Mk2",
                "Market Mk3"
            ]
            return names[options.indexOf(scene.data.objectOptions[scene.data.placeObject])];
        }));
        /*7*/
        s.UIElements.push(Makers.makeLabel(-0.05, 0.03, 0.4, 0.05, false, (ctx) => {
            ctx.fillStyle = "#00000000";
            ctx.strokeStyle = "#00000000";
        }, (ctx) => {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '18px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }, (scene) => {
            var obj = Makers.makeBuilding(scene.data.objectOptions[scene.data.placeObject]);
            if (obj.type.includes("PFMK")) {
                return "Output-per-side: " + numToDisplayString(obj.output) + " 速度: " + obj.speed + " 补货: $" + numToDisplayString(obj.restock) + " 建造: $" + numToDisplayString(obj.cost);
            } else if (obj.type.includes("GCFMK")) {
                return "输出: " + numToDisplayString(obj.output) + " 速度: " + obj.speed + " 每张显卡处理器数: " + numToDisplayString(obj.required) + " 建造: $" + numToDisplayString(obj.cost);
            } else if (obj.type.includes("MMK")) {
                return "出售率: " + obj.speed + " 价格乘数: " + obj.multi + " 建造: $" + numToDisplayString(obj.cost);
            }

        }));
        /*8*/
        s.UIElements.push(Makers.makeLabel(0.23, 0.08, 0.4, 0.05, false, (ctx) => {
            ctx.fillStyle = "#00000000";
            ctx.strokeStyle = "#00000000";
        }, (ctx) => {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '18px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }, (scene) => {
            if (scene.data.tasks.length > 0) {
                var task = scene.data.tasks[0];
                return "Task: For $" + numToDisplayString(task.reward) + ", " + task.text;
            }
            return "All Tasks Completed.";
        }));
        //This image has to be in this location in the array
        /*9*/
        s.UIElements.push(Makers.makeUIImage(0, 0, 1, 1, Makers.makeAnimation("", "", ["Help"], 0), false));
        /*10ish -- Gets removed on click*/
        s.UIElements.push(Makers.makeButton(0.4, 0.4, 0.2, 0.07 * 1.77, "开始", true,
            (ctx) => {
                ctx.fillStyle = "#33cc33";
                ctx.strokeStyle = "#003300";
            },
            (ctx) => {
                ctx.fillStyle = "#1f7a1f";
                ctx.strokeStyle = "#003300";
            },
            (ctx) => {
                ctx.font = "30px Georgia";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
            },
            (scene) => {
                scene.data.start = false;
                //Remove this button and title image
                scene.UIElements.pop();
                scene.UIElements.pop();
                scene.data.showHelp = true;
                scene.UIElements.forEach(u => u.visable = true);
                sounds.playSound("Blip1");
            }));
        s.UIElements.push(Makers.makeUIImage(0.3, 0.02, 0.4, 0.2 * 1.77, Makers.makeAnimation("", "", ["Title"], 0), true));

        s.data = {
            graphicsCards: 0,
            graphicsCardsDisplay: 0,
            playerCash: 8,
            playerCashDisplay: 0,
            flashRedCounter: 0,
            placeMode: false,
            placeObject: 0,
            objectOptions: ["PFMK1", "PFMK2", "PFMK3", "GCFMK1", "GCFMK2", "GCFMK3", "MMK1", "MMK2", "MMK3"],
            removeMode: false,
            cardPrice: 10,
            tasks: [
                { id: 0, text: "Fabricate A Graphics Card.", reward: 20 },
                { id: 1, text: "Build 3 More Graphics Card Fabricators Mk1s.", reward: 30 },
                { id: 2, text: "Build 4 More Processor Factory Mk1s.", reward: 40 },
                { id: 3, text: "Build A Market Mk1.", reward: 50 },
                { id: 4, text: "Construct A Processor Factory Mk2.", reward: 500 },
                { id: 5, text: "Construct 4 Graphics Card Fabricators Mk2.", reward: 4000 },
                { id: 6, text: "Build A Market Mk2.", reward: 5000 },
                { id: 7, text: "Construct A Processor Factory Mk3.", reward: 50000 },
                { id: 8, text: "Construct 4 Graphics Card Fabricators Mk3.", reward: 500000 * 4 },
                { id: 9, text: "Earn $1.00M", reward: 3000000 },
                { id: 10, text: "Build A Market Mk3.", reward: 5000000 },
                { id: 11, text: "Earn $1.00B", reward: 1000000000 }
            ],
            showHelp: false,
            start: true
        }
        return s;
    }
}