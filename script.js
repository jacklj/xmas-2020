// Array to store our Snowflake objects
let snowflakes = [];

// Global variables to store our browser's window size
let browserWidth;
let browserHeight;

// Specify the number of snowflakes you want visible
let numberOfSnowflakes = 50;

// Flag to reset the position of the snowflakes
let resetPosition = false;

//
// It all starts here...
//
function setup() {
  window.addEventListener('DOMContentLoaded', startSnowing, false);
  window.addEventListener('resize', setResetFlag, false);
}
setup();

//
// Constructor for our Snowflake object
//
function Snowflake({
  element,
  speed,
  initialX,
  initialY,
  xDecel = 1,
  loop = true,
}) {
  // set initial snowflake properties
  this.element = element;
  this.speed = speed;
  this.xPos = initialX;
  this.yPos = initialY;
  this.scale = 1;
  this.xDecel = xDecel;
  this.loop = loop;

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
  if (this.deleted) {
    return;
  }
  // using some trigonometry to determine our x and y position
  this.counter += this.speed / 5000;
  this.xPos +=
    (this.sign * this.speed * Math.cos(this.counter)) / (40 * this.xDecel);
  this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
  this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);

  // setting our snowflake's position
  setSnowflakePosition(
    Math.round(this.xPos),
    Math.round(this.yPos),
    this.scale,
    this.element,
  );

  // if snowflake goes below the browser window, move it back to the top
  if (this.yPos > browserHeight) {
    if (this.loop) {
      this.yPos = -50;
    } else {
      // delete snowflake
      this.deleted = true;
      this.element.remove();
    }
  }
};

//
// A performant way to set your snowflake's position and size
//
function setSnowflakePosition(xPos, yPos, scale, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

//
// The function responsible for creating the snowflake
//
function generateSnowflakes() {
  const snowflakeContainer = document.querySelector('.snowflake-container');

  // get our browser's size
  browserWidth = window.innerWidth;
  browserHeight = window.innerHeight;

  // create each individual snowflake
  for (let i = 0; i < numberOfSnowflakes; i++) {
    // 1. add new snowflake element to container element
    const snowflakeSpan = document.createElement('span');
    snowflakeSpan.classList.add('snowflake');
    snowflakeContainer.appendChild(snowflakeSpan);

    // 2. create snowflake controller obj
    const initialX = getPosition(50, browserWidth);
    const initialY = getPosition(50, browserHeight);
    const speed = 5 + Math.random() * 40;
    const snowflakeObject = new Snowflake({
      element: snowflakeSpan,
      speed,
      initialX,
      initialY,
    });

    // 3. store snowflake controller
    snowflakes.push(snowflakeObject);
  }
}

//
// Responsible for moving each snowflake by calling its update function
//
function moveSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    let snowflake = snowflakes[i];
    snowflake.update();
  }

  // Reset the position of all the snowflakes to a new value
  if (resetPosition) {
    browserWidth = window.innerWidth;
    browserHeight = window.innerHeight;

    for (let i = 0; i < snowflakes.length; i++) {
      let snowflake = snowflakes[i];

      snowflake.xPos = getPosition(50, browserWidth);
      snowflake.yPos = getPosition(50, browserHeight);
    }

    resetPosition = false;
  }

  requestAnimationFrame(moveSnowflakes);
}

function startSnowing() {
  generateSnowflakes();

  moveSnowflakes();
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

function generateFuckCovid() {
  const snowflakeContainer = document.querySelector('.snowflake-container');

  // get our browser's size
  browserWidth = window.innerWidth;
  browserHeight = window.innerHeight;

  // create each individual snowflake
  const fuckCovid = [
    '*****  *       *    *****  *     *        *****   *****   *       *  *  * **   ',
    '*      *       *   *       *    *        *       *     *  *       *  *  *   ** ',
    '*      *       *  *        ****         *       *       * *       *  *  *     *',
    '*****  *       *  *        *   *        *       *       * *       *  *  *     *',
    '*      *       *  *        *    *       *       *       *  *     *   *  *     *',
    '*       *     *    *       *     *       *       *     *    *   *    *  *    * ',
    '*        *****      *****  *     *        *****   *****      ***     *  * ***  ',
  ];

  const width = fuckCovid[0].length;
  const gridSize = browserWidth / (width * 1.4);

  const xStart = Math.floor(browserWidth / 2 - (width / 2) * gridSize);
  const yStart = -1 * fuckCovid.length * gridSize;

  for (let y = 0; y < fuckCovid.length; y++) {
    const line = fuckCovid[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (char === '*') {
        // 1. add new snowflake element to container element
        const snowflakeSpan = document.createElement('span');
        snowflakeSpan.classList.add('snowflake');
        snowflakeContainer.appendChild(snowflakeSpan);

        // 2. create snowflake controller obj
        const initialX = xStart + x * gridSize; // getPosition(50, browserWidth);
        const initialY = yStart + y * gridSize; // getPosition(50, browserHeight);
        const speed = 20 + Math.random() * 1;
        const snowflakeObject = new Snowflake({
          element: snowflakeSpan,
          speed,
          initialX,
          initialY,
          xDecel: 60,
          loop: false,
        });

        // 3. store snowflake controller
        snowflakes.push(snowflakeObject);
      }
    }
  }
}

// Run text timer
const urlParams = new URLSearchParams(window.location.search);
const to = urlParams.get('to');
const names = to && to.split(',');

let namesString;
if (!names || names.length === 0) {
  namesString = undefined;
} else if (names.length === 1) {
  namesString = names[0];
} else if (names.length === 2) {
  namesString = `${names[0]} and ${names[1]}`;
} else {
  const allButOneNames = names.slice(0, names.length - 1);
  const lastName = names[names.length - 1];
  namesString = `${allButOneNames.join(', ')} and ${lastName}`;
}

const messageDiv = document.getElementById('message');

const textLines = [
  '',
  namesString ? `Dear ${namesString},` : 'Hello',
  'Happy Christmas!',
  'Hope you have a great day',
  'One more thing...',
  'Let me say',
  'Without hope or agenda',
  "just because it's Christmas",
  '(and at Christmas you tell the truth)',
];

function displayText(text) {
  messageDiv.innerText = text;
}

let i = 0;

const timer = setInterval(function () {
  const index = Math.floor(i / 5);

  if (index >= textLines.length) {
    generateFuckCovid();
    clearInterval(timer);
    return;
  }

  if (i % 5 === 0) {
    messageDiv.style.opacity = 0;
    const text = textLines[index];
    displayText(text);
  } else if (i % 5 === 1) {
    messageDiv.style.opacity = 1;
  } else if (i % 5 === 4) {
    messageDiv.style.opacity = 0;
  }

  i++;
}, 1000);