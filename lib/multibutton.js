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
  var button = document.querySelector('#action-button--reading-listjetpack-multi-button');
  console.log(button);

  // var separator = document.getElementById('multi-button-separator');
  button.setAttribute('type', 'menu-button');
  // button.setAttribute('orient', 'horizontal');
  // // button.style.display = 'block';
  // if (!separator) {
  //   separator = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  //   separator.setAttribute('id', 'multi-button-separator');
  //   button.appendChild(separator);
  //   button.appendChild(createIcon('list.png', document));
  // }
}

exports.removeButton = function () {
  if (!multi_button) {
    return;
  }

  multi_button.destroy();
  multi_button = null;
}