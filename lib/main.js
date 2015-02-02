var hover = require('./hoverbutton');
var multi = require('./multibutton');
var share = require('./sharebutton');
var self = require('sdk/self');
var utils = require('./utils');
var xulcss = require('./xulcss');

var loaded = false;

var CustomizationHandler = {
  handleEvent: function (aEvent) {
    switch (aEvent.type) {
    case 'customizationstarting':
      hover.customizeStart();
      multi.customizeStart();
      share.customizeStart();
      break;
    case 'customizationending':
      hover.customizeEnd();
      multi.customizeEnd();
      share.customizeEnd();
      break;
    }
  }
}

exports.main = function () {
  if (loaded) {
    return;
  }
  loaded = true;

  xulcss.addXULStylesheet(self.data.url('reading-list.css'));
  hover.addButton();
  multi.addButton();
  share.addButton();

  var toolbox = utils.getActiveWindow().gNavToolbox;
  toolbox.addEventListener('customizationstarting', CustomizationHandler);
  toolbox.addEventListener('customizationending', CustomizationHandler);
};

exports.onUnload = function () {
  if (!loaded) {
    return;
  }
  loaded = false;

  xulcss.addXULStylesheet(self.data.url('reading-list.css'));
  hover.removeButton();
  multi.removeButton();
  share.removeButton();

  var toolbox = utils.getActiveWindow().gNavToolbox;
  toolbox.addEventListener('customizationstarting', CustomizationHandler);
  toolbox.addEventListener('customizationending', CustomizationHandler);
}
