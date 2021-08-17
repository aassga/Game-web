(function () {
  function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  setInterval(function () {
    var dom = document.querySelectorAll('.border');
    var num = (new Date().getTime()).toString();
    for (var i = 0; i < dom.length; i++) {
      if (i === 0) {
        dom[i].innerText = '2';
      } else if (i < 3) {
        dom[i].innerText = num.substr(i, 1);
      } else if (i > dom.length - 4) {
        dom[i].innerText = getRandom(0, 9).toString()
      } else {
        dom[i].innerText = num.substr(i + 2, 1);
      }
    }
  }, 999)
})();
function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

b = GetQueryString('channelCode')

if (b == null) {
  url = window.location.href
  a = url + '?channelCode=267448&code=1&group_id=B'
  window.location.href = a
}