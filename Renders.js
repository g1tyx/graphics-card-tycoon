class Render {
    static renderButton(b, ctx) {
        var btnX = Math.floor(b.x * cWidth);
        var btnY = Math.floor(b.y * cHeight);
        var btnW = Math.floor(b.width * cWidth);
        var btnH = Math.floor(b.height * cHeight);

        if (b.hover) {
            b.hoverStyle(ctx);
        } else {
            b.normalStyle(ctx);
        }
        ctx.beginPath();
        ctx.rect(btnX, btnY, btnW, btnH);
        ctx.fill();
        ctx.stroke();

        b.textStyle(ctx);
        ctx.fillText(b.text, Math.floor(btnX + (btnW / 2)), Math.floor(btnY + (btnH / 2)), btnW);
    }

    static renderAnimObject(o, ctx) {
        if (o.anim.sourceType == "SHEET") {
            var sSheet = spritesheets.get(o.anim.imgSource);
            var frameName = o.anim.frames[o.anim.currentFrame];
            sSheet.drawSprite(frameName, ctx, o.x, o.y, o.width, o.height);
        } else {
            var img = textures.get(o.anim.frames[o.anim.currentFrame]);
            ctx.drawImage(img, o.x, o.y, o.width, o.height);
        }
    }

    static renderAnimObjectCent(o, ctx) {
        if (o.anim.sourceType == "SHEET") {
            var sSheet = spritesheets.get(o.anim.imgSource);
            var frameName = o.anim.frames[o.anim.currentFrame];
            sSheet.drawSprite(frameName, ctx, o.x - o.width * 0.5, o.y - o.height * 0.5, o.width, o.height);
        } else {
            var img = textures.get(o.anim.frames[o.anim.currentFrame]);
            ctx.drawImage(img, o.x - o.width * 0.5, o.y - o.height * 0.5, o.width, o.height);
        }
    }

    static renderAnimObjectUI(o, ctx) {
        if (o.anim.sourceType == "SHEET") {
            var sSheet = spritesheets.get(o.anim.imgSource);
            var frameName = o.anim.frames[o.anim.currentFrame];
            sSheet.drawSprite(frameName, ctx, o.x * cWidth, o.y * cHeight, o.width * cWidth, o.height * cHeight);
        } else {
            var img = textures.get(o.anim.frames[o.anim.currentFrame]);
            ctx.drawImage(img, o.x * cWidth, o.y * cHeight, o.width * cWidth, o.height * cHeight);
        }
    }

    static renderLabelObject(o, scene, ctx) {
        var lblX = Math.floor(o.x * cWidth);
        var lblY = Math.floor(o.y * cHeight);
        var lblW = Math.floor(o.width * cWidth);
        var lblH = Math.floor(o.height * cHeight);

        var labelText = o.textFunc(scene);
        o.style(ctx);
        ctx.beginPath();
        ctx.rect(lblX, lblY, lblW, lblH);
        ctx.fill();
        ctx.stroke();

        o.textStyle(ctx);
        ctx.fillText(labelText, Math.floor(lblX + lblW / 2), Math.floor(lblY + lblH / 2), lblW);
    }

    static renderIndicator(indic, ctx) {
        ctx.fillStyle = indic.col;
        ctx.font = '15px serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "black";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillText(indic.text, indic.x, indic.y);
    }

}