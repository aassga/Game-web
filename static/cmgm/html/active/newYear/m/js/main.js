var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
//  var url ='http://klk.9161252.com:801'+ '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')
var money = [1000,5000,10000,20000,50000,100000,200000,500000,1000000,2000000];
/*请求状态*/
      
var init = {
  isClick: false
};
function getMoney(item) {
  $.ajax({
     url:url+'activityApply?class=C0001&handle=1&json={"id":' + item +'}' ,
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
          area: ['3.3rem', '4.36rem'],
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
        console.log(res.message)
        layer.closeAll();
        $('#tc_tip .txt2').text(res.message);
    
        layer.open({
          title: '',
          area: ['8.4rem', '4.61rem'],
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