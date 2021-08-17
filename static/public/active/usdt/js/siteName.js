var sites = [
  { siteId: 67,
    siteName: '新葡京棋牌' },
  { siteId: 74,
    siteName: '澳门新葡京' },
  {
    siteId:86,
    siteName:'太阳城集團' },    
  {
    siteId:50,
    siteName:'金沙娱乐场' },
  {
    siteId:49,
    siteName:'金星国际' },
  { siteId: 16,
    siteName: '新葡京棋牌'},
  { siteId: 44,
    siteName: '亚博' },
  { siteId: 9,
    siteName: '全民彩票' },
  { siteId: 16,
    siteName: '开元棋牌' },
  { siteId: 8,
    siteName: '澳门威尼斯人' },
  { siteId: 55,
    siteName: '澳门永利皇宫' },
  { siteId: 72,
      siteName: '澳门金沙娱乐场' },
  { siteId: 73,
      siteName: 'bet365' },
  { siteId: 14,
      siteName: '澳门新葡京' },
  { siteId: 10,
      siteName: '彩票网' },
  { siteId: 71,
        siteName: '金沙娱乐场' },
  { siteId: 61, // amvnsr
      siteName: '澳门威尼斯' },
  { siteId: 60, // amvnsr
    siteName: '澳门威尼斯人' },
  { siteId: 54, //bet365
    siteName: 'bet365' },
  { siteId: 52, //betsb
    siteName: 'bet365' },
  // { siteId: 58,
  //   siteName: '澳门巴黎人' },
  { siteId: 58,
      siteName: 'bet365' },
  { siteId: 6,
    siteName: '环球娱乐' },
  { siteId: 31,
    siteName: '澳门永利皇宫' },
  { siteId: 46,
    siteName: '金沙娱乐场' },
  { siteId: 3,
    siteName: '客拉客' },
  { siteId: 25,
    siteName: '开元棋牌' },
  { siteId: 57, //mgm
    siteName: '澳门美高美' },
  { siteId: 45, //cmgm
    siteName: '澳门美高梅' },
  { siteId: 47,
    siteName: '葡京赌场' },
  { siteId: 13,
    siteName: '澳门新葡京' },
  { siteId: 56,
    siteName: '澳门太阳城' },
  { siteId: 75, //vnso
    siteName: '太阳城集团' },
  { siteId: 48, //vnst
    siteName: '澳门威尼斯人' },
  { siteId: 15,
    siteName: '新葡京赌场' },
  { siteId: 42,
    siteName: '开元棋牌' },
  { siteId: 22,
    siteName: '开元棋牌' },
  { siteId: 1,
    siteName: '测试站' },
  {
    siteId:85,
    siteName:'澳门金沙赌场' },  
];
$.ajax({
  url: window.location.origin + '/frontend/v1/config',
  type:'get',
  dataType: 'json',
  success: function (res) {
    var siteName;
    var siteId = res.data.siteId
    var site = sites.filter(function (item) {
      return item.siteId === siteId
    })
    if (site.length !== 0) {
      siteName = site[0].siteName;
    } else {
      siteName = '测试站'
    }
    [].forEach.call(document.querySelectorAll('.siteName'), function(item){
      item.innerText = siteName
    })
  }
})
/*
switch (siteId) {
  case 55:
    siteName = '永利皇宫'
    break;
  case 60: // amvnsr
    siteName = '澳门威尼斯人'
    break;
  case 54: //bet365
    siteName = 'bet365'
    break;
  case 52: //betsb
    siteName = 'bet365'
    break;
  case 58:
    siteName = '澳门巴黎人'
    break;
  case 6:
    siteName = '环球娱乐'
    break;
  case 31:
    siteName = '廣東會'
    break;
  case 46:
    siteName = '金沙娱乐场'
    break;
  case 3:
    siteName = '客拉客'
    break;
  case 25:
    siteName = '开元棋牌'
    break;
  case 57: //mgm
    siteName = '澳门美高梅'
    break;
  case 45: //cmgm
    siteName = '澳门美高梅'
    break;
  case 47:
    siteName = '葡京赌场'
    break;
  case 13:
    siteName = '澳门新葡京'
    break;
  case 56:
    siteName = '澳门太阳城'
    break;
  case 59: //vnso
    siteName = '澳门威尼斯人'
    break;
  case 48: //vnst
    siteName = '澳门威尼斯人'
    break;
  case 15:
    siteName = '新葡京赌场'
    break;
  default:
    siteName = '测试站'
}
*/
// var siteId = JSON.parse(localStorage.getItem('config')).siteId

