<template>
    <div class="new-index klk-home">
        <!-- <vp-home-header></vp-home-header> -->
        <!-- <vp-nav></vp-nav> -->

        <div class="content_bg">
            <div class="content-main-bg" :class="{night:colorbool}">
                <div>
                    <div class="main">
                        <div class="section section1">
                            <div class="contentBox">
                                <div class="casino view view-slideup on">
                                    <div class="img img1 start-game" data-game-id="A02003">
                                        <img src="/static/478qp/img/home/1.jpg">
                                        <div class="img-info">
                                            <h3>AG旗舰厅</h3>
                                            <p class="txt2">澳门永利皇宫百家乐大赛指定游戏厅</p>
                                            <p class="baccarat-text">赌王争霸 · 抢夺千万大奖</p>
                                            <p class="baccarat-text">每周三晚上8点准时开赛</p>

                                            <p class="baccarat_show hide">距今晚开赛仅剩：<span id="matchDate"></span></p>
                                            <p class="baccarat_show hide" id="champion">今晚冠军奖金：<span id="matchBonus"></span>元</p>

                                            <div class="img-balance">
                                                <i class="icon-bal common-icons"></i>
                                                <span id="agonlinenum">2809</span><span>人</span>
                                            </div>
                                            <a href="javascript:;" @click="getItemId({id:31})" class="img-btn"><span>立即游戏</span></a>
                                        </div>
                                        <div class="img-mask img-mask-hover"></div>

                                    </div>
                                    <div class="img img2 start-game" data-game-id="A02026">
                                        <img src="/static/478qp/img/home/2.jpg">
                                        <div class="img-info">
                                            <h3>AG国际厅</h3>
                                            <p class="txt2">澳门永利皇宫真人娱乐美女主播让您身临其境</p>
                                            <p>美女主播互动综合游戏区</p>
                                            <p>2万在线玩家同场竞技</p>
                                            <div class="img-balance">
                                                <i class="icon-bal common-icons"></i>
                                                <span id="agonlinenum">9819</span><span>人</span>
                                            </div>
                                            <a href="javascript:;" @click="getItemId({id:31})" class="img-btn"><span>立即游戏</span></a>
                                        </div>
                                        <div class="img-mask img-mask-hover"></div>

                                    </div>
                                </div>
                                <!-- 百家乐好路推荐 -->
                                <div class="row" id="baccrartIframe">
                                    <div class="t view view-slideup on">
                                        <span class="line line1"></span>
                                        百家乐好路推荐
                                        <span class="line line2"></span>
                                    </div>

                                    <div class="c c1 view view-slideup on" id="baccrartIframeContent">
                                        <div id="table-iframe" class="iframe-holder">
                                            <div class="box" style="margin-left:0">
                                                <div class="box-t" v-if="canvasData.length>2">
                                                    {{canvasData[0].vid}}
                                                    <span class="time">
                                                        <span>稳定红利 天天赚</span>
                                                    </span>
                                                </div>
                                                <div class="scoreboard">
                                                    <div class="col col1">
                                                        <h5><span>庄</span> <span id="l_zhuang" v-if="canvasData.length>2">{{canvasData[0].bankerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col2">
                                                        <h5><span>和</span> <span id="l_he" v-if="canvasData.length>2">{{canvasData[0].playerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col3">
                                                        <h5><span>闲</span> <span id="l_xian"v-if="canvasData.length>2">{{canvasData[0].tieNums}}</span></h5>
                                                    </div>
                                                </div>
                                                <div class="img">
                                                    <div id="lz_load" class="shuffle" style="display: none;">
                                                        <font class="noopentxtxp">洗牌中</font>
                                                    </div>

                                                    <div id="lz_load2" class="loading" style="display: none;">
                                                        <font class="noopentxt">loading...</font>
                                                    </div>

                                                    <div id="luzu_div" style="display: block;">
                                                        <canvas id="cvs" width="706" height="266" ref="canvas1"></canvas>
                                                    </div>
                                                </div>
                                                <a href="javascript:;" @click="getItemId({id:3180})" class="box-btn start-game"
                                                    data-game-id="A02003"><span>快速入桌</span></a>
                                            </div>
                                        </div>
                                        <div id="b01-iframe" class="iframe-holder">

                                            <div class="box" style="margin-left:0">
                                                <div class="box-t" v-if="canvasData.length>2">
                                                    {{canvasData[1].vid}}
                                                    <span class="time">
                                                        <span>月赚百万 非你莫属</span>
                                                    </span>
                                                </div>
                                                <div class="scoreboard">
                                                    <div class="col col1">
                                                        <h5><span>庄</span> <span id="l_zhuang" v-if="canvasData.length>2">{{canvasData[1].bankerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col2">
                                                        <h5><span>和</span> <span id="l_he" v-if="canvasData.length>2">{{canvasData[1].playerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col3">
                                                        <h5><span>闲</span> <span id="l_xian" v-if="canvasData.length>2">{{canvasData[1].tieNums}}</span></h5>
                                                    </div>
                                                </div>
                                                <div class="img">
                                                    <div id="lz_load" class="shuffle" style="display: none;">
                                                        <font class="noopentxtxp">洗牌中</font>
                                                    </div>

                                                    <div id="lz_load2" class="loading" style="display: none;">
                                                        <font class="noopentxt">loading...</font>
                                                    </div>

                                                    <div id="luzu_div" style="display: block;">
                                                       <canvas id="cvs" width="706" height="266" ref="canvas2"></canvas>
                                                    </div>
                                                </div>
                                                <a href="javascript:;" @click="getItemId({id:48})" class="box-btn start-game"
                                                    data-game-id="A02003"><span>快速入桌</span></a>
                                            </div>

                                        </div>
                                        <div id="b02-iframe" class="iframe-holder">

                                            <div class="box">
                                                <div class="box-t" v-if="canvasData.length>2">
                                                     {{canvasData[2].vid}}
                                                    <span class="time">
                                                        <span>携手共赢，通往财富自由</span>
                                                    </span>
                                                </div>
                                                <div class="scoreboard">
                                                    <div class="col col1">
                                                        <h5><span>庄</span> <span id="l_zhuang" v-if="canvasData.length>2">{{canvasData[2].bankerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col2">
                                                        <h5><span>和</span> <span id="l_he" v-if="canvasData.length>2">{{canvasData[2].playerNums}}</span></h5>
                                                    </div>
                                                    <div class="col col3">
                                                        <h5><span>闲</span> <span id="l_xian"v-if="canvasData.length>2">{{canvasData[2].tieNums}}</span></h5>
                                                    </div>
                                                </div>
                                                <div class="img">
                                                    <div id="lz_load" class="shuffle" style="display: none;">
                                                        <font class="noopentxtxp">洗牌中</font>
                                                    </div>

                                                    <div id="lz_load2" class="loading" style="display: none;">
                                                        <font class="noopentxt">loading...</font>
                                                    </div>

                                                    <div id="luzu_div" style="display: block;">
                                                       <canvas id="cvs" width="706" height="266" ref="canvas3" style="margin-left:20px"></canvas>
                                                    </div>
                                                </div>
                                                <a href="javascript:;" @click="getItemId({id:10682})" class="box-btn start-game"
                                                    data-game-id="A02003"><span>快速入桌</span></a>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <!-- 百家乐专家 -->
                                <div class="row last" id="baccaratTeam" :class="['view view-slideup',isShow1 ? 'on' : '']">
                                    <div class="t">
                                        <span class="line line1"></span>
                                        百家乐专家
                                        <span class="line line2"></span>
                                        <div style="clear: both;font-size: 13px;color: #999;margin-top:12px;">
                                            注：此排名仅展示AG旗舰厅数据，此数据不代表澳门永利皇宫娱乐所有客户在所有大厅数据；数据每小时更新一次。 </div>
                                    </div>
                                    <input type="hidden" id="_begin_times" name="_begin_times" value="2019-08-02 00:00:00">
                                    <input type="hidden" id="_end_times" name="_end_times" value="2019-08-02 12:59:59">
                                    <div class="c">
                                        <div class="baccarat">
                                            <img src="/static/478qp/img/home/bg1.jpg" class="baccarat-bg">
                                            <a href="/baccarat_masters.htm" target="_blank"><span class="tag"></span></a>
                                            <!-- left: 排名 -->
                                            <div class="table">
                                                <table width="100%">
                                                    <tbody ref="profit">
                                                        <tr>
                                                            <th width="20" class="space"></th>
                                                            <th width="70">实时排名</th>
                                                            <th>用户名</th>
                                                            <th>今日实时盈利</th>
                                                            <th>盈利率</th>
                                                            <th width="20" class="space"></th>
                                                        </tr>
                                                        <tr :class="[curIndex == 1 ? 'active' : '']" data-totalcusaccount="263600.00"
                                                            data-rank="1" data-rankchange="line" data-secretname="CQI1Sgn3oa0="
                                                            @click="showProfitCont(rank_1_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="index-icons icon-medal icon-gold"></span>
                                                                <span class="index-icons arrow arrow-line"></span>
                                                            </td>
                                                            <td>****nac</td>
                                                            <td>¥ {{randomAwardList[0]}}.00</td>
                                                            <td>{{randomRateList[0]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 2 ? 'active' : '']" data-totalcusaccount="73897.00"
                                                            data-rank="2" data-rankchange="line" data-secretname="j/MH/HQlP/SYKPd8h8oDRQ=="
                                                            @click="showProfitCont(rank_2_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="index-icons icon-medal icon-silver"></span>
                                                                <span class="index-icons arrow arrow-line"></span>
                                                            </td>
                                                            <td>*****111</td>
                                                            <td>¥ {{randomAwardList[1]}}.00</td>
                                                            <td>{{randomRateList[1]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 3 ? 'active' : '']" data-totalcusaccount="69956.75"
                                                            data-rank="3" data-rankchange="line" data-secretname="nqxtWAYg8IaYKPd8h8oDRQ=="
                                                            @click="showProfitCont(rank_3_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="index-icons icon-medal icon-bronze"></span>
                                                                <span class="index-icons arrow arrow-line"></span>
                                                            </td>
                                                            <td>*****748</td>
                                                            <td>¥ {{randomAwardList[2]}}.00</td>
                                                            <td>{{randomRateList[2]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 4 ? 'active' : '']" data-totalcusaccount="51688.00"
                                                            data-rank="4" data-rankchange="up" data-secretname="60i9nfq3F/fI4xpxVOQkOw=="
                                                            @click="showProfitCont(rank_4_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">4</span>
                                                                <span class="index-icons arrow arrow-up"></span>
                                                            </td>
                                                            <td>********i23</td>
                                                            <td>¥ {{randomAwardList[3]}}.00</td>
                                                            <td>{{randomRateList[3]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 5 ? 'active' : '']" data-totalcusaccount="40000.00"
                                                            data-rank="5" data-rankchange="up" data-secretname="TELpGo67sDhpIitSHTrWTw=="
                                                            @click="showProfitCont(rank_5_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">5</span>
                                                                <span class="index-icons arrow arrow-up"></span>
                                                            </td>
                                                            <td>******216</td>
                                                            <td>¥ {{randomAwardList[4]}}.00</td>
                                                            <td>{{randomRateList[4]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 6 ? 'active' : '']" data-totalcusaccount="38450.00"
                                                            data-rank="6" data-rankchange="up" data-secretname="TM2aE6AsVig="
                                                            @click="showProfitCont(rank_6_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">6</span>
                                                                <span class="index-icons arrow arrow-up"></span>
                                                            </td>
                                                            <td>**000</td>
                                                            <td>¥ {{randomAwardList[5]}}.00</td>
                                                            <td>{{randomRateList[5]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 7 ? 'active' : '']" data-totalcusaccount="37850.00"
                                                            data-rank="7" data-rankchange="down" data-secretname="B/IYMnDBmeGYKPd8h8oDRQ=="
                                                            @click="showProfitCont(rank_7_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">7</span>
                                                                <span class="index-icons arrow arrow-down"></span>
                                                            </td>
                                                            <td>*****830</td>
                                                            <td>¥ {{randomAwardList[6]}}.00</td>
                                                            <td>{{randomRateList[6]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 8 ? 'active' : '']" data-totalcusaccount="36430.00"
                                                            data-rank="8" data-rankchange="down" data-secretname="Ui4JwxlghnlOXQlfZupUaw=="
                                                            @click="showProfitCont(rank_8_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">8</span>
                                                                <span class="index-icons arrow arrow-down"></span>
                                                            </td>
                                                            <td>********f24</td>
                                                            <td>¥ {{randomAwardList[7]}}.00</td>
                                                            <td>{{randomRateList[7]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 9 ? 'active' : '']" data-totalcusaccount="35850.00"
                                                            data-rank="9" data-rankchange="down" data-secretname="MTxRxdXh9K+YKPd8h8oDRQ=="
                                                            @click="showProfitCont(rank_9_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">9</span>
                                                                <span class="index-icons arrow arrow-down"></span>
                                                            </td>
                                                            <td>*****777</td>
                                                            <td>¥ {{randomAwardList[8]}}.00</td>
                                                            <td>{{randomRateList[8]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                        <tr :class="[curIndex == 10 ? 'active' : '']" data-totalcusaccount="35434.10"
                                                            data-rank="10" data-rankchange="down" data-secretname="cbGfdDKb/LI="
                                                            @click="showProfitCont(rank_10_data)">
                                                            <td class="space"></td>
                                                            <td>
                                                                <span class="icon-medal ">10</span>
                                                                <span class="index-icons arrow arrow-down"></span>
                                                            </td>
                                                            <td>****929</td>
                                                            <td>¥ {{randomAwardList[9]}}.00</td>
                                                            <td>{{randomRateList[9]}}%</td>
                                                            <td class="space">
                                                                <span class="arrow-right index-icons"></span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- right: 盈利列表 -->
                                            <div class="info">
                                                <div class="t">
                                                    <span class="line line1"></span>今日总盈利金额
                                                    <span class="line line2"></span>
                                                </div>

                                                <div class="value">
                                                    <span class="index-icons icon" :class="totalProfit.class" id="currank"></span>
                                                    <span>¥</span>
                                                    <span id="cur-cusamount">{{totalProfit.profitAmount}}</span>
                                                    <i class="index-icons arrow" :class="totalProfit.rankState" id="currankchange"></i>
                                                </div>

                                                <h4 id="curstatus">在
                                                    <span id="curplate">旗舰厅</span>
                                                    <span id="curtable">{{totalProfit.tbInfo_1[0].tbNum}}</span>桌 投注
                                                    <a id="curfollow" href="###" class="start-game btn" data-game-id="A02003"
                                                        data-gametype="BAC" data-tablecode="" @click="getItemId(totalProfit)">
                                                        <span>跟注</span>
                                                    </a>
                                                </h4>

                                                <div class="t t2">
                                                    <span class="line line1"></span>盈利记录
                                                    <span class="line line2"></span>
                                                </div>

                                                <div class="list" id="curlist">
                                                    <!-- left -->
                                                    <ul class="list-col list-col1">
                                                        <li v-for="item in totalProfit.tbInfo_1" :key="item.id">
                                                            旗舰厅
                                                            <b class="underline">{{item.tbNum}}</b>
                                                            <span class="i-wrap">
                                                                <i class="index-icons list-icon" :class="item.class">{{item.part}}</i>
                                                            </span>盈利金额
                                                            <span>¥
                                                                <b>{{item.pMoney}}</b>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <!-- right -->
                                                    <ul class="list-col list-col2">
                                                        <li v-for="item in totalProfit.tbInfo_2" :key="item.id">
                                                            旗舰厅
                                                            <b class="underline">{{item.tbNum}}</b>
                                                            <span class="i-wrap">
                                                                <i class="index-icons list-icon" :class="item.class">{{item.part}}</i>
                                                            </span>盈利金额
                                                            <span>¥
                                                                <b>{{item.pMoney}}</b>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="avarageTime" :class="['sub-t view view-slideup',isShow3?'on':'']">澳门永利皇宫会员平均取款到账时间：
                                            <span class="timeStyle">3-5</span>
                                            <span class="txtStyle">分钟</span>；&nbsp;&nbsp;&nbsp; 正在处理取款：
                                            <span class="timeStyle">{{randomRateList[0]}}</span>
                                            <span class="txtStyle">笔</span>；&nbsp;&nbsp;&nbsp;
                                            <span class="towithdraw_page" @click="goUserCen('withdraw',2)">查看实时取款动态</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- 本月已送出优惠 -->
                    <div class="section section2" id="monthRate">
                        <div class="contentBox">
                            <div :class="['t view view-slideup',isShow4?'on':'']">
                                <span class="line line1"><i></i></span>
                                本月已送出优惠
                                <span class="line line2"><i></i></span>
                            </div>

                            <div :class="['jackpot view view-slideup',isShow5?'on':'']">
                                <h1>
                                    RMB
                                    <span>{{sentAward.toLocaleString()}}.{{randomFloat.toString().padEnd(2,'0')}}</span>
                                </h1>
                            </div>
                            <div class="br"></div>
                            <!-- 彩票 捕鱼 体育 -->
                            <div :class="['c view view-slideup',isShow6?'on':'']">
                                <div class="list-cycle" data-cycle-slides="> div" data-cycle-timeout="5000" data-cycle-fx="scrollHorz"
                                    data-cycle-pager=".pager2" data-cycle-pause-on-hover="true">
                                    <div class="group">
                                        <!-- 彩票游戏 -->
                                        <div class="item lixilist">
                                            <div class="item-t">
                                                <i class="icon common-icons"></i>
                                                <h3>彩票游戏</h3>
                                            </div>
                                            <div class="item-img" @click="gopage(1)">
                                                <img src="/static/478qp/img/home/jiebei.jpg" alt="">
                                            </div>
                                        </div>
                                        <!-- 捕鱼游戏 -->
                                        <div class="item">
                                            <div class="item-t">
                                                <i class="icon common-icons"></i>
                                                <h3>捕鱼游戏</h3>
                                            </div>
                                            <div class="item-img" @click="gopage(2)">
                                                <img src="/static/478qp/img/home/jin.jpg" alt="">
                                            </div>
                                        </div>
                                        <!-- 体育竞技 -->
                                        <div class="item last ckwcl">
                                            <div class="item-t">
                                                <i class="icon common-icons"></i>
                                                <h3>体育竞技</h3>
                                            </div>
                                            <div class="item-img" @click="gopage(3)">
                                                <img src="/static/478qp/img/home/qiandao.jpg" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pager2"></div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>

                    <div class="section section4" :class="['view view-slideup',isShow9?'on':'']">
                        <img id="bg2" src="/static/478qp/img/home/bg2.jpg" alt="">
                        <div class="contentBox">
                            <div class="row last">
                                <div class="t">
                                    <span class="line line1"></span>
                                    澳门永利皇宫集团旗下
                                    <span class="line line2"></span>
                                </div>
                                <div class="c">
                                    <div class="logos">
                                        <span class="logo logo2" @click="goGame(1)"></span>
                                        <span class="logo logo7" @click="goGame(2)"></span>
                                        <a href="javascript:void(0);" @click="goGame(3)" class="logo logo3" style="cursor:auto"></a>
                                        <a href="javascript:void(0);" @click="goGame(4)" class="logo logo4"></a>
                                        <a href="javascript:void(0);" @click="goGame(5)" class="logo logo6"></a>
                                        <a href="javascript:void(0);" @click="goGame(6)" class="logo logo5 last"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <vpFooter></vpFooter> -->

                <Modal :scrollable=true title="网站公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box">
                    <div class="popout-box">
                        <span v-html="popups"></span>
                    </div>
                </Modal>

            </div>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService.js';
import '@/assets/iconfont/klk/iconfont.css';
import '@/assets/iconfont/public/iconfont.css';
import vpHomeTimer from './timer.vue';
import data from '../../public/games/public.js';
import vpMc from './mc';
import vpHomeHeader from './header.vue';
import vpNav from './nav.vue';
import vpFooter from './footer';
import canvas from './canvas.js';
let indextime;
export default {
    mixins: [data,canvas],
    data() {
        return {
            randomAwardList: [69870, 62140, 56230, 45820, 32560, 30880, 26550, 23110, 16560, 11230],
            awardTimer: null,
            randomRateList: [14, 26, 85, 23, 34, 35, 96, 13, 45, 19],
            sentAward: 16885796,
            randomFloat: 62,
            rateTimer: null,
            active: true,
            isShow1: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            isShow9: false,
            curIndex: 1,
            totalProfit: {
                rank: '1',
                class: 'icon1',
                profitAmount: 69870,
                rankState: 'arrow-line',
                tbInfo_1: [
                    { id: 1, tbNum: 'T030', part: '闲', class: 'list-icon-blue', pMoney: '32000' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '62000' },
                    { id: 3, tbNum: 'T188', part: '闲', class: 'list-icon-blue', pMoney: '27000' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B330', part: '庄', class: 'list-icon-red', pMoney: '20100' },
                    { id: 2, tbNum: 'D016', part: '庄', class: 'list-icon-red', pMoney: '30500' },
                    { id: 3, tbNum: 'A108', part: '闲', class: 'list-icon-blue', pMoney: '16000' }
                ],
                id: 31
            },
            rank_1_data: {
                rank: '1',
                class: 'icon1',
                profitAmount: 69870,
                rankState: 'arrow-line',
                tbInfo_1: [
                    { id: 1, tbNum: 'T030', part: '闲', class: 'list-icon-blue', pMoney: '32000' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '62000' },
                    { id: 3, tbNum: 'T188', part: '闲', class: 'list-icon-blue', pMoney: '27000' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B330', part: '庄', class: 'list-icon-red', pMoney: '20100' },
                    { id: 2, tbNum: 'D016', part: '庄', class: 'list-icon-red', pMoney: '30500' },
                    { id: 3, tbNum: 'A108', part: '闲', class: 'list-icon-blue', pMoney: '16000' }
                ],
                id: 31
            },
            rank_2_data: {
                rank: '2',
                class: 'icon2',
                profitAmount: 62140,
                rankState: 'arrow-line',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '庄', class: 'list-icon-red', pMoney: '18000' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '62000' },
                    { id: 3, tbNum: 'T028', part: '闲', class: 'list-icon-blue', pMoney: '37850' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B003', part: '闲', class: 'list-icon-blue', pMoney: '32000' },
                    { id: 2, tbNum: 'E016', part: '庄', class: 'list-icon-red', pMoney: '16800' },
                    { id: 3, tbNum: 'C108', part: '闲', class: 'list-icon-blue', pMoney: '16000' }
                ],
                id: 32
            },
            rank_3_data: {
                rank: '3',
                class: 'icon3',
                profitAmount: 56230,
                rankState: 'arrow-line',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '18000' },
                    { id: 2, tbNum: 'F066', part: '闲', class: 'list-icon-blue', pMoney: '62000' },
                    { id: 3, tbNum: 'T028', part: '闲', class: 'list-icon-blue', pMoney: '37850' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B003', part: '闲', class: 'list-icon-blue', pMoney: '13700' },
                    { id: 2, tbNum: 'E016', part: '庄', class: 'list-icon-red', pMoney: '13200' },
                    { id: 3, tbNum: 'C108', part: '闲', class: 'list-icon-blue', pMoney: '23400' }
                ],
                id: 3180
            },
            rank_4_data: {
                rank: '4',
                class: 'icon4',
                profitAmount: 45820,
                rankState: 'arrow-up',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '38000' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '12800' },
                    { id: 3, tbNum: 'T028', part: '闲', class: 'list-icon-blue', pMoney: '20000' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '闲', class: 'list-icon-blue', pMoney: '13007' },
                    { id: 2, tbNum: 'E003', part: '庄', class: 'list-icon-red', pMoney: '11400' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '10080' }
                ],
                id: 42
            },
            rank_5_data: {
                rank: '5',
                class: 'icon5',
                profitAmount: 32560,
                rankState: 'arrow-up',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '47500' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '12800' },
                    { id: 3, tbNum: 'T028', part: '闲', class: 'list-icon-blue', pMoney: '30875' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '闲', class: 'list-icon-blue', pMoney: '30566' },
                    { id: 2, tbNum: 'E003', part: '庄', class: 'list-icon-red', pMoney: '28513' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '24588' }
                ],
                id: 34
            },
            rank_6_data: {
                rank: '5',
                class: 'icon6',
                profitAmount: 30880,
                rankState: 'arrow-up',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '39160' },
                    { id: 2, tbNum: 'F066', part: '庄', class: 'list-icon-red', pMoney: '33920' },
                    { id: 3, tbNum: 'T028', part: '庄', class: 'list-icon-red', pMoney: '30875' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '闲', class: 'list-icon-blue', pMoney: '30566' },
                    { id: 2, tbNum: 'E003', part: '庄', class: 'list-icon-red', pMoney: '28513' },
                    { id: 3, tbNum: 'C001', part: '庄', class: 'list-icon-red', pMoney: '24588' }
                ],
                id: 3180
            },
            rank_7_data: {
                rank: '7',
                class: 'icon7',
                profitAmount: 26550,
                rankState: 'arrow-down',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '24160' },
                    { id: 2, tbNum: 'F066', part: '闲', class: 'list-icon-blue', pMoney: '15920' },
                    { id: 3, tbNum: 'T028', part: '庄', class: 'list-icon-red', pMoney: '30875' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '庄', class: 'list-icon-red', pMoney: '15200' },
                    { id: 2, tbNum: 'E003', part: '闲', class: 'list-icon-blue', pMoney: '14265' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '12350' }
                ],
                id: 48
            },
            rank_8_data: {
                rank: '8',
                class: 'icon8',
                profitAmount: 23110,
                rankState: 'arrow-down',
                tbInfo_1: [
                    { id: 1, tbNum: 'B098', part: '闲', class: 'list-icon-blue', pMoney: '28160' },
                    { id: 2, tbNum: 'F066', part: '闲', class: 'list-icon-blue', pMoney: '20920' },
                    { id: 3, tbNum: 'T028', part: '庄', class: 'list-icon-red', pMoney: '19000' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '庄', class: 'list-icon-red', pMoney: '13600' },
                    { id: 2, tbNum: 'E003', part: '闲', class: 'list-icon-blue', pMoney: '14265' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '24510' }
                ],
                id: 43
            },
            rank_9_data: {
                rank: '9',
                class: 'icon9',
                profitAmount: 16560,
                rankState: 'arrow-down',
                tbInfo_1: [
                    { id: 1, tbNum: 'B006', part: '闲', class: 'list-icon-blue', pMoney: '18000' },
                    { id: 2, tbNum: 'F066', part: '闲', class: 'list-icon-blue', pMoney: '42300' },
                    { id: 3, tbNum: 'T028', part: '闲', class: 'list-icon-blue', pMoney: '37850' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '庄', class: 'list-icon-red', pMoney: '65100' },
                    { id: 2, tbNum: 'E003', part: '闲', class: 'list-icon-blue', pMoney: '12586' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '23580' }
                ],
                id: 45
            },
            rank_10_data: {
                rank: '10',
                class: 'icon10',
                profitAmount: 11230,
                rankState: 'arrow-down',
                tbInfo_1: [
                    { id: 1, tbNum: 'B006', part: '闲', class: 'list-icon-blue', pMoney: '28160' },
                    { id: 2, tbNum: 'F066', part: '闲', class: 'list-icon-blue', pMoney: '20920' },
                    { id: 3, tbNum: 'T028', part: '庄', class: 'list-icon-red', pMoney: '19000' }
                ],
                tbInfo_2: [
                    { id: 1, tbNum: 'B001', part: '庄', class: 'list-icon-red', pMoney: '13600' },
                    { id: 2, tbNum: 'E003', part: '闲', class: 'list-icon-blue', pMoney: '14265' },
                    { id: 3, tbNum: 'C001', part: '闲', class: 'list-icon-blue', pMoney: '24510' }
                ],
                id: 32
            },
            timerDatas: '',
            showimg: false,
            slideTrue: false,
            showPopout: false,
            nightColor: '#fff',
            imgsrc: '/static/478qp/img/pcAlert.png',
            imgdata: ['/static/478qp/img/pcAlert1.png', '/static/478qp/img/pcAlert2.png', '/static/478qp/img/pcAlert3.png'],
            popups: '',
            lantern: '',
            value3: 0,
            // 轮播设置
            setting: {
                autoplay: false,
                autoplaySpeed: 2000,
                dots: 'none',
                trigger: 'click',
                arrow: 'hover',
                arrow2: 'never'
            },
            timer: {
                timerModel: '',
                timeLeave: '',
                djs_next_kaipan: ''
            },
            changdate: [[16, 12, 3630], [1, 19, 17], [10044, 27, 3632]],
            changIndex: 0,
            watchdata: '',
            //彩票大厅游戏数据
            randomData: [],
            randomDatalist: [],
            //中奖名单数据
            winningInfo: [],
            touzhuInfo: [],
            showlist: true,
            newlotterydate: '',
            // 滚动名单
            random: [
                {
                    account: '',
                    name: 'PT游戏满月财富',
                    ico: '/static/public/image/game/ptgame/ashfmf.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏丛林之心',
                    ico: '/static/public/image/game/ptgame/ashhotj.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏猫女王',
                    ico: '/static/public/image/game/ptgame/catqk.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏埃斯梅拉达',
                    ico: '/static/public/image/game/ptgame/esmk.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏古怪猴子',
                    ico: '/static/public/image/game/ptgame/fm.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏玛丽莲梦露',
                    ico: '/static/public/image/game/ptgame/gtsmrln.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏年年有余',
                    ico: '/static/public/image/game/ptgame/nian_k.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏幸运直击',
                    ico: '/static/public/image/game/ptgame/sol.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏三倍猴子',
                    ico: '/static/public/image/game/ptgame/trpmnk.jpg',
                    in: 0,
                    out: 0
                },
                {
                    account: '',
                    name: 'PT游戏招财进宝',
                    ico: '/static/public/image/game/ptgame/zcjb.jpg',
                    in: 0,
                    out: 0
                }
            ],
            scrollDatas: [],
            // 选项选择

            optionSel: 'PT',
            rebet: [1.668, 1.879, 2.114, 2.655, 3.156, 4.324],
            winRebet: [6.568, 12.457, 9.586, 7.888, 10.845, 14.598],
            // 显示图片
            showTypList: [],
            newlotData: [],
            jackpotNum: 41126438900,
            setInter: null,
            merNumber: {
                num1: 0,
                num2: 0,
                num3: 0
            },
            touzhuTimer: null,
            winnerTimer: null,
            set: null,
            reloadTimeStaue: true,
            hoursDatas: {
                hou: 0,
                min: 0,
                sec: 0
            },
            daysDatas: {
                day: 0,
                hou: 0,
                min: 0,
                sec: 0
            },
            shownum: false,
            btnTimer: null,
            publicUrl: 'http://img.7900005.com/',
            downloadAppTarget: '',
            // 首页展示图
            displayDatas: {
                fristData: [
                    {
                        path: '/home/live',
                        ico: '/static/478qp/img/slot-game1.png',
                        name: '真人视讯',
                        text: '美女主播  热火传情'
                    }
                ],
                rightData: [
                    {
                        path: '',
                        ico: '/static/478qp/img/live-game.png',
                        name: '棋牌游戏',
                        text: '休闲益智  棋乐无穷'
                    },
                    {
                        path: '',
                        ico: '/static/478qp/img/sport-game.png',
                        name: '彩票游戏',
                        text: '主流玩法精彩加奖'
                    }
                ],
                lastData: [
                    {
                        path: '',
                        ico: '/static/478qp/img/lottery-game1.png',
                        name: '电子游戏',
                        text: '超级大奖池'
                    },
                    {
                        path: '',
                        ico: '/static/478qp/img/chess-game1.png',
                        name: '捕鱼游戏',
                        text: '满屏暴金'
                    },
                    {
                        path: '',
                        ico: '/static/478qp/img/other-game1.png',
                        name: '体育电竞',
                        text: '丰富赛事 分秒精彩'
                    }
                ]
            },
            advanDatas: [
                {
                    icon: '/static/478qp/img/tip-demo-5.png',
                    name: '免息借呗',
                    text: '单一会员最高可借1560000',
                    gamename: 'tryplay'
                },
                {
                    icon: '/static/478qp/img/tip-demo-2.png',
                    name: '下载App',
                    text: '防劫持，极致体验',
                    gamename: 'download'
                },
                {
                    icon: '/static/478qp/img/tip-demo-3.png',
                    name: '合作代理',
                    text: '日进斗金，月入百万',
                    gamename: 'Cooperation'
                }
            ]
        };
    },
    methods: {
        // 打开个人中心
        goUserCen(name, num) {
            //name的类型有 ：  recharge （充值）  personage （个人资料）
            //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）

            if (!localStorage.token || !localStorage.userinfo) {
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '请先登录!',
                    model: '',
                    leftspan: true
                });
            } else {
                this.$store.commit('showPersonal', {
                    bool: true
                });
                this.$store.commit('showContent', {
                    parent: name
                });
                this.$store.commit('showNav', {
                    child: num
                });
            }
        },

        curActive() {
            var ref = this.$refs.profit.children;
        },

        showProfitCont(data, e) {
            Object.assign(this.totalProfit, data);

            if (!e) {
                var e = window.event;
            }
            var target = e.target.parentNode;
            var curRank = target.dataset.rank.toString();

            this.curIndex = curRank;
        },

        gopage(num) {
            if (num == 1) {
                window.open('#/plays/hall');
            } else if (num == 2) {
                this.$router.push('/home/fish?navid=9&id=0');
            } else if (num == 3) {
                this.$router.push('/home/tiyu?id=0');
            }
        },

        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 120) {
                this.isShow1 = true;
            }
            if (scrollTop >= 700) {
                this.isShow3 = true;
            }
            if (scrollTop >= 800) {
                this.isShow4 = true;
            }
            if (scrollTop >= 800) {
                this.isShow5 = true;
            }
            if (scrollTop >= 1000) {
                this.isShow6 = true;
            }
            if (scrollTop >= 1300) {
                this.isShow9 = true;
            }
        },

        goGame(num) {
            if (num == 1) {
                this.$router.push('/home/live');
            } else if (num == 2) {
                this.$router.push('/home/chess?navid=9&id=0');
            } else if (num == 3) {
                window.open('#/plays/hall');
            } else if (num == 4) {
                this.$router.push('/home/slot?navid=9&id=0');
            } else if (num == 5) {
                this.$router.push('/home/fish?navid=9&id=0');
            } else if (num == 6) {
                this.$router.push('/home/tiyu?id=0');
            }
        },

        sortBy(field) {
            return function(a, b) {
                var value1 = a[field];
                var value2 = b[field];
                return -(value1 - value2);
            };
        },

        initWinningInfo() {
            let timestam = new Date().getTime();
            let dateObj = new Date(timestam);
            let H = dateObj.getHours() + '';
            let M = this.ee(dateObj.getMinutes()) + '';
            let randomNum;
            if (+H < 1) {
                randomNum = '1' + M + '9';
            } else {
                randomNum = H + M + '89';
            }

            let length = 6;
            let data = [];
            for (let i = 0; i < length; i++) {
                let num = parseInt(randomNum * this.winRebet[i]);
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                name = name.substr(0, 3) + '***' + name.substr(3, 6);
                num = num;
                data[i] = { name, num };
            }
            data.sort(this.sortBy('num'));
            this.winningInfo = data;
        },

        initTouzhuInfo() {
            let timestam = new Date().getTime();
            let dateObj = new Date(timestam);
            let H = dateObj.getHours() + '';
            let M = this.ee(dateObj.getMinutes()) + '';
            let randomNum;
            if (+H < 1) {
                randomNum = '1' + M + '99';
            } else {
                randomNum = H + M + '859';
            }

            let length = 6;
            let data = [];
            for (let i = 0; i < length; i++) {
                let num = parseInt(randomNum * this.rebet[i]);
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                name = name.substr(0, 3) + '***' + name.substr(3, 6);
                data[i] = { name, num };
            }
            data.sort(this.sortBy('num'));
            this.touzhuInfo = data;
        },

        ee(num) {
            if (num < 10) {
                num = '0' + num;
            }
            return num;
        },

        close() {
            this.showimg = false;
        },

        timeout() {
            this.getRandomData();
            setTimeout(() => {
                this.reloadTimeStaue = true;
            });
            if (this.reloadTimeStaue) {
            }
        },

        async getRandomData() {
            this.reloadTimeStaue = false;
            let res = await this.$http.get(`${this.$HOST_NAME}/lottery/getIssues`, {});
            if (res && res.code == 200) {
                this.lotteryData = res.data;
                this.newlotData = [];
                this.changdate[this.changIndex].forEach(item => {
                    this.lotteryData &&
                        this.lotteryData.forEach(lotteryitem => {
                            if (item == lotteryitem.lotteryId) {
                                this.newlotData.push(lotteryitem);
                            }
                        });
                });
                this.randomDatalist = this.newlotData;
            }
        },

        //获取数据
        async getTypeL(item) {
            this.gameData = [];
            let id = this.$route.query.id;
            let res = await _SetPost(`${this.$HOST_NAME}/gameSortNew`, {
                device: 'pc',
                id
            });
            if (res && res.code === 200) {
                this.gameData = res.data[id];
                this.total = res.data.last_page;
            }
        },

        jackpotFc() {
            clearInterval(this.setInter);
            this.setInter = setInterval(() => {
                var num = Math.floor(Math.random() * 100);
                this.sentAward = this.sentAward + num;
                this.randomFloat = num;
            }, 3600000); //1小时刷新一次
        },

        touzhuInter() {
            clearInterval(this.touzhuTimer);
            this.touzhuTimer = setInterval(() => {
                this.initTouzhuInfo();
            }, 300000);
        },

        winnerInter() {
            clearInterval(this.winnerTimer);
            this.winnerTimer = setInterval(() => {
                this.initWinningInfo();
            }, 300000);
        },

        websoc() {
            if (this.websocketdata.type == 'user.lotteryOpen') {
                this.websocketdata.data.forEach((msgItem, index) => {
                    this.randomDatalist.forEach((recoItem, i) => {
                        if (msgItem.lotteryId == recoItem.lotteryId) {
                            let saveResult = msgItem.lastresultInfo.split(',');
                            recoItem.issue = msgItem.lastissue;
                            //  this.getRandomData()
                            recoItem.djs_next_kaipan = msgItem.djs_next_kaipan;
                            this.newlotterydate = msgItem.djs_next_kaipan;
                            // recoItem.list && recoItem.list.forEach((item4, v4) => {
                            //   item4.ball = saveResult[v4]
                            // })
                        }
                    });
                });
            }
        },

        //生成10个5位数随机数,并排序
        getRandomNum() {
            let randomNumArr = [];
            clearInterval(this.awardTimer);
            this.awardTimer = setInterval(() => {
                for (var i = 0; i < 10; i++) {
                    var rn = Math.floor(Math.random() * 100000);
                    randomNumArr.push(rn);
                }
                randomNumArr.sort((a, b) => {
                    return b - a;
                });
                this.randomAwardList = randomNumArr;
                this.totalProfit.profitAmount = randomNumArr[0];
                this.rank_1_data.profitAmount = randomNumArr[0];
                this.rank_2_data.profitAmount = randomNumArr[1];
                this.rank_3_data.profitAmount = randomNumArr[2];
                this.rank_4_data.profitAmount = randomNumArr[3];
                this.rank_5_data.profitAmount = randomNumArr[4];
                this.rank_6_data.profitAmount = randomNumArr[5];
                this.rank_7_data.profitAmount = randomNumArr[6];
                this.rank_8_data.profitAmount = randomNumArr[7];
                this.rank_9_data.profitAmount = randomNumArr[8];
                this.rank_10_data.profitAmount = randomNumArr[9];

                randomNumArr = []; //清空随机数组
            }, 600000); //10分钟刷新一次
        },

        //生成10个2位随机数
        getRateNum() {
            var rateArr = [];
            clearInterval(this.rateTimer);
            this.rateTimer = setInterval(() => {
                for (var i = 0; i < 10; i++) {
                    var r = Math.floor(Math.random() * 100);
                    rateArr.push(r);
                }

                this.randomRateList = rateArr;
                rateArr = [];
            }, 600000);
        }
    },
    created() {
        this.getRandomData();
        setTimeout(() => {
            this.showimg = false;
        }, 10000);
    },
    mounted() {
        clearInterval(this.setInter);
        clearInterval(this.winnerTimer);
        clearInterval(this.touzhuTimer);
        clearInterval(this.awardTimer);
        clearInterval(this.rateTimer);

        this.getRandomNum();
        this.getRateNum();
        this.jackpotFc();
        this.touzhuInter();
        this.winnerInter();
        this.initTouzhuInfo();
        this.initWinningInfo();

        if (localStorage.config) {
            let config = JSON.parse(localStorage.config);
            this.publicUrl = config.statics;
        }

        window.addEventListener('scroll', this.handleScroll);

        this.curActive();
    },
    computed: {
        colorbool() {
            return this.$store.state.mainState.color;
        },
        websocketdata() {
            return this.$store.state.mainState.websoc;
        }
    },
    watch: {
        websocketdata() {
            this.websoc();
        }
    },
    components: {
        vpHomeHeader,
        vpNav,
        vpFooter
    },
    store
};
</script>

<style lang="less">
.new-index {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #1e1e1e;

    .content_bg {
        background-color: #1e1e1e;

        .content-main-bg {
            position: relative;

            .nightTage {
                background: rgba(18, 21, 66, 0.8);
                h3,
                p {
                    color: white !important;
                }
            }
        }
        .night {
            background: url(/static/478qp/img/index-main-bg-n.jpg) no-repeat center top;
            background-size: 100% 100%;
        }
    }
}
.vp-popout-box {
    /deep/ .ivu-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -328px;
        margin-top: -273px;
    }

    /deep/ .ivu-modal-close {
        z-index: 2;
        top: 6px;

        i {
            color: #fff;
        }
    }

    /deep/ .ivu-modal-header {
        width: 650px;
        height: 34px;
        margin-top: 5px;
        margin-left: 3px;
        padding: 0;
        border-radius: 10px;
        border: 1px solid #494437;
        background: #ff0000 url(/static/478qp/img/ui-bg_gloss-wave_45_817865_500x100.png) 50% 50% repeat-x;
        color: #ffffff;
        font-weight: bold;
        position: relative;
        top: 4px;

        .ivu-modal-header-inner {
            color: #fff;
            line-height: 34px;
            height: 34px;
            padding-left: 15px;
        }
    }

    /deep/ .ivu-modal-footer {
        border-top: 1px solid #cdd5da;

        .ivu-btn-text {
            display: none;
        }

        .ivu-btn-primary {
            background: #ff0000;
            border-color: #ff0000;
            padding: 3px 12px 3px 12px;
            border-radius: 6px;
        }
    }

    .popout-box {
        min-height: 427px;
        font-family: 'Microsoft YaHei';
        font-size: 24px;
        line-height: 1.5;
        color: #383838;
    }
}

.view.view-slideup.on {
    opacity: 1;
    animation: view-slideup 0.8s ease;
}

@keyframes view-slideup {
    0% {
        opacity: 0;
        transform: translate(0, 30px);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}

.main .section .contentBox {
    position: relative;
}
.main .section1 .contentBox {
    padding: 235px 0 70px;
}

.view.view-slideup {
    opacity: 0;
}
.contentBox {
    width: 1200px;
    margin: 0 auto;
}

.section .casino {
    position: absolute;
    top: -60px;
    left: 0;
    width: 100%;
    z-index: 200;
}
.casino .img {
    float: left;
    width: 594px;
    height: 230px;
    position: relative;
    box-shadow: 2px 20px 20px #161616;
    overflow: hidden;
}
.casino .img1 {
    margin-right: 12px;
}
.casino .img img {
    -webkit-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
}
.casino .img-info {
    padding: 26px 0 0 26px;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    height: 204px;
}
.casino .img-info h3 {
    font-size: 24px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 12px;
}
.casino .img-info p {
    font-size: 16px;
    color: #999;
    line-height: 22px;
}
.casino .img-balance {
    position: absolute;
    bottom: 40px;
    left: 25px;
    font-size: 18px;
    color: #cca352;
    line-height: 20px;
    transition: 0.3s;
    opacity: 1;
    visibility: visible;
}
.casino .img-balance span {
    font-size: 16px;
}
.casino .img-balance .icon-bal {
    background-position: -79px 0;
    width: 29px;
    height: 20px;
    display: block;
    float: left;
    margin-right: 12px;
}
.casino .img-info .img-btn,
.section3 .img-btn {
    display: block;
    width: 134px;
    height: 36px;
    border: 1px solid #c2994e;
    color: #cca352;
    font-size: 16px;
    line-height: 36px;
    text-align: center;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    position: absolute;
    bottom: 30px;
    left: 27px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
}
.casino .img-info .img-btn span,
.section3 .img-btn span {
    z-index: 3;
    position: relative;
}
.casino .img-info .img-btn:before,
.section3 .img-btn:before {
    position: absolute;
    content: '';
    z-index: 2;
    background: #ba8d4d;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition-delay: 0s;
    transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -moz-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    -moz-transform-origin: right top;
    -ms-transform-origin: right top;
    -webkit-transform-origin: right top;
    transform-origin: right top;
}
.casino .img-info .img-btn:hover:before,
.section3 .img-btn:hover:before {
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
}
.casino .img-info .img-btn:hover,
.section3 .img-btn:hover {
    color: #fff;
}
.casino .img .img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(36, 36, 36, 0.5);
    transition: 0.3s ease-out;
}
.casino .img .img-mask-hover {
    display: none;
}
.casino .img:hover .img-mask-hover {
    display: block;
}
.casino .img:hover img {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
}
.casino .img:hover .img-balance {
    opacity: 0;
    visibility: hidden;
}
.casino .img:hover .img-btn {
    opacity: 1;
    visibility: visible;
}
.casino .img .img-mask.mask-maintain {
    z-index: 200;
    background: rgba(36, 36, 36, 0.8);
}
.casino .mask-maintain .mask-wrap {
    padding-top: 78px;
    text-align: center;
    cursor: default;
}
.mask-maintain .icon-maintain {
    background-position: -116px -247px;
    width: 35px;
    height: 40px;
    display: block;
    margin: 0 auto 10px;
}
.mask-maintain h5 {
    font-size: 18px;
    font-weight: normal;
    color: #999;
}
.section .row {
    margin-bottom: 65px;
}
.section .row .t {
    font-size: 24px;
    color: #fff;
    text-align: center;
    margin-bottom: 35px;
    line-height: 24px;
}
.section .row .t .line {
    width: 80px;
    height: 1px;
    display: inline-block;
    background: #353535;
    vertical-align: middle;
}
.section .row .t .line1 {
    margin-right: 15px;
}
.section .row .t .line2 {
    margin-left: 15px;
}
.row .c1 {
    margin-left: -12px;
}
.row .box,
.row .iframe-holder {
    width: 400px;
    height: 326px;
    background: #141414;
    float: left;
    margin-left: 4px;
}
.row .box .box-t {
    padding: 18px 20px 0;
    margin-bottom: 17px;
    font-size: 18px;
    color: #fff;
    line-height: 18px;
}
.row .box-t .time {
    float: right;
    font-size: 18px;
    color: #697081;
}
.row .box-t i {
    background: url(/static/478qp/img/home/icon8.png) no-repeat;
    width: 19px;
    height: 19px;
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: 2px;
}
.row .box .scoreboard {
    width: 286px;
    height: 36px;
    border: 1px solid #31353d;
    border-radius: 20px;
    margin: 0 auto 18px;
    text-align: center;
    padding-top: 8px;
}
.box .scoreboard .col {
    width: 33%;
    height: 18px;
    line-height: 18px;
    border-right: 1px solid #31353d;
    float: left;
}
.box .scoreboard .col h5 {
    font-size: 16px;
    color: #ccc;
}
.box .scoreboard .col1 span {
    color: #e54560;
    margin-right: 3px;
}
.box .img {
    text-align: center;
    margin-bottom: 18px;
}
.section .row .t1 {
    margin-bottom: 15px;
}
.section .row h5.sub-t {
    font-size: 16px;
    color: #b0b0b0;
    text-align: center;
    font-weight: 400;
}
.section .row h5.sub-t span {
    color: #cca352;
    text-decoration: underline;
}
.row .baccarat {
    width: 1200px;
    height: 470px;
    position: relative;
    padding: 20px;
    margin-bottom: 25px;
    overflow: hidden;
}
.baccarat .baccarat-bg {
    width: 101%;
    height: 101%;
    position: absolute;
    top: -1px;
    left: -1px;
}
.section .row.last {
    margin-bottom: 0;
}
.index-icons {
    background: url(/static/478qp/img/home/index-icons.png) no-repeat;
}
.baccarat .tag {
    background: url(/static/478qp/img/home/tag1.png) no-repeat;
    width: 69px;
    height: 69px;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    transition: 0.3s ease-in-out;
    cursor: pointer;
}
.baccarat .tag:hover {
    background: url(/static/478qp/img/home/tag1h.png) no-repeat;
}
.baccarat .table {
    float: left;
    width: 394px;
    position: relative;
}
.baccarat .table th {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    font-weight: bold;
}
.baccarat .table td {
    height: 25px;
    line-height: 37px;
    border-bottom: 1px solid #9cb7ed;
    text-align: center;
    background: rgba(0, 0, 0, 0.1);
    font-size: 14px;
    color: #fff;
    cursor: default;
    transition: background 0.2s ease-in-out;
}
.baccarat .table td.space {
    width: 20px;
    border-bottom: 1px solid transparent;
}
.baccarat .table .icon-medal {
    width: 22px;
    height: 27px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 27px;
}
.baccarat .table .icon-gold {
    background-position: 0 0;
}
.baccarat .table .icon-silver {
    background-position: -23px 0;
}
.baccarat .table .icon-bronze {
    background-position: -46px 0;
}
.baccarat .table .arrow {
    width: 12px;
    height: 18px;
    vertical-align: middle;
    display: inline-block;
}
.baccarat .table .arrow-up {
    background-position: -70px 0;
}
.baccarat .table .arrow-down {
    background-position: -83px 0;
}
.baccarat .table .arrow-line {
    width: 12px;
    height: 2px;
    background: #4d659e;
    vertical-align: middle;
}
.baccarat .table tr.last td {
    border-bottom: 0;
}
.baccarat .table tr.active td {
    background: rgba(255, 255, 255, 0.8);
    color: #668cff;
    border-bottom: 0;
    position: relative;
    z-index: 100;
    font-weight: 700;
}
.baccarat .table tr:hover td {
    background: rgba(255, 255, 255, 0.2);
    z-index: 100;
}
.baccarat .table .arrow-right {
    background-position: 0 -30px;
    width: 5px;
    height: 9px;
    display: none;
    margin: 0 auto;
}
.baccarat .table tr.active .arrow-right {
    display: block;
}
.baccarat .info {
    float: left;
    padding: 0 30px;
    width: 760px;
    position: relative;
}
.baccarat .info .t {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 17px;
}
.baccarat .info .t .line {
    width: 114px;
    height: 1px;
    display: inline-block;
    vertical-align: middle;
}
.baccarat .info .t .line1 {
    background: url(/static/478qp/img/home/line1.png) no-repeat;
    margin-right: 10px;
}
.baccarat .info .t .line2 {
    background: url(/static/478qp/img/home/line2.png) no-repeat;
    margin-left: 10px;
}
.baccarat .info .value {
    background: url(/static/478qp/img/home/img3.png) no-repeat;
    width: 547px;
    height: 84px;
    display: block;
    margin: 0 auto 40px;
    position: relative;
    line-height: 84px;
    font-size: 44px;
    color: #fff;
    font-weight: 700;
    padding-left: 100px;
    letter-spacing: 1px;
}
.baccarat .info .value span {
    font-size: 45px;
    font-weight: 400;
}
.baccarat .info .arrow {
    display: inline-block;
    width: 26px;
    height: 32px;
    margin-left: 8px;
    position: relative;
    top: -2px;
}
.baccarat .info .arrow-up {
    background-position: -9px -30px;
}
.baccarat .info .arrow-down {
    background-position: -37px -31px;
}
.baccarat .info .arrow-line {
    background-position: -64px -31px;
}
.baccarat .info .value .icon {
    width: 80px;
    height: 100px;
    display: block;
    position: absolute;
    top: -4px;
    left: -10px;
}
.baccarat .info .value .icon1 {
    background-position: 0 -69px;
}
.baccarat .info .value .icon2 {
    background-position: -81px -69px;
}
.baccarat .info .value .icon3 {
    background-position: -162px -69px;
}
.baccarat .info .value .icon4 {
    background-position: -245px -69px;
}
.baccarat .info .value .icon5 {
    background-position: -326px -69px;
}
.baccarat .info .value .icon6 {
    background-position: 0 -169px;
}
.baccarat .info .value .icon7 {
    background-position: -81px -169px;
}
.baccarat .info .value .icon8 {
    background-position: -162px -169px;
}
.baccarat .info .value .icon9 {
    background-position: -243px -169px;
}
.baccarat .info .value .icon10 {
    background-position: -324px -169px;
}
.baccarat .info h4 {
    font-size: 18px;
    font-weight: 400;
    line-height: 38px;
    text-align: center;
    color: #fff;
    margin-bottom: 25px;
}
.baccarat .info h4 span {
    font-weight: 700;
    color: #cca352;
}
.baccarat .info h4 .btn {
    display: inline-block;
    width: 134px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    border: 1px solid #cca352;
    margin-left: 35px;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    position: relative;
}
.baccarat .info h4 .btn:before {
    position: absolute;
    content: '';
    z-index: 2;
    background: #cca352;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition-delay: 0s;
    transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -moz-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    -moz-transform-origin: right top;
    -ms-transform-origin: right top;
    -webkit-transform-origin: right top;
    transform-origin: right top;
}
.baccarat .info h4 .btn span {
    position: relative;
    z-index: 3;
    color: #cca352;
    text-decoration: none;
    font-weight: 400;
}
.baccarat .info h4 .btn:hover span {
    color: #fff;
}
.baccarat .info h4 .btn:hover:before {
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
}
.baccarat .info .t2 {
    margin-bottom: 12px;
}
.baccarat .info #curlist:after {
    clear: both;
    content: '';
    display: block;
}
.baccarat .info .list {
    width: 100%;
}
.baccarat .info .list-col {
    list-style: none;
    padding-left: 0;
    float: left;
}
.baccarat .info .list-col1 {
    width: 352px;
}
.baccarat .info .list li {
    height: 26px;
    line-height: 26px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #fff;
}
.baccarat .info .list li .underline {
    text-decoration: underline;
}
.baccarat .info .list li span {
    color: #cca352;
    font-size: 16px;
    margin-left: 6px;
}
.baccarat .info .list .i-wrap {
    margin: 0 2px;
    width: 46px;
    display: inline-block;
    text-align: center;
}
.baccarat .info .list .list-icon {
    display: inline-block;
    min-width: 16px;
    height: 26px;
    vertical-align: middle;
    text-align: center;
    font-size: 12px;
    color: #fff;
    font-weight: 700;
    line-height: 25px;
    font-style: normal;
    border-radius: 26px;
    padding: 0 5px;
}
.baccarat .info .list .list-icon-2 {
    background-position: -97px 0;
}
.baccarat .info .list .list-icon-1 {
    background-position: -124px 0;
}
.baccarat .info .list .list-icon-3 {
    background-position: -151px 0;
}
.baccarat .info .list .list-icon-4 {
    background-position: -178px 0;
}
.baccarat .info .list .list-icon-5 {
    background-position: -205px 0;
}
.baccarat .info .list .list-icon-6 {
    background-position: -232px 0;
    width: 43px;
    margin: 0 2px;
}
.baccarat .info .list .list-icon-7 {
    background-position: -97px -28px;
    width: 43px;
    margin: 0 2px;
}
.baccarat .info .list .list-icon-8 {
    background-position: -141px -28px;
    width: 43px;
    margin: 0 2px;
}
.baccarat .info .list .list-icon-red {
    background: #e64560;
}
.baccarat .info .list .list-icon-blue {
    background: #668cff;
}
.baccarat .info .list .list-icon-green {
    background: #0bac42;
}
.avarageTime {
    .timeStyle {
        text-decoration: none;
    }

    .txtStyle {
        text-decoration: none;
        color: #b0b0b0;
    }
    .towithdraw_page {
        cursor: pointer;
    }
}
.main .section2 {
    background: #282828;
    padding: 50px 0 70px;
}
.section2 .t {
    font-size: 24px;
    color: #cca352;
    text-align: center;
    line-height: 40px;
    margin-bottom: 20px;
    font-weight: 400;
}
.section2 .t .line {
    width: 492px;
    height: 3px;
    border-top: 1px solid #3e3e3e;
    display: inline-block;
    padding-top: 3px;
    position: relative;
    top: -5px;
}
.section2 .t .line i {
    display: block;
    width: 100%;
    height: 4px;
    background: #3e3e3e;
}
.section2 .t .line1 {
    margin-right: 16px;
}
.section2 .t .line2 {
    margin-left: 16px;
}
.section2 .jackpot {
    text-align: center;
}
.section2 .jackpot h1 {
    font-size: 83px;
    color: #cca352;
    font-weight: 400;
}
.section2 .br {
    background: url(/static/478qp/img/home/br.png) repeat-x;
    width: 100%;
    height: 10px;
    display: block;
    margin: 32px 0 40px;
}
.section2 .c {
    position: relative;
    overflow: hidden;
    height: 330px;
}
.section2 .c .list-cycle,
.section2 .c .list-cycle .group {
    width: 100%;
    height: 460px;
}
.section2 .list-cycle .item {
    width: 392px;
    height: 100%;
    float: left;
    margin-right: 12px;
}
.section2 .list-cycle .item.last {
    margin-right: 0;
}
.section2 .item .item-t {
    height: 38px;
    line-height: 38px;
    margin-bottom: 16px;
    cursor: default;
}
.section2 .item .item-t .icon {
    background-position: 0 -245px;
    width: 38px;
    height: 38px;
    float: left;
    margin-right: 14px;
}
.section2 .item .item-t h3 {
    font-size: 16px;
    color: #cca352;
    font-weight: 400;
    height: 26px;
    border-bottom: 1px dotted #cca352;
    float: left;
    line-height: 20px;
    margin-top: 5px;
    transition: 0.3s ease-in-out;
}
.section2 .item:hover .item-t .icon {
    background-position: -39px -245px;
}
.section2 .item:hover .item-t h3 {
    color: #ba8d4d;
    border-bottom: 0;
}
.section2 .item .item-img {
    height: 230px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.section2 .item .item-img img {
    -webkit-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
}

.item .item-btn {
    display: block;
    width: 134px;
    height: 36px;
    border: 1px solid #c2994e;
    color: #cca352;
    font-size: 16px;
    line-height: 36px;
    margin: 12px auto 0;
    text-align: center;
    -moz-transition: 0.2s;
    -o-transition: 0.2s;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    position: relative;
}
.item .item-btn span {
    z-index: 3;
    position: relative;
}
.item .item-btn:before {
    position: absolute;
    content: '';
    z-index: 2;
    background: #ba8d4d;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition-delay: 0s;
    transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -moz-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    -moz-transform-origin: right top;
    -ms-transform-origin: right top;
    -webkit-transform-origin: right top;
    transform-origin: right top;
}
.item .item-btn:hover:before {
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
}
.item .item-btn:hover {
    color: #fff;
}
.item .item-table {
    background: #141414;
    padding: 12px 14px 14px;
    height: 177px;
}
.item .item-table .table-col {
    float: left;
    width: 172px;
}
.item .item-table th {
    height: 24px;
    font-size: 12px;
    color: #999;
    font-weight: 400;
}
.item .item-table .centered {
    text-align: center;
}
.item .item-table .txt-left {
    text-align: left;
    padding-left: 10px;
}
.item .item-table .txt-right {
    text-align: right;
}
.item .item-table td {
    height: 24px;
    line-height: 24px;
    border-top: 1px solid #232529;
    font-size: 13px;
    color: #fff;
    transition: 0.3s ease-in-out;
    cursor: default;
}
.item .item-table tr.active td,
.item .item-table tr:hover td {
    background: #282828;
}
.item .item-table .f-right {
    float: right;
}
.item .item-table2 {
    padding: 0;
    height: 177px;
}
.item .item-mask2 {
    position: relative;
}
.item .item-mask2 .col .value {
    font-size: 18px;
    color: #fff;
    margin-top: 5px;
}
.item .item-rules {
    padding: 25px 15px;
}
.item .item-rules p {
    font-size: 13px;
    color: #999;
    line-height: 20px;
}
.section2 .item:hover .item-img img {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
}
.section2 .pager2 {
    text-align: center;
    height: 11px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
.section2 .pager2 span {
    width: 11px;
    height: 11px;
    display: inline-block;
    margin: 0 4px;
}
.section2 .pager2 span.cycle-pager-active {
    background-position: 0 0;
}
.main .section3 {
    padding: 70px 0;
}
.section3 .img {
    width: 594px;
    height: 230px;
    position: relative;
    float: left;
    overflow: hidden;
}
.section3 .img img {
    -webkit-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
}
.section3 .img1 {
    margin-right: 12px;
}
.section3 .img .info {
    padding: 22px 0 0 28px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
}
.section3 .img .info h3 {
    font-size: 24px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 10px;
}
.section3 .img .info p {
    font-size: 16px;
    color: #999;
}
.section3 .img .img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(36, 36, 36, 0.5);
    display: none;
    transition: 0.3s ease-out;
    z-index: 100;
}
.section3 .img:hover .img-mask {
    display: block;
}
.section3 .img:hover img {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
}
.section3 .img:hover .img-mask .img-btn {
    opacity: 1;
    visibility: visible;
}
.section3 .img .img-mask2 {
    display: block;
    z-index: 200;
}
.img-mask2 .mask-txt {
    text-align: center;
    padding-top: 85px;
}
.img-mask2 .mask-txt p {
    font-size: 14px;
    color: #999;
    line-height: 22px;
}
.img-mask2 .mask-txt a {
    color: #cca352;
    display: block;
    font-size: 14px;
    line-height: 22px;
    text-decoration: underline;
}
.section4 {
    width: 100%;
    height: 245px;
    position: relative;
    background: url('/static/478qp/img/home/default-img.png') no-repeat 50% #141414;
    overflow: hidden;
}
.section4 #bg2 {
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    width: 101%;
    height: 101%;
}
.section4 .contentBox {
    padding-top: 66px;
    position: relative;
}
.section4 .c {
    text-align: center;
}

.section4 .logos {
    height: 42px;
    margin-top: 0;
    // padding-top: 17px;
}
.section4 .logos > span,
.section4 .logos > a {
    cursor: pointer;
}
.section4 .c .logo {
    display: block;
    height: 47px;
    float: left;
    margin-right: 66px;
    background: url(/static/478qp/img/home/logos1.png) no-repeat;
    margin-top: 0;
}
.section4 .c .logo.last {
    margin-right: 0;
}
.section4 .c .logo1 {
    background-position: 0 0;
    width: 130px;
}
.section4 .c .logo2 {
    background-position: 0 -45px;
    width: 160px;
}
.section4 .c .logo3 {
    background-position: 0 -138px;
    width: 150px;
    height: 47px;
    margin-top: 0px;
}
.section4 .c .logo4 {
    background-position: 0 -181px;
    width: 137px;
}
.section4 .c .logo5 {
    background-position: 0 0;
    width: 152px;
    margin-top: 5px;
}
.section4 .c .logo6 {
    background-position: 0 -227px;
    width: 130px;
}
.section4 .c .logo7 {
    background-position: 0 -93px;
    width: 137px;
}
.section4 .c .logo8 {
    background-position: 0 -337px;
    width: 152px;
    height: 44px;
}
.casino .img-info p.txt2 {
    color: #cca352;
    margin-bottom: 8px;
}
.item .item-mask3 {
    bottom: 1px;
}
.item .item-mask3 h5 {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    line-height: 32px;
}
.item .item-mask2 .col .value2 {
    margin-top: 0;
    line-height: 65px;
}
.section2 .item .item-c {
    width: 392px;
    height: 408px;
    display: table;
}
.section .item-c .item-txt {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.section .item-c .item-txt p {
    font-size: 14px;
    color: #c2c2c2;
    margin-bottom: 20px;
}
.section .item-c .item-txt .link {
    font-size: 16px;
    color: #ffda95;
    text-decoration: underline;
    float: none;
}

.box {
    width: 392px;
    height: 326px;
    background: #141414;
    float: left;
    margin-left: 12px;
}

.box .box-t {
    padding: 18px 20px 0;
    margin-bottom: 17px;
    font-size: 18px;
    color: #fff;
    line-height: 18px;
}

.box-t .time {
    float: right;
    font-size: 18px;
    color: #697081;
}

.box-t i {
    width: 19px;
    height: 19px;
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: 2px;
}

.box .scoreboard {
    width: 286px;
    height: 36px;
    border: 1px solid #31353d;
    border-radius: 20px;
    margin: 0 auto 18px;
    text-align: center;
    padding-top: 8px;
}

.box .scoreboard .col {
    width: 33%;
    height: 18px;
    line-height: 18px;
    border-right: 1px solid #31353d;
    float: left;
}

.box .scoreboard .col h5 {
    font-size: 16px;
    color: #ccc;
    margin: 0px;
}

.box .scoreboard .col1 span {
    color: #e54560;
    margin-right: 3px;
}

.box .scoreboard .col2 span {
    color: #24b253;
    margin-right: 3px;
}

.box .scoreboard .col3 span {
    color: #668cff;
    margin-right: 3px;
}

.box .scoreboard .col3 {
    border-right: 0;
}

.box .img {
    text-align: center;
    margin-bottom: 18px;
}

.box .box-btn {
    text-decoration: none;
    display: block;
    width: 136px;
    height: 38px;
    border: 1px solid #c39a4f;
    background: transparent;
    margin: 0 auto;
    -moz-transition: ease 0.2s;
    -o-transition: ease 0.2s;
    -webkit-transition: ease 0.2s;
    transition: ease 0.2s;
    position: relative;
}

.box .box-btn:before {
    position: absolute;
    content: '';
    z-index: 2;
    background: #ba8d4d;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -moz-transition: -moz-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0s;
    -o-transition: -o-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0s;
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
    -webkit-transition-delay: 0s;
    transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1) 0s;
    -moz-transform: scale(0, 1);
    -ms-transform: scale(0, 1);
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
    -moz-transform-origin: right top;
    -ms-transform-origin: right top;
    -webkit-transform-origin: right top;
    transform-origin: right top;
}

.box .box-btn span {
    display: block;
    line-height: 36px;
    text-align: center;
    color: #cca352;
    font-size: 16px;
    position: relative;
    z-index: 3;
}

.box .box-btn:hover:before {
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -moz-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
}

.box .box-btn:hover span {
    color: #fff;
}
.clear {
    clear: both;
}
.hide {
    display: none;
}
.common-icons {
    background: url(/static/478qp/img/home/icons.png);
}
::-webkit-scrollbar {
    height: 0;
}

#luzu_div{
      height:143px; 
      #cvs{
        transform:scale(0.5);
        -ms-transform:scale(0.5);
        -moz-transform:scale(0.5);
        -moz-transform-origin:top left;
        -webkit-transform-origin:top left; 
        -ms-transform-origin:top left;
        margin-left: 24px;
      } 
}
</style>
