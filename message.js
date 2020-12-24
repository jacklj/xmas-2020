// get query params
const urlParams = new URLSearchParams(window.location.search);
const to = urlParams.get('to');
const names = to.split(',');

let namesString;
if (names.length === 1) {
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
  `Dear ${namesString},`,
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
