var { createIcon, getDocument } = require('./utils');
var ui = require('sdk/ui');

const CLOSED_HEIGHT = '0px';
const OPEN_HEIGHT = '60px';

var hover_button;

var populateButton = function () {

  var openHover = function (overlay, button) {
    if (button) {
      var rect = button.getBoundingClientRect();
      overlay.style.top = (rect.top - 17) + 'px';
      overlay.style.left = rect.left + 'px';
    }
    overlay.style.height = OPEN_HEIGHT;
  }

  var closeHover = function (overlay) {
    overlay.style.height = CLOSED_HEIGHT;
  }

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

  button.addEventListener('mouseover', openHover.bind(null, overlay, button));
  button.addEventListener('mouseout', closeHover.bind(null, overlay));
  overlay.addEventListener('mouseover', openHover.bind(null, overlay, null));
  overlay.addEventListener('mouseout', closeHover.bind(null, overlay));
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