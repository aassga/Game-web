<template>
    <div id="maincontainer">
        <div class="mainContent">
            <!-- 搜索框 -->
            <div ref="search-container" class="search-container">
                <div class="search-box">
                    <ul class="search-nav">
                        <li v-for="(item,index) in list_nav" :key="index" :class="[nav_active == item.id ? 'active' : '']" @click="setNav(item)">
                            <a href="javascript:void(0)" >{{item.name}}</a>
                            <img src="/static/public/image/casino/images/border-bg.png" alt="">
                        </li>
                    </ul>
                    <div class="search-head">
                        <div>
                            <div class="ipt-group">
                                <input v-model="iptVal" class="ipt" autocomplete="off" @keyup.enter="search()" placeholder="请输入游戏名称">
                            </div>
                            <button class="btn-search" @click="search()"><i class="search_icon"></i> 搜索</button>
                        </div>
                    </div>
                </div>
                <div class="mainbox" ref="gameMenu">
                    <ul class="game_type game_type1">
                        <li :class="[{'active':$route.query.id===item.id},item.class,item.newclass+'_hover']" :key="index"
                            v-for="(item,index) in rollList" @click="fetchgames(item)">
                            <div style="display: flex;justify-content: center;">
                                <p class="game_icon"  :class="[{'newactive':$route.query.id===item.id},item.newclass]"></p>
                            </div>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <ul class="game_type game_type2">
                        <li @click="changeMenu" class="deGame" id="moreli">
                            <div style="display: flex; justify-content: center;">
                                <p class="game_icon more_game" id="moreGame"></p>
                            </div> 
                            <span>更多平台</span>
                        </li>
                    </ul>
                </div>
                <div class="search-fl fl">
                    <div class="search-info">
                        <div v-if="nowTypeList.type.list.length" class="search-detail">
                            <div class="search-type">
                                <dl class="search-game top">
                                    <dt><i class="gicon gicon1"></i>游戏类型:</dt>
                                    <dd>
                                        <a href="javascript:;" @click="resulttype(item)" :key="index"
                                            :class="{'active':item.tag===currenttype}"
                                            v-for="(item,index) in  nowTypeList.type.list">{{item.name}}</a>
                                    </dd>
                                </dl>
                                <dl v-if="nowTypeList.line.list.length" class="search-game bottom">
                                    <dt><i class="gicon gicon2"></i>赔钱线数:</dt>
                                    <dd>
                                        <a href="javascript:;" @click="resultline(item)" :key="index"
                                            :class="{'active':item.tag===currentline}"
                                            v-for="(item,index) in nowTypeList.line.list">{{item.name}}</a>
                                    </dd>
                                </dl>

                                <dl v-if="nowTypeList.thirt.list.length" class="search-game bottom">
                                    <dt><i class="gicon gicon3"></i>游戏风格:</dt>
                                    <dd>
                                        <a href="javascript:;" @click="resultTag(item)" :key="index"
                                            :class="{'active':item.tag===currentTag}"
                                            v-for="(item,index) in nowTypeList.thirt.list">{{item.name}}</a>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-box" :style="nowTypeList.type.list.length> 0?'margin-top:0px;':'margin-top:30px;'">
                <div class="game-content">
                    <ul>
                        <li class="game-item" :key="index" v-for="(item,index) in gameData">
                            <div class="game-pic">
                                <img v-lazy="item.icon" :class="{'default':true,'mg-pic':$route.query.id==='10022'}" alt="">
                            </div>
                            <h3>{{item.name}}</h3>
                            <div class="boxShadow"></div>
                            <a href="javascript:void(0)" class="play" @click="loginGame(item)">进入游戏</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _SetGet, _SetPost } from '@/service/public/service.js';
import mixin from './public.js';

