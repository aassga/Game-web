var sites = [
  { siteId: 67,
    siteName: '新葡京棋牌' },
  { siteId: 74,
    siteName: '澳门新葡京',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/admin/login'
  },
  {
    siteId: 50,
    siteName: '金沙娱乐场' },
  {
    siteId: 49,
    siteName: '金星国际' },
    {
      siteId:86,
      siteName:'太阳城集團' },    
  { siteId: 16,
    siteName: '新葡京棋牌' },
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
    siteName: '开元棋牌',
    pclink: '',
    h5link: location.origin + '/m/#/admin/login'
  },
  { siteId: 14,
    siteName: '澳门新葡京' },
  { siteId: 10,
    siteName: '彩票网' },
  { siteId: 71,
    siteName: '澳门威尼斯人',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/admin/login'
  },
  { siteId: 61, // aqvns
    siteName: '澳门威尼斯' },
  { siteId: 85,
    siteName: '澳门金沙赌场' },  
  { siteId: 60, // amvnsr
    siteName: '澳门威尼斯人',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-b'
  },
  { siteId: 54, // bet365
    siteName: 'bet365',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 52, // betsb
    siteName: 'bet365' },
  // { siteId: 58,
  //   siteName: '澳门巴黎人' },
  { siteId: 58,
    siteName: 'bet365',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/admin/login'
  },
  { siteId: 6,
    siteName: '环球娱乐' },
  { siteId: 31,
    siteName: '澳门永利皇宫' },
  { siteId: 46,
    siteName: '金沙娱乐场',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 3,
    siteName: '客拉客',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 25,
    siteName: '开元棋牌' },
  { siteId: 57, // mgm
    siteName: '澳门美高美' },
  { siteId: 45, // cmgm
    siteName: '澳门美高梅' },
  { siteId: 47,
    siteName: '葡京赌场',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 13,
    siteName: '澳门新葡京',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 80,
    siteName: '澳门新葡京',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 56,
    siteName: '澳门太阳城',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 82,
    siteName: '澳门太阳城',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 75, // vnso
    siteName: '太阳城集团' },
  { siteId: 48, // vnst
    siteName: '澳门威尼斯人',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/admin/login'
  },
  { siteId: 81, // vns81
    siteName: '澳门威尼斯人',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/admin/login'
  },
  { siteId: 15,
    siteName: '新葡京赌场',
    pclink: location.origin + '/#/home',
    h5link: location.origin + '/m/#/home-login-a'
  },
  { siteId: 42,
    siteName: '开元棋牌' },
  { siteId: 22,
    siteName: '开元棋牌' },
  { siteId: 1,
    siteName: '本站' },
  { siteId: 43,
    siteName: '开元棋牌',
    pclink: '',
    h5link: location.origin + '/m/#/admin/vns-login'
  },
  { siteId: 63,
    siteName: '乐游棋牌',
    pclink: '',
    h5link: location.origin + '/m/#/admin/vns-login'
  },
  { siteId: 68,
    siteName: '澳门太阳城',
    pclink: '',
    h5link: location.origin + '/m/#/admin/vns-login'
  }
]
var siteInt = '', site
$.ajax({
  url: window.location.origin + '/frontend/v1/config',
  type: 'get',
  async: false,
  dataType: 'json',
  success: function (res) {
    var siteName
    var siteId = res.data.siteId
    var service = res.data.siteConfig.service.length > 0 ? res.data.siteConfig.service.filter(function (item) {
      return item.status === 'on'
    })[0].url : window.location.origin
    site = sites.filter(function (item) {
      return item.siteId === siteId
    })
    if (site.length !== 0) {
      siteInt = site[0].siteInt
      siteName = site[0].siteName
    } else {
      siteInt = 'test'
      siteName = '本站'
    }
    /* 站点名 */
    [].forEach.call(document.querySelectorAll('.siteName'), function (item) {
      item.innerText = siteName
    });
    /* 客服链接 */
    [].forEach.call(document.querySelectorAll('.kf'), function (item) {
      item.href = service
    })
  }
})
