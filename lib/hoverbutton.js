var { createIcon } = require('./utils');
var ui = require('sdk/ui');
var { viewFor } = require('sdk/view/core');
var windows = require('sdk/windows').browserWindows

const CLOSED_HEIGHT = '0px';
const OPEN_HEIGHT = '60px';

var hover_button;

exports.addButton = function () {

  if (hover_button) {
    return;
  }

  function openHover(overlay, button) {
    if (button) {
      var rect = button.getBoundingClientRect();
      overlay.style.top = (rect.top - 17) + 'px';
      overlay.style.left = rect.left + 'px';
    }
    overlay.style.height = OPEN_HEIGHT;
  }

  function closeHover(overlay) {
    overlay.style.height = CLOSED_HEIGHT;
  }

  hover_button = ui.ActionButton({
    id: 'hover-button',
    label: 'Reading List',
    icon: './star.png'
  });

  var document = viewFor(windows.activeWindow).document;
  var button = document.getElementById('action-button--reading-listjetpack-hover-button');
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

exports.removeButton = function () {
  if (!hover_button) {
    return;
  }

  hover_button.destroy();
  hover_button = null;
}