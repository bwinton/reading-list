var { createIcon, getDocument } = require('./utils');
var { setTimeout, clearTimeout } = require('sdk/timers');
var ui = require('sdk/ui');

const CLOSED_HEIGHT = '0px';
const OPEN_HEIGHT = '66px';

const STATE_OPENING = 1;
const STATE_OPENED = 2;
const STATE_CLOSING = 3;
const STATE_CLOSED = 4;

var hover_button;
var state = STATE_CLOSED;
var timer = null;

var populateButton = function () {

  var openHover = function (overlay, button, immediate) {
    switch (state) {
    case STATE_OPENING:
    case STATE_OPENED:
      return;
    case STATE_CLOSING:
      clearTimeout(timer);
      timer = null;
      state = STATE_OPENED;
      return;
    case STATE_CLOSED:
      if (immediate === true) {
        overlay.style.height = OPEN_HEIGHT;
        state = STATE_OPENED;
        return;
      }
      state = STATE_OPENING;
      timer = setTimeout(() => {
        if (button) {
          var rect = button.getBoundingClientRect();
          overlay.style.top = (rect.top - 14) + 'px';
          overlay.style.left = (rect.left - 3) + 'px';
        }
        overlay.style.height = OPEN_HEIGHT;
        state = STATE_OPENED;
        timer = null;
      }, 500);
    }
  };

  var closeHover = function (overlay, immediate) {
    switch (state) {
    case STATE_CLOSING:
    case STATE_CLOSED:
      return;
    case STATE_OPENING:
      clearTimeout(timer);
      timer = null;
      state = STATE_CLOSED;
      return;
    case STATE_OPENED:
      if (immediate === true) {
        overlay.style.height = CLOSED_HEIGHT;
        state = STATE_CLOSED;
        return;
      }
      state = STATE_CLOSING;
      timer = setTimeout(button => {
        overlay.style.height = CLOSED_HEIGHT;
        state = STATE_CLOSED;
        timer = null;
      }, 750);
      return;
    }
  };

  var mouseout = function (overlay, button, event) {
    // Show the menu if we're moving the mouse downwards-ish.
    var minY = button.boxObject.y + button.boxObject.height;
    if (event.clientY > minY) {
      var deltaY = event.clientY - minY;
      var minX = button.boxObject.x - deltaY / 4;
      var maxX = button.boxObject.x + button.boxObject.width + deltaY / 4;
      console.log(event.clientX > minX, event.clientX < maxX);
      if (event.clientX > minX && event.clientX < maxX) {
        openHover(overlay, button, true);
        return;
      }
    }
    closeHover(overlay);
  };

  var document = getDocument();
  var button = document.getElementById('action-button--reading-listjetpack-hover-button');
  if (!button) {
    // Perhaps it was customized away?
    console.log('No hover button');
    return;
  }

  var overlay = document.getElementById('reading-list-overlay');

  if (!overlay) {
    overlay = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    overlay.setAttribute('id', 'reading-list-overlay');
    overlay.appendChild(createIcon('feed.png', document));
    overlay.appendChild(createIcon('clock.png', document));
    button.parentNode.appendChild(overlay);
  }

  button.addEventListener('mouseover', openHover.bind(null, overlay, button, false));
  button.addEventListener('mouseout', mouseout.bind(null, overlay, button));
  button.addEventListener('click', closeHover.bind(null, overlay, true));
  overlay.addEventListener('mouseover', openHover.bind(null, overlay, null, false));
  overlay.addEventListener('mouseout', closeHover.bind(null, overlay));
  overlay.addEventListener('click', closeHover.bind(null, overlay, true));
}


exports.addButton = function () {
  if (hover_button) {
    return;
  }

  hover_button = ui.ActionButton({
    id: 'hover-button',
    label: 'Hover Reading List',
    icon: './star.png'
  });

  populateButton();
}

exports.customizeStart = function () {
}

exports.customizeEnd = function () {
  populateButton();
}

exports.removeButton = function () {
  if (!hover_button) {
    return;
  }

  hover_button.destroy();
  hover_button = null;
}