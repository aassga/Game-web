var user11 = localStorage.getItem('Public_User') ? localStorage.getItem('Public_User') : 'v1'
var url = window.location.origin + '/frontend/' + user11 + '/'
var token = localStorage.getItem('token')
var money = [1000,5000,10000,20000,50000,100000,200000,500000,1000000,2000000];
/*请求状态*/
      
$.ajax({
  url: url + 'activityApplyList',
  type:'post',
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
      if(res.data=='未领取'||!res.data.total_count){
        $('.load').css('display','none')
        return
      }
      let count = res.data.total_count;
      if(!money.includes(count)){
        money.push(count);
        money.sort((a,b)=>{
          return a-b
        })
        money.forEach((item,i)=>{
          if(count==item){
            index = i;
            if(i!=0){
              if(i!=money.length-1) num = ((money[i]-money[i-1])*7.654)/(money[i+1]-money[i-1])
              else num =0
            } else {
              num = money[i]*7.654/1000;
            }
            width = 7.654*i+ num + 'vw'
          }
        });
      }else{
        money.forEach((item,i)=>{
          if(count==item){
            index = i;
            width = 7.654*(i+1)+'vw'
          }
        });
      }
      $('.load').css('width',width)
      $('.load').css('border','0.1rem solid rgb(40, 40, 137)')
      for (var i = 0; i < index; i++) {
        if (i % 2 == 0) {
          $('.color' + i).css('background', 'url(./images/lightUp.png) no-repeat')
          $('.color' + i).css('background-size', 'cover')
        } else {
          $('.color' + i).css('background', 'url(./images/lightDown.png) no-repeat')
          $('.color' + i).css('background-size', 'cover')
        }
      }
    } 
  }
})

