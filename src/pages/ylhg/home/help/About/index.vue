<template>
    <div id="content_bg" class="content-main-bg">
        <div class="content clear">
            <div class="sidebar fl" id="sidebar">
                <ul class="clear">
                    <li :class="[$route.params.id== index ? 'move':'']" @click="tab(item.link)" v-for="(item,index) in items" :key="index">
                        {{item.item}}</li>
                </ul>
            </div>
            <div class="main fr">
                <div class="right" id="items">
                    <div class="item" v-show="$route.params.id=='aboutUs'">
                        <h3 class="title">关于我们</h3>
                        <dl>
                            <dt>专业运营</dt>
                            <dd>
                                汇集了全球的博彩业界精英，澳门永利皇宫致力打造符合博彩市场需求，并值得彩迷信赖的互联网投注平台，由业界精英组成的金牌专业团队，凭借对博彩市场的丰富经验，分别针对博彩信息及博彩市场策略等各方面，不断对有效管理博彩运营进行深入透彻的研究，进一步将研究结果实践在产品完善化上，务求让一直给予支持的彩迷们获得最好的网络在线投注体验。
                            </dd>
                            <dd>澳门永利皇宫承诺承担客户的博彩责任。经过全世界数以百万用户检验证明远程博彩是一种合法的娱乐方式。对于绝大多数的用户来说远
                                程博彩是一种令人愉快的经历，但是我们必须承认事实上有少部分参与远程博彩的用户可能是未达到法定年龄或者在生活及经济上存在受到博彩影响困扰的问题。</dd>
                            <dd>作为一家负责任的公司，我们关心我们的用户，用积极主动的态度去对待处理社会性的问题。为了协助您进行理性博彩，我们确保工作人员接受理性博彩意识的培训。如需更多信息或协助请联系客户服务部。</dd>

                            <dt>澳门永利皇宫提倡有节制的博彩。我们建议阁下遵守以下一些基本规则：</dt>

                            <dd>1、禁止未满18岁的人士参与博彩游戏。</dd>
                            <dd>2、在加入游戏之前，请您确定您已年满18周岁。</dd>
                            <dd>3、我们保证我们的广告、赞助商和推广活动没有把未成年人作为目标。</dd>
                            <dt>玩家时代是不允许未成年人使用我们的服务。我们承诺将尽我们最大所能制止，但我们同时也需要您提供以下帮助：</dt>
                            <dd>
                                1、使用保护儿童软件来屏蔽所有未成年人可以进入的远程博彩网站。<br />
                                2、当您登入我们网站时，不要让您的计算机处于无人监管的状态。<br />
                                3、不要向未成年人透露您信用卡或者银行账户的信息数据。<br />
                                4、当您进入澳门永利皇宫的任何登入接口，不要选择“保存密码”功能。<br />
                                5、为未成年人创建独立的登入文档，这样当他们登入的时候不能接触到你的信息。<br />
                                6、如果您怀疑某人是小于18岁（或者在他所在的地区是小于合法年龄的）但却已经在我们网站注册成为会员，请立即通知我们。<br />
                            </dd>
                        </dl>
                    </div>
                    <div class="item" v-show="$route.params.id=='contactUs'">
                        <h3 class="title">联系我们</h3>
                        <dl>
                            <dd>
                                澳门永利皇宫以最方便、最迅速与最亲切的服务宗旨来为用户解答所有关于博彩汇款与用户权益等相关问题。<br />
                                客服中心全年无休，每天24小时优质服务，如须帮助，可以透过下列两种方式与客服人员联系：<br />
                                1、点击“在线客服”链接，即可进入在线客服系统与客服人员联系。<br />
                                2、您亦可使用Email与客服人员取得联系<br />
                                Email：8jjqpts@gmail.com
                            </dd>
                        </dl>
                    </div>
                    <div class="item" v-show="$route.params.id=='saveHelp'">
                        <h3 class="title">存款帮助</h3>
                        <dl>
                            <dt>您现在可以通过以下方式存款到澳门永利皇宫：</dt>
                            <dt>一、公司入款（推荐使用）</dt>
                            <dd>会员登入后，点选“公司入款”，查看最新入款帐号，并进行转帐支付，转帐成功后填写入款信息并确认提交，财务专员收到款项及入款申请后，将第一时间内添加入款金额至您的会员帐号上，届时请注意查收，如有疑问，请及时联系24小时在线客服咨询受理！
                            </dd>
                            <dt>注意事项：</dt>
                            <dd>1、目前提供建设银行、工商银行、农业银行、招商银行卡、中国银行、浦发银行、中信银行、农村商业银行、交通银行、平安银行、民生银行、十间银行可选择，同行互转存款到帐时间约为五到十分钟，跨行划款需依据银行划款作业时间为基准，我们将于确认到帐后立刻为您游戏帐户充值。
                            </dd>
                            <dd>2、入款帐户不定期更新，请在每次存款前，点击“公司入款”页面查询最新收款账号，如存款至过期账户造成财务无法查收，会员自行承担损失。</dd>
                            <dt>二、在线支付（即时到帐）</dt>
                            <dd>会员登入后，点选“在线支付”，根据页面提示填入入款金额等操作直至入款成功 ，如有任何问题，请及时联系24小时在线客服咨询受理！</dd>
                            <dt>注意事项：</dt>
                            <dd>1、支持借记卡：中国民生银行总行,中国工商银行,中国建设银行,兴业银行,中国光大银行,深圳发展银行,中国邮政,华夏银行,上海浦东发展银行,中国银行,上海银行,交通银行,广东发展银行,北京银行,中信银行,深圳平安银行,中国农业银行,招商银行。
                            </dd>
                            <dd>2、确认送出后﹐将请您确认您的支付订单无误，并建议您记录您的支付订单号后，确认送出，并耐心等待载入网络银行页面﹐传输中已将您账户数据加密﹐请耐心等待。进入网络银行页面﹐请确实填写您银行账号信息﹐支付成功﹐额度将在10分钟内系统处理完成，立即加入您的娱乐场会员账户。
                            </dd>
                            <dt>三、银联支付</dt>
                            <dd>仅供小额度存款，单笔最高￥20000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</dd>
                            <dt>四、微信支付</dt>
                            <dd>仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</dd>
                            <dt>五、支付宝支付</dt>
                            <dd>仅供小额度存款，单笔最高￥50000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</dd>
                            <dt>六、云闪付</dt>
                            <dd>仅供小额度存款，单笔最高￥5000元，如需更高额度存款，请选择“多笔存入”或选择“公司入款”。</dd>
                        </dl>
                    </div>
                    <div class="item" v-show="$route.params.id=='withdrawHelp'">
                        <h3 class="title">取款帮助</h3>
                        <dl>
                            <!-- <dt>您可以通过以下方式取款：</dt> -->
                            <dd>根据页面提示输入银行帐号、提款金额等信息，核实输入信息无误后确认提交，财务专员收到提款申请后，将第一时间内处理您的提款申请，请及时联系24小时在线客服咨询受理！</dd>
                            <dd>如果您的帐号还未进行取款帐号绑定，请先绑定，当前支持绑定的银行有：工商银行、农业银行、北京银行、交通银行、中国银行、建设银行、光大银行、兴业银行、民生银行、招商银行、中信银行、广东发展银行、中国邮政、深圳发展银行、浦发银行……
                            </dd>
                            <dt>取款需知:</dt>
                            <dd>最低取款为￥100人民币，最高取款单笔￥100万人民币、单日1000万人民币；若超过1000万的提款，须提前一日提出申请。</dd>
                            <dd>取款过程，如有疑问，请第一时间联系在线客服咨询受理！</dd>
                        </dl>
                    </div>
                    <!-- 代理合作 -->
                    <div class="item Cooperative" v-show="$route.params.id=='partners'">
                        <h3 class="title">
                            <div class="leftNav" :class="{checkedIndex:checkedIndex ==0}" @click="changeNav(0)">金字塔代理模式</div>
                            <div class="rightNav" :class="{checkedIndex:checkedIndex ==1}" @click="changeNav(1)">金字塔代理教程
                                <ul :class="[{ navActive: checkedIndex==1 }, 'childNavList']">
                                    <li v-for="(navItem,navIndex) in childNavList" :key="navIndex" @click="goLink(navIndex,navItem)">
                                        {{navItem.text}}</li>
                                </ul>
                            </div>
                        </h3>
                        <div class="title_border"></div>
                        <dl v-if="checkedIndex==0" class="navLeftItem">
                            <dd>
                                <div class="navHeader">
                                    <h3>既是玩家也是代理.合为一体</h3>
                                    <p>注册成功后，您可自娱投注亦可赚取下级会员流水返佣，娱乐赚钱两不误</p>
                                    <ul>
                                        <li>
                                            代理帐号<br>
                                            自行娱乐
                                        </li>
                                        <li>
                                            发展<br>
                                            下线代理
                                        </li>
                                        <li>
                                            发展<br>
                                            下线会员
                                        </li>
                                    </ul>
                                </div>
                                <div class="navContent">
                                    <h3>代理佣金计算方式</h3>
                                    <p>流水洗码是根据下级会员所产生的有效投注计算，不计输赢，代理即可赚取</p>
                                    <ul>
                                        <li>
                                            <div>
                                                <span class="navCon_top"> 产生的所有有效投注额</span><br />
                                                <span class="navCon_bottom"> (下级会员+下级代理发展的会员)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="middleBorder">
                                                <img src="/static/ylhg/img/help/agency.png" alt="">
                                                <div>
                                                    <span>代理收益</span>
                                                    <span>(佣金)</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>分润点</li>
                                    </ul>
                                </div>
                                <div class="navFooter">
                                    <h3>代理共赢亮点</h3>
                                    <ul>
                                        <li>
                                            <div class="navFooter_num">1</div>
                                            <div class="middle_Footer">
                                                <span>佣金结算</span>
                                            </div>
                                            <div class="top_Footer">
                                                <p>佣金日结,于次日自动派</p>
                                                <p>送至游戏帐号,自行</p>
                                                <p>提款即可</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="navFooter_num">2</div>
                                            <div class="middle_Footer">
                                                <span>有效投注</span>
                                            </div>
                                            <div class="top_Footer">
                                                <p>代理发展的线下会员必须是真实</p>
                                                <p>有效，如虚假注册或无风险下</p>
                                                <p>注产生有效投注，将取消佣</p>
                                                <p>金派送或代理资格</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="navFooter_num">3</div>
                                            <div class="middle_Footer">
                                                <span>资源合作</span>
                                            </div>
                                            <div class="top_Footer">
                                                <p>如果您有好的推广资源，请立即</p>
                                                <p>送向公司申请定制邀请注册</p>
                                                <p>验证码专属推广网站</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </dd>
                        </dl>
                        <dl v-if="checkedIndex==1" class="navRightItem">
                            <dd>
                                <div class="navTitle">{{navTitle}}</div>
                                <div class="navContent">
                                    <div class="left_icon" @click="pre">
                                        <i></i>
                                    </div>
                                    <div v-for="(childItem,childIndex) in childNavList" :key="childItem['text']" class="img_List">
                                        <transition name="lists">

                                            <img alt="" :src="childItem.imgSrc" v-if="childIndex==childCheckedIndex" draggable="false">
                                        </transition>
                                    </div>
                                    <div class="right_icon" @click="next">
                                        <i></i>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vpHomeHeader from '../../header.vue';
