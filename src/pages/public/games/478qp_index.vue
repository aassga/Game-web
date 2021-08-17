<template>
  <div id="maincontainer">
    <div class="mainContent">
      <div class="mainbox"  ref="gameMenu">
        <ul class="game_type game_type1">
          <li :class="[{'active':$route.query.id===item.id},item.class,item.newclass+'_hover']" :key="index" v-for="(item,index) in rollList"
              @click="fetchgames(item)">
            <div style="display: flex;justify-content: center;">
                <p style="width:60px;height:60px;" v-if="index!=0" :class="[{'newactive':$route.query.id===item.id},item.newclass]"></p>
            </div>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <ul class="game_type game_type2"  @click="changeMenu">
          <li @mouseover="changeSrc1" @mouseout="changeSrc2" class="deGame" id="ali">
            <img v-if="showGtu" :src='src' alt="">
            <img class="imgTrue" v-else src="/static/public/image/youyi/2other-item-hover-qygj.png" alt="">
          </li>
        </ul>
      </div>
      <div ref="search-container" class="search-container">
        <div class="search-fl fl">
          <div class="search-info">
            <div class="search-head">
              <div >
                <div class="ipt-group">
                  <input v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()">
                </div>
                <button class="btn-search" @click="search()"><i class="search_icon"></i> 搜索</button>
              </div>
            </div>
            <div v-if="nowTypeList.type.list.length" class="search-detail">
              <div class="search-type">
                <dl class="search-game top">
                  <dt><i class="gicon gicon1"></i>游戏类型:</dt>
                  <dd>
                    <a href="javascript:;" @click="resulttype(item)" :key="index"
                      :class="{'active':item.tag===currenttype}" v-for="(item,index) in  nowTypeList.type.list">{{item.name}}</a>
                  </dd>
                </dl>
                <dl v-if="nowTypeList.line.list.length" class="search-game bottom">
                  <dt><i class="gicon gicon2"></i>赔钱线数:</dt>
                  <dd>
                    <a href="javascript:;" @click="resultline(item)" :key="index"
                      :class="{'active':item.tag===currentline}" v-for="(item,index) in nowTypeList.line.list">{{item.name}}</a>
                  </dd>
                </dl>
                
                <dl v-if="nowTypeList.thirt.list.length" class="search-game bottom">
                  <dt><i class="gicon gicon3"></i>游戏风格:</dt>
                  <dd>
                    <a href="javascript:;" @click="resultTag(item)" :key="index" :class="{'active':item.tag===currentTag}"
                      v-for="(item,index) in nowTypeList.thirt.list">{{item.name}}</a>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="game-box">
        <div class="game-content">
          <ul>
            <li class="game-item" :key="index" v-for="(item,index) in gameData">
              <div class="game-pic">
                <a href="javascript:;" class="game-text collect"><i class="shoucang"></i></a>
                <img :src="item.icon" :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt="">
              </div>
              <h3>{{item.name}}</h3>
              <a  href="javascript:void(0)" class="play" @click="loginGame(item)">进入游戏</a>
            </li>
          </ul>
        </div>
        <ul class="pagenation" v-show="total>1">
          <li>
            <a href="javascript:;" @click="firstpage()">首页</a>
          </li>
          <li>
            <a href="javascript:;" @click="prevpage()">上一页</a>
          </li>
          <li>
            <a href="javascript:;">当前：{{pageDatas.page}}</a>
          </li>
          <li>
            <a href="javascript:;" @click="nextpage()">下一页</a>
          </li>
          <li>
            <a href="javascript:;" @click="lastpage()">尾页</a>
          </li>
          <li>
            <a href="javascript:;">共{{total}}页</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { _SetGet, _SetPost } from '@/service/public/service.js'
  import mixin from './public.js'

  export default {
    mixins: [mixin],
    data () {
      return {
        showGames:[],
        jackpotNum1: 41318571943,
        jackpotNum2: 12961370,
        publicUrl: 'http://img.7900005.com/',
        currenttype: '',
        currentline: '',
        currentTag: '',
        gameData: [],
        offsetHeight: 100,
        total: '',
        iptVal: '',
        showGtu:true,
        src:'/static/public/image/youyi/2other-item-qygj.png',
        pageDatas: {
          page: 1
        },
        idlist:[],
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
        setInter: null,
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
      // //获取数据
      // async getData (item) {
      //   this.gameData = []
      //   let id=this.$route.query.id
      //   if(id=="55") id=10015
      //   let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
      //     id,
      //     device: 'pc',
      //   })
      //   if (res && res.code === 200) {
      //       this.showGames=res.data[id];
      //       // this.gameData=this.showGames.splice(0,25)
      //       this.gameData=this.showGames.filter((item,index)=>{
      //         if(index<25){
      //           return item
      //         }
      //       })
      //       this.pageDatas.page=1;
      //       this.total = Math.ceil(this.showGames.length/25);
      //   }
      // },


            //获取数据
      async getData (item) {
        this.gameData = [];
        let idArr=this.idlist;
        let id=this.$route.query.id;
        if(id==55){
          this.showGames = this.DefaultGameData
        }else{

            // 首次加载获取，第一页数据
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
              id,
              device: 'pc',
            })
            if (res && res.code === 200) {
                this.showGames=res.data[id];
                // this.gameData=this.showGames.splice(0,20)
                
            }


        }  
        


        this.gameData=this.showGames.filter((item,index)=>{
          if(index<25){
            return item
          }
        })
        this.pageDatas.page=1;
        this.total = Math.ceil(this.showGames.length/25);


        // 所有请求,获取到所有的数据
        let gameId=idArr.join("|")
        let res2= await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
          id:gameId,
          device: 'pc',
        })
        if(res2 &&res2.code==200){
              this.allGameData=res2.data;
            sessionStorage.setItem("allgames",JSON.stringify(this.allGameData));
        }
        this.getAllDatas()
      },
      // 根据id,分配展示数据
      giveDataById(gid){
        // 分类要展示的所有数据
        let id=gid||this.$route.query.id||'10022';
        Object.keys(this.allGameData).forEach(v=>{
          if(v==id){
            this.showGames=this.allGameData[v]
          }
        })

        // 实际展示用的
        this.gameData=this.showGames.filter((item,index)=>{
          if(index<25){
            return item
          }
        })
        this.pageDatas.page=1;
        this.total = Math.ceil(this.showGames.length/25);



      },
      //数据来源
      getAllDatas(){
          if(sessionStorage.allgames){
            // 有缓存,可以不用请求数据
            this.allGameData=JSON.parse(sessionStorage.allgames)
            let id=this.$route.query.id;
            if(id=='55'){
              this.gameData = this.DefaultGameData
              this.pageDatas.page=1;
              this.total = Math.ceil(this.gameData.length/25);
              this.gameData=this.gameData.filter((item,index)=>{
                if(index<25){
                  return item
                }
              })
            }else{
              this.giveDataById(id);
            }
          }else{
            // 没有数据，需要请求
            this.getData();
            
            return false;
          }
      },
      //点击导航栏
      async fetchgames (item) {
        if(item.id=='55'){
          this.showGames=this.DefaultGameData
          this.$router.push('/home/games?id=55&name=热门游戏')
          this.gameData=this.showGames.filter((item,index)=>{
            if(index<25){
              return item
            }
          })
          this.pageDatas.page=1;
          this.total = Math.ceil(this.showGames.length/25);
        }else{
          let scrollTop = document.documentElement.scrollTop
          this.$router.push({
            path: `/home/games`,
            query: {
              id: item.id,
              name: item.name
            }
          })
          window.scrollTo(0, scrollTop)
          this.nowTypeList.type.list = item.type.list
          this.nowTypeList.line.list = item.line.list
          if (item.thirt) {
            this.nowTypeList.thirt.list = item.thirt.list
          } else {
            this.nowTypeList.thirt.list = []
          }

          this.clear()
          // this.getData()
          this.giveDataById()
          this.$nextTick(() => {
            this.offsetHeight =
              this.$refs['search-container'].offsetHeight < 100
                ? 100
                : this.$refs['search-container'].offsetHeight
          })

        }
        
      },
      //下一页
      async nextpage () {
        if (this.pageDatas.page < this.total) {
          this.pageDatas.page = this.pageDatas.page + 1
        this.fenshu()
          // this.getData()
        }
      },
      //上一页
      async prevpage () {
        if (this.pageDatas.page > 1) {
          this.pageDatas.page = this.pageDatas.page - 1
          // this.getData()
        this.fenshu()

        }
      },
      //第一页
      async firstpage () {
        this.pageDatas.page = 1
        // this.getData()
        this.fenshu()

      },
      //最后一页
      async lastpage () {
        this.pageDatas.page = this.total
        // this.getData()
        this.fenshu()

      },

    resulttype(item) {
      this.currenttype = item.tag;
      // this.getData();
      this.fengame()
    },
    resultline(item) {
      this.currentline = item.tag;
      // this.getData();
      this.fengame()
    },
    resultTag(item) {
      this.currentTag = item.tag;
      // this.getData();
      this.fengame()
    },
    fengame(){
      let datas=[];
      datas=this.showGames.filter((item)=>{
            let flag=true;
            flag=flag&&item.tag.includes(this.currenttype)?true: false;
            flag=flag&&item.tag.includes(this.currentline)?true: false;
            flag=flag&&item.tag.includes(this.currentTag)?true: false;
            if(flag){
              return item
            }
      })
      // this.gameData=datas.splice(0,20)
      this.gameData=datas.filter((item,index)=>{
        if(index<25){
          return item
        }
      })
    },
    // 分页数量
    fenshu(){
      this.gameData=this.getPageCurData(this.showGames,25,this.pageDatas.page)
    },
    getPageCurData(date, PageSize, PageNo) {
      this.data=[];
      for(let i = 0; i < PageSize; i++) {
         let idx = PageSize * PageNo - PageSize + i; 
      if(idx < date.length) this.data.push(date[idx]); 
      }
         return this.data;
    },

    async search () {
        this.pageDatas.page = 1;
        let gameList=[];
        gameList=this.showGames.filter(item=>{
          if(item.name.includes(this.iptVal)){
            return item;
          }
        })
        this.gameData=gameList.filter((item,index)=>{
          if(index<25){
            return item;
          }
        })
    },


      async clear () {
        this.iptVal = ''
        this.currenttype = ''
        this.currentline = ''
        this.currentTag = ''
        this.pageDatas.page = 1
      },
      reset () {
        this.clear()
        this.resetItem()
        // this.getData()
        this.giveDataById()
      },
      resetItem () {
        this.rollList.forEach(item => {
          if (item.id === this.$route.query.id) {
            this.fetchgames(item)
          }
        })
      },
      jackpotNumAdd () {
        clearInterval(this.setInter)
        this.setInter = setInterval(() => {
          this.jackpotNum1 = this.jackpotNum1 + 8.56
          this.jackpotNum2 = this.jackpotNum2 + 8.56
        }, 100)
      },
      changeMenu(){
        let menu = document.getElementsByClassName('mainbox')[0];
        let aLi = document.getElementById('ali');
        let gao = window.getComputedStyle(this.$refs.gameMenu).height;
        if(parseInt(gao)<= 135){
          menu.style.height = '270px';
          this.showGtu = false;
          aLi.className = 'active';
          this.src = '/static/public/image/youyi/2other-item-hover-qygj.png';
        }else{
          menu.style.height = '135px';
          this.showGtu = true;
          aLi.className = 'deGame';
          this.src = '/static/public/image/youyi/2other-item-qygj.png';
        }
      },
      changeSrc1(){
        this.src = '/static/public/image/youyi/2other-item-hover-qygj.png';
      },
      changeSrc2(){
        this.src = '/static/public/image/youyi/2other-item-qygj.png';
      }
    },
    created () {
      this.getid()
      this.$nextTick(() => {
        // if (this.$route.query.id) {
        //   this.resetItem()
        // } else {
        //   this.fetchgames(this.rollList[0])
        // }
      })
    },
    mounted () {
      if (localStorage.config) {
        let config = JSON.parse(localStorage.config)
        this.publicUrl = config.statics
      }
      this.getAllDatas()

      this.jackpotNumAdd()

    },
    // watch: {
    //   $route(){
    //     this.getData()
    //   },
    // },
    components: {}
  }
