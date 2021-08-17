var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')
var money = [1000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000];
/*请求状态*/


$.ajax({
  url: url + 'activityApplyList',
  type: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: token
  },
  data: {
    class: 'A0019'
  },
  dataType: 'json',
  success: function (res) {
    if (res && res.code === 200) {
      let index
      let width
      let num
      if (res.data == '未领取' || !res.data.total_count) {
        $('.load').css('width', 0)
        return
      }
      // let count=20000;
      let count = res.data.total_count;
      if (!money.includes(count)) {
        money.push(count);
        money.sort((a, b) => {
          return a - b
        })
        money.forEach((item, i) => {
          if (count == item) {
            index = i;
            if (i != 0) {
              if (i != money.length - 1) num = ((money[i] - money[i - 1]) * 107.8) / (money[i + 1] - money[i - 1])
              else num = 0
            } else {
              num = money[i] * 107.8 / 1000;
            }
            width = 107.8 * i + num + 'px'
          }
        });
      } else {
        money.forEach((item, i) => {
          if (count == item) {
            index = i;
            width = 107.8 * (i + 1) + 'px'
          }
        });
      }
      $('.load').css('width', width)
      for (var i = 0; i < index; i++) {
        if (i % 2 == 0) {
          $('.color' + i).css('background', 'url(./images/lightUp.png) no-repeat')
        } else {
          $('.color' + i).css('background', 'url(./images/lightDown.png) no-repeat')
        }
      }
    }
  }
})

/*领取*/
// function getMoney(item) {
//   $.ajax({
//     url: url + 'activityApply?class=A0010&json={"id":' + item +'}',
//     type:'get',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: token
//     },
//     dataType: 'json',
//     success: function (res) {
//       if (res && res.code === 200) {
//         $('#account').text(JSON.parse(localStorage.getItem('userinfo'))['userName'])
//         $('#tc_award #money').text(awards[item])
//          layer.open({
//            title: '',
//            area: ['31.14vw', '15.20vw'],
//            type: 1,
//            closeBtn: false,
//            shadeClose: false,
//            scrollbar: false,
//            resize:false,
//            // anim: 1,
//            fixed: true,
//            skin: 'tc',
//            content: $('#tc_award')
//          });
//         $('.button').eq(item).removeClass('button' + item)
//         $('.button').eq(item).css('backgroundImage','url(./images/finished.png)')
//         init.isClick = false;
//       } else {
//         layer.closeAll();
//         $('#tc_tip .txt2').text(res.message)
//         layer.open({
//           title: '',
//           area: ['31.14vw', '15.20vw'],
//           type: 1,
//           closeBtn: false,
//           shadeClose: false,
//           scrollbar: false,
//           resize:false,
//           // anim: 1,
//           fixed: true,
//           skin: 'tc',
//           content: $('#tc_tip')
//         });
//         init.isClick = false;
//       }

//     }
//   })
// }

// $('.content1 .button0').on('click',function (e) {
//   if ($(this).hasClass('button0')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(0)
//   }

// })

// $('.content2 .button1').on('click',function () {
//   if ($(this).hasClass('button1')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(1)
//   }

// })

// $('.content3 .button2').on('click',function () {
//   if ($(this).hasClass('button2')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(2)
//   }

// })

// $('.content4 .button3').on('click',function () {
//   if ($(this).hasClass('button3')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(3)
//   }

// })

// $('.content5 .button4').on('click',function () {
//   if ($(this).hasClass('button4')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(4)
//   }

// })

// $('.content6 .button5').on('click',function () {
//   if ($(this).hasClass('button5')) {
//     if (init.isClick) {
//       return
//     }
//     init.isClick = true
//     getMoney(5)
//   }

// })




