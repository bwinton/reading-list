// Do something here.

var self = require('sdk/self');
var ui = require('sdk/ui');
var { viewFor } = require('sdk/view/core');
var windows = require('sdk/windows').browserWindows
var xulcss = require('xulcss');

const CLOSED_HEIGHT = '0px';
const OPEN_HEIGHT = '60px';

var action_button = ui.ActionButton({
  id: 'reading-button',
  label: 'Reading List',
  icon: './star.png',
  url: self.data.url('hoverbutton.html')
});

xulcss.addXULStylesheet(self.data.url('hover.css'));

var document = viewFor(windows.activeWindow).document;
var button = document.getElementById('action-button--reading-listjetpack-reading-button');
var overlay = document.getElementById('reading-list-overlay');

function createIcon(iconName) {
  var icon = document.createElementNS('http://www.w3.org/1999/xhtml', 'img');
  icon.setAttribute('src', self.data.url(iconName));
  return icon;
}

if (!overlay) {
  overlay = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  overlay.setAttribute('id', 'reading-list-overlay');
  overlay.appendChild(createIcon('feed.png'));
  overlay.appendChild(createIcon('clock.png'));
  button.parentNode.appendChild(overlay);
}

button.addEventListener('mouseover', function () {
  var rect = button.getBoundingClientRect();
  overlay.style.top = (rect.top - 17) + 'px';
  overlay.style.left = rect.left + 'px';
  overlay.style.height = OPEN_HEIGHT;
});

button.addEventListener('mouseout', function () {
  overlay.style.height = CLOSED_HEIGHT;
});

overlay.addEventListener('mouseover', function () {
  overlay.style.height = OPEN_HEIGHT;
});

overlay.addEventListener('mouseout', function () {
  overlay.style.height = CLOSED_HEIGHT;
});