var self = require('sdk/self');

iconClass = exports.iconClass = 'reading-list-icon';

exports.createIcon = function (iconName, document) {
  var icon = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
  icon.setAttribute('src', self.data.url(iconName));
  icon.setAttribute('class', iconClass);
  return icon;
}

exports.createXulIcon = function (iconName, document) {
  var icon = document.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'image');
  icon.setAttribute('src', self.data.url(iconName));
  icon.setAttribute('class', iconClass);
  return icon;
}
