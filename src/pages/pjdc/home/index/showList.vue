<template>
   <div class="mainboxs">
        <div class="nav prev"></div>
        <div class="nav next"></div>
        <div class="box">
            <ul id="slider">
                <li v-for="(item,index) in winningInfo" :key="index" @click="$loginGame(item)">
                    <div class="imgBox">
                        <div class="boxShadow"></div>
                        <img :src="item.game_name.icon" alt="">
                    </div>
                    <div class="info">
                        <p class="p1">{{"******"+item.name}}</p>
                        <p class="p2">投注<span>{{item.inNum}}</span> , 盈利<span>{{item.num}}</span></p>
                        <p class="p3">{{item.game_name.name}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            winningInfo:[],
        }
    },
    created () {
        this.$nextTick(() => {
            this.slider();
        });
    },
    mounted(){
        this.initWinningInfo();
    },
    methods:{
        initWinningInfo() {
            let data = [];
            let games = [
               {
                    code: 'YMBI',
                    icon: 'http://static.k0061.com/images/default/pc/10072.png',
                    id: 10072,
                    lock: 0,
                    name: '飞禽走兽多人版',
                    series: 10015,
                 
                },
                {
                    code: 'YMFD',
                    icon: 'http://static.k0061.com/images/default/pc/10067.png',
                    id: 10067,
                    lock: 0,
                    name: '森林舞会多人版',
                    series: 10015,
              
                },
                {
                    code: 'YMBZ',
                    icon: 'http://static.k0061.com/images/default/pc/10074.png',
                    id: 10074,
                    lock: 0,
                    name: '奔驰宝马多人版',
                    series: 10015,
               
                },
                {
                    code: 'YMSG',
                    icon: 'http://static.k0061.com/images/default/pc/10079.png',
                    id: 10079,
                    lock: 0,
                    name: '斗三公',
                    series: 10015,
                
                },
                {
                    code: 'YMJJ',
                    icon: 'http://static.k0061.com/images/default/pc/10080.png',
                    id: 10080,
                    lock: 0,
                    name: '红黑梅方',
                    series: 10015,
               
                },
                {
                    code: 'SB49',
                    icon: 'http://static.k0061.com/images/default/pc/258.png',
                    id: 258,
                    lock: 0,
                    name: '金龙珠',
                    series: 10015,
                 
                },
                {
                    code: 'YMAC',
                    icon: 'http://static.k0061.com/images/default/pc/10075.png',
                    id: 10075,
                    lock: 0,
                    name: '动物狂欢',
                    series: 10015,
                 
                },
                {
                    code: 'SB08',
                    icon: 'http://static.k0061.com/images/default/pc/266.png',
                    id: 266,
                    lock: 0,
                    name: '麻将老虎机',
                    series: 10015,
                 
                },
                {
                    code: 'PKBJ',
                    icon: 'http://static.k0061.com/images/default/pc/269.png',
                    id: 269,
                    lock: 0,
                    name: '杰克高手',
                    series: 10015,
                   
                },
                {
                    code: 'SB02',
                    icon: 'http://static.k0061.com/images/default/pc/264.png',
                    id: 264,
                    lock: 0,
                    name: '复古花园',
                    series: 10015,
                 
                },
                {
                    code: 'SMG_breakAway',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1824.png',
                    id: 10157,
                    lock: 0,
                    name: '冰上曲棍球',
                    series: 10022,
                 
                },
                {
                    code: 'SMG_basketballStar',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1831.png',
                    id: 10139,
                    lock: 0,
                    name: '篮球巨星',
                    series: 10022,
                 
                },
                {
                    code: 'SMG_playboy',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1839.png',
                    id: 10414,
                    lock: 0,
                    name: '花花公子',
                    series: 10022,
                   
                },
                {
                    code: 'SMG_immortalRomance',
                    icon: 'https://vnsyl.8581333.com/images/default/pc/1825.png',
                    id: 10303,
                    lock: 0,
                    name: '不朽的浪漫',
                    series: 10022,
                  
                },
                {
                    code: '5902',
                    icon: 'http://static.k0061.com/images/default/pc/3568.png',
                    id: 3568,
                    lock: 0,
                    name: '糖果派对',
                    series: 10016,
                  
                },
                {
                    code: '5901',
                    icon: 'http://static.k0061.com/images/default/pc/3567.png',
                    id: 3567,
                    lock: 0,
                    name: '连环夺宝',
                    series: 10016,
                 
                },
                {
                    code: '52',
                    icon: 'http://static.k0061.com/images/default/pc/2646.png',
                    id: 2646,
                    lock: 0,
                    name: '跳高高',
                    series: 10018,
                 
                },
                {
                    code: '7',
                    icon: 'http://static.k0061.com/images/default/pc/2667.png',
                    id: 2667,
                    lock: 0,
                    name: '跳起来',
                    series: 10018,
                   
                },
                {
                    code: 'fm',
                    icon: 'http://static.k0061.com/images/default/pc/3338.jpg',
                    id: 3338,
                    lock: 0,
                    name: '古怪猴子',
                    series: 10024,
               
                },
                {
                    code: 'bib',
                    icon: 'http://static.k0061.com/images/default/pc/3347.jpg',
                    id: 3347,
                    lock: 0,
                    name: '海底探宝',
                    series: 10024,
                   
                },
                {
                    code: 'trpmnk',
                    icon: 'http://static.k0061.com/images/default/pc/3422.jpg',
                    id: 3422,
                    lock: 0,
                    name: '三倍猴子',
                    series: 10024,
                  
                },
                {
                    code: 'hb',
                    icon: 'http://static.k0061.com/images/default/pc/3277.jpg',
                    id: 3277,
                    lock: 0,
                    name: '狂欢夜',
                    series: 10024,
                }
            ];
            for (let i = 0; i < games.length; i++) {
                let num = parseInt((Math.random()+1) * ((Math.random()+1) * 3600));
                let inNum = parseInt((Math.random()+0.6) * ((Math.random()+1) * 100));
                num = num < 10 ? num * 1234 : num;
                num = num < 100 ? num * 123 : num;
                num = num < 1000 ? num * 12 : num;
                inNum = inNum < 10 ? inNum * 234 : inNum;
                inNum = inNum < 100 ? inNum * 23 : inNum;
                inNum = inNum < 1000 ? inNum * 2 : inNum;
                let name = String.fromCharCode((num % 26) + 97) + num.toString(32);
                name = name.substr(0, 3);

                data[i] = { name, inNum, num, game_name: games[i] };
            }

            this.arraySort(data, (v1, v2) => v1.num < v2.num);
            this.winningInfo = data;
        },
         //动画
        async slider() {
            let ul = document.getElementById('slider');
            let prev = document.getElementsByClassName('prev')[0];
            let next = document.getElementsByClassName('next')[0];
            let main = document.getElementsByClassName('box')[0];
            let n = -312;

            function left() {
                let oLi = ul.children[0];
                ul.className = 'move';
                setTimeout(function() {
                    ul.removeChild(oLi);
                    ul.appendChild(oLi);
                    ul.className = '';
                }, 500);
            }

            function right() {
                let last = ul.lastElementChild;
                ul.removeChild(last);
                ul.insertBefore(last, ul.childNodes[0]);
                ul.style.left = n + 'px';
                ul.className = 'back';
                setTimeout(function() {
                    ul.className = '';
                    ul.style.left = '';
                }, 500);
            }
            prev.onclick = left;
            next.onclick = right;
        },
    }
};
</script>