import vpNav from '../../nav.vue';
import vpFooter from '../../footer';

export default {
    data() {
        return {
            items: [
                { item: '关于我们', link: '/home/about/aboutUs' },
                { item: '联系我们', link: '/home/about/contactUs' },
                { item: '存款帮助', link: '/home/about/saveHelp' },
                { item: '取款帮助', link: '/home/about/withdrawHelp' },
                { item: '合作伙伴', link: '/home/about/partners' }
            ],
            checkedIndex: 0,
            childCheckedIndex: 0,
            navTitle: '注册帐号',
            childNavList: [
                { text: '1:如何让邀请注册帐号', imgSrc: '/static/ylhg/img/help/register.png', title: '注册帐号' },
                { text: '2:如何进入代理中心', imgSrc: '/static/ylhg/img/help/goAgency.png', title: '进入代理中心' },
                { text: '3:如何生成链接', imgSrc: '/static/ylhg/img/help/invitation.png', title: '生成邀链接' },
                { text: '4:如何管理链接', imgSrc: '/static/ylhg/img/help/Manage.png', title: '管理邀链接' },
                { text: '5:如何查看下级人数', imgSrc: '/static/ylhg/img/help/ViewNumber.png', title: '查看下级人数' },
                { text: '6:如何查看下级列表', imgSrc: '/static/ylhg/img/help/report.png', title: '查看下级列表' },
                { text: '7:如何查看下级财务', imgSrc: '/static/ylhg/img/help/finance.png', title: '查看下级财务' },
                { text: '8:如何查看代理收益', imgSrc: '/static/ylhg/img/help/income.png', title: '查看代理受益' },
                { text: '9:如何查看下级报表', imgSrc: '/static/ylhg/img/help/viewXiaji.png', title: '查看下级报表' },
                { text: '10:如何查看报表总汇', imgSrc: '/static/ylhg/img/help/summary.png', title: '查看报表总汇' }
            ]
        };
    },
    methods: {
        tab(link) {
            this.$router.push(link);
        },
        pre() {
            this.childCheckedIndex--;
            for (let i = 0; i < this.childNavList.length; i++) {
                if (this.childCheckedIndex == i) {
                    this.navTitle = this.childNavList[i].title;
                }
            }
            if (this.childCheckedIndex < 0) {
                this.childCheckedIndex = 0;
            }
        },
        next() {
            this.childCheckedIndex++;
            for (let i = 0; i < this.childNavList.length; i++) {
                if (this.childCheckedIndex == i) {
                    this.navTitle = this.childNavList[i].title;
                }
            }
            if (this.childCheckedIndex >= this.childNavList.length - 1) {
                this.childCheckedIndex = this.childNavList.length - 1;
            }
        },
        changeNav(index) {
            this.checkedIndex = index;
        },
        goLink(i, item) {
            this.childCheckedIndex = i;
            this.navTitle = item.title;
        }
    },
    mounted() {},
    watch: {},
    components: {
        vpHomeHeader,
        vpNav,
        vpFooter
    }
};
</script>

