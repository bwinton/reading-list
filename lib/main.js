var hover = require('./hoverbutton');
var multi = require('./multibutton');
var self = require('sdk/self');
var xulcss = require('./xulcss');

var loaded = false;

exports.main = function () {
  if (loaded) {
    return;
  }
  loaded = true;

  xulcss.addXULStylesheet(self.data.url('reading-list.css'));
  hover.addButton();
  multi.addButton();
};

exports.onUnload = function () {
  if (!loaded) {
    return;
  }
  loaded = false;

  xulcss.addXULStylesheet(self.data.url('reading-list.css'));
  hover.removeButton();
  multi.removeButton();
}
