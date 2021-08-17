var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')

var awards = [
  {
    'award_name': '保时捷（红、黑价值12999）',
    'award_img': './images/huawei1.png'
  },
  {
    'award_name': 'Mate30 Pro 5G版（青山黛8+512G价值7899）',
    'award_img': './images/huawei2.png'
  },
  {
    'award_name': 'Mate30 Pro 5G版（青山黛8+256G价值6899）',
    'award_img': './images/huawei2.png'
  },
  {
    'award_name': 'Mate30 5G版（青山黛8+256G价值5499）',
    'award_img': './images/huawei3.png'
  },
  {
    'award_name': 'Mate30 5G版（罗兰紫8+128G价值4999）',
    'award_img': './images/huawei4.png'
  },
  {
    'award_name': 'Mate30 4G版（罗兰紫8+128G价值4299）',
    'award_img': './images/huawei4.png'
  },
  {
    'award_name': 'Mate30 4G版（罗兰紫6+128G价值3999）',
    'award_img': './images/huawei4.png'
  }
]

var inits = {
  clicked: false, //可否点击申请
}
/*进入页面请求各种初始信息*/
/*$.ajax({
  url: './a.json',
  type: 'get',
  dataType: 'json',
  success: function (data) {
    if (data.code === 0) {
      inits.clicked = false

    }
  }
})*/

/*$('.mesContent_award .award_name').text(awards[6].award_name)
$('.mesContent_award .award_img').attr('src',awards[6].award_img)*/
// $('.mesBox_apply').show()
// $('.mesBox_award').show()
// $('.mesBox_tip').show()
// $('.mes').show()

function getData () {
  $.ajax({
    url: url + '/preferential/getGifts',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    type: 'post',
    data: {},
    dataType: 'json',
    success: function (data) {
      inits = JSON.parse(JSON.stringify(data))
      if (data.code === 200) {
        $('#userName').val(inits.data.userName).attr('disabled','disabled')
      }
    }
  })
}

getData()

function tip1 () {
  $('.mesBox_award').hide()
  $('.mesBox_apply').hide()
  $('.mesContent_tip p').text(inits.message)
  $('.mesBox_tip').show()
  $('.mes').show()
}
function tip2 () {
  $('.mesBox_award').hide()
  $('.mesBox_apply').hide()
  $('.mesContent_tip p').text(inits.data.msg)
  $('.mesBox_tip').show()
  $('.mes').show()
}


$('#check').on('click', function () {
  getData()
  if (inits.code === 200) {
    // if (inits.data.code === 400) {
     tip2()
      if (inits.data.type && inits.data.type !== "") {
        $('.mesBox_tip').hide()
        $('.mesBox_apply').hide()
        $('.mesContent_award .title').text(inits.data.title)
        $('.mesContent_award .award_name').text(awards[inits.data.type].award_name)
        $('.mesContent_award .award_img').attr('src', awards[inits.data.type].award_img)
        $('.mesBox_award').show()
        $('.mes').show()
      }
  } else {
    tip1()
  }
})


$('#apply').on('click', function () {
  getData()
  if (inits.code === 200) {
    if (inits.data.code === 400) {
      tip2()
    } else if (inits.data.code === 200) {
      $('.mesBox_award').hide()
      $('.mesBox_tip').hide()
      $('.mesBox_apply').show()
      $('.mes').show()
    }
  } else {
    tip1()
  }
})
$('#button').on('click', function () {
  $('.mesContent_apply input').val()
  $.ajax({
    url: url + '/site/applyActivity',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    type: 'post',
    data: {
      name: $('#user_name').val(),
      tel: $('#user_mobile').val(),
      address: $('#user_address').val(),
      active_apply_name: '喜从天降，存款送手机',
      type: 1
    },
    dataType: 'json',
    success: function (data) {
      $('.mesBox_award').hide()
      $('.mesBox_apply').hide()
      $('.mesContent_tip p').text(data.message)
      $('.mesBox_tip').show()
      $('.mes').show()
      if (data.code === 200) {
        setTimeout(function () {
          window.location.reload()
        },3000)
      }
    }
  })
})

/* 关闭弹窗*/
$('.mesBox .close').on('click', function () {
  $('.mes').hide()
})
