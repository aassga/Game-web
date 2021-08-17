const mixin = {
  data: function () {
    return {
      random: [{
          account: "",
          name: "江苏快3",
          ico: "/static/public/image/slide/slder1.jpg",
          out: 0
        },
        {
          account: "",
          name: "三分快3",
          ico: "/static/public/image/slide/slder.jpg",
          out: 0
        },
        {
          account: "",
          name: "5分六合彩",
          ico: "/static/public/image/slide/slder2.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐飞艇",
          ico: "/static/public/image/slide/slder3.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运赛车",
          ico: "/static/public/image/slide/slder4.jpg",
          out: 0
        },
        {
          account: "",
          name: "快乐赛车",
          ico: "/static/public/image/slide/slder5.jpg",
          out: 0
        },
        {
          account: "",
          name: "幸运飞艇",
          ico: "/static/public/image/slide/td1.jpg",
          out: 0
        },
        {
          account: "",
          name: "快速时时彩",
          ico: "/static/public/image/slide/slder6.jpg",
          out: 0
        },
        {
          account: "",
          name: "香港赛马",
          ico: "/static/public/image/slide/slder7.jpg",
          out: 0
        },
        {
          account: "",
          name: "三分时时彩",
          ico: "/static/public/image/slide/slder8.jpg",
          out: 0
        }
      ],
    };
  },
  created() {

  },
  mounted() {},
  methods: {
    fakeDatas() {
      let chars = ["-", ]
      for (var i = 0; i < 10; i++) {
        chars.push(i)
      }
      for (var i = 65; i < 91; i++) {
        chars.push(String.fromCharCode(i));
      }
      for (var i = 97; i < 123; i++) {
        chars.push(String.fromCharCode(i));
      }

      function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
          var id = Math.ceil(Math.random() * 61);
          res += chars[id];
        }
        return res;
      }
      //50个模型demo
      let datas = [];
      for (let index = 0; index < 50; index++) {
        // debugger;
        let obj = {};
        Object.assign(obj, obj, this.random[Math.floor(Math.random() * 10)]);
        datas.push(obj);
      }
      // 求出随机数
      datas.forEach((item, v) => {
        let arr = [2, 3, 5, 4];
        item.out =
          Math.ceil(Math.random() * 10) *
          Math.pow(
            arr[Math.floor(Math.random() * arr.length)],
            arr[Math.floor(Math.random() * arr.length)]
          );
        item.account = generateMixed(3);
      });
      this.scrollDatas = datas;
    },
    initWinningInfo() {
      let length = 50;
      let arr = ['幸运飞艇','快乐赛车','北京赛车','快速时时彩','三分时时彩','快速赛车','快速六合彩','5分六合彩','江苏快3','幸运赛车','五分快3','3分快3','通比牛牛']
      let data = [];
      for (let i = 0; i < length; i++) {
        let num = parseInt(
          Math.random() * (Math.random() * (Math.random() * 360000))
        );
        num = num < 10 ? num * 234 : num;
        num = num < 100 ? num * 23 : num;
        num = num < 1000 ? num * 2 : num;
        let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
        name = name.substr(0, 3);
        let k = Math.floor(Math.random() * 12)
        data[i] = {name, 'uname':arr[k], num}
      }
      this.arraySort(data, (v1, v2) => v1.num < v2.num);
      this.winningInfo = data;
    },
  },
};

export default mixin;
