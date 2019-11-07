const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const thrusterCanvas = document.getElementById('thrusterCanvas')
const thrusterCtx = thrusterCanvas.getContext('2d')
const GRAVITY_FORCE = 9.81, // 重力系数g
	HEIGHT_IN_METERS = 10, // 10m
	RIGHT = 1,
	LEFT = 2,
	ARROW_MARGIN = 10,
	BALL_RADIUS = 23,
	LEDGE_LEFT = 280,
	LEDGE_TOP = 55,
	LEDGE_WIDTH = 100,
    LEDGE_HEIGHT = 12,
	pxPerMeter = (canvas.height - LEDGE_TOP) / HEIGHT_IN_METERS // px/m
let lastTime = 0, fps = 0, arrow = LEFT
const moveBall = {
    lastFrameTime: undefined,// 最后一帧时间
	execute: function(sprite, context, time) {
        const now = +new Date();
        if (this.lastFrameTime == undefined) {
           this.lastFrameTime = now;
           return;
        }
        // if (pushAnimationTimer.isRunning()) {
        //     if (arrow === LEFT) sprite.left -= sprite.velocityX / fps;
        //     else                sprite.left += sprite.velocityX / fps;
        //     if (sprite.left < -46) {
        //         stopFalling()
        //     }
        // }
		if (fallingAnimationTimer.isRunning()) {
			sprite.top += sprite.velocityY / fps
            sprite.velocityY = GRAVITY_FORCE * (fallingAnimationTimer.getElapsedTime() / 1000) * pxPerMeter
			if (sprite.top > canvas.height) {
                console.timeEnd('time')
				stopFalling()
			}
        }
	}
}
function drawGrid(color, stepx, stepy) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    for (let i = stepx + 0.5; i < canvas.width; i += stepx) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = stepy + 0.5; i < canvas.height; i += stepy) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}
function pushBallLeft() {
    if (pushAnimationTimer.isRunning()) {
       pushAnimationTimer.stop();
    }
    arrow = LEFT;
    pushAnimationTimer.start();
 }
function startFalling() {
    console.time('time')
    fallingAnimationTimer.start();
    // pushAnimationTimer.start();
    ball.velocityY = 0;
}
function stopFalling() {
    fallingAnimationTimer.stop();
    // pushAnimationTimer.stop();
    // 回复原位
    ball.left = LEDGE_LEFT + LEDGE_WIDTH/2 - BALL_RADIUS;
    ball.top = LEDGE_TOP - BALL_RADIUS*2;
 
    ball.velocityY = 0;
 }
// 运动*************
function calculateFps(time) {
	const fps = 1000 / (time - lastTime)
	lastTime = time
	return fps
}
function animate(time) {
    fps = calculateFps(time);
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray', 10, 10);
    ball.update(ctx, time);
    ball.paint(ctx)
    ledge.paint(ctx);
    if (fallingAnimationTimer.isRunning()) {
        window.requestAnimationFrame(animate);
    }
}
// 水平运动动画计时器
const pushAnimationTimer    = new AnimationTimer()
// 自由落体动画计时器
const fallingAnimationTimer = new AnimationTimer()
const ball = new Sprite(
	'ball',
	{
		paint: function(sprite, context) {
			context.save()
			// ball的外层圆
			context.beginPath()
			context.arc(
				sprite.left + sprite.width / 2,
				sprite.top + sprite.height / 2,
				BALL_RADIUS,
				0,
				Math.PI * 2,
				false
			)
			context.clip()

			context.shadowColor = 'rgba(0,0,255, 0.7)'
			context.shadowOffsetX = -4
			context.shadowOffsetY = -4
			context.shadowBlur = 8

			context.lineWidth = 2
			context.strokeStyle = 'rgb(100, 100, 195)'
			context.stroke()
			//ball的内层圆
			context.beginPath()
			context.arc(
				sprite.left + sprite.width / 2,
				sprite.top + sprite.height / 2,
				BALL_RADIUS / 2,
				0,
				Math.PI * 2,
				false
			)
			context.clip()

			context.shadowColor = 'rgba(255,255,0,1.0)'
			context.shadowOffsetX = -4
			context.shadowOffsetY = -4
			context.shadowBlur = 8

			context.stroke()

			context.restore()
		}
	},
	[ moveBall ]
)
const ledge = new Sprite(
	'ledge',
	{
		paint: function(sprite, context) {
            context.save();
            context.shadowColor = 'rgba(0,0,0,0.5)';
            context.shadowBlur = 8;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            context.fillStyle = 'rgba(255,255,0,0.6)';
            context.strokeStyle = 'rgba(0,0,0,0.6)';
            context.beginPath();
            context.rect(sprite.left,sprite.top,sprite.width,sprite.height);
            context.fill();
            context.stroke();
            context.restore();
        }
	},
	[]
)
// init************************************
ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
ball.top = LEDGE_TOP - BALL_RADIUS * 2
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2

ball.velocityX = 110
ball.velocityY = 0

ledge.left = LEDGE_LEFT;
ledge.top = LEDGE_TOP;
ledge.width = LEDGE_WIDTH;
ledge.height = LEDGE_HEIGHT;
startFalling();
window.requestAnimationFrame(animate);