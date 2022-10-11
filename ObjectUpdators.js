class Updater {

    static updateButton(UIE, s) {
        if (UIE.x < mPos.x && UIE.y < mPos.y && (UIE.x + UIE.width) > mPos.x && (UIE.y + UIE.height) > mPos.y) {
            UIE.hover = true;
        } else {
            UIE.hover = false;
        }

        if (UIE.hover && !prevMouseDown && isMouseDown) {
            UIE.onClick(s);
        }
    }

    static updateProcessorFactory(o, scene) {

        if (o.highlight && isMouseDown && !o.building.active && !scene.data.placeMode && !scene.data.removeMode) {
            if (scene.data.playerCash >= o.building.restock) {
                if (scene.gameobjects
                    .filter(oo => oo.hasBuilding && oo.building.type.includes("GCFMK"))
                    .filter(oo => [o.tileX - 1, o.tileX, o.tileX + 1].includes(oo.tileX))
                    .filter(oo => [o.tileY - 1, o.tileY, o.tileY + 1].includes(oo.tileY)).length > 0) {
                    o.building.counter = 100;
                    o.building.active = true;
                    scene.data.playerCash -= o.building.restock;
                    scene.data.flashRedCounter = 0;
                    sounds.playSound("Blip2");
                    scene.gameobjects.push(Makers.makeIndicator("-$" + numToDisplayString(o.building.restock), mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#EE0000", 10));
                } else {
                    scene.gameobjects.push(Makers.makeIndicator("No Connected Fabricators", mPos.x * cWidth, mPos.y * cHeight, 0, -1, "#EE0000", 10));
                    sounds.playSound("Nope");
                }

            } else {
                scene.data.flashRedCounter = 60;
                sounds.playSound("Nope");
            }
        }

        o.building.counter = Math.max(0, o.building.counter - o.building.speed);
        if (o.building.counter == 0 && o.building.active) {
            scene.gameobjects
                .filter(oo => oo.hasBuilding && oo.building.type.includes("GCFMK"))
                .filter(oo => [o.tileX - 1, o.tileX, o.tileX + 1].includes(oo.tileX))
                .filter(oo => [o.tileY - 1, o.tileY, o.tileY + 1].includes(oo.tileY))
                .map(oo => oo.building).forEach(g => g.stock += o.building.output);
            o.building.active = false;
        }
    }

    static updateGraphicsCardFabricator(building, scene) {
        if (building.stock >= building.required && !building.active) {
            building.stock -= building.required;
            building.active = true;
            building.counter = 100;
        }
        building.counter = Math.max(0, building.counter - building.speed);
        if (building.counter == 0 && building.active) {
            building.active = false;
            scene.data.graphicsCards += building.output;
        }
    }

    static updateMarket(building, scene) {

        building.counter = Math.max(0, building.counter - building.speed);
        if (building.counter == 0 && building.active) {
            building.active = false;
            scene.data.playerCash += building.output * scene.data.cardPrice * building.multi;
        } else if (!building.active && scene.data.graphicsCards >= building.output) {
            scene.data.graphicsCards -= building.output;
            building.active = true;
            building.counter = 100;
        }
    }

    static updateIndicator(indic) {
        indic.lifetime -= 1;
        indic.x += indic.vx;
        indic.y += indic.vy;
    }


}