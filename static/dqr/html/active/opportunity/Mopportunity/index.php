<?php

include_once($_SERVER['DOCUMENT_ROOT']."/../include/config.php");

?>

<!doctype html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title><?= $web_site['web_name'] ?> - 幸运大转盘 好运常相伴</title>
    <link rel="stylesheet" href="static/css/basic.css"/>
    <link rel="stylesheet" href="static/css/rotate.css"/>
    <link rel="stylesheet" href="./static/css/default.css">
    <script src="./static/js/artDialog.js" type="text/javascript"></script>
    <script type="text/javascript" src="./static/js/jquery.min.js"></script>
    <script type="text/javascript" src="./static/js/rotate.js"></script>
    <script src="static/js/winningList.js"></script>
<script>
    $(function () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.indexOf('show-icon')>=0) {
        $('.hide').hide();
      }
      var appUrl = window.location.href;
      if (appUrl.includes('app=app')) {
        $('.hide').hide();
      }
    })
  </script>
</head>
<body style="overflow:scroll;overflow-x:hidden">
<div class="" style="display: none; position: absolute;">
    <div class="aui_outer">
        <table class="aui_border">
            <tbody>
            <tr>
                <td class="aui_nw"></td>
                <td class="aui_n"></td>
                <td class="aui_ne"></td>
            </tr>
            <tr>
                <td class="aui_w"></td>
                <td class="aui_c">
                    <div class="aui_inner">
                        <table class="aui_dialog">
                            <tbody>
                            <tr>
                                <td colspan="2" class="aui_header">
                                    <div class="aui_titleBar">
                                        <div class="aui_title" style="cursor: move; display: block;"></div>
                                        <a class="aui_close" href="javascript:/*artDialog*/;"
                                           style="display: block;">×</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="aui_icon" style="display: none;">
                                    <div class="aui_iconBg" style="background: none;"></div>
                                </td>
                                <td class="aui_main" style="width: auto; height: auto;">
                                    <div class="aui_content" style="padding: 20px 25px;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="aui_footer">
                                    <div class="aui_buttons"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td class="aui_e"></td>
            </tr>
            <tr>
                <td class="aui_sw"></td>
                <td class="aui_s"></td>
                <td class="aui_se" style="cursor: se-resize;"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="" style="display: none; position: absolute;">
    <div class="aui_outer">
        <table class="aui_border">
            <tbody>
            <tr>
                <td class="aui_nw">
                </td>
                <td class="aui_n">
                </td>
                <td class="aui_ne">
                </td>
            </tr>
            <tr>
                <td class="aui_w">
                </td>
                <td class="aui_c">
                    <div class="aui_inner">
                        <table class="aui_dialog">
                            <tbody>
                            <tr>
                                <td colspan="2" class="aui_header">
                                    <div class="aui_titleBar">
                                        <div class="aui_title" style="cursor: move; display: block;">
                                        </div>
                                        <a class="aui_close" href="javascript:/*artDialog*/;"
                                           style="display: block;">×</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="aui_icon" style="display: none;">
                                    <div class="aui_iconBg"
                                         style="background-image: none; background-position: initial initial; background-repeat: initial initial;">
                                    </div>
                                </td>
                                <td class="aui_main" style="width: auto; height: auto;">
                                    <div class="aui_content" style="padding: 20px 25px;">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="aui_footer">
                                    <div class="aui_buttons" style="display: none;">
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
                <td class="aui_e">
                </td>
            </tr>
            <tr>
                <td class="aui_sw">
                </td>
                <td class="aui_s">
                </td>
                <td class="aui_se" style="cursor: se-resize;">
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="" style="left: 0px; top: 0px; visibility: hidden; position: absolute;">
    <table class="ui_border">
        <tbody>
        <tr>
            <td class="ui_lt">
            </td>
            <td class="ui_t">
            </td>
            <td class="ui_rt">
            </td>
        </tr>
        <tr>
            <td class="ui_l">
            </td>
            <td class="ui_c">
                <div class="ui_inner">
                    <table class="ui_dialog">
                        <tbody>
                        <tr>
                            <td colspan="2">
                                <div class="ui_title_bar">
                                    <div class="ui_title" unselectable="on" style="cursor: move;">
                                    </div>
                                    <div class="ui_title_buttons">
                                        <a class="ui_min" href="javascript:void(0);" title="最小化"
                                           style="display: inline-block;"><b class="ui_min_b"></b></a>
                                        <a class="ui_max" href="javascript:void(0);" title="最大化" style="display: inline-block;">
                                            <b class="ui_max_b"></b></a>
                                        <a class="ui_res" href="javascript:void(0);"
                                                                        title="还原">
                                            <b class="ui_res_b"></b>
                                            <b class="ui_res_t"></b></a>
                                        <a class="ui_close" href="javascript:void(0);"
                                                                        title="关闭(esc键)" style="display: inline-block;">×</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="ui_icon" style="display: none;">
                            </td>
                            <td class="ui_main" style="width: auto; height: auto;">
                                <div class="ui_content" style="padding: 10px;">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="ui_buttons" style="display: none;">
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
            <td class="ui_r">
            </td>
        </tr>
        <tr>
            <td class="ui_lb">
            </td>
            <td class="ui_b">
            </td>
            <td class="ui_rb" style="cursor: se-resize;">
            </td>
        </tr>
        </tbody>
    </table>
