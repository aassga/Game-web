var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')
var init = {
  isClick: false,
  isClick1: false
}
var passKey = {
  userName: '',
  password: '',
  code: '',
  anti_code: '',
  captcha_key: ''
}
if (token) {
  $('#login').hide()
  $('#apply').show()
  $('#record').show()
}

/* 复制 */
function copy (data) {
  let clipboard = 'clipboard' + data
  clipboard = new ClipboardJS('.copyBtn' + data)
  clipboard.on('success', function (e) {
    layer.msg('复制成功！')
    e.clearSelection()
  })
}

/* 反作弊 */
$.ajax({
  url: window.location.origin + '/frontend/v1/config',
  type: 'get',
  async: false,
  dataType: 'json',
  success: function (res) {
    if (res.data.siteConfig.antiCheatSystem && res.data.siteConfig.antiCheatSystem === 'on') {
      initWatchman({
        productNumber: 'YD00815584448686',
        onload: function (instance) {
          instance.getToken('b0ee4d4447ca4bdb8a39b92a27378b8e', function (token) {
            passKey.anti_code = token
          })
        }
      })
    }
  }
})

/* 时间转换 */
function formatDateTime (inputTime) {
  var date = new Date(inputTime * 1000)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  // return y+'-'+m+'-'+d+' '+' '+h+':'+minute+':'+second
  return y + '.' + m + '.' + d
}

/* 提示 */
function tips (data) {
  $('#tc_tip .txt1').text(data)
  layer.open({
    title: '',
    area: ['712px', '371px'],
    type: 1,
    closeBtn: false,
    shadeClose: false,
    scrollbar: false,
    resize: false,
    // anim: 1,
    fixed: true,
    skin: 'tc',
    content: $('#tc_tip')
  })
}

/* 验证码 */
function getCode () {
  var name = $('#account').val() ? $('#account').val() : 'test001'
  if (!name) {
    return false
  }
  $.ajax({
    url: url + 'captcha?userName=' + name,
    // url: 'a.json',
    type: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        $('#code-img').attr('src', res.data.captcha_image_text)
        passKey.captcha_key = res.data.captcha_key
      } else {
      }
    }
  })
}

/* 登录弹窗 */
$('#login').on('click', function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  getCode()
  layer.open({
    title: '',
    area: ['712px', '532px'],
    type: 1,
    closeBtn: false,
    shade: 0,
    shadeClose: false,
    scrollbar: false,
    resize: false,
    // anim: 1,
    fixed: true,
    skin: 'tc',
    content: $('#tc_login')
  })
  init.isClick = false
})
/* 刷新验证码 */
$('#code-img').on('click', function () {
  getCode()
})
/* 提交登录 */
$('#loginIn').on('click', function () {
  if (init.isClick1) {
    return
  }
  passKey.userName = $('#account').val()
  passKey.password = $('#password').val()
  passKey.code = $('#code').val()
  init.isClick1 = true
  if (!passKey.userName) {
    tips('请输入帐号')
    init.isClick1 = false
  } else if (!passKey.password) {
    tips('请输入密码')
    init.isClick1 = false
  } else if (!passKey.code) {
    tips('请输入验证码')
    init.isClick1 = false
  } else {
    $.ajax({
      url: url + 'login',
      type: 'post',
      headers: {
        'Accept': 'application/x.tg.v2+json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userName: passKey.userName,
        password: passKey.password,
        code: passKey.code,
        anti_code: passKey.anti_code,
        captcha_key: passKey.captcha_key,
        device: 'pc'
      },
      dataType: 'json',
      success: function (res) {
        if (res && res.code === 200) {
          token = res.data.token
          localStorage.setItem('token', res.data.token)
          $('#login').hide()
          $('#apply').show()
          $('#record').show()
          layer.closeAll()
          init.isClick1 = false
        } else {
          tips(res.message)
          init.isClick1 = false
        }
      }
    })
  }
  init.isClick = false
})

/* 领取VIP */
function applyVip () {
  $.ajax({
    url: url + 'activityApply?class=A0025&handle=0',
    // url: 'a.json',
    type: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        $('#tc_apply .txt1 #plat').text(res.data.app_name)
        $('#tc_apply .txt2 #plat_code').text(res.data.code)
        layer.open({
          title: '',
          area: ['712px', '351px'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize: false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_apply')
        })
        init.isClick = false
      } else if (res.message === '请登录') {
        tips(res.message)
        init.isClick = false
        $('#login').show()
        $('#apply').hide()
        $('#record').hide()
      } else {
        tips(res.message)
        init.isClick = false
      }
    }
  })
}

$('#apply').on('click', function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  applyVip()
})

/* 领取记录 */
function applyRecord () {
  $.ajax({
    url: url + 'activityApplyList?class=A0025',
    // url: 'lisst.json',
    type: 'post',
    // type: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        var data = res.data
        var content = ''
        if (data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            content += '<tr><td>' + data[i].app_name + '</td><td>' + formatDateTime(data[i].created_at) + '</td><td><span id="data' + i + '">' + data[i].code + '</span><span class="bgImg copyBtn copyBtn' + i + '" data-clipboard-target="#data' + i + '"></span>'
            copy(i)
          }
          document.querySelector('#list').innerHTML = content
        }
        layer.open({
          title: '',
          area: ['712px', '473px'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize: false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_record')
        })
        init.isClick = false
      } else if (res.message === '请登录') {
        tips(res.message)
        init.isClick = false
        $('#login').show()
        $('#apply').hide()
        $('#record').hide()
      } else {
        tips(res.message)
        init.isClick = false
      }
    }
  })
}

$('#record').on('click', function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  applyRecord()
})
