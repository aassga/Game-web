var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')

var total = 0;

var awards = [18,68,168,518,888,1588];

function initMoney (total) {
  if  (total > 0) {
   if (total >= 1000000) {
      $('.money1').text(10000)
      $('.money2').text(50000)
      $('.money3').text(100000)
      $('.money4').text(300000)
      $('.money5').text(500000)
      $('.money6').text(1000000)
    } else if (total >= 500000) {
      $('.money').text(total)
      $('.money1').text(10000)
      $('.money2').text(50000)
      $('.money3').text(100000)
      $('.money4').text(300000)
      $('.money5').text(500000)
    } else if (total >= 300000) {
      $('.money').text(total)
      $('.money1').text(10000)
      $('.money2').text(50000)
      $('.money3').text(100000)
      $('.money4').text(300000)
    } else if (total >= 100000) {
      $('.money').text(total)
      $('.money1').text(10000)
      $('.money2').text(50000)
      $('.money3').text(100000)
    } else if (total >= 50000) {
      $('.money').text(total)
      $('.money1').text(10000)
      $('.money2').text(50000)
    }  else if (total >= 10000) {
      $('.money').text(total)
      $('.money1').text(10000)
    } else {
      $('.money').text(total)
    }
  } else {
    $('.money').text('0')
  }
}

/*按钮状态*/
function changeBtn(arr) {
  arr.forEach(function (item,index) {
    $('.button').eq(item).removeClass('button' + item)
    $('.button').eq(item).css('backgroundImage','url(./images/finished.png)')
  })
}


var init = {
  isClick: false
};

/*请求状态*/
$.ajax({
  url: url + 'activityApplyList',
  type:'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: token
  },
  data: {
    class: 'A0010'
  },
  dataType: 'json',
  success: function (res) {
    if (res && res.code === 200) {
      initMoney(parseInt(res.data.deposit_total))
      changeBtn(res.data.order_obtain)
      // init.isClick = false;
    } else {
      // init.isClick = false;
    }
  }
})

/*领取*/
function getMoney(item) {
  $.ajax({
    url: url + 'activityApply?class=A0010&json={"id":' + item +'}',
    type:'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        $('#account').text(JSON.parse(localStorage.getItem('userinfo'))['userName'])
        $('#tc_award #money').text(awards[item])
         layer.open({
           title: '',
           area: ['31.14vw', '15.20vw'],
           type: 1,
           closeBtn: false,
           shadeClose: false,
           scrollbar: false,
           resize:false,
           // anim: 1,
           fixed: true,
           skin: 'tc',
           content: $('#tc_award')
         });
        $('.button').eq(item).removeClass('button' + item)
        $('.button').eq(item).css('backgroundImage','url(./images/finished.png)')
        init.isClick = false;
      } else {
        layer.closeAll();
        $('#tc_tip .txt2').text(res.message)
        layer.open({
          title: '',
          area: ['31.14vw', '15.20vw'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize:false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_tip')
        });
        init.isClick = false;
      }

    }
  })
}

$('.content1 .button0').on('click',function (e) {
  if ($(this).hasClass('button0')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(0)
  }

})

$('.content2 .button1').on('click',function () {
  if ($(this).hasClass('button1')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(1)
  }

})

$('.content3 .button2').on('click',function () {
  if ($(this).hasClass('button2')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(2)
  }

})

$('.content4 .button3').on('click',function () {
  if ($(this).hasClass('button3')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(3)
  }

})

$('.content5 .button4').on('click',function () {
  if ($(this).hasClass('button4')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(4)
  }

})

$('.content6 .button5').on('click',function () {
  if ($(this).hasClass('button5')) {
    if (init.isClick) {
      return
    }
    init.isClick = true
    getMoney(5)
  }

})




