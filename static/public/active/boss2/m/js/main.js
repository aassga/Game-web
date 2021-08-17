var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')

var init = {
  isClick: false
};

$('#apply').on('click',function () {
  if (init.isClick) {
    return
  }
  init.isClick = true
  $.ajax({
    url: url + 'activityApply?class=A0015',
    type:'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      console.log(res)
      if (res && res.code === 200) {
        // $('#account').text(JSON.parse(localStorage.getItem('userinfo'))['userName'])
        $('#tc_award #money').text(res.data.git_amount)
        layer.open({
          title: '',
          area: ['63.73vw', '84.26vw'],
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
          area: ['86.93vw', '44.4vw'],
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