</div>
<div id="pin2" style="    height: 8vh;background-color: rgba(30, 6, 8, 0.5);width: 100%;z-index: 9999;position: fixed;display: flex;justify-content: space-between;align-items: center;box-shadow: 2px 2px 2px rgba(0,0,0,0.5);" class="Zebra_Pin">
    <div style="width:100%;margin:0 auto;">

        <ul class="menu" >
            <li class="menu_li hide"><a href="/" target="_blank">游戏官网</a></li>
            <li class="menu_li"><a href="https://vue.livelyhelp.chat/chatWindow.aspx?siteId=5001107&planId=108#">在线客服</a></li>
            <li class="menu_li"><a href="#dzp_model">抽奖转盘</a></li>
            <li class="menu_li"><a href="#dzp_rules">抽奖规则</a></li>
            <li class="menu_li winning_check"><a >中奖查询</a></li>
        </ul>
    </div>
</div>
<div class="bodyGroup">
    <div >
        <div style="height:260px;background-image: url(static/img/headerBg.png);background-repeat: no-repeat;background-size: cover">
        </div>
        <div style=" margin:0 auto;border:0px solid #fff;position: relative">
            <div style="  margin-top:10px">
                <!-- <div class="ly-plate">
                    <object type="application/x-shockwave-flash" id="ID_swf" name="ID_swf" data="./css/Roulette.swf" width="470" height="470" style="visibility: visible;"><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always"><param name="flashvars" value="config=config.xml&onStart=onRouletteStart&onStop=onRouletteStop"></object>
                </div> -->
                <div class="ly-plate">
                    <div class="rotate-bg">
                        <img id="dzp_img" style="width: 70%" class="route_infinite" src="./static/img/back.png">
                    </div>

