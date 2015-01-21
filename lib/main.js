// Do something here.

var self = require('sdk/self');
var ui = require('sdk/ui');
var { viewFor } = require('sdk/view/core');
var windows = require('sdk/windows').browserWindows

var action_button = ui.ActionButton({
  id: 'reading-button',
  label: 'Reading List',
  icon: './star.png',
  url: self.data.url('hoverbutton.html')
});

var document = viewFor(windows.activeWindow).document;
var button = document.getElementById('action-button--reading-listjetpack-reading-button');
var overlay = document.getElementById('reading-list-overlay');

if (!overlay) {
  var rect = button.getBoundingClientRect();
  overlay = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  overlay.setAttribute('id', 'reading-list-overlay');
  overlay.style.position = 'absolute';
  overlay.style.top = (rect.top - 15) + 'px';
  overlay.style.left = rect.left + 'px';
  overlay.style.width = '28px';
  overlay.style.height = '0px';
  overlay.style.background = 'rebeccapurple';
  overlay.style.zIndex = '100';
  overlay.style.transition = 'height 200ms'
  button.parentNode.appendChild(overlay);
}

button.addEventListener('mouseover', function () {
  overlay.style.height = '80px';
});

button.addEventListener('mouseout', function () {
  overlay.style.height = '0px';
});

overlay.addEventListener('mouseover', function () {
  overlay.style.height = '80px';
});

overlay.addEventListener('mouseout', function () {
  overlay.style.height = '0px';
});