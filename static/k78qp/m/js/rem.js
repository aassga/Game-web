(function () {
  var _self = this;
  _self.width = 800;
  _self.fontSize = 100;
  _self.widthProportion = function () {
    var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
    return p > 1 ? 1 : p < 0.10 ? 0.10 : p;
  };
  _self.changePage = function () {
    document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
  }
  window.addEventListener('resize', function () { _self.changePage(); }, false);
  setTimeout(function () { _self.changePage(); }, 0)
})();