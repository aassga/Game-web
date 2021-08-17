var isClick = false;
var resultPid = 0;
var resultMsg = "";
var isChai = false;
var Timerr;
var bCode = "";

$(function() {
    //new Marquee("marquee_rule",0,1,700,120,60,0,0);

    $(".js_close_dialog").click(function() {
        $(".iDialog").hide();
        $(".iDialogLayout").hide();
    })


})

//关闭红包
function closebox() {
    $('#login_box').hide();
    $('#hongbao_back').hide();
}

//关闭红包层
function close_hongbao() {
    isChai = false;
    $('#hongbao_result').find('.w2').html('恭喜发财，大吉大利!');
    $('#hongbao_open').hide();
    $('#hongbao_result').hide();
    $('#hongbao_back').hide();
    $("#hongbao_open").removeClass("out");
    $("#hongbao_result").removeClass("in").hide();
}

//关闭登录框
function closebox() {
    $('#login_box').hide();
    $('#hongbao_back').hide();
}

//检查用户帐号领取红包
function checkUser() {
    var _username = $("#username").val() || $("#username2").val();
    if (_username == "") {
        showMsg("输入会员帐号不能为空!");
        return false;
    }
    $.ajax({
        url: 'http://45.120.52.135:8080/redrain/remaining',
        dataType: 'json',
        cache: false,
        type: 'GET',
        data: {
            userName: _username,
        },
        success: function(obj) {
            if (obj.code == 0) {
                $('#j-logn').hide();
                $('#j-packet-bg').show();
                $('#j-packet').show();
                $('.packet-1').show();
                if (obj.data === 0) {
                    $('#hb_count').html("红包次数已经用完");
                    $('.packet-open').hide();
                } else {
                    $('#hb_count').html(`您还有 <span>${obj.data}</span> 次机会`);
                    $('.packet-open').show();
                }
            } else {
                $('#j-logn').hide();
                $('#j-packet-bg').show();
                $('#j-packet').show();
                $('.packet-1').show();
                $('#hb_count').html(obj.msg);
                $('.packet-open').hide();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}

//点击红包
function startGame() {
    var _username = $("#username").val() || $("#username2").val();
    if (_username == "") {
        showMsg("输入会员帐号不能为空!");
        return false;
    }
    $.ajax({
        url: 'http://45.120.52.135:8080/redrain/receive',
        dataType: 'json',
        cache: false,
        type: 'POST',
        data: {
            userName: _username
        },
        success: function(obj) {
            switch (obj.code) {
                case 0:
                    $('.packet-1').hide();
                    $('.packet-2').show();
                    $('#hb_money span').html(obj.data.amount);
                    break;
                default:
                    $('.packet-1').hide();
                    $('.packet-2').show();
                    $('.show_tost').html(obj.msg);
                    $('#hb_money').hide();
                    break;
            }
        },
        failure: function() {
            //api请求失败处理
            showMsg('网络故障');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
            showMsg('网络故障,请联系管理员');
        }
    })

}
//红包查询点击
function queryBtn() {
    var _bonuscode = $("#querycode").val();
    if (_bonuscode == "") {
        showMsg("输入会员帐号不能为空!");
        return false;
    }
    queryPage(1);
}
//获取红包查询的列表
var pagesize = 5;

function queryPage(page) {
    $.ajax({
        url: 'http://45.120.52.135:8080/redrain/receiptRecord',
        dataType: 'json',
        cache: false,
        data: {
            userName: $("#querycode").val(),
            page: page,
            limit: pagesize,
        },
        type: 'GET',
        success: function(obj) {
            if (obj.code == 0) {
                var sHtml1 = "";
                var x = "";
                if (obj.data.list.length > 0) {
                    $.each(obj.data.list, function(i, award) {
                        x = (award.isDeliver == "1") ? "<font color=yellow>已派彩</font>" :
                            "<font color=white>未派彩</font>";
                        sHtml1 += "<tr><td>" + award.amount + "</td><td>" + award.createDate +
                            "</td><td>" + x + "</td></tr>";
                    })
                    var sPage = Paging(page, pagesize, obj.data.total, 2, "queryPage", '', '', '上一页', '下一页');
                    $(".quotes").html(sPage);
                    $("#query_content").html(sHtml1);
                } else {
                    $("#query_content").html("<tr><td colspan='3'>未找到相关信息</td></tr>");
                }

            } else {
                $("#query_content").html("<tr><td colspan='3'>未找到相关信息</td></tr>");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1;
        }
    })
}
//红包查询翻页功能
function Paging(pageNum, pageSize, totalCount, skipCount, fuctionName, currentStyleName, currentUseLink, preText,
    nextText, firstText, lastText) {
    var returnValue = "";
    var begin = 1;
    var end = 1;
    var totalpage = Math.floor(totalCount / pageSize);
    if (totalCount % pageSize > 0) {
        totalpage++;
    }
    if (preText == null) {
        firstText = "prev";
    }
    if (nextText == null) {
        nextText = "next";
    }
    begin = pageNum - skipCount;
    end = pageNum + skipCount;
    if (begin <= 0) {
        end = end - begin + 1;
        begin = 1;
    }
    if (end > totalpage) {
        end = totalpage;
    }
    for (count = begin; count <= end; count++) {
        if (currentUseLink) {
            if (count == pageNum) {
                returnValue += "<a class=\"" + currentStyleName + "\" href=\"javascript:void(0);\" onclick=\"" +
                    fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> ";
            } else {
                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() +
                    ");\">" + count.toString() + "</a> ";
            }
        } else {
            if (count == pageNum) {
                returnValue += "<span class=\"" + currentStyleName + "\">" + count.toString() + "</span> ";
            } else {
                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() +
                    ");\">" + count.toString() + "</a> ";
            }
        }
    }
    if (pageNum - skipCount > 1) {
        returnValue = " ... " + returnValue;
    }
    if (pageNum + skipCount < totalpage) {
        returnValue = returnValue + " ... ";
    }
    if (pageNum > 1) {
        returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum - 1).toString() +
            ");\"> " + preText + "</a> " + returnValue;
    }
    if (pageNum < totalpage) {
        returnValue = returnValue + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum + 1).toString() +
            ");\">" + nextText + "</a>";
    }
    if (firstText != null) {
        if (pageNum > 1) {
            returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(1);\">" + firstText + "</a> " +
                returnValue;
        }
    }
    if (lastText != null) {
        if (pageNum < totalpage) {
            returnValue = returnValue + " " + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" +
                totalpage.toString() + ");\">" + lastText + "</a>";
        }
    }
    return returnValue;
}