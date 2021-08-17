var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')

var awards = [
  {
    'award_name': '保时捷（红、黑价值12999）',
    'award_img': './images/huawei1.png'
  },
  {
    'award_name': 'Mste30 Pro 5G版（青山黛8+512G价值7899）',
    'award_img': './images/huawei2.png'
  },
  {
    'award_name': 'Mste30 Pro 5G版（青山黛8+256G价值6899）',
    'award_img': './images/huawei2.png'
  },
  {
    'award_name': 'Mste30 5G版（青山黛8+256G价值5499）',
    'award_img': './images/huawei3.png'
  },
  {
    'award_name': 'Mste30 5G版（罗兰紫8+128G价值4999）',
    'award_img': './images/huawei4.png'
  },
  {
    'award_name': 'Mste30 4G版（罗兰紫8+128G价值4299）',
    'award_img': './images/huawei4.png'
  },
  {
    'award_name': 'Mste30 4G版（罗兰紫6+128G价值3999）',
    'award_img': './images/huawei4.png'
  }
]

var inits = {
  clicked: false, //可否点击申请
};
/*进入页面请求各种初始信息*/
$.ajax({
  url:'../a.json',
  type: 'get',
  dataType:'json',
  success: function (data) {
    if (data.code === 0) {
      inits.clicked = false

    }
  }
})



/*$('.mesContent_award .award_name').text(awards[6].award_name)
$('.mesContent_award .award_img').attr('src',awards[6].award_img)*/
// $('.mesBox_apply').show()
// $('.mesBox_award').show()
$('.mesBox_tip').show()
$('.mes').show()

$('#apply').on('click',function () {


})
$('#button1').on('click', function () {
  $('.mesContent p').html()
  $.ajax({
    url: url + '/preferential/zhongqiuZhuanpanDeliveryGift',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    type: 'post',
    data: {
      activeType: 'weitikuan'
    },
    dataType: 'json',
    success: function (data) {
      switch (data.code) {
        case 200:
          $('.mesContent p').html('恭喜您获得<span>' + Math.abs(data.data.amount) + '</span>元彩金')
          $('.mes').show()
          break
        case 400:
          if (data.message.includes('请登录')) {
            $('.mesContent p').text('您当前未登入请先登入')
            $('.mes').show()
          } else {
            $('.mesContent p').text(data.message)
            $('.mes').show()
          }
          break
        default:
          $('.mesContent p').text(data.message)
          $('.mes').show()
      }
    }
  })
})
$('#button2').on('click', function () {
  $('.mesContent p').html()
  $.ajax({
    url: url + '/preferential/zhongqiuZhuanpanDeliveryGift',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    type: 'post',
    data: {
      activeType: 'weidengru'
    },
    dataType: 'json',
    success: function (data) {
      switch (data.code) {
        case 200:
          $('.mesContent p').html('恭喜您获得<span>' + Math.abs(data.data.amount) + '</span>元彩金')
          $('.mes').show()
          break
        case 400:
          if (data.message.includes('请登录')) {
            $('.mesContent p').text('您当前未登入请先登入')
            $('.mes').show()
          } else {
            $('.mesContent p').text(data.message)
            $('.mes').show()
          }
          break
        default:
          $('.mesContent p').text(data.message)
          $('.mes').show()
      }
    }
  })
})
$('#button3').on('click', function () {
  $('.mesContent p').html()
  $.ajax({
    url: url + '/preferential/zhongqiuZhuanpanDeliveryGift',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    type: 'post',
    data: {
      activeType: 'meiricunkuandama'
    },
    dataType: 'json',
    success: function (data) {
      switch (data.code) {
        case 200:
          $('.mesContent p').html('恭喜您获得<span>' + Math.abs(data.data.amount) + '</span>元彩金')
          $('.mes').show()
          break
        case 400:
          if (data.message.includes('请登录')) {
            $('.mesContent p').text('您当前未登入请先登入')
            $('.mes').show()
          } else {
            $('.mesContent p').text(data.message)
            $('.mes').show()
          }
          break
        default:
          $('.mesContent p').text(data.message)
          $('.mes').show()
      }
    }
  })
})

/* 关闭弹窗*/
$('.mesBox .close').on('click', function () {
  $('.mes').hide()
})