<!--                    <div class="lottery-star">-->
<!--                        <div id="lottery_img" style="z-index:1;position:absolute;left:32px;top:45px;display:none">-->
<!--                            <img id="lotteryLine" src="./static/img/line.png"-->
<!--                                 style="width:120px;height:120px;cursor: pointer;">-->
<!--                        </div>-->
<!--                    </div>-->
                    <button class="lotteryBtn_group" >
                        <img src="./static/img/pointer.png"  id="lotteryBtn" style="z-index: 1; margin-left: 0px; margin-top: 0px; overflow: hidden;">
                    </button>
                </div>
                <div  class="winning_check" style="height:55px;margin-top:100px; text-align:center;">
                    <a ><img src="./static/img/button1.png" width="50%" height="55"></a>
                </div>
            </div>
            <div >

                <div id="msg1" style="overflow:hidden; width:100%; height:95px; text-align:center;color:#fff;">
                    <p>
                        当日有效投注达到5000以上可抽奖1次<br>
                        当日有效投注达到20000以上可抽奖2次<br>
                        当日有效投注达到50000以上可抽奖3次<br>
                        抽奖前请仔细阅读”抽奖规则“
                    </p>
                </div>

                <div class="demGroup">
                    <div id="dem" style="overflow:hidden; height:10vh; text-align:right;">
                        <div id="dem1" style="text-align:left">
                            <table id="lottery_winners_data" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
    <div class="regulation">
        <div style=" line-height:16px; color:#fff; font-size:14px;">
            <div class="">
                <h2 style=" font-weight:bold; font-size:16px">
                    活动声明：
                </h2>
                <p>
                    1、北京时间12:00到次日12:00，凡在<?= $web_site['web_name'] ?>有效投注超过5000元以上均可参与抽奖，百分百中奖最高奖金888元。有效投注达到5000以上获一次抽奖资格，打码20000以上获两次抽奖资格，有效投注50000以上获三次抽奖资格！百分百中奖，最高奖金888元，千万巨资回馈幸运玩家！</p>
                <p>2、当日的打码计算周期采用美东时间进行计算，即北京时间每天中午12点至隔天中午12点；</p>
                <p>3、如果您的当日打码达到抽奖条件，即可在隔天（第二天的北京时间中午15:00）后开始抽奖，且需在当天完成抽奖，否则视为放弃活动资格；</p>
                <p>4、每位会员每个IP当日累计抽奖次数最多为3次，如发现会员同一个IP下注册多个帐号进行投注抽奖，公司有权拒绝赠送其彩金并做帐号冻结处理，保证正常玩家的利益；</p>
                <p>5、获得“现金筹码”的1倍流水才能出款，获得“现金筹码”的会员无需申请，系统将在24小时内自动添加到您的会员帐号内，请耐心等待；（注：当会员抽取“现金筹码”奖项，如若需放弃请联系在线客服进行处理，否则将视为您同意抽奖条件。)</p>
                <p>6、此转盘活动为【<?= $web_site['web_name'] ?>】系统程序自动运行，获奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议。</p>
                <h2 style=" font-weight:bold; font-size:16px">
                    活动声明：
                </h2>
                <p>1、所有红利为随机派送, 如系统发生一些不可预测超出本站控制之外的技术错误, 或人为不可控制的因素, 则<?= $web_site['web_name'] ?>保留最终处理权；</p>
                <p>2、玩家不可以使用多帐号参加本次活动，凡同一IP地址、同一姓名、同一银行帐号，同一联系方式，同一邮箱、同一电脑均视为同一帐号，“<?= $web_site['web_name'] ?>”在会员重复申请会员帐号时，保留取消、收回会员相关优惠 ；</p>
                <p>3、无论是个人或团体，如有任何威胁、滥用或使用不诚实方式套利的行为，经“<?= $web_site['web_name'] ?>”风险部门审核，公司有权取消该会员所有优惠；</p>
                <p>4、本活动最终解释权归属“<?= $web_site['web_name'] ?>”所有，并保留修改以上条款的最终权利。</p>
                <p>5、该轮盘活动计算有效打码量不包含彩票游戏之外的【六合彩，真人视讯，棋牌游戏，电子游艺，体育投注】等其他游戏。</p>
            </div>
        </div>
    </div>
    <div style="">
        <div style="height:80px; margin:0 auto; color:#747474; text-align:center;">
            <div style="text-align:center;">
                <br>
                <span style="color:#a9a9a9">Copyright © <span style="color:#ffd400; font-weight:bold;"><?= $web_site['web_name'] ?></span> Reserved</span><br>
            </div>
        </div>
    </div>
    <span id="sounddl" class="mp3"></span>
    <embed src="./static/mp3/xinshidai.mp3" loop="true" autostart="true" name="bgss" width="0" height="0">
</div>
<div class="actGotop">
    <a href="javascript:;" title="返回顶部"></a>
</div>
</body>
</html>
