<template>
    <div id="maincontainer">
        <div class="mainContent">
            <div class="mainbox" ref="gameMenu">
                <ul class="game_type game_type1">
                    <li :class="[{'active':$route.query.id===item.id},item.class,item.newclass+'_hover']" :key="index"
                        v-for="(item,index) in rollList" @click="fetchgames(item)">

                        <div style="display: flex;justify-content: center;">
                            <p class="game_icon" v-if="index!=0" :class="[{'newactive':$route.query.id===item.id},item.newclass]"></p>
                        </div>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
                <ul class="game_type game_type2" @click="changeMenu" v-show="this.rollList.length>10">
                    <li @mouseover="changeSrc1" @mouseout="changeSrc2" class="deGame" id="ali">
                        <img v-if="showGtu" :src='src' alt="">
                        <img v-else class="imgTrue" src="/static/public/image/casino/youyi/gd2.png" alt="">
                    </li>
                </ul>
            </div>
            <!-- 搜索框 -->
            <div ref="search-container" class="search-container">
                <div class="search-fl fl">
                    <div class="search-info">
                        <div class="search-head">
                            <div>
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
            <div class="game-box">
                <div class="game-content">
                    <ul>
                        <li class="game-item" :key="index" v-for="(item,index) in gameData">
                            <div class="game-pic">
                                <a href="javascript:;" class="game-text collect"><i class="shoucang"></i></a>
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
            showGtu: true,
            src: '/static/public/image/casino/youyi/gd1.png',
            pageDatas: {
                page: 1
            },
            idlist: [],
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
            ]
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
                }
            }
            this.gameData = this.showGames;

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

        },
        //数据来源
        getAllDatas() {
            if (sessionStorage.allgames) {
                // 有缓存,可以不用请求数据
                this.allGameData = JSON.parse(sessionStorage.allgames);
                let id = this.$route.query.id;

                if (id == '55') {
                    this.gameData = this.DefaultGameData;
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
                this.giveDataById();
                this.$nextTick(() => {
                    this.offsetHeight =
                        this.$refs['search-container'].offsetHeight < 100 ? 100 : this.$refs['search-container'].offsetHeight;
                });
            }    
        },
        //关键字搜索
        async search() {
            let gameList = [];
            gameList = this.showGames.filter(item => {
                if (item.name.includes(this.iptVal)) {
                    return item;
                }
            });
            this.gameData = gameList
        },
        resulttype(item) {
            this.currenttype = item.tag;
            this.fengame();
        },
        resultline(item) {
            this.currentline = item.tag;
            this.fengame();
        },
        resultTag(item) {
            this.currentTag = item.tag;
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
            this.gameData = datas;
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
            this.giveDataById();
        },
        resetItem() {
            this.rollList.forEach(item => {
                if (item.id === this.$route.query.id) {
                    this.fetchgames(item);
                }
            });
        },
        jackpotNumAdd() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                this.jackpotNum1 = this.jackpotNum1 + 8.56;
                this.jackpotNum2 = this.jackpotNum2 + 8.56;
            }, 100);
        },
        changeMenu() {
            let menu = document.getElementsByClassName('mainbox')[0];
            let aLi = document.getElementById('ali');
            let gao = window.getComputedStyle(this.$refs.gameMenu).height;
            if (parseInt(gao) <= 124) {
                aLi.className = 'active';
                menu.style.height = '245px';
                menu.style.transition = 'all .6s ease';
                this.showGtu = false;
                this.src = '/static/public/image/casino/youyi/gd2.png';
            } else {
                menu.style.height = '124px';
                this.showGtu = true;
                aLi.className = 'deGame';
                this.src = '/static/public/image/casino/youyi/gd1.png';
            }
        },
        changeSrc1() {
            this.src = '/static/public/image/casino/youyi/gd2.png';
        },
        changeSrc2() {
            this.src = '/static/public/image/casino/youyi/gd1.png';
        },
        async getnewdatas(){
         await this.getid()
         await this.resetItem()
       }
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

        this.jackpotNumAdd();
    },
    components: {}
};
</script>