<style lang="less" scoped>
.lists-enter-active,
.lists-leave-active {
    animation: you 0.2s 1;
}
.lists-enter, .lists-leave-to{
    display: none;
}
@keyframes you {
    to {
        transform: scale(1);
    }
    from {
        transform: scale(1.1);
    }
}
.clear {
    clear: both;
    zoom: 1;
    overflow: hidden;
}
.relative {
    position: relative;
}

.content-main-bg {
    margin: 0 auto;
    overflow: hidden;
    background: #1e1e1e;
}

#content_bg {
    .content {
        width: 1200px;
        margin: 20px auto;
        .sidebar {
            width: 290px;

            ul {
                width: 100%;
                border-radius: 5px;
                background: #323232;
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

                li {
                    float: left;
                    width: 100%;
                    height: 65px;
                    line-height: 65px;
                    padding-left: 45px;
                    border-left: 4px solid transparent;
                    font-size: 16px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
}

#content_bg .content .sidebar ul li:hover,
#content_bg .content .sidebar ul li.move {
    border-left: 4px solid #f8ad32;
    background: #232323;
    color: #f8ad32;
}
#content_bg .content .sidebar ul li:nth-last-of-type(1):hover,
#content_bg .content .sidebar ul li:nth-last-of-type(1).move {
    border-radius: 0 0 0 5px;
}
#content_bg .content .sidebar ul li:nth-of-type(1):hover,
#content_bg .content .sidebar ul li:nth-of-type(1).move {
    border-radius: 5px 0 0 0;
}
#content_bg .content .sidebar ul li .iconfont {
    margin-right: 10px;
    font-size: 24px;
    vertical-align: middle;
}
#content_bg .content .main .right {
    width: 890px;
    min-height: 700px;
    margin: 0 auto;
    font-size: 14px;
    background: #323232;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