export default {
    mixins: [mixin],
    data() {
        return {
            showGames: [],
            publicUrl: 'http://img.7900005.com/',
            currenttype: '',
            currentline: '',
            currentTag: '',
            gameData: [],
            offsetHeight: 100,
            total: '',
            iptVal: '',
            showGtu: true,
            src: '/static/public/image/casino/youyi/gd1.png',
            pageDatas: {
                page: 1
            },
            idlist: [],
            nav_active:30006,
            list_nav:[
                {id:30006,'name':'全部游戏',tag: ''},
                {id:30003,'name':'热门游戏',tag: 'HOT'},
                {id:30004,'name':'最新游戏',tag: 'NEW'},
                {id:30005,'name':'彩金池游戏',tag: 'MOR'},
                {id:3006,'name':'收藏游戏'}
            ],
            rollList: [
                {
                    id: '55',
                    class: 'hot_game',
                    name:'全部平台',
                    newclass:'hot_game',
                    src:'/static/public/image/youyi/qb.png',
                    type: {
                        list: [
                            { name: '全部', tag: '' },
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
                            { name: '全部', tag: '' },
                            { name: '5-10线', tag: '5-10' },
                            { name: '15-20线', tag: '15-20' },
                            { name: '25-30线', tag: '25-30' },
                            { name: '更多', tag: 'MOR' }
                        ]
                    }
                }
            ],
            nowTypeList: {
                type: { list: [] },
                line: { list: [] },
                thirt: { list: [] }
            },
            setInter: null,
            DefaultGameData: [
                {
                    code: 'YMBI',
                    icon: 'http://static.k0061.com/images/default/pc/10072.png',
                    id: 10072,
                    lock: 0,
                    name: '飞禽走兽多人版',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'YMFD',
                    icon: 'http://static.k0061.com/images/default/pc/10067.png',
                    id: 10067,
                    lock: 0,
                    name: '森林舞会多人版',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'YMBZ',
                    icon: 'http://static.k0061.com/images/default/pc/10074.png',
                    id: 10074,
                    lock: 0,
                    name: '奔驰宝马多人版',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'YMSG',
                    icon: 'http://static.k0061.com/images/default/pc/10079.png',
                    id: 10079,
                    lock: 0,
                    name: '斗三公',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'YMJJ',
                    icon: 'http://static.k0061.com/images/default/pc/10080.png',
                    id: 10080,
                    lock: 0,
                    name: '红黑梅方',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SB49',
                    icon: 'http://static.k0061.com/images/default/pc/258.png',
                    id: 258,
                    lock: 0,
                    name: '金龙珠',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'YMAC',
                    icon: 'http://static.k0061.com/images/default/pc/10075.png',
                    id: 10075,
                    lock: 0,
                    name: '动物狂欢',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SB08',
                    icon: 'http://static.k0061.com/images/default/pc/266.png',
                    id: 266,
                    lock: 0,
                    name: '麻将老虎机',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'PKBJ',
                    icon: 'http://static.k0061.com/images/default/pc/269.png',
                    id: 269,
                    lock: 0,
                    name: '杰克高手',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SB02',
                    icon: 'http://static.k0061.com/images/default/pc/264.png',
                    id: 264,
                    lock: 0,
                    name: '复古花园',
                    series: 10015,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SMG_breakAway',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1824.png',
                    id: 10157,
                    lock: 0,
                    name: '冰上曲棍球',
                    series: 10022,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SMG_basketballStar',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1831.png',
                    id: 10139,
                    lock: 0,
                    name: '篮球巨星',
                    series: 10022,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SMG_playboy',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1839.png',
                    id: 10414,
                    lock: 0,
                    name: '花花公子',
                    series: 10022,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'SMG_immortalRomance',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1825.png',
                    id: 10303,
                    lock: 0,
                    name: '不朽的浪漫',
                    series: 10022,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: '5902',
                    icon: 'http://static.k0061.com/images/default/pc/3568.png',
                    id: 3568,
                    lock: 0,
                    name: '糖果派对',
                    series: 10016,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: '5901',
                    icon: 'http://static.k0061.com/images/default/pc/3567.png',
                    id: 3567,
                    lock: 0,
                    name: '连环夺宝',
                    series: 10016,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: '52',
                    icon: 'http://static.k0061.com/images/default/pc/2646.png',
                    id: 2646,
                    lock: 0,
                    name: '跳高高',
                    series: 10018,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: '7',
                    icon: 'http://static.k0061.com/images/default/pc/2667.png',
                    id: 2667,
                    lock: 0,
                    name: '跳起来',
                    series: 10018,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'fm',
                    icon: 'http://static.k0061.com/images/default/pc/3338.jpg',
                    id: 3338,
                    lock: 0,
                    name: '古怪猴子',
                    series: 10024,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'bib',
                    icon: 'http://static.k0061.com/images/default/pc/3347.jpg',
                    id: 3347,
                    lock: 0,
                    name: '海底探宝',
                    series: 10024,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'trpmnk',
                    icon: 'http://static.k0061.com/images/default/pc/3422.jpg',
                    id: 3422,
                    lock: 0,
                    name: '三倍猴子',
                    series: 10024,
                    tag: '',
                    title: '',
                    type: 'game'
                },
                {
                    code: 'hb',
                    icon: 'http://static.k0061.com/images/default/pc/3277.jpg',
                    id: 3277,
                    lock: 0,
                    name: '狂欢夜',
                    series: 10024,
                    tag: '',
                    title: '',
                    type: 'game'
                }
            ],
            Topnum:0
        };
    },
    methods: {
        //获取数据
        async getData(item) {
            this.gameData = [];
            let idArr = this.idlist;
            let id = this.$route.query.id;
            if (id == 55) {
                this.showGames = this.DefaultGameData;
            } else {
                // 首次加载获取，第一页数据
                let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                    id,
                    device: 'pc'
                });
                if (res && res.code === 200) {
                    this.showGames = res.data[id];
                    // this.gameData=this.showGames.splice(0,20)
                }
            }

            this.gameData = this.showGames;
            // this.pageDatas.page = 1;
            // this.total = Math.ceil(this.showGames.length / 25);

            // 所有请求,获取到所有的数据
            let gameId = idArr.join('|');
            let res2 = await this.$http.post(`${this.$HOST_NAME}/gameSortNew`, {
                id: gameId,
                device: 'pc'
            });
            if (res2 && res2.code == 200) {
                this.allGameData = res2.data;
                sessionStorage.setItem('allgames', JSON.stringify(this.allGameData));
            }
            this.getAllDatas();
        },
        // 根据id,分配展示数据
        giveDataById(gid) {
            // 分类要展示的所有数据
            let id = gid || this.$route.query.id || '10022';
            Object.keys(this.allGameData).forEach(v => {
                if (v == id) {
                    this.showGames = this.allGameData[v];
                }
            });

            // 实际展示用的
            this.gameData = this.showGames;
            // this.pageDatas.page = 1;
            // this.total = Math.ceil(this.showGames.length / 25);
        },
        //数据来源
        getAllDatas() {
            if (sessionStorage.allgames) {
                // 有缓存,可以不用请求数据

                this.allGameData = JSON.parse(sessionStorage.allgames);
                let id = this.$route.query.id;

                if (id == '55') {
                    this.gameData = this.DefaultGameData;
                    // this.pageDatas.page = 1;
                    // this.total = Math.ceil(this.gameData.length / 25);
                } else {
                    this.giveDataById(id);
                }
            } else {
                // 没有数据，需要请求
                this.getData();
                return false;
            }
        },
        //点击导航栏
        async fetchgames(item) {
            if (item.id == '55') {
                this.showGames = this.DefaultGameData;
                this.$router.push('/home/games?id=55&name=热门游戏');
                this.gameData = this.showGames;
                this.nowTypeList.type.list =  [];
                this.nowTypeList.line.list =  [];
                this.nowTypeList.thirt.list = [];
                // this.pageDatas.page = 1;
                // this.total = Math.ceil(this.showGames.length / 25);
            } else {
                let scrollTop = document.documentElement.scrollTop;
                this.$router.push({
                    path: `/home/games`,
                    query: {
                        id: item.id,
                        name: item.name
                    }
                });
                window.scrollTo(0, scrollTop);

                this.nowTypeList.type.list = item.type.list;
                this.nowTypeList.line.list = item.line.list;
                if (item.thirt) {
                    this.nowTypeList.thirt.list = item.thirt.list;
                } else {
                    this.nowTypeList.thirt.list = [];
                }

                this.clear();
                // this.getData()
                this.giveDataById();
                this.$nextTick(() => {
                    this.offsetHeight =
                        this.$refs['search-container'].offsetHeight < 100 ? 100 : this.$refs['search-container'].offsetHeight;
                });
            }
             
        },
        //下一页
        async nextpage() {
            if (this.pageDatas.page < this.total) {
                this.pageDatas.page = this.pageDatas.page + 1;
                this.fenshu();
                // this.getData()
            }
        },
        //上一页
        async prevpage() {
            if (this.pageDatas.page > 1) {
                this.pageDatas.page = this.pageDatas.page - 1;
                // this.getData()
                this.fenshu();
            }
        },
        resulttype(item) {
            this.currenttype = item.tag;
            // this.getData();
            this.fengame();
        },
        resultline(item) {
            this.currentline = item.tag;
            // this.getData();
            this.fengame();
        },
        resultTag(item) {
            this.currentTag = item.tag;
            // this.getData();
            this.fengame();
        },
        fengame() {
            let datas = [];
            datas = this.showGames.filter(item => {
                let flag = true;
                flag = flag && item.tag.includes(this.currenttype) ? true : false;
                flag = flag && item.tag.includes(this.currentline) ? true : false;
                flag = flag && item.tag.includes(this.currentTag) ? true : false;
                if (flag) {
                    return item;
                }
            });
            // this.gameData=datas.splice(0,20)
            this.gameData = datas
        },
        async search() {
            this.pageDatas.page = 1;
            let gameList = [];

            gameList = this.showGames.filter(item => {
                if (item.name.includes(this.iptVal)) {
                    return item;
                }
            });
            this.gameData = gameList
        },

        async clear() {
            this.iptVal = '';
            this.currenttype = '';
            this.currentline = '';
            this.currentTag = '';
            this.pageDatas.page = 1;
        },
        reset() {
            this.clear();
            this.resetItem();
            // this.getData()
            this.giveDataById();
        },
        resetItem() {
            this.rollList.forEach(item => {
                if (item.id === this.$route.query.id) {
                    this.fetchgames(item);
                }
            });
        },
        changeMenu() {
            let menu = document.getElementsByClassName('mainbox')[0];
            let moreLi = document.getElementById('moreli');
            let moreGame=document.getElementById("moreGame");
            let gao = window.getComputedStyle(this.$refs.gameMenu).height;
            if (parseInt(gao) <=106) {
                moreLi.className = 'active';
                moreGame.className='game_icon newactive more_game';
                menu.style.height = '230px';
                menu.style.transition = 'all .6s ease';
                this.showGtu = false;
                this.src = '/static/public/image/casino/youyi/more.png';
            } else {
                menu.style.height = '106px';
                this.showGtu = true;
                moreLi.className = 'deGame';
                this.src = '/static/public/image/casino/youyi/more-hover.png';
            }
        },
        async getnewdatas(){
         await this.getid()
         await this.resetItem()
        },
        setNav(item){
            this.active = 30006;
            this.nav_active = item.id;
            this.currenttype = item.tag;
            // this.getData();
            this.fengame();
        
        },  
    },
    created() {
        this.getnewdatas(); //获取电子页面导航列表数据
        this.$nextTick(() => {
        });
    },
    mounted() {
        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }
        this.getAllDatas();
    },
    // watch: {
    //   $route(){
    //     this.getData()
    //   },
    // },
    components: {}
};
</script>

