function Snake() {
  this.x = 0; // Snake starts off at x pos zero
  this.y = 0; // Snake starts off at y pos zero (0, 0) top left
  this.xspeed = 1; // Snake starts off moving right
  this.yspeed = 0;
  this.total = 0; // How much food the snake has ate
  this.tail = []; // Tail array to hold the
  this.direction = "RIGHT";

  // Take in x, y constants from key input
  this.move = function(x, y) {
    // set the snakes speed based on direction moving
    this.xspeed = x;
    this.yspeed = y;
  };

  this.death = function() {
    // Iterate through the tail array
    for (let i = 0; i < this.tail.length; i++) {
      // Set position element to the index of the tail iteration
      let pos = this.tail[i];
      // Check distance from head (this) to tail iteration
      let d = dist(this.x, this.y, pos.x, pos.y);
      // If head position is less than 1 to a tail position
      if (d < 1) {
        // Reset snake
        console.log("Starting over"); // Console log so we know when snake resets
        this.total = 0; // Reset the total food consumption to zero
        this.tail = []; // Reset the tail array to zero
        this.direction = ""; // Reset direction so if the snake hits a wall he isn't stuck
      }
    }
  };

  // Snake's update runs on game loop @ assigned fps
  this.update = function() {
    // total == tail length to prevent edge case bugs (duplicating tail length in re-draw)
    if (this.total === this.tail.length) {
      // Shift the array, moving the snake
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    // Re-draw the head into the next position
    this.tail[this.total - 1] = createVector(this.x, this.y);

    // Re-calcuate the x/y positions based on speed and scale
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    // Prevent snake from leaving the canvas
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  // Allow snake to eat food
  this.eat = function(pos) {
    // Check distance between snake head and food position
    let d = dist(this.x, this.y, pos.x, pos.y);
    // If less than 1
    if (d < 1) {
      // Eat the food
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  // Draw the snake
  this.show = function() {
    // Give snake white color
    fill(255);
    // Draw a rectangle for each iteration of the snakes tail
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    // Draw a rectangle for the snakes head
    rect(this.x, this.y, scl, scl);
  };
}