#content_bg .content .main .right .checkedIndex {
    background: #232323 !important;
    color: #f8ad32 !important;
    height: 58px !important;
}

#content_bg .content .main .right .leftNav {
    float: left;
    cursor: pointer;
    width: 261px;
    height: 51px;
    color: #fff;
    background: #474747;
    text-align: center;
}

#content_bg .content .main .right .rightNav {
    cursor: pointer;
    float: left;
    position: relative;
    display: inline-block;
    width: 261px;
    height: 51px;
    color: #fff;
    background: #474747;
    text-align: center;
}
#content_bg .content .main .right .rightNav .childNavList {
    transition: all 2s;
    display: none;
    position: absolute;
    left: 0;
    top: 58px;
    z-index: 99999999;
}

#content_bg .content .main .right .rightNav:hover .navActive {
    display: block;
}

#content_bg .content .main .right .rightNav .childNavList li {
    color: #999999;
    text-align: left;
    padding-left: 57px;
    width: 263px;
    height: 51px;
    background: #474747;
}

#content_bg .content .main .right .title {
    height: 51px;
    line-height: 51px;
    width: 100%;
    font-size: 18px;
}
#content_bg .content .main .right .title_border {
    width: 100%;
    height: 7px;
}

#content_bg .content .main .right h2 {
    height: 60px;
    width: 642px;
    line-height: 60px;
    font-size: 28px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e1ceae;
}
#content_bg .content .main .right .item .title {
    padding: 0 25px;
    color: #fff;
}