<style lang="less" scoped>
.mainContent {
    margin: 0 auto;
    width: 1200px;
    padding: 0 0 1px 0;
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
    height: 124px;
    position: relative;
    margin: 0;
    overflow: hidden;

    .game_type1 {
        width: 1100px;
        padding: 0 0 10px 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        li {
            width: 9%;
            &:hover {
                transform: scale(1.08);
                -webkit-transform: scale(1.08);
                -ms-transform: scale(1.08);
                background: -webkit-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Firefox 3.6 - 15 */
                background: linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* 标准的语法 */
                color: #fff;
                div {
                    border-bottom: 1px solid #dedede;
                }
            }
            &:first-child:hover {
                div {
                    border: none;
                }
            }
            &.active {
                transform: scale(1.08);
                -webkit-transform: scale(1.08);
                -ms-transform: scale(1.08);
                background: -webkit-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* Firefox 3.6 - 15 */
                background: linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27)); /* 标准的语法 */
                color: #fff;
                div {
                    border-bottom: 1px solid #dedede;
                }
            }
            &:first-child.active {
                div {
                    border: none;
                }
            }
        }
    }
    .game_type2 {
        position: absolute;
        top: 0;
        right: 5px;
        padding: 0 0 10px 8px;

        li {
            padding: 0 !important;
            img {
                width: 101px;
                height: 104px;
                border-radius: 10px;
            }
            &.deGame:hover {
                transform: scale(1.08);
                -webkit-transform: scale(1.08);
                -ms-transform: scale(1.08);
            }
            &.active {
                transform: scale(1.08);
                -webkit-transform: scale(1.08);
                -ms-transform: scale(1.08);
            }
        }
    }

    .game_type {
        clear: both;
        zoom: 1;
        overflow: hidden;
        display: inline-block;

        li {
            height: 104px;
            float: left;
            margin-right: 10px;
            margin-top: 4px;
            padding: 0;
            font-size: 16px;
            background-color: #383838;
            color: #8f8f8f;
            border-radius: 10px;
            transition: all 0.2s ease 0s;
            cursor: pointer;
            text-align: center;
            overflow: hidden;

            &.hot_game {
                background: url('/static/public/image/casino/youyi/hot-game1.png') center top no-repeat;
            }
            &.hot_game:hover {
                background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
                background-size: 100% 100%;
            }
            &.hot_game.active {
                background: url('/static/public/image/casino/youyi/hot-game-hover1.png') center top no-repeat;
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
                .pg_game {
                    background: url('/static/public/image/casino/youyi/pg-vnst.png') center top no-repeat;
                }
                .ttg_game {
                    background: url('/static/public/image/casino/youyi/ttg-vnst.png') center top no-repeat;
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
                .pg_game.newactive {
                    background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
                }
                .ttg_game.newactive {
                    background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
                }
            }

            span {
                line-height: 32px;
            }
        }
        li:nth-child(11),
        li:nth-child(12) {
            margin-top: 16px;
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
        li:hover .pg_game {
            background: url('/static/public/image/casino/youyi/pg-hover.png') center top no-repeat;
        }
        li:hover .ttg_game {
            background: url('/static/public/image/casino/youyi/ttg-hover.png') center top no-repeat;
        }
        li.active {
            background: linear-gradient(to bottom right, rgb(241, 211, 94), rgb(172, 130, 27));
            color: #fff;
            div {
                border-bottom: 1px solid #dedede;
            }
        }
    }
    .game_type2 {
        overflow: visible;
        li {
            overflow: visible;
            margin-right: 0;
            &.active {
                background: none;
            }
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
    background: #383838;
    clear: both;
    zoom: 1;
    overflow: hidden;

    .search-info {
        width: 880px;
        padding: 10px 0 10px 45px;

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
                width: 295px;
                height: 40px;
                border-radius: 5px;
                border: 1px solid #979797;
                vertical-align: middle;
                box-sizing: border-box;

                .ipt {
                    border: none;
                    width: 100%;
                    padding: 0 10px;
                    height: 100%;
                    line-height: 40px;
                    color: #c1c1c1;
                    background-color: transparent;
                    outline: none;
                }
            }

            .btn-search {
                outline: none;
                width: 112px;
                height: 40px;
                border: none;
                border-radius: 7px;
                vertical-align: middle;
                font-size: 16px;
                color: #fff;
                vertical-align: middle;
                background: linear-gradient(to bottom right, #f1d35e, #ac821b);
                cursor: pointer;
                margin-left: 20px;

                .search_icon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    background: url('/static/public/image/youyi/sousuo.png') no-repeat center center;
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
                        color: #c5c5c5;
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
                            margin: 5px 20px 5px 0;
                            line-height: 28px;
                            color: #8f8f8f;
                            text-decoration: none;
                            text-align: center;
                        }

                        .active {
                            background: #ffd100;
                            color: #000;
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
    margin-bottom: 80px;
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
        padding-top: 18px;

        ul {
            margin: 0 15px;
        }

        .game-item {
            position: relative;
            background-attachment: scroll;
            float: left;
            width: 224px;
            // padding-bottom: 10px;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            cursor: pointer;
            font-size: 14px;
            color: #c1c1c1;
            text-align: left;
            transition: all 0.3s;
            background: #383838;
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
                        background: url('/static/public/image/icon-shoucang.png') no-repeat center top;
                        background-size: 100%;
                    }
                }

                .default {
                    width: 224px;
                    height: 224px;
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
