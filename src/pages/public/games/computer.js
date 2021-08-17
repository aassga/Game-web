const mixin={
       data () {
           return {
            rollList: [
                {
                  id: '55',
                  class: 'hot_game',
                   type: {
                    list: [
                      { name: '全选', tag: '' },
                      { name: '最新游戏', tag: 'NEW' },
                      { name: '热门游戏', tag: 'HOT' },
                      { name: '老虎机', tag: 'SLO' },
                      { name: '大额投注', tag: 'MAX' },
                      { name: '小额投注', tag: 'MIN' },
                      { name: '经典拉霸', tag: 'FRT' },
                      { name: '消消乐', tag: 'CLH' }
                    ]
                  },
                  line: {
                    list: [
                      { name: '全选', tag: '' },
                      { name: '5-10线', tag: '5-10' },
                      { name: '15-20线', tag: '15-20' },
                      { name: '25-30线', tag: '25-30' },
                      { name: '更多', tag: 'MOR' }
                    ]
                  }
                },
              ],
              nowTypeList: {
                type: { list: [] },
                line: { list: [] },
                thirt: { list: [] }
              },
              DefaultGameData:[
                {
                  code: "8047",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/170.jpg",
                  id: 170,
                  lock: 0,
                  name: "变脸2",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "14023",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/172.jpg",
                  id: 172,
                  lock: 0,
                  name: "赌王扑克",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "14025",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/176.jpg",
                  id: 176,
                  lock: 0,
                  name: "幸运赛车",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "14026",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/177.jpg",
                  id: 177,
                  lock: 0,
                  name: "发大财",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "15013",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/178.jpg",
                  id: 178,
                  lock: 0,
                  name: "九尾狐",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "9004",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/179.jpg",
                  id: 179,
                  lock: 0,
                  name: "啤酒大亨",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "9006",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/180.jpg",
                  id: 180,
                  lock: 0,
                  name: "花果山传奇",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "9007",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/181.jpg",
                  id: 181,
                  lock: 0,
                  name: "超激发水果盘",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8001",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/182.jpg",
                  id: 182,
                  lock: 0,
                  name: "幸运龙",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8002",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/183.jpg",
                  id: 183,
                  lock: 0,
                  name: "唐伯虎点秋香",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8003",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/184.jpg",
                  id: 184,
                  lock: 0,
                  name: "变脸",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8004",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/185.jpg",
                  id: 185,
                  lock: 0,
                  name: "悟空",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8005",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/186.jpg",
                  id: 186,
                  lock: 0,
                  name: "骆马大冒险",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8006",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/187.jpg",
                  id: 187,
                  lock: 0,
                  name: "台湾黑熊",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8007",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/188.jpg",
                  id: 188,
                  lock: 0,
                  name: "幸运麟",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "14019",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/189.jpg",
                  id: 189,
                  lock: 0,
                  name: "宝石物语",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8014",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/190.jpg",
                  id: 190,
                  lock: 0,
                  name: "招财狮",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8015",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/191.jpg",
                  id: 191,
                  lock: 0,
                  name: "月光秘宝",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8016",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/192.jpg",
                  id: 192,
                  lock: 0,
                  name: "上班族狂想曲",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8017",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/193.jpg",
                  id: 193,
                  lock: 0,
                  name: "过新年",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8018",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/194.jpg",
                  id: 194,
                  lock: 0,
                  name: "拿破仑",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8019",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/195.jpg",
                  id: 195,
                  lock: 0,
                  name: "文房四宝",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8020",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/196.jpg",
                  id: 196,
                  lock: 0,
                  name: "芝麻开门",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8021",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/197.jpg",
                  id: 197,
                  lock: 0,
                  name: "黄金香蕉帝国",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8022",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/198.jpg",
                  id: 198,
                  lock: 0,
                  name: "麻雀无双",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8023",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/199.jpg",
                  id: 199,
                  lock: 0,
                  name: "奥林匹亚神庙",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8024",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/200.jpg",
                  id: 200,
                  lock: 0,
                  name: "水晶王国",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8025",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/201.jpg",
                  id: 201,
                  lock: 0,
                  name: "神偷妙贼",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                },
                {
                  code: "8026",
                  icon: "http://xpjstatic.7876111.com/images/default/pc/202.jpg",
                  id: 202,
                  lock: 0,
                  name: "热舞教父",
                  series: 10021,
                  tag: "",
                  title: "",
                  type: "game"
                }
              ]
           }
       },
       methods: {
            
       }
}
export default mixin