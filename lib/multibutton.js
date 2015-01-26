var { createXulIcon, iconClass } = require('./utils');
var { data } = require('sdk/self');
var { Panel } = require('sdk/panel');
var ui = require('sdk/ui');
var { viewFor } = require('sdk/view/core');
var windows = require('sdk/windows').browserWindows;

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

  panel = Panel({
    position: multi_button,
    contentURL: data.url('panel-content.html'),
    width: 180,
    height: 180
  });

  var document = viewFor(windows.activeWindow).document;
  var button = document.getElementById('action-button--reading-listjetpack-multi-button');
  var container = document.getAnonymousElementByAttribute(button, 'class', 'toolbarbutton-badge-container');
  console.log(container);
  var separator = document.getElementById('multi-button-separator');

  if (!separator) {
    // button.setAttribute('orient', 'horizontal');
    // button.style.display = 'inline-block';

    separator = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    separator.setAttribute('id', 'multi-button-separator');

    // container.appendChild(createXulIcon('star.png', document));
    container.querySelector('image').setAttribute('class', iconClass);

    var alternate = createXulIcon('feed.png', document);
    alternate.setAttribute('id', 'multi-button-alternate');
    alternate.classList.add('empty');
    container.appendChild(alternate);

    multi_button.on('click', function () {
      // alternate.classList.toggle('empty');
      if (panel.isShowing) {
        panel.hide();
      } else {
        panel.show();
      }
    });

    var list = createXulIcon('list.png', document);
    list.setAttribute('id', 'multi-button-list');
    container.appendChild(list);
  }
}

exports.removeButton = function () {
  if (!multi_button) {
    return;
  }

  multi_button.destroy();
  multi_button = null;
}