#content_bg .content .main .right dl {
    padding: 10px 25px 30px;
}

#content_bg .content .main .right dl dt {
    margin: 15px 0;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
}

#content_bg .content .main .right dl dd {
    line-height: 2.2;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
}
#content_bg .content .main .right dl dd table tr td {
    border: 1px solid;
    text-align: center;
    padding: 0 10px;
}
.rule-list {
    font-size: 18px;
    padding: 0 25px;
    border-bottom: 1px solid #ddd;
}
.rule-list li {
    display: inline-block;
    height: 65px;
    line-height: 65px;
    margin-right: 50px;
    color: #333;
    cursor: pointer;
}
.rule-list li.active,
.rule-list li:hover {
    border-bottom: 2px solid #333;
}

.url-link {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    color: #3075f2;
}
.text-center {
    text-align: center;
}
.red {
    color: #ff4a3b;
}
.table th {
    background: #e3eaf1;
    height: 30px;
    color: #333;
}
.table td,
table th {
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    padding: 5px;
    background: #f3f4f4;
    text-align: center;
}
.table {
    width: 97%;
    margin: 12px;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-spacing: 0;
    font-size: 16px;
    color: #333;
    border-radius: 10px;
    border-collapse: separate;
}
.table tr {
    height: 30px;
}

table th:nth-last-of-type(1) {
    border-radius: 0 10px 0 0;
}
table th:nth-of-type(1) {
    border-radius: 10px 0 0 0;
}
table td.bottom-border-radius {
    border-radius: 0 0 10px 0;
}
table td.left-border-radius {
    border-radius: 0 0 0 10px;
}

.markedCss {
    font-size: 16px;
    font-weight: bold;
    color: #007aff;
}

.license-container {
    overflow: hidden;
    border: 5px solid #e6cdb7;
}

.license1 {
    float: left;
    width: 25%;
    border-right: 5px solid #e6cdb7;
}

