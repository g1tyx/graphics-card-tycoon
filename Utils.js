function checkIfPointInRectange(point, rect) {
    return (point.x >= rect.x) &&
        (point.x <= (rect.x + rect.width)) &&
        (point.y >= rect.y) &&
        (point.y <= (rect.y + rect.height));
}

function checkRectangeCollisions(rect1, rect2) {
    return checkRectangeCornerIntersects(rect1, rect2) || checkRectangeCornerIntersects(rect2, rect1);
}

function checkRectangeCornerIntersects(cRect, rect) {
    return checkIfPointInRectange({ x: cRect.x, y: cRect.y }, rect) ||
        checkIfPointInRectange({ x: cRect.x + cRect.width, y: cRect.y }, rect) ||
        checkIfPointInRectange({ x: cRect.x, y: cRect.y + cRect.height }, rect) ||
        checkIfPointInRectange({ x: cRect.x + cRect.width, y: cRect.y + cRect.height }, rect);
}

function updateAnimObject(anim) {
    if (frameCounter - anim.lastFrameTime > anim.rate) {
        anim.currentFrame = (anim.currentFrame == anim.frames.length - 1) ? 0 : (anim.currentFrame + 1);
        anim.lastFrameTime = frameCounter;
    }
}

function renderOrderCompare(a, b) {
    var order = ["TILE", "INDIC"];
    var aIndex = order.indexOf(a);
    var bIndex = order.indexOf(b);
    return Math.sign(aIndex - bIndex);
}

function numToDisplayString(num) {
    if (num < 1000) {
        //No Suffix
        return num;
    } else if (num < 1000000) {
        //K Suffix
        return (num / 1000).toFixed(2) + "K";
    } else if (num < 1000000000) {
        //M Suffix
        return (num / 1000000).toFixed(2) + "M";;
    } else if (num < 1000000000000) {
        //B Suffix
        return (num / 1000000000).toFixed(2) + "B";
    } else {
        //T Suffix
        return (num / 1000000000000).toFixed(2) + "T";
    }
}

function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
}

function completedTask(scene) {
    if (scene.data.tasks.length > 0) {
        scene.data.playerCash += scene.data.tasks[0].reward;
        scene.data.tasks.shift();
        sounds.playSound("Complete");
    }
}