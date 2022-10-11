class SceneUpdator {

    static gameUpdator(scene) {

        if (!scene.data.showHelp && !scene.data.start) {



            if (inputs.currentKeyStates.includes("BUILD") && !inputs.previousKeyStates.includes("BUILD")) {
                scene.data.placeMode = !scene.data.placeMode;
                scene.data.removeMode = false;
            }
            if (inputs.currentKeyStates.includes("REMOVE") && !inputs.previousKeyStates.includes("REMOVE")) {
                scene.data.removeMode = !scene.data.removeMode;
                scene.data.placeMode = false;
            }



            scene.gameobjects.sort(renderOrderCompare).forEach(o => {

                switch (o.type) {
                    case "TILE":
                        //Handle highlighting, placing and removing
                        if ([1, 14, 15].includes(o.num)) {
                            if (scene.data.placeMode) {
                                if (!o.hasBuilding && o.obstacle == "NONE") {
                                    o.highlight = o.x < (mPos.x * cWidth) &&
                                        o.y < (mPos.y * cHeight) &&
                                        (o.x + o.width) > (mPos.x * cWidth) &&
                                        (o.y + o.height) > (mPos.y * cHeight);
                                    if (isMouseDown && o.highlight) {
                                        var building = Makers.makeBuilding(scene.data.objectOptions[scene.data.placeObject]);
                                        if (scene.data.playerCash >= building.cost) {
                                            o.hasBuilding = true;
                                            o.building = building;
                                            scene.data.playerCash -= building.cost;
                                            scene.gameobjects.push(Makers.makeIndicator("-$" + numToDisplayString(building.cost), mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#EE0000", 10));
                                            sounds.playSound("Place");
                                        } else {
                                            scene.data.flashRedCounter = 60;
                                            sounds.playSound("Nope");
                                        }

                                    }
                                } else {
                                    o.highlight = false;
                                }
                            } else if (scene.data.removeMode) {
                                if (o.hasBuilding || o.obstacle != "NONE") {
                                    o.highlight = o.x < (mPos.x * cWidth) &&
                                        o.y < (mPos.y * cHeight) &&
                                        (o.x + o.width) > (mPos.x * cWidth) &&
                                        (o.y + o.height) > (mPos.y * cHeight);
                                    if (isMouseDown && o.highlight) {
                                        if (o.hasBuilding) {
                                            scene.data.playerCash += o.building.cost;
                                            scene.gameobjects.push(Makers.makeIndicator("+$" + numToDisplayString(o.building.cost), mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#00EE00", 10));
                                            o.hasBuilding = false;
                                            o.building = null;
                                            sounds.playSound("Coin");
                                        } else if (o.obstacle == "TREE") {
                                            if (scene.data.playerCash >= 100) {
                                                scene.data.playerCash -= 100;
                                                o.obstacle = "NONE";
                                                scene.gameobjects.push(Makers.makeIndicator("-$100", mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#EE0000", 10));
                                                sounds.playSound("Remove");
                                            } else {
                                                scene.data.flashRedCounter = 60;
                                                sounds.playSound("Nope");
                                            }
                                        } else if (o.obstacle == "ROCK") {
                                            if (scene.data.playerCash >= 500) {
                                                scene.data.playerCash -= 500;
                                                o.obstacle = "NONE";
                                                scene.gameobjects.push(Makers.makeIndicator("-$500", mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#EE0000", 10));
                                                sounds.playSound("Remove");
                                            } else {
                                                scene.data.flashRedCounter = 60;
                                                sounds.playSound("Nope");
                                            }
                                        }

                                    }
                                } else {
                                    o.highlight = false;
                                }
                            } else if (o.hasBuilding && o.building.type.includes("PFMK")) {
                                o.highlight = o.x < (mPos.x * cWidth) &&
                                    o.y < (mPos.y * cHeight) &&
                                    (o.x + o.width) > (mPos.x * cWidth) &&
                                    (o.y + o.height) > (mPos.y * cHeight);
                            } else {
                                o.highlight = false;
                            }
                        }

                        //Handle building updating
                        if (o.hasBuilding) {
                            if (o.building.type.includes("PFMK")) {
                                //Update processor factories
                                Updater.updateProcessorFactory(o, scene);
                            } else if (o.building.type.includes("GCFMK")) {
                                Updater.updateGraphicsCardFabricator(o.building, scene);
                            } else if (o.building.type.includes("MMK")) {
                                Updater.updateMarket(o.building, scene);
                            }
                        }
                        break;
                    case "INDIC":
                        Updater.updateIndicator(o);
                        break;
                }
            });
            scene.gameobjects = scene.gameobjects.filter(o => o.type != "INDIC" || (o.type == "INDIC" && o.lifetime > 0));
        }


        scene.UIElements.forEach(UIE => {
            switch (UIE.type) {
                case "BUTTON":
                    if (UIE.x < mPos.x && UIE.y < mPos.y && (UIE.x + UIE.width) > mPos.x && (UIE.y + UIE.height) > mPos.y) {
                        UIE.hover = true;
                    } else {
                        UIE.hover = false;
                    }

                    if (UIE.hover && !prevMouseDown && isMouseDown) {
                        UIE.onClick(scene);
                    }

                    break;
            }
        });

        scene.data.flashRedCounter = Math.max(0, scene.data.flashRedCounter - 2);
        if (Math.floor(scene.data.flashRedCounter / 10) % 2 == 0) {
            scene.UIElements[2].textStyle = (ctx) => {
                ctx.fillStyle = "#FFFFFF";
                ctx.font = '40px serif';
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";

                ctx.shadowColor = "black";
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
            }
        } else {
            scene.UIElements[2].textStyle = (ctx) => {
                ctx.fillStyle = "#FF0000";
                ctx.font = '40px serif';
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";

                ctx.shadowColor = "black";
                ctx.shadowBlur = 2;
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
            }
        }

        if (scene.data.tasks.length > 0) {
            switch (scene.data.tasks[0].id) {
                case 0:
                    if (scene.data.graphicsCards > 0) {
                        completedTask(scene);
                    }
                    break;
                case 1:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "GCFMK1").length >= 4) {
                        completedTask(scene);
                    }
                    break;
                case 2:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "PFMK1").length >= 5) {
                        completedTask(scene);
                    }
                    break;
                case 3:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "MMK1").length >= 1) {
                        completedTask(scene);
                    }
                    break;
                case 4:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "PFMK2").length >= 1) {
                        completedTask(scene);
                    }
                    break;
                case 5:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "GCFMK2").length >= 4) {
                        completedTask(scene);
                    }
                    break;
                case 6:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "MMK2").length >= 1) {
                        completedTask(scene);
                    }
                    break;
                case 7:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "PFMK3").length >= 1) {
                        completedTask(scene);
                    }
                    break;
                case 8:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "GCFMK3").length >= 4) {
                        completedTask(scene);
                    }
                    break;
                case 9:
                    if (scene.data.playerCash >= 1000000) {
                        completedTask(scene);
                    }
                    break;
                case 10:
                    if (scene.gameobjects.filter(o => o.hasBuilding && o.building.type == "MMK3").length >= 1) {
                        completedTask(scene);
                    }
                    break;
                case 11:
                    if (scene.data.playerCash >= 1000000000) {
                        completedTask(scene);
                    }
                    break;
            }
        }

        if (inputs.currentKeyStates.includes("HELP") && !inputs.previousKeyStates.includes("HELP")) {
            scene.data.showHelp = !scene.data.showHelp;
        }
        scene.UIElements[9].visable = scene.data.showHelp;

        scene.data.playerCashDisplay = scene.data.playerCash
        scene.data.graphicsCardsDisplay = scene.data.graphicsCards
    }

}