<style lang="less" scoped>
.mainContent {
    margin: 0 auto;
    width: 1200px;
    background-color: #420711;
    padding-bottom: 14px;
    border-radius: 10px;
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
.search-box{
    width:100%; 
    height: 66px;
    margin-bottom: 20px;
    border-bottom: 1px solid #61101e;

    .search-nav{
        float: left;
        height: 66px;
        width: 600px;
        color: #eee;
        li{
            float: left;
            font-size: 18px;
            font-weight: 600;
            padding: 0 20px;
            line-height: 66px;
            cursor: pointer;
            position: relative;
            a{
                color: #eee;
            }
            img{
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -42px;
                opacity: 0;
            }
            &:hover{
                a{
                    color: #ffd101;  
                }
            }
        }
        .active{
            a{
               color: #ffd101;  
            }
            img{
                opacity: 1;
            }
        }

    }

    .search-head {
    float: right;
    margin-top: 15px;
        .bg-search {
            width: 26px;
            height: 26px;
            margin-right: 7px;
            display: inline-block;
            vertical-align: middle;
            background: url('http://betsb.3000018.com/game/img/slot_sprites.png') -63px -185px;
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
            width: 242px;
            height: 38px;
            border-radius: 5px;
            border: 1px solid #ae3348;
            vertical-align: middle;
            box-sizing: border-box;

            .ipt {
                border: none;
                width: 100%;
                padding: 0 16px;
                height: 100%;
                line-height: 38px;
                color: #fff;
                background-color: transparent;
                outline: none;
            }
        }

        .btn-search {
            outline: none;
            width: 102px;
            height: 38px;
            border: none;
            border-radius: 6px;
            vertical-align: middle;
            font-size: 16px;
            color: #420711;
            vertical-align: middle;
            background: #ffd100;
            cursor: pointer;
            margin-left: 14px;

            .search_icon {
                width: 16px;
                height: 16px;
                display: inline-block;
                background: url('/static/public/image/casino/youyi/fdj.png') no-repeat center center;
                background-size: 100% 100%;
                white-space: nowrap;
                letter-spacing: -1em;
                text-indent: -99em;
                color: transparent;
                &:after {
                    /* 伪元素插入空格文本 */
                    content: '\3000';
                }
            }
        }
    }
}

.mainbox {
    height: 106px;
    position: relative;
    margin: 0;
    overflow: hidden;

    .game_type1,.game_type2 {
        width: 1026px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        li {
            width: 100px;
            height: 106px;
            &:hover {
                // transform:  scale(1.05);
                // -webkit-transform:  scale(1.05);
                // -ms-transform:  scale(1.05);
                background: -webkit-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Firefox 3.6 - 15 */
                background: linear-gradient(to bottom, #fbdd7e, #f3cc55); /* 标准的语法 */
                color: #fff;
                div {
                    border-bottom: 1px solid #ffffff;
                }
            }
            &.active {
                // transform:  scale(1.05);
                // -webkit-transform:  scale(1.05);
                // -ms-transform:  scale(1.05);
                background: -webkit-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to bottom, #fbdd7e, #f3cc55); /* Firefox 3.6 - 15 */
                background: linear-gradient(to bottom, #fbdd7e, #f3cc55); /* 标准的语法 */
                color: #fff;
                div {
                    border-bottom: 1px solid #fff;
                }
            }
        }
    }
   
    .game_type {
        clear: both;
        zoom: 1;
        overflow: hidden;
        display: inline-block;

        li {
            height: 106px;
            width: 100px;
            float: left;
            margin-right: 14px;
            // margin-top: 4px;
            padding: 0;
            font-size: 16px;
            background-color: #530815;
            color: #bc7783;
            border-radius: 6px;
            transition: all 0.2s ease 0s;
            cursor: pointer;
            text-align: center;
            overflow: hidden;

            &.hot_game {
                background: #530815;
                // background: url('/static/public/image/casino/youyi/hot-game1.png') center top no-repeat;
            }
            &.hot_game:hover {
                background: linear-gradient(to bottom,#f3cc55, #fbdd7e);
                // background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
                background-size: 100% 100%;
            }
            &.hot_game.active {
                background: linear-gradient(to bottom,#f3cc55, #fbdd7e);
                // background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
                background-size: 100% 100%;
            }

            div {
                border-bottom: 1px solid transparent;
                padding: 10px 0 0;
                width: 90%;
                margin: 0 auto;

                .game_icon {
                    width: 81px;
                    height: 54px;
                }
                .hot_game{
                    background: url('/static/public/image/casino/youyi/qb.png') center top no-repeat;
                }
                .ag_game {
                    background: url('/static/public/image/casino/youyi/ag-vnst.png') center top no-repeat;
                }
                .ae_game {
                    background: url('/static/public/image/casino/youyi/ae-vnst.png') center top no-repeat;
                }
                .bbin_game {
                    background: url('/static/public/image/casino/youyi/bbin-vnst.png') center top no-repeat;
                }
                .cq9_game {
                    background: url('/static/public/image/casino/youyi/cq9-vnst.png') center top no-repeat;
                }
                .fg_game {
                    background: url('/static/public/image/casino/youyi/fg-vnst.png') center top no-repeat;
                }
                .dt_game {
                    background: url('/static/public/image/casino/youyi/dt-vnst.png') center top no-repeat;
                }
                .jdb_game {
                    background: url('/static/public/image/casino/youyi/jdb-vnst.png') center top no-repeat;
                }
                .mg_game {
                    background: url('/static/public/image/casino/youyi/mg-vnst.png') center top no-repeat;
                }
                .mw_game {
                    background: url('/static/public/image/casino/youyi/mw-vnst.png') center top no-repeat;
                }
                .pt_game {
                    background: url('/static/public/image/casino/youyi/pt-vnst.png') center top no-repeat;
                }
                .ttg_game {
                    background: url('/static/public/image/casino/youyi/ttg-vnst.png') center top no-repeat;
                }
                .more_game {
                    background: url('/static/public/image/casino/youyi/more.png') center top no-repeat;
                }
                .hot_game.newactive{
                    background: url('/static/public/image/casino/youyi/qb-hover.png') center top no-repeat;
                }
                .ag_game.newactive {
                    background: url('/static/public/image/casino/youyi/ag-hover.png') center top no-repeat;
                }
                .ae_game.newactive {
                    background: url('/static/public/image/casino/youyi/ae-hover.png') center top no-repeat;
                }
                .bbin_game.newactive {
                    background: url('/static/public/image/casino/youyi/bbin-hover.png') center top no-repeat;
                }
                .cq9_game.newactive {
                    background: url('/static/public/image/casino/youyi/cq9-hover.png') center top no-repeat;
                }
                .fg_game.newactive {
                    background: url('/static/public/image/casino/youyi/fg-hover.png') center top no-repeat;
                }
                .dt_game.newactive {
                    background: url('/static/public/image/casino/youyi/dt-hover.png') center top no-repeat;
                }
                .jdb_game.newactive {
                    background: url('/static/public/image/casino/youyi/jdb-hover.png') center top no-repeat;
                }
                .mg_game.newactive {
                    background: url('/static/public/image/casino/youyi/mg-hover.png') center top no-repeat;
                }
                .mw_game.newactive {
                    background: url('/static/public/image/casino/youyi/mw-hover.png') center top no-repeat;
                }
                .pt_game.newactive {
                    background: url('/static/public/image/casino/youyi/pt-hover.png') center top no-repeat;
                }
                .ttg_game.newactive {
                    background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
                }
                .more_game.newactive {
                    background: url('/static/public/image/casino/youyi/more-hover.png') center top no-repeat;
                }
            }

            span {
                line-height: 32px;
            }
        }
        li:nth-child(10),
        li:nth-child(11),
        li:nth-child(12) {
            margin-top: 16px;
        }
        li:hover .hot_game {
            background: url('/static/public/image/casino/youyi/qb-hover.png') center top no-repeat;
        }
        li:hover .ag_game {
            background: url('/static/public/image/casino/youyi/ag-hover.png') center top no-repeat;
        }
        li:hover .ae_game {
            background: url('/static/public/image/casino/youyi/ae-hover.png') center top no-repeat;
        }
        li:hover .bbin_game {
            background: url('/static/public/image/casino/youyi/bbin-hover.png') center top no-repeat;
        }
        li:hover .cq9_game {
            background: url('/static/public/image/casino/youyi/cq9-hover.png') center top no-repeat;
        }
        li:hover .dt_game {
            background: url('/static/public/image/casino/youyi/dt-hover.png') center top no-repeat;
        }
        li:hover .fg_game {
            background: url('/static/public/image/casino/youyi/fg-hover.png') center top no-repeat;
        }
        li:hover .jdb_game {
            background: url('/static/public/image/casino/youyi/jdb-hover.png') center top no-repeat;
        }
        li:hover .mg_game {
            background: url('/static/public/image/casino/youyi/mg-hover.png') center top no-repeat;
        }
        li:hover .mw_game {
            background: url('/static/public/image/casino/youyi/mw-hover.png') center top no-repeat;
        }
        li:hover .pt_game {
            background: url('/static/public/image/casino/youyi/pt-hover.png') center top no-repeat;
        }
        li:hover .ttg_game {
            background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
        }
        li:hover .more_game {
            background: url('/static/public/image/casino/youyi/more-hover.png') center top no-repeat;
        }
        li.active {
            background: linear-gradient(to bottom, #fbdd7e, #f3cc55);
            color: #ffffff;
            div {
                border-bottom: 1px solid #fff;
            }
        }
    }
    // .game_type2 {
    //     overflow: visible;
    //     li {
    //         overflow: visible;
    //         margin-right: 0;
    //         &.active {
    //             background: none;
    //         }
    //     }
    // }
    .game_type2 {
       
        position: absolute;
        top: 0;
        left: 1026px;
        // padding: 0 0 10px 8px;

        li {
            padding: 0 !important;
            margin-right: 0;
            // img {
            //     width: 101px;
            //     height: 104px;
            //     border-radius: 10px;
            // }
            // &.deGame:hover {
            //     transform:  scale(1.05);
            //     -webkit-transform:  scale(1.05);
            //     -ms-transform:  scale(1.05);
            // }
            // &.active {
            //     transform:  scale(1.05);
            //     -webkit-transform:  scale(1.05);
            //     -ms-transform:  scale(1.05);
            // }
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
    padding: 0 35px;
    clear: both;
    zoom: 1;
    overflow: hidden;

    .search-info {
        width: 880px;
        .search-detail {
            margin-top: 17px;
            overflow: hidden;
            margin-bottom: 20px;

            .search-type {
                .search-game {
                    height: 48px;
                    line-height: 48px;
                    font: 14px/1.6 tahoma, arial, 'Microsoft YaHei', sans-serif;

                    dt {
                        margin-right: 12px;
                        color: #fff;
                        display: inline-block;
                        vertical-align: middle;
                        line-height: 15px;

                        .gicon1 {
                            background: url('/static/public/image/casino/youyi/game_type.png') no-repeat center center;
                        }
                        .gicon2 {
                            background: url('/static/public/image/casino/youyi/money.png') no-repeat center center;
                        }
                        .gicon3 {
                            background: url('/static/public/image/casino/youyi/fengge.png') no-repeat center center;
                        }

                        .gicon {
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            background-size: 100% 100%;
                            white-space: nowrap;
                            letter-spacing: -1em;
                            text-indent: -99em;
                            color: transparent;
                            margin-right: 10px;
                            &:after {
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
                            margin: 10px 20px 10px 0;
                            line-height: 28px;
                            color: #bc7783;
                            text-decoration: none;
                            text-align: center;
                        }

                        .active {
                            background: #ffd100;
                            color: #000;
                            padding: 0 30px;
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
    width: 1132px;

    .game-content::-webkit-scrollbar {
        display: none;
    }

    .game-content {
        width: 1132px;
        min-height: 300px;
        position: relative;
        overflow: auto;
        .game-item {
            position: relative;
            background-attachment: scroll;
            float: left;
            width: 210px;
            height: 256px;
            // padding-bottom: 10px;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            color: #c1c1c1;
            text-align: left;
            transition: all 0.3s;
            background: #530815;
            border-radius: 10px;
            overflow: hidden;
            text-align: center;

            &:hover {
                transition: all 0.4s;
                transform: translateY(-3px);
                .boxShadow{
                    display: block;
                }
                .play{
                    display: inline-block;
                }
            }

            .game-pic {
                position: relative;
                width: 100%;
                height: 210px;
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
                        background: url('/static/public/image/icon-shoucang.png') no-repeat center top;
                        background-size: 100%;
                    }
                }

                .default {
                    width: 100%;
                    height: 100%;
                }
            }

            h3 {
                color: #c3c3c3;
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 15px 0;
            }
            .boxShadow{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background-color: rgba(0,0,0,0.5);
                display: none;
            }
            .play,
            #try {
                position: absolute;
                transform: translate(-50%, -50%);
                left: 112px;
                top: 112px;
                width: 110px;
                height: 35px;
                display: inline-block;
                line-height: 35px;
                color: #000;
                border-radius: 6px;
                border: 0px solid transparent;
                font-size: 16px;

                &.play {
                    background: #ffd100;
                }
                &.play:hover {
                    background: #ffe366;
                }
                &#try {
                    border: 1px solid #333;
                }
                &#try:hover {
                    background: #ffd100;
                    border: 0px solid transparent;
                }
            }
            .play{
                display: none;
            }
          
        }
        li:nth-child(5n){
            margin-right: 0;
        }
    }

    .pagenation {
        height: 30px;
        text-align: center;
        box-sizing: border-box;
        transform: translate(0, 15px);

        li {
            display: inline;
            background: #444;
            padding: 6px 12px;
            border-radius: 3px;

            a {
                color: #b2b2b2;
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
