var { createXulIcon, iconClass, getDocument } = require('./utils');
var { data } = require('sdk/self');
var { Panel } = require('sdk/panel');
var ui = require('sdk/ui');

var share_button;

var populateButton = function () {
  panel.port.on('click-menu', function (menuname) {
    // console.log('Clicked ' + menuname);
    panel.hide();
  });

  share_button.on('click', function () {
    if (panel.isShowing) {
      panel.hide();
    } else {
      panel.show();
    }
  });

  var document = getDocument();
  var button = document.getElementById('action-button--reading-listjetpack-share-button');
  if (!button) {
    // Perhaps it was customized away?
    console.log('No share button');
    return;
  }

  var container = document.getAnonymousElementByAttribute(button, 'class', 'toolbarbutton-badge-container');
  if (!container) {
    // Perhaps the button has been customized out?
    console.log('No share button container!');
    return;
  }

  container.querySelector('image').setAttribute('class', iconClass);

  var list = document.getElementById('share-button-list');
  if (!list) {
    list = createXulIcon('list.png', document);
    list.setAttribute('id', 'share-button-list');
    container.appendChild(list);

    var alternate = createXulIcon('feed.png', document);
    alternate.setAttribute('id', 'share-button-alternate');
    container.appendChild(alternate);
  }
}


exports.addButton = function () {
  if (share_button) {
    return;
  }

  share_button = ui.ActionButton({
    id: 'share-button',
    label: 'Share Reading List',
    icon: './star.png'
  });

  panel = Panel({
    position: share_button,
    contentURL: data.url('share-panel-content.html'),
    contentScriptFile: data.url('panel-script.js'),
    width: 180,
    height: 134
  });

  populateButton();
}

exports.customizeStart = function () {
}

exports.customizeEnd = function () {
  populateButton();
}

exports.removeButton = function () {
  if (!share_button) {
    return;
  }

  panel.destroy();
  share_button.destroy();
  share_button = null;
}
