const state = {
  //当前选中保存
  // navActive: '首页'
  isPersonal: false,  
  liActive: 0,
  contentView: 'recharge',
  navView: 0,
  navActive: 0,
  navText: '充值',
  paymentData: [],
  categoryId: '',
  itemDatas: '',
  withdraw: 0,
  isRefresh: 0,
  bankSafety: 0,
  payName: '',
  classType: '',
  loadingShow: false,
  uid:"",
  list_userid:"",
  showclean:false,
  gameList:null,
  rechargeChannelTrue:false,
  rechargeChannelMoney:0,
  showRechargeChannel:false,
  paymentAll:"",
  showRecharge:false,
  rechargeText:[],
  rechargeMsg:"",
  usdtList:[],
  usdtData:[],
  paymentModal:false,
  paymentModalData:{},
  paymentModalMoney:"",
}
const datas = {
  state,
  mutations: {
    async showPersonal (state, datas) {
      state.isPersonal = datas.bool
      state.liActive = datas.num
      //  打开个人中心 让html,body滚动条隐藏掉
      if (datas.bool) {
        document.querySelector('html').setAttribute('style', 'overflow: hidden')

      } else {
        document.querySelector('html').setAttribute('style', 'overflow: auto')
      }
    },
    showContent (state, datas) {
      state.contentView = datas.parent
    },
    listUserId(state,datas){
      state.list_userid = datas
    },
    userIdbyDetails(state,datas){
      state.uid = datas
    },
    showNav (state, datas) {
      state.navView = datas.child
    },
    liActive (state, datas) {
      state.navActive = datas
    },
    navText (state, datas) {
      state.navText = datas
    },
    withdraw (state, datas) {
      state.withdraw = datas
    },
    refresh (state, datas) {
      state.isRefresh += datas
    },
    payment (state, datas) {
      state.categoryId = datas.id
      state.itemDatas = datas
    },
    paymentDataFc (state, datas) {
      state.paymentData = datas
    },
    bankSafety (state, num) {
      state.bankSafety = num
    },
    loading (state, bool) {
      state.loadingShow = bool
    },
    showclean(state,datas){
     state.showclean=datas.newbool
    },
    setRechargeChannelTrue(state,boolean) {
     state.rechargeChannelTrue = boolean
    },
    setRechargeChannelMoney(state,money) {
      state.rechargeChannelMoney = money
    },
    setShowRechargeChannel(state,boolean) {
      state.showRechargeChannel = boolean
    },
    paymentAll (state, datas) {
      state.paymentAll = datas
    },
    usdtList( state,datas ){
      state.usdtList = datas
    },
    usdtData(state,datas){
      state.usdtData = datas
    },
    paymentModal(state,datas){
      state.paymentModal = datas
    },
    paymentModalData(state,datas) {
      state.paymentModalData = datas
    },
    paymentModalMoney(state,datas) {
      state.paymentModalMoney = datas;
    }
  },
  actions: {}
}

export default datas
