$(function () {
  var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1';
  var url = window.location.origin + '/api/' + user11 + '/';
  var token = localStorage.getItem('token');
  //弹框
  $('.butt').click(function () {
    $('.mes').hide()
  })
  $('.but').click(function () {
    checkIn()
  })
  $('.close').click(function () {
    $('.meser').hide()
  })
  const date = new Date()
  date.setTime(new Date().getTime()-1000*60*60*12)
  date.setDate(1)
  const weekday = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  const fistDay = weekday[date.getDay()]
  //状态获取
  function dataGet(){
    $.ajax({
      method:'post',
      url: url + "preferential/qiandao/getWeekList",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      },
      dataType:'json',
      data:{type:'weekQiandaoList'},
      success(data){
        if (data.code === 400) {
          $('.addup span').text('0元')
        } else {
          let list = data.data.status
          let addup =data.data.addup

          if (addup==undefined){
            addup=0;
          }
          $('.addup span').text(''+addup+'元')
          $.each(list,function(k,v){
            if(v.success){
              $('.day').eq(k).css({background:'#f54242'})
              $('.day_yes').eq(k).css({display:'block'})
              $('.day_no').eq(k).css({display:'none'})
              $('.day_yes span').eq(k).text(''+v.money+'元')
            }
          })
        }

      },
      error(e){
        console.log(e)
      }
    })

  }

  //签到
  function checkIn(){
    $.ajax({
      method:'post',
      url: url+"preferential/signIn",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      },
      dataType:'json',
      data:{type: '1',num:'1'},
      success(data){
        if (data.code === 400) {
          $('.meser').show()
          $('.meser .err span').text(data.message)
        } else {
          let mes = data.message
          let money = data.data.money
          let datcon = data.data.daynum
          if(data.code==200){
            $('.content h1').text('奖励'+money+'元')
            $('.content p').text('已连续签到'+datcon+'天')
            $('.mes').show()
            dataGet()
          } else{
            $('.meser').show()
            $('.meser .err span').text(mes)
          }
        }
      },
      error(e){
        console.log(e)
      }
    })
  }

  //月状态获取
  function monGet () {
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    const maxDay = new Date(y, m, 0).getDate()
    for (let i = 1; i <= maxDay; i++) {
      j = i < 10 ? 0 + '' + i : i
      $('#days').append('<li class="defaulDay">' + j + '</li>')
    }
    let defaulWidth = $('.d')[0].getBoundingClientRect().width;
    $('.defaulDay').eq(0).css({ marginLeft: weekday.indexOf(fistDay) * defaulWidth + 'px' })
    $('.date-title').html(y + '年-' + m + '月')
    $.ajax({
      method: 'post',
      url: url + 'preferential/getMonthList',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      },
      dataType: 'json',
      data: { type: 'weekQiandaoList' },
      success (data) {
        if (data.code === 200) {
          $('.defaulDay').css({display:'none'})
          $('#days').children().remove()
          $.each(data.data, function (k, v) {
            let day = v.monthDay.substr(6)
            if (v.status) {
              $('#days').append('<li class="d"><img src="./img/singed.png"><span class="dates">' + day + '</span><span>'+v.money+'元</span></li>')
            } else {
              $('#days').append('<li class="d"><span class="dates">' + day + '</span><span>'+v.money+'元</span></li>')
            }
          })
          let dw = $('.d')[0].getBoundingClientRect().width;
          $('.d').eq(0).css({ marginLeft: weekday.indexOf(fistDay) * dw + 'px' })
        }
      },
      error (e) {
        console.log(e)
      }
    })
  }

  //宝箱状态获取
  function boxGet () {
    $.ajax({
      method: 'post',
      url: url + 'preferential/baiBaoXiang',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      },
      dataType: 'json',
      data: { },
      success (data) {
        if (data.code === 200) {
          $('#box').children().remove()
          $('.defaul').css({ display: 'none' })
          $.each(data.data.status, function (k, v) {
            if (v.statusSign === 1) {
              $('#box').append('<li class="can1" index='+k+'><span>'+v.signdaynember+'天</span><img src="img/gray.png" alt=""></li>')
            } else if (v.statusSign === 2) {
              $('#box').append('<li class="can" index='+k+'><span>'+v.signdaynember+'天</span><img src="img/guanbi.png" alt=""></li>')
            } else {
              $('#box').append('<li class="can3" index='+k+'><span>'+v.signdaynember+'天</span><img src="img/open.png" alt=""></li>')
            }
          })
          take()
        }
      },
      error (e) {
        console.log(e)
      }
    })
  }

  //领取宝箱

  function take (i) {
    $('.can').each(function () {
      $(this).click(function () {
        let num = $(this).attr('index')
        $.ajax({
          method: 'post',
          url: url + 'preferential/signIn',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: token
          },
          dataType: 'json',
          data: { type: '2',num:num },
          success (data) {
            if (data.code === 400) {
              $('.meser').show()
              $('.meser .err span').text(data.message)
            } else {
              $('.content p').text('已累计签到' + data.data.signNumber + '天')
              $('.content h1').text('奖励' + data.data.money + '元')
              $('.mes').show()
              monGet()
              boxGet()
            }
          },
          error (e) {
            console.log(e)
          }
        })
      })
    })
  }
  $('.defaul').each(function () {
    $(this).click(function () {
      $('.meser').show()
      $('.meser .err span').text('请登录')
    })
  })
  dataGet()
  monGet()
  boxGet()
})
