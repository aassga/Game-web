<template>
     <div>
        <div class="newBox1" v-if="showAlert">
            <div :style="{backgroundImage: 'url(' + parmas.coverImgUrl + ')', backgroundSize:'contain',backgroundRepeat: 'no-repeat'}" class="pop-img">
                <div class="top_img">
                </div>
                <div id="show_box" ref="searchBar">
                    <p class="noticeText">当前账号异地登录，为了您账户资金安全请您输入资金密码验证身份</p>
                    <div class="pwdNumber">
                      <div v-for="(item,index) in inputList" :key="index">
                          <input type="password" maxlength="1" v-model="item.val" class="border-input" @keyup="nextFocus($event,index)">
                      </div>
                    </div>
                    <!-- <p class="pwdNumber"><span v-for="(v,i) in arr" :key="i"></span></p> -->
                    <button class="confirmBtn" @click="submitAttention" :style="{backgroundColor:parmas.btnColor}">验证登入</button>
                </div>
                <div :class="['close']" @click="hideAttention">
                    <img :src="'/static/public/image/modal_top/'+parmas.closeImg +'.png'" alt="">
                </div>
            </div>
        </div>

        
     </div>
</template>
<script>
import UserService from "@/service/public/UserService.js";
import { _SetGet, _SetPost, postS, getS} from '@/service/public/service.js';
export default {
    props:{
        parmas:{
            type:Object
        }
    },
    data(){
       return{
        
        popoutObj:{
          client_type:"PC"
        },
        inputList: [{val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}, {val: ""}],
       }
    },
    methods:{
        /*对焦到下一个input框去*/
        nextFocus(el,index) {
            var dom = document.getElementsByClassName("border-input"),
                currInput = dom[index],
                nextInput = dom[index + 1],
                lastInput = dom[index - 1];
            /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
            if (el.keyCode != 8 && el.path[0].value) {
                if (index < (this.inputList.length - 1)) {
                    nextInput.focus();
                } 
            }else{
                if (index !=0) {
                    lastInput.focus();
                }
            }

        },
        // 提交验证
        async submitAttention(){
            let pwd = '';
            this.inputList.forEach(v => {
                if (v.val) {pwd += v.val+''}
            });
            if(pwd.length!==6){
                this.$errorAlert('请输入6位数字资金密码', "warn");
                return false
              }
            if(!this.dInvalidMoney(pwd)){
                this.$errorAlert('请输入6位数字资金密码', "warn");
                  this.inputList.forEach(v => {
                   v.val=''
                });
                return false
             }
            let res = await postS(`validatePayPassword`, {pay_password:pwd});
            if(res.code === 200){
                this.$store.commit('alert/changeAttention', false)
                this.$store.commit('mainState/loginOrout',true)
                localStorage.removeItem('isDiffPlace')
            }else{
                this.$errorAlert(res.message, "warn"); 
                  this.inputList.forEach(v => {
                   v.val=''
                });
            }
        },
        hideAttention(){
            if (localStorage.token) {
                this.logout();
                this.$store.commit('alert/changeAttention', false)
            }else{
                this.$store.commit('alert/changeAttention', false)
            }
        },
        logout() {
            UserService.logout.call(this);
        },
        getFocus(){
            var dom = document.getElementsByClassName("border-input");
            
            dom[0].focus();
        }
    },
    created(){},
    mounted(){
        // this.getFocus()
    },
    //是否展示公告列表
    computed: {
        showAlert(){
          return this.$store.state.alert.showAttention;
        },
        // shoeHide(){
        //     return this.$store.state.alert.tipModel.bool;
        // }
    },
    watch:{
        showAlert(newVal,oldVal){
            if(newVal == true){
                setTimeout(()=>{
                let dom = document.getElementsByClassName("border-input");
                dom[0].focus();
                },1000)
               
            }
        },
        // shoeHide(newVal,oldVal){
        //     if(newVal == false){
        //         let dom = document.getElementsByClassName("border-input");
        //         dom[5].focus();
        //     }
        // },
    }
}
</script>
<style lang="less" scoped>
  .newBox1{
      width:100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
      position:fixed;
      left:0;
      top:0;
      right:0;
      bottom:0;
      margin:auto;
      z-index:1001;
      display: flex;
      justify-content:center;
      align-items:center;
      .pop-img{
        transform: scale(0.9);
        width: 752px;
        height: 612px;
        border-radius: 22px;
        background-color: #fff;
        position:relative;
        overflow: hidden;
        .top_img{
            width: 100%;
            height: 240px;
            img{
                width: 100%;
                height: 64px;
            }
        }
        #show_box{
            width:100%;
            height:476px;
            overflow: auto;
            #show_textBox{
                padding:0px 24px 0 30px;
                li{
                    p{
                        padding: 0;
                        margin: 0;
                        font-size:17px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        line-height:28px;
                    }
                    .border_line{
                        width: 100%;
                        height: 2px;
                        background:#E7E7E7;
                        margin: 13px 0;
                    }
                }
                li:last-child{
                    .border_line{
                        opacity: 0;
                        margin-bottom:0; 
                    }
                }
            }
        }
        .btnBox{
            width:100%;
            height:72px;
            padding: 0 24px;
            .border_line{
                width: 100%;
                height: 1px;
                background:#E7E7E7;
            }
            .pop_btnBox{
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                height: 72px;
                padding: 16px 0 24px 0;
                span{
                    color: #444444;
                    height: 32px;
                    line-height: 32px;
                    font-size: 15px;
                }
                .btn_sty{
                    outline:none;
                    font-size: 15px;
                    width: 72px;
                    height: 32px;
                    line-height: 32px;
                    border:1px solid rgba(197,197,197,1);
                    background-color: #fff;
                    border-radius:5px;
                    color: #444444;
                    
                }
                .shang{
                    margin-left: 16px;
                    margin-right: 16px;
                }  
            }
        }
        .close{
            width: 50px;
            height: 50px;
            position: absolute;
            cursor: pointer;
            right: 16px;
            top: 15px;
            img{
                width: 50px;
                height: 50px; 
            }
            &:hover{
                opacity: 0.8;
            }
        }
    } 
    
    .noticeText{
        color: #000;
        font-size: 24px;
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        letter-spacing: 5px;
    }
    input::-webkit-input-safebox-button{
        display: none;/*去掉搜狗浏览器密码软盘*/
    }
    .pwdNumber{
    display: flex;
    justify-content: space-around;
    width: 450px;
    margin: 41px auto;
    input{
        border: 1px solid black;
        outline: none;
        height: 51px;
        width: 51px;
        font-size: 48px;
        text-align: center;
        border-radius: 5px;
        // caret-color: transparent;
    }
    }
    .confirmBtn{
    width:508px;
    height:72px;
    border-radius:7px;
    font-size: 30px;
    letter-spacing: 5px;
    color: #fff;
    margin: 20px 115px;
    outline: none;
    border: none;
    cursor: pointer;
    }
  }

</style>
