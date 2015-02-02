var isMenu = function (target) {
  while (target != null) {
    if (target.classList && target.classList.contains('menuitem')) {
      return target;
    }
    target = target.parentNode
  }
  return false;
}

var isIcon = function (target) {
  if (target.nodeName == 'IMG') {
    return target;
  }
  return false;
}

window.addEventListener('click', function (event) {
  var target;
  if (target = isMenu(event.target)) {
    self.port.emit('click-menu', target.getAttribute('id'));
  } else if (target = isIcon(event.target)) {
    self.port.emit('click-icon', target.getAttribute('src'));
  }
}, false);