var { createXulIcon, iconClass, getDocument } = require('./utils');
var { data } = require('sdk/self');
var { Panel } = require('sdk/panel');
var ui = require('sdk/ui');

var multi_button;

var populateButton = function () {
  var document = getDocument();
  var button = document.getElementById('action-button--reading-listjetpack-multi-button');
  if (!button) {
    // Perhaps the button has been customized out?
    console.log('No multibutton!');
    return;
  }
  var container = document.getAnonymousElementByAttribute(button, 'class', 'toolbarbutton-badge-container');
  if (!container) {
    // Perhaps the button has been customized out?
    console.log('No multibutton container!');
    return;
  }

  container.querySelector('image').setAttribute('class', iconClass);

  var alternate = document.getElementById('multi-button-alternate');
  if (!alternate) {
    alternate = createXulIcon('feed.png', document);
    alternate.setAttribute('id', 'multi-button-alternate');
    alternate.classList.add('empty');
    container.appendChild(alternate);

    panel.port.on('click-icon', function (iconName) {
      alternate.setAttribute('src', data.url(iconName));
      alternate.classList.remove('empty');
      panel.hide();
    });

    multi_button.on('click', function () {
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


exports.addButton = function () {
  if (multi_button) {
    return;
  }

  multi_button = ui.ActionButton({
    id: 'multi-button',
    label: 'Multi Reading List',
    icon: './star.png'
  });

  panel = Panel({
    position: multi_button,
    contentURL: data.url('multi-panel-content.html'),
    contentScriptFile: data.url('panel-script.js'),
    width: 180,
    height: 180
  });

  populateButton();
}

exports.customizeStart = function () {
}

exports.customizeEnd = function () {
  populateButton();
}

exports.removeButton = function () {
  if (!multi_button) {
    return;
  }

  panel.destroy();
  multi_button.destroy();
  multi_button = null;
}
