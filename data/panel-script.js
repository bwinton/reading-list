window.addEventListener('click', function (event) {
  var t = event.target;
  if (t.nodeName == 'IMG') {
    self.port.emit('click-icon', t.getAttribute('src'));
  }
}, false);