<style lang="less" scoped>
 @keyframes animateSub {
    0% {
        left: 0;
    }

    to {
        left: -5616px;
    }
}
.mainboxs {
  margin: 0 auto;
  width: 1200px;
  height: 160px;
  background:#420711;
  border-radius: 10px;
  position: relative;
  margin-bottom: 20px;

  .box {
    width: 1124px;
    height: 160px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 10px;
        &:hover {
            #slider {
                animation-play-state: paused;
            }
        }

    #slider {
        width: 6864px;
        position: absolute;
        left: 0;
        top: 0;
        -webkit-animation:animateSub 120s linear infinite;
        -moz-animation:animateSub 120s linear infinite;
        -ms-animation:animateSub 120s linear infinite;
        -o-animation:animateSub 120s linear infinite;
        animation: animateSub 120s linear infinite;

      li {
        width: 294px;
        height: 140px;
        float: left;
        background: #530815;
        border-radius: 5px;
        margin-right: 18px;
        margin-top: 10px;
        text-align: center;
        position: relative;
        cursor: pointer;

        .imgBox{
            float: left;
            width: 112px;
            height: 107px;
            margin-left: 25px;
            margin-top: 17px;
            position: relative;
            .boxShadow{
                width: 100%;
                height: 100%;
                position: absolute;
                background: rgba(0, 0, 0, 0.2);
                left: 0;
                top: 0;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            width: 157px;
            float: left;
            p{
                font-size: 14px;
                line-height: 14px;
                color: #bc7783;
                span{
                    color: #ffd101;
                }
            }
            .p1{
                margin-top: 28px;
            }
            .p2,.p3{
                margin-top: 22px;
            }
        }
      }
    }
  }

  .nav {
    width: 38px;
    height: 140px;
    position: absolute;
    cursor: pointer;
    margin-top: 10px;
    line-height: 140px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;

    &.prev {
      left: 0px;
      background:url('/static/public/image/casino/images/left-s.png') center center no-repeat;
      background-size: 15px 25px;
    }
    &.next {
      right: 0px;
        background:url('/static/public/image/casino/images/right-s.png') center center no-repeat;
      background-size: 15px 25px;
    }
    &.prev:hover {
        background:url('/static/public/image/casino/images/left.png') center center no-repeat;
        background-size: 15px 25px;
    }
    &.next:hover {
        background:url('/static/public/image/casino/images/right.png') center center no-repeat;
        background-size: 15px 25px;
    }
  }
}
</style>