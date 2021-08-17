var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')

var arr1 = ['恭喜发财','万事如意','富贵吉祥','财运亨通','财源广进','吉星高照']
var arr2 = ['年年有余，合家幸福','路路通畅，步步高升','财源广进，富贵吉祥','年年如意，岁岁平安','新年吉祥，前程似锦','财运亨通，合家欢乐']
$('#tc_tip .txt1').text(arr1[Math.floor(Math.random() * arr1.length)])
$('#tc_award .txt1').text(arr2[Math.floor(Math.random() * arr2.length)])

var init = {
  isClick: false
};
/*后台获取时间转换成秒*/
function getSec (obj) {
  var changTime = obj.split(/[- : \/]/);
  return  new Date(changTime[0], changTime[1] - 1, changTime[2], changTime[3], changTime[4], changTime[5]).getTime() / 1000
}

/*请求时间状态*/
function ajaxLottery() {
  $.ajax({
    url: url+"preferential/redPacketRainTime",
    // url: 'a.json',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: token
    },
    // data: {type: 'time'},
    dataType: 'json',
    cache: false,
    // type: 'get',
    type: 'post',
    success: function (res) {
      // console.log(res)
      /*if (res.code !== 200) {
        showMsg(res.message);
        return false;
      }*/
      var obj = res.data;
      switch (obj.ecode) {
        case 400:
          // 活动未开始
          $('#hb .txt').text('距离活动开始还有')
          var c_time = getSec(obj.c_time)
          var start_time = getSec(obj.start_time)
          var totals = start_time - c_time;
          var clock = $('.clock').FlipClock(totals + 1,{
            clockFace: 'DailyCounter',
            autoStart: true,
            countdown: true,
            language: 'Chinese',
            callbacks: {
              stop: function() {
                window.location.reload();
              }
            }
          });

          return false;
          break;

        case 700:
          //活动结束
          // $('.container').removeClass('fire')
          $('.times').hide()
          $('#hb .txt').text('红包雨活动已结束')
          $('#hb .end').show()
          break;
        case 300:
          //下一波倒计时
          $('#hb .txt').text('距离下一波开始还有')
          var c_time = getSec(obj.c_time)
          var start_time = getSec(obj.start_time)
          var totals = start_time - c_time;
          // console.log(totals)
          var clock = $('.clock').FlipClock(totals + 1,{
            clockFace: 'DailyCounter',
            autoStart: true,
            countdown: true,
            language: 'Chinese',
            callbacks: {
              stop: function() {
                ajaxLottery()
              }
            }
          });
          break;
        case 200:
          //进行中
          // $('.container').removeClass('fire')
          $('#hb .txt').text('距离这一波结束还有')
          var c_time = getSec(obj.c_time)
          var end_time = getSec(obj.end_time)
          var totals = end_time - c_time;
          var clock = $('.clock').FlipClock(totals + 1,{
            clockFace: 'DailyCounter',
            autoStart: true,
            countdown: true,
            language: 'Chinese',
            callbacks: {
              stop: function() {
                clearInterval(timerhb)
                ajaxLottery()
              }
            }
          });
          var timerhb = setInterval(hby, 200);
          break;
        default:
          break;

      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      var x = 1;
    }
  })
}

/*抢红包*/
$(".container").on("click", "[data-key='logn']",function () {
  layer.open({
    title: '',
    area: ['26.71vw', '34.63vw'],
    type: 1,
    closeBtn: false,
    shadeClose: false,
    scrollbar: false,
    resize:false,
    // anim: 1,
    fixed: true,
    skin: 'tc',
    content: $('#box')
  });
})

/*提示信息*/
/*
$('#open').on('click',function () {
  layer.closeAll();
  layer.open({
    title: '',
    area: ['26.71vw', '34.63vw'],
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
})
*/


/*中奖了*/
/*$('#open').on('click',function () {
  layer.closeAll();
  layer.open({
    title: '',
    area: ['26.71vw', '34.63vw'],
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
})*/

$('#open').on('click',function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  $.ajax({
    url: url + 'preferential/openRedPacket',
    type:'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    data: {
      active_type: 'red_packet_rain'
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        layer.closeAll();
        $('#tc_award #money').text(res.data.money)
        layer.open({
          title: '',
          area: ['26.71vw', '34.63vw'],
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
        init.isClick = false;
      } else {
        layer.closeAll();
        $('#tc_tip .txt2').text(res.message)
        layer.open({
          title: '',
          area: ['26.71vw', '34.63vw'],
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

})



