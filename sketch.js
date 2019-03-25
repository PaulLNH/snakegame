let snake;
const scl = 20;
const fps = 10;
let food;

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(fps);
  pickLocation();
}

// Randomly gets a location for the food to spawn
function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.direction !== "DOWN") {
    snake.direction = "UP";
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.direction !== "UP") {
    snake.direction = "DOWN";
    snake.move(0, 1);
  } else if (keyCode === RIGHT_ARROW && snake.direction !== "LEFT") {
    snake.direction = "RIGHT";
    snake.move(1, 0);
  } else if (keyCode === LEFT_ARROW && snake.direction !== "RIGHT") {
    snake.direction = "LEFT";
    snake.move(-1, 0);
  }
}
