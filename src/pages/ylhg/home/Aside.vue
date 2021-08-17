<template>
    <div>
        <ul class="qy-service TplFloatPic_1" style="position: absolute;z-index: 1000;top:170px;transition:all ease .3s">
            <li class="service" @click="goService">
                <div>
                </div>
            </li>

            <li class="cs-mail">
                <div>
                </div>
                <div class="shrink">
                    8jjqpts@gmail.com
                </div>
            </li>

            <li class="Agency" @click="$router.push('/home/about/partners')">
                <div>
                </div>
            </li>
            
             <li class="xl" @click="goxl">
                <div>
                </div>
            </li>

            <li class="download" @click="goDownload">
                <div>
                </div>
            </li>

            <li class="cs-goTop" @click="goTop">
                <div>
                </div>
            </li>

        </ul>

    </div>

</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
export default {
    data() {
        return {
            showNew2019: true
        };
    },
    methods: {
        goService() {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
                let ser = service.find(item => item.status === 'on');
                if (ser) {
                    window.open(ser.url);
                }
            }
        },
        async advantageClick(advanItem) {
            if (advanItem == 'tryplay') {
                window.open('/static/ylhg/html/active/jiebei/index.html');
            }
        },
        async tryPlay() {
            let res = await this.$http.get('/frontend/test/demo', { headers: { Accept: 'application/x.tg.v2+json' }, params: {} });
            if (res && res.code == 200) {
                UserService.setCache(res, 'test');
                window.location.reload();
            }
        },
        addWindow() {
            window.addEventListener('scroll', this.scrollFunc());
        },
        scrollFunc(e) {
            var nodeitem = document.getElementsByClassName('TplFloatPic_1')[0];
            window.onscroll = function() {
                var t = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (t > 0) {
                    nodeitem.style.top = t + 170 + 'px';
                } else {
                    nodeitem.style.top = t + 170 + 'px';
                }
            };
        },
        goDownload() {
            window.open('/static/ylhg/html/download/index.html');
        },
        goResiter() {
            this.$router.push('/home/register');
        },
        goxl(){
           window.open('http://y4478.com')
        },
        goTop() {
            let curr_top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let time_id = setInterval(() => {
                curr_top -= 40;

                document.documentElement.scrollTop = curr_top;

                document.body.scrollTop = curr_top;

                if (curr_top <= 0) {
                    clearInterval(time_id);
                }
            }, 10);
        }
    },
    mounted() {
        this.addWindow();
    },
    store
};
</script>

<style lang="less" scoped>
.qy-service {
    right: 20px;

    li {
        position: relative;
        width: 65px;
        height: 65px;
        margin-bottom: 5px;
        border-radius: 5px;
        cursor: pointer;

        div {
            background-size: 100% 100%;
            height: 65px;
            width: 65px;
        }

        p {
            font-size: 14px;
            text-align: center;
            line-height: 1;
            color: inherit;
        }
    }

    li:hover {
        border: 1px solid #813a14;
    }

    .service {
        div {
            background: url('/static/ylhg/img/thirdparty/kefu.png');
        }
    }
    .by-service {
        div {
            background: url(/static/ylhg/img/thirdparty/by-kefu.png);
        }
    }

    .cs-mail {
        div {
            background: url('/static/ylhg/img/thirdparty/tousu.png');
        }
        .shrink {
            right: 70px;
            background: linear-gradient(#ffe3bd, #fdca8e);
            position: absolute;
            top: 0px;
            width: 150px;
            height: 62px;
            line-height: 62px;
            text-align: center;
            display: none;
            color: #333;
        }
    }

    .cs-mail:hover {
        .shrink {
            display: block;
        }
    }
    .Agency {
        div {
            background: url(/static/ylhg/img/thirdparty/daili.png);
        }
    }
    .xl {
        div {
            background: url(/static/ylhg/img/thirdparty/xl.png);
        }
    }
    .jiebei {
        div {
            background: url('/static/ylhg/img/thirdparty/jiebei.png');
        }
    }

    .gold_housekeeper {
        div {
            background: url('/static/ylhg/img/thirdparty/jinguanjia.png');
        }
    }

    .download {
        div {
            background: url('/static/ylhg/img/thirdparty/download.png');
        }
    }

    .cs-goTop {
        div {
            background: url('/static/ylhg/img/thirdparty/zhiding.png');
        }
    }
}
.new2019 {
    position: fixed;
    z-index: 9999;
    right: 20px;
    bottom: 30px;
    cursor: pointer;
    width: 230px;
    height: 230px;
    background-image: url('/static/ylhg/img/new2019.gif');

    .clBtn {
        background: url('/static/ylhg/img/new2019_close.png');
        z-index: 99999;
        position: absolute;
        width: 23px;
        height: 23px;
        top: 0px;
        right: 0px;
        display: none;
    }
    &:hover .clBtn {
        display: block;
    }
}
</style>