.license1 > img {
    width: 100%;
}
.detail-intro {
    float: left;
    width: auto;
    padding: 7% 5%;
}
.detail-intro > p {
    line-height: 3;
}
.detail-intro > p span {
    color: red;
}

.detail-intro > a {
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: left;
}

.detail-intro .btn {
    display: inline-block;
    text-align: center;
    width: 160px;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    background: #fd4747;
    color: #fff;
}

.detail-intro img {
    vertical-align: middle;
}

.service-cont li {
    display: inline-block;
    vertical-align: top;
    width: 200px;
    height: 200px;
    padding: 20px;
    margin-right: 10px;
    text-align: center;
    border-radius: 10px;
    background: #eff3f7;
    -webkit-box-shadow: 0 0.1rem 0.1rem transparent;
    box-shadow: 0 0.1rem 0.1rem transparent;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
}

.service-cont li:hover {
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    -webkit-transform: translateY(-2%);
    -ms-transform: translateY(-2%);
    transform: translateY(-2%);
}
.block {
    display: block;
}
.service-context {
    line-height: 1;
}

.service-context .service-title {
    margin: 20px 0 5px;
    color: #333;
    font-size: 14px;
}
.service-context .service-text {
    margin-bottom: 20px;
    color: #999;
    font-size: 12px;
}
.service-context .service-btn {
    height: 26px;
    line-height: 25px;
    width: 80px;
    border-radius: 13px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background: #a1bdf0;
}
.code-cont {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    padding: 20px 8px;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    background: #8facdf;
}

.code-cont.show {
    display: block;
}

.email-item {
    display: inline-block;
    width: 270px;
    margin: 30px 10px 0 0;
    line-height: 1;
    padding: 15px 25px;
    border-radius: 10px;
    background: #eff3f7;
}

.email-item .service-title {
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
}
.email-item .service-text {
    color: #999;
    font-size: 12px;
    line-height: 1.5;
}
.email-item .service-title .iconfont {
    margin-right: 5px;
    font-size: 16px;
    color: #f3c56d;
}
.top_nav .dropdown {
    width: 714px;
}

.content-main-bg.night {
    background: url(/images/main-bg-night.jpg) repeat-y center top;
}

