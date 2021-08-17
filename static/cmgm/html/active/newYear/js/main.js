var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin+ '/frontend/' + user11 + '/'
// var url ='http://tg.n9963.com'+ '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')
var init = {
  isClick: false
};
/*领取*/
function getMoney(item) {
  $.ajax({
    //  'activityApply?class=C0001&handle=1&json={"id":' + item +'}''
    url: url + 'activityApply?class=C0001&handle=1&json={"id":' + item +'}',
    type:'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    dataType: 'json',
    success: function (res) {
      if (res && res.code === 200) {
        console.log(res)
      
          $('#giveMoney').text(res.data)
           layer.closeAll();
        layer.open({
          title: '',
          shift: -1,
          area: ['601px', '782px'],
          type: 1,
          closeBtn: false,
          shadeClose: false,
          scrollbar: false,
          resize:false,
          // anim: 1,
          fixed: true,
          skin: 'tc',
          content: $('#form')
        });
       
        
        init.isClick = false;
      } else {
       
        layer.closeAll();
        $('#tc_tip .txt2').text(res.message)
        layer.open({
          title: '',
          area: ['791px', '381px'],
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

$('.eagT').on('click',function (e) {
 
  init.isClick = true

  getMoney(1)
})

$('.eagY').on('click',function (e) {
  init.isClick = true
  getMoney(2)
})

$('.eagJ').on('click',function (e) {
  init.isClick = true
  getMoney(3)
})

$('.eagC').on('click',function (e) {
  init.isClick = true
  getMoney(4)
})