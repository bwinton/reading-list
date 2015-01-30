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
    id: 'share-button',
    label: 'Combo Reading List 2',
    icon: './star.png'
  });

  panel = Panel({
    position: multi_button,
    contentURL: data.url('share-panel-content.html'),
    contentScriptFile: data.url('panel-script.js'),
    width: 180,
    height: 114
  });

  var document = viewFor(windows.activeWindow).document;
  var button = document.getElementById('action-button--reading-listjetpack-share-button');
  var container = document.getAnonymousElementByAttribute(button, 'class', 'toolbarbutton-badge-container');
  container.querySelector('image').setAttribute('class', iconClass);

  var list = document.getElementById('share-button-list');
  if (!list) {
    list = createXulIcon('list.png', document);
    list.setAttribute('id', 'share-button-list');
    container.appendChild(list);

    var alternate = createXulIcon('feed.png', document);
    alternate.setAttribute('id', 'share-button-alternate');
    container.appendChild(alternate);

    panel.port.on('click-menu', function (menuname) {
      console.log('Clicked ' + menuname);
      panel.hide();
    });


    multi_button.on('click', function () {
      if (panel.isShowing) {
        panel.hide();
      } else {
        panel.show();
      }
    });

  }
}

exports.removeButton = function () {
  if (!multi_button) {
    return;
  }

  panel.destroy();
  multi_button.destroy();
  multi_button = null;
}
