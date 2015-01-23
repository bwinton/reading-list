var self = require('sdk/self');

exports.createIcon = function (iconName, document) {
  var icon = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
  icon.setAttribute('src', self.data.url(iconName));
  icon.setAttribute('class', 'reading-list-icon');
  return icon;
}
