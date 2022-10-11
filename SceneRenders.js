class SceneRender {

    static render(scene, ctx) {


        var placeObjectSheet = spritesheets.get(scene.data.objectOptions[scene.data.placeObject]);
        scene.gameobjects.sort(renderOrderCompare).forEach(o => {
            ctx.save();
            switch (o.type) {
                case "TILE":
                    Render.renderAnimObject(o, ctx);
                    updateAnimObject(o.anim);
                    if (o.highlight) {
                        if (scene.data.placeMode) {
                            ctx.fillStyle = "#00000000";
                        } else if (scene.data.removeMode) {
                            ctx.fillStyle = "#FF0000AA";
                        } else {
                            ctx.fillStyle = "#00FFFFAA";
                        }

                        ctx.fillRect(o.x, o.y, o.width, o.height);
                        if (scene.data.placeMode) {
                            ctx.globalAlpha = 0.7;
                            placeObjectSheet.drawSprite("0", ctx, o.x, o.y, o.width, o.height);
                            ctx.globalAlpha = 1;
                        }
                    }
                    switch (o.obstacle) {
                        case "TREE":
                            spritesheets.get("TM").drawSprite("Tree", ctx, o.x, o.y, o.width, o.height);
                            break;
                        case "ROCK":
                            spritesheets.get("TM").drawSprite("Rock", ctx, o.x, o.y, o.width, o.height);
                            break;
                        default:
                            break;
                    }
                    if (o.hasBuilding) {
                        var sSheet = spritesheets.get(o.building.anim.imgSource);
                        var frameName = o.building.anim.frames[o.building.anim.currentFrame];
                        sSheet.drawSprite(frameName, ctx, o.x, o.y, o.width, o.height);
                        if (o.building.active) {
                            updateAnimObject(o.building.anim);
                            ctx.fillStyle = "#FFFFFFAA";
                            ctx.beginPath();
                            ctx.ellipse(o.x + o.width * 0.5, o.y + o.height * 0.5, o.width * 0.4, o.height * 0.4, 0, 0, Math.PI * 2 * (o.building.counter / 100));
                            ctx.lineTo(o.x + o.width * 0.5, o.y + o.height * 0.5);
                            ctx.closePath();
                            ctx.fill();
                        }
                        if (o.building.type.includes("GCFMK") && !o.building.active) {
                            ctx.fillStyle = "#0000FFDD";
                            ctx.beginPath();
                            ctx.ellipse(o.x + o.width * 0.5, o.y + o.height * 0.5, o.width * 0.4, o.height * 0.4, 0, 0, Math.PI * 2 * (o.building.stock / o.building.required));
                            ctx.lineTo(o.x + o.width * 0.5, o.y + o.height * 0.5);
                            ctx.closePath();
                            ctx.fill();
                        }
                        if (o.building.type.includes("PFMK") && !o.building.active) {
                            ctx.font = '35px serif';
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillStyle = "#FFFF00";
                            ctx.fillText("!", o.x + o.width / 2, o.y + o.height / 2);
                            ctx.lineWidth = 1;
                            ctx.fillStyle = "#000000";
                            ctx.strokeText("!", o.x + o.width / 2, o.y + o.height / 2);
                        }
                    }
                    break;
                case "INDIC":
                    Render.renderIndicator(o, ctx);
                    break;
                default:
                    break;
            }
            ctx.restore();
        });

        if (!scene.data.start) {
            var placeObjectX = 0.07 * cWidth;
            var placeObjectY = 0.008 * cHeight;
            placeObjectSheet.drawSprite("0", ctx, placeObjectX, placeObjectY, 48, 48);
        }



        scene.UIElements.forEach(UIE => {
            if (UIE.visable) {
                ctx.save();
                switch (UIE.type) {
                    case "BUTTON":
                        Render.renderButton(UIE, ctx);
                        break;
                    case "IMAGE":
                        Render.renderAnimObjectUI(UIE, ctx);
                        updateAnimObject(UIE.anim);
                        break;
                    case "LABEL":
                        Render.renderLabelObject(UIE, scene, ctx);
                        break;
                }
                ctx.restore();
            }
        });

        if (scene.data.placeMode || scene.data.removeMode) {
            ctx.save();
            ctx.fillStyle = "#FFFFFF";
            ctx.font = '20px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.fillText(scene.data.placeMode ? "建造" : "移除", 10 + mPos.x * cWidth, 10 + mPos.y * cHeight);
            ctx.restore();
        }

        if (!scene.data.start) {
            bufferCtx.font = "18px serif";
            bufferCtx.fillStyle = "#000000";
            bufferCtx.textAlign = "center";
            bufferCtx.fillText(!scene.data.showHelp ? "按 H 打开帮助" : "按 H 关闭", 0.945 * cWidth, 0.89 * cHeight);
        }


    }
}