.Cooperative {
    min-height: 900px;
    .title {
        padding: 0 !important;
        .rightNav {
            .childNavList {
                li:hover {
                    background: #232323 !important;
                    color: #f8ad32 !important;
                }
            }
        }
    }
    dl {
        padding: 0 !important;
    }
    .navLeftItem {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        .navHeader {
            margin: 0 auto;
            padding: 30px 0 56px 0;
            h3 {
                font-size: 20px;
                font-weight: bold;
                color: #fff;
            }
            p {
                margin-top: 10px;
                font-size: 16px;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.8);
            }
            ul {
                width: 100%;
                margin-top: 51px;
                overflow: hidden;
                li {
                    width: 160px;
                    height: 98px;
                    padding: 25px 0 28px 0;
                    text-align: center;
                    line-height: 24px;
                    background: #f8ad32;
                    // box-shadow:0px 7px 8px 0px rgba(38,103,222,0.27);
                    border-radius: 10px;
                    color: #000;
                    float: left;
                }
                li:nth-child(2) {
                    margin: 0 67px;
                }
                li:nth-child(1) {
                    margin-left: 130px;
                }
            }
        }
        .navContent {
            padding: 42px 0 37px 0;
            h3 {
                font-size: 20px;
                font-weight: bold;
                color: #fff;
            }
            p {
                margin-top: 12px;
                font-size: 16px;
                font-weight: bold;
                color: rgba(255, 255, 255, 0.8);
            }
            ul {
                overflow: hidden;
                position: relative;
                margin-top: 35px;
                padding-left: 131px;
                padding-right: 105px;
                li {
                    float: left;
                    text-align: center;
                    display: table;
                    div {
                        display: table-cell;
                        vertical-align: middle;
                        height: 17px;
                        font-size: 18px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                li:nth-child(1) {
                    margin-top: 80px;
                    width: 197px;
                    position: absolute;
                    left: 131px;
                    z-index: 999;
                    top: 0;
                    line-height: 30px;
                    height: 197px;
                    background: #f8ad32;
                    border-radius: 50%;
                    div {
                        width: 178px;
                        .navCon_top {
                            font-size: 18px;
                            color: #000;
                        }
                        .navCon_bottom {
                            font-size: 16px;
                            color: #000;
                        }
                    }
                }
                li:nth-child(2) {
                    width: 332px;
                    height: 331px;
                    position: absolute;
                    left: 208px;
                    top: 0;
                    border: 4px solid #f8ad32;
                    border-radius: 50%;
                    margin-left: -70px !important;
                    margin-right: -70px !important;
                    position: relative;
                    .middleBorder {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 149px;
                        height: 130px;
                        div {
                            position: absolute;
                            left: 42px;
                            bottom: -7px;
                            span {
                                color: #fff;
                                font-size: 16px;
                                display: block;
                                line-height: 20px;
                            }
                        }
                    }
                }
                li:nth-child(3) {
                    position: absolute;
                    right: 152px;
                    top: 0;
                    margin-top: 80px;
                    width: 197px;
                    height: 197px;
                    background: #f8ad32;
                    border-radius: 50%;
                    line-height: 197px;
                    color: #000;
                }
            }
        }
        .navFooter {
            padding: 40px 0 57px 0;
            h3 {
                font-size: 20px;
                font-weight: bold;
                color: #fff;
            }
            p {
                margin-top: 12px;
                font-size: 16px;
                color: #fff;
            }
            ul {
                overflow: hidden;
                margin-top: 35px;
                li {
                    float: left;
                    text-align: center;
                    display: table;
                    width: 268px;
                    height: 268px;
                    margin: 0 auto;
                    border-radius: 50%;
                    .navFooter_num {
                        font-size: 50px;
                        font-weight: bold;
                    }
                    .middle_Footer {
                        height: 22px;
                        font-weight: bold;
                        line-height: 2px;
                    }
                    .top_Footer {
                        height: 64px;
                        font-size: 16px;
                        line-height: 24px;
                        p {
                            margin-top: 0;
                        }
                    }
                }
                li:nth-child(1) {
                    margin-left: 20px;
                    background: #cca352;
                    margin-right: 14px;
                    color: #000;
                    p {
                        color: #000;
                    }
                }
                li:nth-child(2) {
                    background: rgba(241, 241, 241, 1);
                    margin-right: 15px;
                    color: rgba(68, 68, 68, 1);
                    .navFooter_num {
                        color: #000;
                    }
                    .top_Footer {
                        p {
                            color: #000 !important;
                            font-weight: normal;
                        }
                    }
                }
                li:nth-child(3) {
                    border: 2px solid #cca352;
                    color: #fff;
                }
            }
        }
    }
    .navRightItem {
        .navTitle {
            margin-top: 19px;
            margin-left: 14px;
            width: 193px;
            height: 39px;
            text-align: center;
            line-height: 39px;
            background: #cca352;
            border-radius: 5px;
            font-size: 20px;
            color: #000;
        }
        .navContent {
            position: relative;
            margin-top: 15px;
            .img_List {
                transition: all 0.4s ease-in;
            }
            .left_icon {
                cursor: pointer;
                position: absolute;
                left: 10px;
                top: 180px;
                width: 60px;
                height: 60px;
                background: red;
                opacity: 0.6;
                border-radius: 50%;
                i {
                    background: url(/static/ylhg/img/help/tbz.png) no-repeat;
                    display: inline-block;
                    width: 62px;
                    height: 62px;
                }
            }
            .right_icon {
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 180px;
                width: 60px;
                height: 60px;
                background: red;
                opacity: 0.6;
                border-radius: 50%;
                i {
                    background: url(/static/ylhg/img/help/tby.png) no-repeat;
                    display: inline-block;
                    width: 62px;
                    height: 62px;
                }
            }
        }
    }
}
</style>
