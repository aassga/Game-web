const state = {
    navActive: localStorage.navAvtive || 0,
    registerShow: false,
    showArticle:false,
    betTitle:""
  }
  
  const datas = {
    namespaced: true,
    state,
    mutations: {
      setNav (state, num) {
        state.navActive = num
        localStorage.setItem('navAvtive', num)
      },
      //弹出注册框
      showRegister (state, bool) {
        state.registerShow = bool
      },
      showArticle(state,bool){
        state.showArticle = bool
      }
      ,betTitle(state,data){
        state.betTitle = data
      }
    }
  }

  export default datas
  