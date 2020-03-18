function Polygon(centerX, centerY, raidus, sides,
    startAngle, strokeStyle, fillStyle, filled) {
        this.x = centerX;
        this.y = centerY;
        this.raidus = raidus;
        this.sides = sides;
        this.startAngle = startAngle;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.filled = filled;
    }
// **************Polygon.prototype***************
Polygon.prototype = {
    getPoint: function() {},
    createPath: function(ctx) {},
    stroke: function(ctx) {}
    // todo
}