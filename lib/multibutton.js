var { createIcon } = require('./utils');
var ui = require('sdk/ui');
var { viewFor } = require('sdk/view/core');
var windows = require('sdk/windows').browserWindows

var multi_button;

exports.addButton = function () {

  if (multi_button) {
    return;
  }

  multi_button = ui.ActionButton({
    id: 'multi-button',
    label: 'Reading List',
    icon: './star.png'
  });

  var document = viewFor(windows.activeWindow).document;
  var button = document.getElementById('action-button--reading-listjetpack-multi-button');

  // if (!overlay) {
  //   overlay = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  //   overlay.setAttribute('id', 'reading-list-overlay');
  //   overlay.appendChild(createIcon('feed.png', document));
  //   overlay.appendChild(createIcon('clock.png', document));
  //   button.parentNode.appendChild(overlay);
  // }
}

exports.removeButton = function () {
  if (!multi_button) {
    return;
  }

  multi_button.destroy();
  multi_button = null;
}