var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')


var init = {
  isClick: false,
  isClick2: false
};
$.ajax({
  url: url + 'activityChessTaskInfoJ0015',
  // url: '../a.json',
  type:'post',
  // type:'get',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: token
  },
  dataType: 'json',
  success: function (res) {
    var min = 100;
    var max = 0;//最高档位
    // console.log(res.data.data)
    if (res && res.code === 200) {
      $('.money').text(res.data.userData.giftMoney)
      /*红包记录*/
      var arr1 = res.data.data;
      var tbody1 = '';
      if (arr1.length !== 0) {
        $('.section2 .box1 .content1').hide()
        $('.section2 .box1 .content2').show()
        arr1.forEach(function (item,index) {
          tbody1 += '<tr><td>' + item.title + '</td><td>+ ' + item.money + '</td>'
        })
        $('.tbody1').html(tbody1)
      }
      /*赚钱攻略*/
      var arr2 = res.data.config;
      var tbody2 = `<tr>
                      <td>存款金额</td>
                      <td>打码量</td>
                      <td>红包次数</td>
                    </tr>`;
      if (arr2.length !== 0) {
        min = arr2[0].depositAmount
        max = arr2[arr2.length - 1].depositAmount
        $('.section2 .box2 .content1').hide()
        $('.section2 .box2 .content2').show()
        arr2.forEach(function (item,index) {
          tbody2 += '<tr><td>' + item.depositAmount + '+</td><td>X'+ item.multiple + '</td><td>1</td>'
        })
        $('.tbody2').html(tbody2)
      }

      /*存款金额
      * depositAmount  存款
      * configDepositAmount  档位
      * */
      if (Number(res.data.userData.depositAmount) >= 0) {
        if (Number(res.data.userData.depositAmount) < min) {
          /*进度提示*/
          $('.tishi1 .money_full').text(Number(min))
          $('.tishi1 .money_left').text(min - Number(res.data.userData.depositAmount))
          /*进度条*/
          // $('.section2 #progress').css('width',parseInt(res.data.userData.depositAmount) + '%')
          $('.section1 #progress').css('width','25%')
        } else {
          /*进度提示*/
          $('.tishi1').hide()
          $('.tishi2').show()
          $('.tishi2 .money_full').text(Number(res.data.userData.configDepositAmount))
          /*进度条*/
          if (Number(res.data.userData.depositAmount) / max >= 0.25) {
            $('.section1 #progress').css('width',Number(res.data.userData.depositAmount) / max * 100 + '%')
          } else {
            $('.section1 #progress').css('width','25%')
          }
          /*title*/
          if (res.data.userData.giftMoney > 0) {
            $('.section1 .text').text('您已获得红包')
            $('.section1 .process').hide()
            $('.section1 .tishi').hide()
            // $('.section1 .button1 ').hide()
            // $('.section1 .button2 ').show()

          }
        }
      }
    } else {
      $('.t1').text('请登录')
    }

  }
})

$('#button').on('click',function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  $.ajax({
    url: url + 'activityChessTaskInfoJ0015Check',
    // url: '../b.json',
    type:'post',
    // type:'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        //可以领取
        layer.closeAll();
        if (res.data.level === 0 && res.data.BetAmount === 0) {
          layer.open({
            title: '',
            area: ['72.66vw', '95.2vw'],
            type: 1,
            closeBtn: false,
            shadeClose: false,
            scrollbar: false,
            resize:false,
            // anim: 1,
            fixed: true,
            skin: 'tc',
            content: $('#tc_box1')
          });
        } else {
          /*打码不足*/
          $('#tc_box2 .money1').text(res.data.BetAmount)
          $('#tc_box2 .level').text(res.data.level)
          layer.open({
            title: '',
            area: ['96.13vw', '106.8vw'],
            type: 1,
            closeBtn: false,
            shadeClose: false,
            scrollbar: false,
            resize:false,
            // anim: 1,
            fixed: true,
            skin: 'tc',
            content: $('#tc_box2')
          });
          init.isClick = false;
        }
        // init.isClick = false;
      } else {
        layer.closeAll();
        // $('#tc_box4 .txt1').text(res.message)
        layer.msg(res.message,{
          time:3000
        },function () {
          init.isClick = false;
        })

       /* layer.open({
          title: '',
          area: ['100vw', '78.8vw'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize:false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_box4')
        });*/
        // init.isClick = false;
      }

    }
  })

})
$('#tc_box2 .button2, #open').on('click',function () {
  if (init.isClick2) {
    return
  }
  init.isClick2 = true
  $.ajax({
    url: url + 'activityChessTaskReceiveJ0015',
    // url: '../c.json',
    type:'post',
    // type:'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        layer.closeAll();
        $('.money').text(res.data.gift_money)
        $('#tc_box3 .money3').text(res.data.gift_money)
        $('.section1 .text').text('您已获得红包')
        $('.section1 .process').hide()
        $('.section1 .tishi').hide()
        $('.section1 .ps').show()

        // $('.section1 .button1 ').hide()
        // $('.section1 .button2 ').show()
        layer.open({
          title: '',
          area: ['80.8vw', '74.26vw'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize:false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_box3')
        });
        init.isClick2 = false;
        init.isClick = false;
      } else {
        layer.closeAll();
       /* $('#tc_box4 .txt1').text(res.message)
        layer.open({
          title: '',
          area: ['100vw', '78.8vw'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize:false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#tc_box4')
        });*/
        layer.msg(res.message,{
          time:3000
        },function () {
          init.isClick = false;
          init.isClick2 = false;
        })
        // init.isClick2 = false;
      }

    }
  })

})
