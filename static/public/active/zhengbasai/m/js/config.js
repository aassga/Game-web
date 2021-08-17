//api url
let userApi = window.location.origin + '/';
// let userApi = 'http://tpeuserzhengbasaiapi.ge345.com' + '/';
let userVersion = 'frontend/v1/';

// 爭霸賽 獲取活動列表
let getZhengList = `${userApi}${userVersion}zhengbasaiList`
// 爭霸賽 參加活動
let playGame = `${userApi}${userVersion}zhengbasaiParticipatable`
// 爭霸賽 打碼獲獎名單
let getRewardList = `${userApi}${userVersion}zhengbasaiRewardList`
// 爭霸賽 獲獎紀錄
let getRewardHistory = `${userApi}${userVersion}zhengbasaiRewardHistory`
// 爭霸賽 活動訊息
let getZhengbasaiRow = `${userApi}${userVersion}zhengbasaiRow`
// 爭霸賽 當前帳號狀態
let getZhengParticipateStatus = `${userApi}${userVersion}zhengbasaiParticipateStatus`
// 爭霸賽 爭霸賽帳號切回一般帳號
let getZhengEscape = `${userApi}${userVersion}zhengbasaiEscape`

// setupToken :get token from cocos
var nativeCurrentToken = ""
function setupToken(token) {
	nativeCurrentToken = token.token
	localStorage.setItem('token', token.token)
}
// call cocos
window.goHome = function () {
	let data = "do=gohome"
	data = encodeURIComponent(data)
	document.location = `cocosscheme://${data}`
}
window.requireToken = function () {
	let data = "do=requiretoken"
	data = encodeURIComponent(data)
	document.location = `cocosscheme://${data}`
}
window.sendEscToken = function (token) {
	let data = `do=replacetoken&action=esc&token=${token}`
	data = encodeURIComponent(data)
	document.location = "cocosscheme://" + data
}
window.sendJoined = function (token, stage, endTime) {
	let data = `do=replacetoken&action=join&token=${token}&stage=${stage}&endtime=${endTime}`
	data = encodeURIComponent(data)
	document.location = "cocosscheme://" + data
}

// 剛進入頁面檢查是否為爭霸賽帳號
let isZhengEscTimer = false
initCheckZhengPlaying();

function initCheckZhengPlaying() {  
	if (!(localStorage.getItem('zhengJoinStage') && localStorage.getItem('zhengJoinStageEndTime'))) return
	if (!localStorage.getItem('zhengJoinExpireSecs')){
		let endTime = localStorage.getItem('zhengJoinStageEndTime')
		let curTime = new Date().getTime().toString().substr(0, 10);
		let expireSecs = endTime - curTime
		localStorage.setItem('zhengJoinExpireSecs', expireSecs)
	}
	if (localStorage.getItem('zhengJoinExpireSecs' <= -3)){
		zhengEscapeGoAct();
	} else if(!isZhengEscTimer){
		zhengExpireTimer();
	}
}
function zhengExpireTimer(){
	let expireSecs = localStorage.getItem('zhengJoinStageEndTime')*1 - new Date().getTime().toString().substr(0, 10)*1
	localStorage.setItem('zhengJoinExpireSecs', expireSecs)
	isZhengEscTimer = true
	let timer = setTimeout(()=> {
		if(localStorage.getItem('zhengJoinExpireSecs') && localStorage.getItem('zhengJoinExpireSecs') <= -3) {
			clearTimeout(timer)
			isZhengEscTimer = false
			zhengEscapeGoAct();
		} else {
			zhengExpireTimer();
		}
	}, 1000);
}
function zhengEscapeGoAct() {
	let actURL = `http://${window.location.hostname}/static/public/active/zhengbasai/m/v/index_particular.html?stage=${localStorage.getItem('zhengJoinStage')}`
	// 退出爭霸賽帳號 
	axios.post(getZhengEscape, {}, {
		headers: {
			Authorization: localStorage.getItem('token')
		}
	}).then((res) => {
		if (res.data !== undefined && res.data.code === 200) {
			localStorage.setItem('token', res.data.data.token)
			if (window.location.href === actURL){
				resetGameListZhengJoin()
			} else{
				resetGameListZhengJoin().then(()=>{ 
					window.location = actURL
				})
			}
		} else if(res.data.code === 5003 || res.data.code === 400){
            localStorage.removeItem('zhengJoinStage')
            localStorage.removeItem('zhengJoinStageEndTime')
            localStorage.removeItem('zhengJoinExpireSecs')
		}
	}).catch((err) => {
		console.log(err)
	});
}
// 清除遊戲列表/爭霸參賽資訊 
function resetGameListZhengJoin() { 
	return new Promise(resolve=>{
		let keys =[];
		for(var i = 0; i < localStorage.length; i++ ){keys.push(localStorage.key(i))}
		keys.filter(key => key.indexOf("gameSortV4") != -1 || key.indexOf(`main/gameSort/`) != -1 || key.indexOf("zhengJoin") != -1)
			.forEach(key => localStorage.removeItem(key))
		resolve();
	});
}