var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')


var init = {
  isClick: false
};
/*
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
});*/

/*提示信息*/
/*
$('#open').on('click',function () {
  layer.closeAll();
  layer.open({
    title: '',
    area: ['27.81vw', '39.79vw'],
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
    area: ['27.81vw', '39.79vw'],
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
      active_type: 'red_packet'
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        layer.closeAll();
        $('#tc_award #money').text(res.data.money)
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

})



