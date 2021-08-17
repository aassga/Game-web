var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')


var total = 0;

var awards = [3,38,68];

function initMoney (num, total) {
  if  (total > 0) {
    if (total >= 50000) {
      $('.section' + num +' .money1').text(5000)
      $('.section' + num +' .money2').text(30000)
      $('.section' + num +' .money3').text(50000)
    } else if (total >=30000) {
      $('.section' + num +' .money3').text(total)
      $('.section' + num +' .money1').text(5000)
      $('.section' + num +' .money2').text(30000)
    } else if (total >= 5000) {
      $('.section' + num +' .money').text(total)
      $('.section' + num +' .money1').text(5000)
    } else {
      $('.section' + num +' .money').text(total)
    }
  } else {
    $('.section' + num +' .money').text('0')
  }
}

/*按钮状态*/
function changeBtn(num, arr) {
  arr.forEach(function (item,index) {
    $('.section' + num + ' .button').eq(item).removeClass('button' + item)
    $('.section' + num + ' .button').eq(item).css('backgroundImage','url(./images/finished.png)')
  })
}


var init = {
  isClick: false
};

/*请求状态*/
$.ajax({
  url: url + 'activityApplyList',
  // url:'a.json',
  type:'post',
  // type:'get',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: token
  },
  data: {
    class: 'A0011'
  },
  dataType: 'json',
  success: function (res) {
    if (res && res.code === 200) {
      console.log(res.data)
      for (let key in res.data) {
        initMoney(key, parseInt(res.data[key].bet_money))
        changeBtn(key, res.data[key].order_obtain)
      }
    } else {
    }
  }
})

/*领取*/
function getMoney(num , name, item) {
  $.ajax({
    url: url + 'activityApply?class=A0011&json={"id":' + item +',"name":"' + name + '"}',
    // url:'a.json',
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
          area: ['79.73vw', '38.93vw'],
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
        $('.section' + num + ' .button').eq(item).removeClass('button' + item)
        $('.section' + num + ' .button').eq(item).css('backgroundImage','url(./images/finished.png)')
        init.isClick = false;
      } else {
        layer.closeAll();
        $('#tc_tip .txt2').text(res.message)
        layer.open({
          title: '',
          area: ['79.73vw', '38.93vw'],
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

for (let i = 0; i < 3; i++) {
  $('.section1 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(1, '抢庄牛牛', i)
    }
  })
  $('.section2 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(2, '二人麻将', i)
    }
  })
  $('.section3 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(3, '炸金花', i)
    }
  })
  $('.section4 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(4, '财神捕鱼', i)
    }
  })
  $('.section5 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(5, '三公', i)
    }
  })
  $('.section6 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(6, '跑得快', i)
    }
  })
  $('.section7 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(7, 'AG视讯', i)
    }
  })
  $('.section8 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(8, '冰球突破豪华版', i)
    }
  })
  $('.section9 .button' + i).on('click',function (e) {
    if ($(this).hasClass('button' + i)) {
      if (init.isClick) {
        return
      }
      init.isClick = true
      getMoney(9, '捕鱼王3D', i)
    }
  })
}