</script>

<style lang="less" scoped>
  .mainContent {
    margin: 0 auto;
    width: 1200px;
    padding:10px 0 1px 0;
  }

  .banner {
    background-color: #000;

    img {
      display: block;
      width: 960px;
      margin: 0 auto;
      cursor: pointer;
    }
  }

  .mainbox {
    height: 135px;
    position: relative;
    margin: 0px 0 15px;
    overflow: hidden;

    .game_type1{
      width: 1085px;
      padding:0 0 10px 5px;
      li:hover {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        // background: -webkit-linear-gradient(#65e0f4, #4fade6); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(#65e0f4, #4fade6); /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(#65e0f4, #4fade6); /* Firefox 3.6 - 15 */
        // background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
        color: #fff;
        div{
           border-bottom: 1px solid #683f08;
        }
      }
      
    }
    .game_type2{
      position: absolute;
      top: 0;
      right: 5px;
      padding: 0 0 10px 8px;

      li{
        padding: 0 !important;
        img{
          width: 98px;
          height: 120px;
        }
        &.deGame:hover {
          transform: scale(1.1);
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
          background: -webkit-linear-gradient(#65e0f4, #4fade6); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(#65e0f4, #4fade6); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(#65e0f4, #4fade6); /* Firefox 3.6 - 15 */
          background: linear-gradient(#65e0f4, #4fade6); /* 标准的语法 */
          div{
            border-bottom: 1px solid #8dddff;
          }
        }
        .active{
          transform: scale(1.1);
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
        }
      }
    }
   
    .game_type {
      clear: both;
      zoom: 1;
      overflow: hidden;
      display: inline-block;

      li.hot_game{
        background: url('/static/public/image/youyi/2hot-game2.png') center top no-repeat;
      }
      li.hot_game:hover{
        background: url('/static/public/image/youyi/2hot-game-hover2.png') center top no-repeat;
        background-size: 100% 100%;
      }
       li.hot_game.active{
        background: url('/static/public/image/youyi/2hot-game-hover2.png') center top no-repeat;
        background-size: 100% 100%;
      }
      li {
        width: 98px;
        height: 120px;
        float: left;
        margin-right: 10px;
        margin-top: 10px;
        padding: 0 5px;
        font-size: 14px;
        background-color: rgb(114, 58, 0);
        color: #fff;
        border-radius: 10px;
        transition: all 0.2s ease 0s;
        cursor: pointer;
        text-align: center;
        overflow: hidden;
        div{
          border-bottom: 1px solid transparent;
          padding: 17px 0 5px;
          .ag_game{
              background: url('/static/public/image/youyi/ag-qygj.png') center top no-repeat;
          }
          .ae_game{
          background: url('/static/public/image/youyi/ae-qygj.png') center top no-repeat;
          }
          .bbin_game{
                background: url('/static/public/image/youyi/bbin-qygj.png') center top no-repeat;
          }
          .cq9_game{
                background: url('/static/public/image/youyi/cq9-qygj.png') center top no-repeat;
          }
          .fg_game{
                background: url('/static/public/image/youyi/fg-qygj.png') center top no-repeat;
          }
         .dt_game{
               background: url('/static/public/image/youyi/dt-qygj.png') center top no-repeat;
          }
          .jdb_game{
                background: url('/static/public/image/youyi/jdb-qygj.png') center top no-repeat;
          }
           .mg_game{
               background: url('/static/public/image/youyi/mg-qygj.png') center top no-repeat;
          }
          .mw_game{
              background: url('/static/public/image/youyi/mw-qygj.png') center top no-repeat;
          }
          .pt_game{
               background: url('/static/public/image/youyi/pt-qygj.png') center top no-repeat;
           }
          .ttg_game{
              background: url('/static/public/image/youyi/ttg-qygj.png') center top no-repeat;
          }    
          
          
          .ag_game.newactive{
                background: url('/static/public/image/youyi/ag-hover.png') center top no-repeat;
          }
          .ae_game.newactive{
                background: url('/static/public/image/youyi/ae-hover.png') center top no-repeat;
          }
          .bbin_game.newactive{
                background: url('/static/public/image/youyi/bbin-hover.png') center top no-repeat;
          }
          .cq9_game.newactive{
                background: url('/static/public/image/youyi/cq9-hover.png') center top no-repeat;
          }
          .fg_game.newactive{
                background: url('/static/public/image/youyi/fg-hover.png') center top no-repeat;
          }
         .dt_game.newactive{
               background: url('/static/public/image/youyi/dt-hover.png') center top no-repeat;
          }
          .jdb_game.newactive{
                background: url('/static/public/image/youyi/jdb-hover.png') center top no-repeat;
          }
           .mg_game.newactive{
               background: url('/static/public/image/youyi/mg-hover.png') center top no-repeat;
          }
          .mw_game.newactive{
              background: url('/static/public/image/youyi/mw-hover.png') center top no-repeat;
          }
          .pt_game.newactive{
               background: url('/static/public/image/youyi/pt-hover.png') center top no-repeat;
           }
           .ttg_game.newactive{
              background: url('/static/public/image/youyi/ttg-hover.png') center top no-repeat;
          }        
        }

        span {
          line-height: 32px;
        }
      }
       li:hover .ag_game{
          background: url('/static/public/image/youyi/ag-hover.png') center top no-repeat;
      }
       li:hover .ae_game{
          background: url('/static/public/image/youyi/ae-hover.png') center top no-repeat;
      }
       li:hover .bbin_game{
          background: url('/static/public/image/youyi/bbin-hover.png') center top no-repeat;
      }
       li:hover .cq9_game{
          background: url('/static/public/image/youyi/cq9-hover.png') center top no-repeat;
      }
       li:hover .dt_game{
          background: url('/static/public/image/youyi/dt-hover.png') center top no-repeat;
      }
       li:hover .fg_game{
          background: url('/static/public/image/youyi/fg-hover.png') center top no-repeat;
      }
       li:hover .jdb_game{
          background: url('/static/public/image/youyi/jdb-hover.png') center top no-repeat;
      }
       li:hover .mg_game{
          background: url('/static/public/image/youyi/mg-hover.png') center top no-repeat;
      }    
      li:hover .mw_game{
          background: url('/static/public/image/youyi/mw-hover.png') center top no-repeat;
      }    
      li:hover .pt_game{
          background: url('/static/public/image/youyi/pt-hover.png') center top no-repeat;
      }
      li:hover .ttg_game{
          background: url('/static/public/image/youyi/ttg-hover.png') center top no-repeat;
      }      
      li.active {
        transform: scale(1.1);
        font-size: 16px;
        // background: linear-gradient(#65e0f4,#4fade6);
        color: #fff;
        div{
           border-bottom: 1px solid #683f08;
        }
      }
        li.hot_game:hover{
        background: url('/static/public/image/youyi/2hot-game-hover2.png') center top no-repeat;
        background-size: 100% 100%;
        div{
           border-bottom: 1px solid transparent;
        }
      }
       li.hot_game.active{
        background: url('/static/public/image/youyi/2hot-game-hover2.png') center top no-repeat;
        background-size: 100% 100%;
         div{
           border-bottom: 1px solid transparent;
        }
      }
     
    }
    .game_type2{
      overflow: visible;
      li{
        overflow: visible;
        margin-right:0;
      }
    }

    .nav {
      width: 47px;
      height: 90px;
      position: absolute;
      cursor: pointer;
      border: 1px solid #ccc;
      line-height: 90px;
      font-weight: bold;
      font-size: 24px;
      text-align: center;

      &:hover {
        color: #fff;
        background: #ccc;
      }
    }
  }

  #pt-tag {
    position: absolute;
    top: 54px;
    left: 12px;
    width: 71.2px;
  }

  .search-container {
    padding: 10px;
    border-radius: 10px;
    background: #8c510d;
    clear: both;
    zoom: 1;
    overflow: hidden;

    .search-info {
      width: 880px;
      padding: 10px 0 10px 50px;
      
      .search-head {
        clear: both;
        zoom: 1;
        overflow: hidden;

          .bg-search {
            width: 26px;
            height: 26px;
            margin-right: 7px;
            display: inline-block;
            vertical-align: middle;
            background: url("/static/public/image/slot_sprites.png") -63px -185px;
          }

          .label {
            display: inline-block;
            vertical-align: middle;
            color: #b48c68;
            text-align: left;
            font-size: 18px;
            font-weight: 600;
            padding: 0.2em 0.6em 0.3em;
            line-height: 1;
          }

          .ipt-group {
            position: relative;
            display: inline-block;
            width: 295px;
            border-radius: 5px;
            border: 1px solid #723a00;
            vertical-align: middle;

            .ipt {
              border: none;
              width: 100%;
              padding: 0 10px;
              height: 32px;
              line-height: 32px;
              color: #c1c1c1;
              background-color: transparent;
              outline: none;
            }
          }

          .btn-search {
            outline:none;
            width: 112px;
            height: 34px;
            border: none;
            border-radius: 7px;
            vertical-align: middle;
            font-size: 16px;
            color: #fff;
            vertical-align: middle;
            background: #723a00;
            cursor: pointer;
            .search_icon{
              width: 16px;
              height: 16px;
              display: inline-block;
              background: url('/static/public/image/youyi/sousuo.png') no-repeat center center;
              background-size: 100% 100%;
              white-space:nowrap; 
              letter-spacing: -1em; 
              text-indent: -99em; 
              color: transparent;
              &:after{
                /* 伪元素插入空格文本 */
                content: '\3000'; 
              }
            }
            
          }
        

      }

      .search-detail {
        margin-top: 10px;
        overflow: hidden;

        .search-type {
         
          .search-game {
            height: 38px;
            line-height: 38px;
            font: 14px/1.6 tahoma, arial, 'Microsoft YaHei', sans-serif;

            dt {
              margin-right: 12px;
              color: #fff;
              display: inline-block;
              vertical-align: middle;
              line-height: 15px;

              .gicon1{
                background: url('/static/public/image/youyi/fenlei.png') no-repeat center center;
              }
              .gicon2{
                background: url('/static/public/image/youyi/jiaokuanqueren.png') no-repeat center center;
              }
              .gicon3{
                background: url('/static/public/image/youyi/youxi.png') no-repeat center center;
              }

              .gicon{
                width: 16px;
                height: 16px;
                display: inline-block;
                background-size: 100% 100%;
                white-space:nowrap; 
                letter-spacing: -1em; 
                text-indent: -99em; 
                color: transparent;
                margin-right: 10px;
                &:after{
                  /* 伪元素插入空格文本 */
                  content: '\3000'; 
                }
              }

            }

            dd {
              display: inline-block;
              vertical-align: middle;

              a {
                display: inline-block;
                margin: 5px 20px 5px 0;
                line-height: 28px;
                color: #fff;
                text-decoration: none;
                text-align: center;

              }

              .active {
                background: #ffd100;
                color: #333;
                padding: 0 12px;
                border-radius: 14px;
              }
            }
          }
        }
      }
    }
 
  }

  .game-box {
    margin: 0 auto;
    // margin-bottom: 80px;
    width: 1260px;

    .game-content::-webkit-scrollbar {
      display: none;
    }

    .game-content {
      width: 1260px;
      min-height: 300px;
      position: relative;
      margin-left: -15px;
      overflow: auto;
      padding-top: 25px;

      ul {
        margin: 0 15px;
      }

      .game-item {
        background-attachment: scroll;
        float: left;
        width: 224px;
        padding-bottom: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        text-align: left;
        transition: all .3s;
        background: rgb(140, 81, 13);
        border-radius: 10px;
        overflow: hidden;
        text-align: center;
        
        &:hover {
          transition: all 0.4s;
          transform: translateY(-3px);
        }

        .game-pic {
          position: relative;
          width: 100%;
          height: 224px;
          overflow: hidden;

         .collect {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 27px;
              height: 27px;

              .shoucang {
                display: inline-block;
                position: relative;
                top: 7px;
                width: 27px;
                height: 27px;
                background: url("/static/public/image/icon-shoucang.png") no-repeat center top;
                background-size: 100%;
              }
          }

          .default {
            width: 224px;
            height: 224px;
          }

          .mg-pic {
            
          }
        }

        h3 {
          color: #fff;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 10px 0;
        }

        .play, #try{
          width: 91px;
          height: 30px;
          display: inline-block;
          line-height: 30px;
          color: #333;
          border-radius: 15px;
          border:0px solid transparent;

          &.play {
            background: #ffd100;
          }
          &.play:hover {
            background:#ffe366;
          }
          &#try{
            border: 1px solid #333;
          }
          &#try:hover{
            background: #ffd100;
            border:0px solid transparent;
          }
        }
      }
    }

    .pagenation {
      height: 34.4px;
      text-align: center;
      margin-top: 8px;

      li {
        display: inline;
        border: 1px solid #8c510d;
        padding: 6px 12px;
        border-radius: 3px;

        a {
          color: #fff;
        }
      }
    }
  }

  .move {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(-97px, 0, 0);
  }

  .back {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(97px, 0, 0);
  }
</style>
