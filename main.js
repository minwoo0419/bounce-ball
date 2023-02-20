// setup canvas(API)

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    draw() { //공 그리기
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() { //공의 위치 업데이트(벽에 부딫힐 때 마다 반대로 이동시키기 위해)
        if ((this.x + this.size) >= width) { //x좌표가 캔버스의 너비보다 큰 경우(오른쪽으로 벗어날 경우)
            this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) { //x좌표가 0보다 작을 경우(왼쪽으로 벗어날 경우)
            this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) { //y좌표가 높이보다 큰 경우(아래쪽으로 벗어날 경우)
            this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) { //y좌표가 0보다 작을 경우(위쪽으로 벗어날 경우)
            this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect() { //충돌 감지
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
      
                if (distance <= this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                    this.velX =- (ball.velX); //공끼리 부딫히면 색깔 뿐만 아니라 튕기게도 하기 위해 자체 
                    this.velX =- (ball.velY);
                }
            }
        }
    }   
}
const balls = [];

while (balls.length < 25) { //공 25개 만들기
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );

  balls.push(ball);
}
function loop() { //애니메이션 루프
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; //배경 검은색으로 채우기
    ctx.fillRect(0, 0, width, height); //배경 크기 제공
  
    for (const ball of balls) { //위의 랜덤으로 만들어진 공들 그리기
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
  
    requestAnimationFrame(loop);
}
loop();
  
 
