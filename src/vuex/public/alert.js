// 公共弹框显示设置
const state = {
    login: {
        ifLogin: false,
        modelTitle: '登入帐号',
        chooseModel: '登入帐号',
    },
    tips:{
        showTips:false,
        tipsContent:""
    },
    showJinggj:false,
    //提示显示框状态
    tipModel: {
        bool: false,
        title: '',
        model: '',
        type:'',
         //warn,success,error
    },
    promit: {
        isPromit: false,

    },
    showAttention:false,
    showRegister:false,// fhcp注册弹窗
    mgmRegister:false,// mgm注册弹窗
    newtip: {
        bool: false,
        title: "",
        model: "",
        leftspan: false,
        type:""
    },
    showtextip: {
        bool: false,
    },
    activeIndexs:1,
    bindPhone:false,
    bindbank:false,
}

const datas = {
    namespaced: true,
    state,
    mutations: {
        changbindbank(state,data){
            state.bindbank = data
        },
        changbindPhone(state,data) {
            state.bindPhone = data;
        },
        changeAttention(state,data){
            state.showAttention = data;
        },
        changeRegister(state,data){
            state.showRegister = data;
        },
        // getTips(state,data){
        //     state.tips.tipsContent = data.text;
        //     state.tips.showTips = data.bool;
        // },
        showMgmRegister(state,data){
            state.mgmRegister = data;
        },
        showLoop(state,data){
            state.activeIndexs = data;
        },
        // 是否显示提示信息
        showTipModel(state, datas) {
            state.tipModel.bool = datas.bool
            state.tipModel.title = datas.title
            state.tipModel.model = datas.model
            state.tipModel.type =  datas.type
        },
        // 是否显示登录弹框
        showLogin(state, bool) {
            state.login.ifLogin = bool
        },
        // 改变注册和登录公用标题
        setLoginTitle(state, title) {
            state.login.modelTitle = title
        },
        //设置显示登录还是注册框
        setChooseModel(state, model) {
            state.login.chooseModel = model
        },
        newshowtip(state, datas) {
            state.newtip.bool = datas.bool
            state.newtip.title = datas.title
            state.newtip.model = datas.model
            state.newtip.leftspan = datas.leftspan
            state.newtip.type = datas.type
        },
        //公告列表是否显示
        showTextTip(state, bool) {
            state.showtextip.bool = bool
        }

    },
    actions: {
        // 异步操作封装在action
    }
}

export default datas