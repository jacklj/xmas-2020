// Array to store our Snowflake objects
var snowflakes = [];

// Global variables to store our browser's window size
var browserWidth;
var browserHeight;

// Specify the number of snowflakes you want visible
var numberOfSnowflakes = 50;

// Flag to reset the position of the snowflakes
var resetPosition = false;

//
// It all starts here...
//
function setup() {
  window.addEventListener('DOMContentLoaded', generateSnowflakes, false);
  window.addEventListener('resize', setResetFlag, false);
}
setup();

//
// Constructor for our Snowflake object
//
function Snowflake({ element, speed, xPos, yPos }) {
  // set initial snowflake properties
  this.element = element;
  this.speed = speed;
  this.xPos = xPos;
  this.yPos = yPos;
  this.scale = 1;

  // declare variables used for snowflake's motion
  this.counter = 0;
  this.sign = Math.random() < 0.5 ? 1 : -1;

  // setting an initial opacity and size for our snowflake
  this.element.style.opacity = (0.1 + Math.random()) / 3;
}

//
// The function responsible for actually moving our snowflake
//
Snowflake.prototype.update = function () {
  // using some trigonometry to determine our x and y position
  this.counter += this.speed / 5000;
  this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
  this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
  this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

  // setting our snowflake's position
  setTransform(
    Math.round(this.xPos),
    Math.round(this.yPos),
    this.scale,
    this.element,
  );

  // if snowflake goes below the browser window, move it back to the top
  if (this.yPos > browserHeight) {
    this.yPos = -50;
  }
};

//
// A performant way to set your snowflake's position and size
//
function setTransform(xPos, yPos, scale, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

//
// The function responsible for creating the snowflake
//
function generateSnowflakes() {
  const snowflakeContainer = document.querySelector('.snowflake-container');

  // get our browser's size
  browserWidth = document.documentElement.clientWidth;
  browserHeight = document.documentElement.clientHeight;

  // create each individual snowflake
  for (var i = 0; i < numberOfSnowflakes; i++) {
    // 1. add new snowflake element to container element
    const snowflakeSpan = document.createElement('span');
    snowflakeSpan.classList.add('snowflake');
    snowflakeContainer.appendChild(snowflakeSpan);

    // 2. create snowflake controller obj
    const initialXPos = getPosition(50, browserWidth);
    const initialYPos = getPosition(50, browserHeight);
    const speed = 5 + Math.random() * 40;
    const snowflakeObject = new Snowflake({
      element: snowflakeSpan,
      speed,
      xPos: initialXPos,
      yPos: initialYPos,
    });

    snowflakes.push(snowflakeObject);
  }

  moveSnowflakes();
}

//
// Responsible for moving each snowflake by calling its update function
//
function moveSnowflakes() {
  for (var i = 0; i < snowflakes.length; i++) {
    var snowflake = snowflakes[i];
    snowflake.update();
  }

  // Reset the position of all the snowflakes to a new value
  if (resetPosition) {
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];

      snowflake.xPos = getPosition(50, browserWidth);
      snowflake.yPos = getPosition(50, browserHeight);
    }

    resetPosition = false;
  }

  requestAnimationFrame(moveSnowflakes);
}

//
// This function returns a number between (maximum - offset) and (maximum + offset)
//
function getPosition(offset, size) {
  return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

//
// Trigger a reset of all the snowflakes' positions
//
function setResetFlag(e) {
  resetPosition = true;
}
