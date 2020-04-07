/**
 * 精灵模拟
 * @param {*} name 
 * @param {*} painter 
 * @param {*} behaviors 
 */
function Sprite(name, painter, behaviors) {
    this.name = name;
    this.painter = painter;

    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.visible = true;
    this.animating = false;
    this.behaviors = behaviors || [];
}
Sprite.prototype = {
    paint: function (context) {
        if (this.painter !== undefined && this.visible) {
            this.painter.paint(this, context);
        }
    },
    update: function(context, time) {
        for (let i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].execute(this, context, time);
        }
    }
}