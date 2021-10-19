import React ,{ useState ,useEffect} from 'react'
import DappyList from '../components/DappyList'
import Header from '../components/Header'
import { useUser } from '../providers/UserProvider'
import "./Artwork.page.css"

export default function Artwork() {
	const { collection, createCollection, deleteCollection, userDappies } = useUser()
	const [languageType,setlanguageType] = useState('TC');
	const [payTabs,setpayTabs] = useState(['錢包支付']);
	const [selectarr,setselectarr] = useState([]);
	const [maxbannum,setmaxbannum] = useState(0);
	const [curUserOwned,setcurUserOwned] = useState(0);
	const [oneUserCountLimit,setoneUserCountLimit] = useState(0);
	const [onceCountLimit,setonceCountLimit] = useState(0);
	const [busdPrice,setbusdPrice] = useState(10);
	const [id,setid] = useState("");
	const [prev,setprev] = useState(-1);
	const [success_status,setsuccess_status] = useState(-1);
	const [basicId,setbasicId] = useState(0);
	const [hkdPrice,sethkdPrice] = useState(0);
	const [chEnTextHtml] = useState({
		"TC": {
			home: '首頁',
			auction: '拍賣',
			noConnectWallet: "未連接錢包",
			login: "登入/註冊",
			myaccount: "我的帳戶",
			myorders: "我的訂單",
			myassets: "我的資產",
			mywallet: "我的錢包",
			logOut: "登出",
			version: "共50版",
			select: "已選第",
			versionTxt: "版",
			price: "单价：",
			purchaseNow: "立即購買 ->",
			saleEnds: "銷售結束於：",
			details: "更多信息",
			pay: "支付",
			paySuc: "支付成功",
			payErr: "支付失敗",
			paid: "您的付款金額為",
			byCreditCard: "信用卡支付",
			pendingPayment: "這是待付款，您的付款金額為：",
			saveFor: "保存以備將來購買",
			purchasing: "由於您購買的是數字作品，一經售出概不退換",
			payment: "立即付款",
			currentUsing: "正在使用",
			balance: "餘額",
			notStore: "我們不會儲存您的錢包密鑰，未經您的授權，也無法使用您電子錢包中的貨幣。",
			paymenttips: "注意：喚起錢包支付時，由Metamask的限制，價格顯示為0，但您實際支付的金額與售賣商品價格一致。",
			regSuc: "注册成功",
			operationFailed: "操作失败",
			// js部分
			maximum: "已達到最大購買數量",
			purchaseSuc: "购买成功",
			seconds: "預計10秒內到賬",
			comSoon: "即將開售",
			start: "銷售開始於：",
			end: "銷售結束於：",
			salesClosed: "銷售已結束",
			sellOut: "已售罄",
			balanceInsufficient: "餘額不足",
			least: "至少選擇一件噢",
			reached: "已達到賬號購買數量限制",
			limit: "已達到單次購買數量限制",
			moment: "當前剩餘只可選擇1個",
			quantity: "已達到最大購買數量",
			asset: "去我的資產核對",
			confirm: "確認",
			cancel: "取消",
			recharge: "充值",
			noLog: "未登入，請登入",
			number: "訂單號 #：",
			balancePayment: "餘額支付",
			accomplish: "完成",
			payment: "立即付款",
			switchNet: "請先切換網絡",
			walletFirst: "請先連接錢包  ->",
			paymentComing: "錢包直連支付功能準備中...",
			metaTips: "注意：喚起錢包支付時，由Metamask的限制，價格顯示為0，但您實際支付的金額與售賣商品價格一致。",
			netVer: '當前主網: ',
			switchNetVision: "切换"
		},
		"EN": {
			switchNetVision: "Switch",
			netVer: 'Current network: ',
			switchNet: "Please switch network first",
			metaTips: "Please note: Due to the limitation of Metamask, it is normal that the price will show 0 when you are using Metamask to process payment. But actually, you are paying the right price.",
			home: 'HOME',
			auction: 'AUCTION',
			noConnectWallet: "Connect Wallet",
			login: "Login/Sign up",
			myaccount: "My Account",
			myorders: "My Orders",
			myassets: "My Assets",
			mywallet: "My Wallet",
			logOut: "Log out",
			version: "Edition 50",
			select: "Selected",
			versionTxt: "th edition",
			price: "Price：",
			purchaseNow: "Purchase Now ->",
			saleEnds: "Sale ends at：",
			details: "Details",
			pay: "Payment",
			paySuc: "Payment successful",
			payErr: "Payment failed",
			paid: "Your paid",
			byCreditCard: "By credit card",
			pendingPayment: "Your pending payment is：",
			saveFor: "Save for future purchase",
			purchasing: "Since you're purchasing a digital creation, all sales are final.",
			currentUsing: "Current using",
			payment: "Pay now",
			balance: "Balance",
			notStore: "We will not store your wallet key, nor can we use the currency in your wallet without your authorization.",
			paymenttips: "Please note: Due to the limitation of Metamask, it is normal that the price will show 0 when you are using Metamask to process payment. But actually, you are paying the right price.",
			regSuc: "registration success",
			operationFailed: "operation failed",
			// js部分
			maximum: "Maximum purchase quantity has been reached",
			purchaseSuc: "Successful purchase",
			seconds: "Expected to arrive within 10 seconds",
			comSoon: "Coming soon",
			start: "Sales start at：",
			end: "Sale ends at：",
			salesClosed: "Sold out",
			sellOut: "Sold out",
			balanceInsufficient: "Insufficient balance",
			least: "Choose at least one~",
			reached: "The account purchase limit has been reached",
			limit: "Reached the single purchase quantity limit",
			moment: "Only 1 can be selected at the moment",
			quantity: "Maximum purchase quantity has been reached",
			asset: "Go to my asset to check",
			confirm: "confirm",
			cancel: "cancel",
			recharge: "Add funds",
			noLog: "Not logged in, please log in",
			number: "Order #: ",
			balancePayment: "Paid by balance",
			accomplish: "complete",
			payment: "Pay now",
			walletFirst: "Please connect your wallet first  ->",
			paymentComing: "Function coming soon..."
		}
	})
	var state = {
		id: '',
		prev: -1,
		success_status: -1,
		walletType: '',
		accountBalance: 0,
		hkdPrice: 0,
		payTabs: ['錢包支付'],
		// payTabs: ['錢包支付', '信用卡'],
		selectedPayMethod: 0,
		basicId: 0,
		visiable: [],
		auctionAddress: '',
		auctionContractInstance: null,
		userAddress: '',
		tokenLimits: [],
		chainId: '',
		// 中英文切换
		languageType: "TC",
	}
	useEffect (()=>{
		setlanguageType(getCookie("lang")?getCookie("lang"):'TC');
		if(languageType == "TC"){
			setpayTabs(['錢包支付'])
		}else{
			setpayTabs(['Crypto wallet'])
		}
		initMediaCss();
			
	},[id])
	const initMediaCss = () => {
		var dom = document.body;
		let dom2 = document.querySelector('.details-right-btn');
		let dom3 = document.querySelector('.payment-close-mobile');
		let dom4 = document.querySelector('.payment');
		let dom5 = document.querySelector('video');
		let dom6 = document.querySelector('.pre-mask');
		let dom7 = document.querySelector('.payment-page-right-balance');
		var mobile_width = dom.style.width;
		if (mobile_width <= 992) {
			dom2.classList.remove("payment-btn-pc");
			dom2.classList.add("payment-btn-mobile");
			dom3.onclick = function () {
				dom4.classList.remove("payment-active");
				dom5.classList.remove("video-hidden");
			}
		}
		var params = window.location.search.substr(1).split('&')
		var arr = [];
		for (var key in params) {
			arr.push({
				key: params[key].split('=')
			});
		}
		arr.forEach(i => {
			if (!!i.key) {
				setid(i.key[1]);
			}else if (!!i.prev) {
				setprev(i.key[1]);
			}else if (!!i.success) {
				setsuccess_status(i.key[1]);
			}
		});
		if (prev == '1') {
			dom6.style.display = 'block';
		} else {
			dom6.style.display = 'none';
		}
		if (success_status == 1) {
			alert(chEnTextHtml[languageType].paySuc);
			setTimeout(function () {
				saveconfirm();
			}, 1800)
		} else if (success_status == 0) {
			alert(chEnTextHtml[languageType].payErr);
		}
		dom7.style.display = 'none';
		getComditInfo()
		// self.initAddress()
	}
	const saveconfirm = () =>{
		var r= window.confirm(chEnTextHtml[languageType].asset)
		if (r==true){
			alert(chEnTextHtml[languageType].confirm);
			setTimeout(function () {
				window.location.href = 'myassets.html';
			}, 1500)
		}else{
			alert(chEnTextHtml[languageType].cancel) 
		}
	}
	const getComditInfo = async () => {
		//商品详情业加载
		const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/info?id=${id}`;
		const listData = await fetch(url, { method: 'GET' })
		const res = await listData.json();
		if (res.code == 0) {
			setbasicId(res.data.basicId);
			var content = res.data.content;
			var saleStartTimeMillis = res.data.saleStartTimeMillis; //开始销售时间
			var saleEndTimeMillis = res.data.saleEndTimeMillis; //销售结束时间
			var systemTime = res.data.systemTime; //当前时间
			var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1);
			var maxeditionnum = res.data.edition > res.data.endEdition ? res.data.endEdition : res.data.edition;
			var dom1 = document.querySelector('.detail-media');
			var dom2 = document.querySelector('.order-img');
			var dom3 = document.querySelector('.order-img img');
			var dom4 = document.querySelector('.order-title');
			var dom5 = document.querySelector('.order-price-busd');
			var dom8 = document.querySelector('.order-introduce');
			var dom9 = document.querySelector('.order-content');
			var dom10 = document.querySelector('.details-right-btn');
			var dom11 = document.querySelector('.details-right-time span:first-child');
			var dom12 = document.querySelector('.details-right-time-djs');
			var dom13 = document.querySelector('.details-right-time');
			// setselectarr(selectarr.push(res.data.edition));
			window.$selectarr = selectarr;
			setmaxbannum(res.data.endEdition);
			sethkdPrice(res.data.hkdPrice);
			setbusdPrice(res.data.busdPrice);
			setcurUserOwned(res.data.curUserOwned);
			setoneUserCountLimit(res.data.oneUserCountLimit);
			setonceCountLimit(res.data.onceCountLimit);
			if (geshi == 'mp4') {
				dom1.style.display = 'block';
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" webkit-playsinline="true" muted="muted" ></video>
					<video className="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" muted="muted"></video>`;
				dom2.innerHTML = html;
			} else {
				dom1.style.display = 'none';
				var html = `<img className="bzy-e-list-img" src="` + res.data.primaryPic + `" >
					<img className="bzy-e-list-img mohu" src="` + res.data.primaryPic + `" >`;
				dom2.innerHTML = html;
			}
			dom3.src = res.data.primaryPic;
			dom4.textContent = res.data.name;
			dom5.textContent = 'BUSD ' + moneyFormat(res.data.price);
			if(languageType == "TC"){
				dom8.innerHTML = res.data.introduce == '' ? '暫無介紹' : (res.data.introduce.replace(/;\|;/g, '<br>'));
				dom9.innerHTML = res.data.content == '' ? '暫無更多資訊' : (res.data.content.replace(/;\|;/g, '<br>'));
			}else{
				dom8.innerHTML = res.data.introduce == '' ? 'No introduction' : (res.data.introduce.replace(/;\|;/g, '<br>'));
				dom9.innerHTML = res.data.content == '' ? 'No more information' : (res.data.content.replace(/;\|;/g, '<br>'));
			}
			if (res.data.endEdition - res.data.edition >= 0) { //还有库存
				if (systemTime < saleStartTimeMillis) {
					dom10.classList.add('unclick');
					dom10.textContent = chEnTextHtml[languageType].comSoon;
					dom10.setAttribute("status","1");
					var msTime = saleStartTimeMillis - systemTime;
					var time = formatDuring(msTime);
					dom11.textContent = chEnTextHtml[languageType].start;
					dom12.textContent = time;
					setInterval(function () {
						var curTime = Date.now() + 1150;
						var msTime = saleStartTimeMillis - curTime;
						var time = formatDuring(msTime);
						dom12.textContent = time;
					}, 1000);

				} else if (systemTime >= saleStartTimeMillis && systemTime <= saleEndTimeMillis) {
					var msTime = saleEndTimeMillis - systemTime;
					var time = formatDuring(msTime);
					let ycdjs = time.split('d')[0];
					if (ycdjs > 1825) {
						dom13.style.display = 'none';
					}
					dom11.textContent = chEnTextHtml[languageType].end;
					dom12.textContent = time;
					setInterval(function () {
						var curTime = Date.now() + 1150;
						var msTime = saleEndTimeMillis - curTime;
						var time = formatDuring(msTime);
						dom12.textContent = time;
					}, 1000);
				} else if (systemTime > saleEndTimeMillis) {
					dom10.classList.add('unclick');
					dom10.textContent = chEnTextHtml[languageType].salesClosed;
					dom10.setAttribute("status","1");
					dom11.style.opacity = '0';
					dom12.textContent = chEnTextHtml[languageType].salesClosed;
				}
			} else { //没有库存
				dom10.classList.add('unclick');
				dom10.textContent = chEnTextHtml[languageType].sellOut;
				dom10.setAttribute("status","1");
				dom11.style.opacity = '0';
				dom12.textContent = chEnTextHtml[languageType].sellOut;
				dom12.style.color = '#cf3737';
				dom10.style.pointerEvents = 'none';
			}
		}
	}
	
	const getCookie = (cookieName) => {
		const strCookie = document.cookie
		const cookieList = strCookie.split('; ')
		var cookieValue;
		for(let i = 0; i < cookieList.length; i++) {
			const arr = cookieList[i].split('=')
			if (cookieName === arr[0]) {
				cookieValue = arr[1];
			}
		}
		return cookieValue;
	}
	const playVideo = (obj, e) => {
		// e.stopPropagation();
		// $(obj).siblings('video')[0].pause();
		// var src = $(obj).siblings('video')[0].src;
		// $('.video-model video').attr('src', src);
		// $('.video-model video')[0].play();
		// $('.video-mask').fadeIn('fast');
		// $('.video-model').fadeIn('fast');
	}
	const FullScreen = () => {
		var ele = document.getElementsByTagName('video')[0];
		if (ele.requestFullscreen) {
			ele.requestFullscreen();
		} else if (ele.mozRequestFullScreen) {
			ele.mozRequestFullScreen();
		} else if (ele.webkitRequestFullScreen) {
			ele.webkitRequestFullScreen();
		}
	}
	const toggleVideo = () => {
		var voiceStatus = document.getElementsByTagName('video')[0].muted
		document.getElementsByTagName('video')[0].muted = !voiceStatus
		switch (voiceStatus) {
			case true:
				document.getElementsByClassName('voice')[0].src = './assets/voice.png'
				break;
			case false:
				document.getElementsByClassName('voice')[0].src = './assets/mute.png'
				break;
		}
	}
	const changenum = (type) => {
		let str = '';
		let dom1 = document.querySelector('.busdPrice');
		let dom2 = document.querySelector('.purchase_num');
		let dom3 = document.querySelector('.selectarrnum');
		let dom4 = document.querySelector('.busd-tip');
		if (type === 1) {
			if (selectarr.length < 2) {
				alert(chEnTextHtml[languageType].least);
				return;
			} else {
				selectarr.pop();
			}
		}
		if (type === 2) {
			if (selectarr.length - 1 < maxbannum) {
				if (curUserOwned + selectarr.length >= oneUserCountLimit) {
					alert(chEnTextHtml[languageType].reached);
					return;
				}
				if (selectarr.length >= onceCountLimit) {
					alert(chEnTextHtml[languageType].limit);
					return;
				}
				selectarr.push(selectarr.length + 1);
			} else {
				if (selectarr.length === 1) {
					alert(chEnTextHtml[languageType].moment);
					return;
				} else {
					alert(chEnTextHtml[languageType].quantity);
					return;
				}
			}
		}
		selectarr.forEach((item, index) => {
			if (index !== 0) {
				str += '、';
			}
			str += item;
		})
		let pricebusdt = moneyFormat(busdPrice * selectarr.length);
		dom1.textContent = 'BUSD ' + moneyFormat(busdPrice * selectarr.length);
		dom2.textContent = selectarr.length;
		dom3.textContent = str;
		dom4.textContent = '-' + busdPrice * selectarr.length;
	}
	const formatDuring = (mss) => {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = parseInt((mss % (1000 * 60)) / 1000);
		return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	}
	const moneyFormat = (value) => { // 金额 格式化 
		if (!value && value !== 0) return '-';
		var intPart = Number(value) | 0; //获取整数部分
		var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
	 
		var floatPart = ".00"; //预定义小数部分
		var value2Array = value.toString().split(".");
	 
		//=2表示数据有小数位
		if (value2Array.length == 2) {
			floatPart = value2Array[1].toString(); //拿到小数部分
	 
			if (floatPart.length == 1) { //补0,实际上用不着
				return intPartFormat + "." + floatPart + '0';
			} else {
				return intPartFormat + "." + floatPart;
			}
		} else {
			return intPartFormat;
		}
	}
	const toPay = () => {
		let self = this;
		// if (($('.busd-tip').text() == '餘額不足' || $('.busd-tip').text() == 'Insufficient balance') || this.accountBalance < this.busdPrice * this.selectarr.length) {
		// 	$('.payment-page-right-btn button').text(this.chEnTextHtml[this.languageType].recharge);
		// 	$('#balanceBtn').attr('disabled', false)
		// }
		// $.ajax({
		// 	url: base_url + '/v2/user/account',
		// 	success: function (res) {
		// 		if (res.code == 0) {
		// 			$('.payment').fadeIn();
		// 			$('.payment').addClass('payment-active')
		// 			$('video').addClass('video-hidden');
		// 			$('.payment-page-left-img video').removeClass('video-hidden')
		// 		} else {
		// 			tips(self.chEnTextHtml[self.languageType].noLog);
		// 		}
		// 	}
		// })
	}
	const paymentClose = () => {
		// $('.payment').hide();
	}
	const togglePayMethod = (text) => {
		// this.selectedPayMethod = text
		// if (text == 1) {
		// 	$('.payment-page-right-btn').hide();
		// 	$('.order-price .order-price-hdk').show();
		// 	$('.order-price .order-price-busd').hide();
		// 	$('.payment-page-right-select').show();
		// 	$('.payment-page-right-busd').hide();
		// 	$('.payment-page-right-balance').hide()
		// 	$('.payment-page-right-btn').hide();
		// 	$('.wallet-payment-desc').hide();
		// 	$('.payment-tips').hide();
		// 	$('.payment-page-right-crypto').hide();
		// 	$('.payment-page-right-total').show();
		// };

		// if (text == 2) {
		// 	$('.payment-page-right-btn').show();
		// 	$('.payment-tips').hide();
		// 	$('.payment-page-right-crypto').hide();
		// 	$('.payment-page-right-total').show();
		// 	$('.payment-page-right-balance').show()
		// 	$('.payment-page-right-btn button').addClass('can');
		// 	if (($('.busd-tip').text() == '餘額不足' || $('.busd-tip').text() == 'Insufficient balance') || this.accountBalance < this.busdPrice * this.selectarr.length) {
		// 		$('.payment-page-right-btn button').text(this.chEnTextHtml[this.languageType].recharge);
		// 		$('#balanceBtn').attr('disabled', false)
		// 	} else {
		// 		$('.payment-page-right-btn button').text(this.chEnTextHtml[this.languageType].payment + ' >');
		// 	}
		// 	$('.order-price .order-price-hdk').hide();
		// 	$('.order-price .order-price-busd').show();
		// 	$('.payment-page-right-select').hide();
		// 	$('.payment-page-right-busd').show();
		// 	$('.wallet-payment-desc').hide();
		// }
		// if (text == 0) {
		// 	$('.payment-page-right-btn').hide();
		// 	$('.payment-tips').show();
		// 	$('.payment-page-right-crypto').show();
		// 	if (getCookie('isConnect') != 'true') {
		// 		$('#cryptoBtn').text(this.chEnTextHtml[this.languageType].walletFirst)
		// 		$('#cryptoBtn').attr('disabled', false)
		// 	} else {
		// 		$('#cryptoBtn').text(this.chEnTextHtml[this.languageType].payment + '  ->')
		// 		$('#cryptoBtn').attr('disabled', false)
		// 	}
		// 	$('.payment-page-right-balance').hide()
		// 	$('.payment-page-right-crypto button').addClass('can');
		// 	if ($('.busd-tip').text() == '餘額不足' || $('.busd-tip').text() == 'Insufficient balance') {
		// 		$('.payment-page-right-btn button').text(this.chEnTextHtml[this.languageType].recharge);
		// 	} else {
		// 		$('.payment-page-right-btn button').text(this.chEnTextHtml[this.languageType].payment + ' >');
		// 	}
		// 	$('.order-price .order-price-hdk').hide();
		// 	$('.order-price .order-price-busd').show();
		// 	$('.payment-page-right-select').hide();
		// 	$('.payment-page-right-busd').hide();
		// }
	}
	const toggleBalanceCheck = () => {
		var payButton = document.getElementById("balanceBtn");
		var cryButton = document.getElementById("cryptoBtn");
		// if ($('#saveBalance').prop('checked')) {
		// 	payButton.disabled = false;
		// 	if (getCookie('isConnect') == 'true') {
		// 		cryButton.disabled = false;
		// 	}
		// } else {
		// 	cryButton.disabled = true;
		// 	if ($('#balanceBtn').text() == '立即付款 >' || $('#balanceBtn').text() == 'Pay now >') {
		// 		payButton.disabled = true;
		// 	}
		// }
	}
	//支付
	const payBalance = () => {
		let self = this
		// var value = $('#balanceBtn').text().trim();
		// var busd = $('.order-price .order-price-busd').text().trim();
		// if (self.selectedPayMethod == 1) {
		// 	if (value == '立即付款 >' || value == 'Pay now >') {
		// 		$.ajax({
		// 			url: base_url + '/v2/order/order/pay/usdt',
		// 			type: 'POST',
		// 			contentType: 'application/json',
		// 			dataType: 'json',
		// 			data: JSON.stringify({
		// 				configCommodityId: self.id,
		// 				buyCount: self.selectarr.length,
		// 				connectStatus: getCookie('isConnect')
		// 			}),
		// 			success: function (res) {
		// 				if (res.code == 0) {
		// 					success(self.chEnTextHtml[self.languageType].paySuc, 1800);
		// 					setTimeout(function () {
		// 						$('.order-number').text(self.chEnTextHtml[self.languageType].number + res.data);
		// 						$('.payment-page-right-tit').text(self.chEnTextHtml[self.languageType].accomplish);
		// 						$('.payment-page-right-order').show();
		// 						$('.payment-page-right-pay').hide();
		// 						$('.payment-page-right-total').hide();
		// 						$('.payment-page-right-busd').hide();
		// 						$('.payment-page-right-balance').hide()
		// 						$('.payment-page-right-btn button').text(self.chEnTextHtml[self.languageType].asset);
		// 						$('.payment-page-right-order-je span').text(busd);
		// 						$('.payment-page-right-order-by span').text(self.chEnTextHtml[self.languageType].balancePayment);
		// 					}, 1800);
		// 				} else {
		// 					error(res.message, 1800);
		// 				}
		// 			}
		// 		})
		// 	} else if (value == '充值' || value == 'Add funds') {
		// 		window.location.href = 'mywallet.html?isframe=true';
		// 	} else if (value == this.chEnTextHtml[this.languageType].asset) {
		// 		window.location.href = 'myassets.html';
		// 	}
		// }
	}
	const payCrypto = () => {
		let self = this
		// if ($('#cryptoBtn').text() == '去我的資產核對' || $('#cryptoBtn').text() == 'Go to my asset to check') {
		// 	window.location.href = 'myassets.html';
		// 	return false
		// }
		// if ($('#cryptoBtn').text() == '請先連接錢包  ->' || $('#cryptoBtn').text() == 'Please connect your wallet first  ->') {
		// 	window.open('connectWallet.html');
		// 	return false
		// }
		// if ($('#cryptoBtn').text() == '立即付款  ->' || $('#cryptoBtn').text() == 'Pay now  ->') {
		// 	$.ajax({
		// 		url: base_url + '/v2/commodity/tokenLimit',
		// 		data: {
		// 			basicId: self.basicId
		// 		},
		// 		success: function (res) {
		// 			loading();
		// 			$('#cryptoBtn').attr('disabled', true)
		// 			self.tokenLimits = res.data.tokenLimit
		// 			if (getCookie('_wallet_') == 'MetaMask') {
		// 				self.authUser()
		// 			} else {
		// 				self.getOnSellToken()
		// 			}
		// 		}
		// 	})
		// }
	}
	const closeVideo = () => {
		// $('.video-mask').hide();
		// $('.video-model').hide();
		// $('#save,#savetips').click(function () {
		// 	var payButton = document.getElementById("pay-button");
		// 	if ($('#savetips').prop('checked')) {
		// 		payButton.disabled = !Frames.isCardValid();
		// 	} else {
		// 		payButton.disabled = true;
		// 	}
		// })
	}
	const opacitystyle = {
		opacity: 1
	};
	const opacitystyle2 = {
		marginBottom: '20px !important'
	};
	const opacitystyle3 = {
		color: '#FF1313',
		display: 'flex',
		alignItems: 'center',
		marginTop: '10px'
	};
	const opacitystyle4 = {
		borderBottom: 'none !important'
	};
	return (
		<div id="artDetail">
			<div className="headerpage"></div>
			<div>
				<div className="details center-80 flex">
					<div className="details-left order-img">
						<div onClick={(e) => playVideo(this, e)} className="detail-mask"></div>
						<img className="full-screen detail-media" onClick={() => FullScreen()} src="./assets/fullscreen.png" />
						<img onClick={() => toggleVideo()} className="voice detail-media" src="./assets/mute.png" />
					</div>
					<div className="details-right">
						<div className="details-right-tit order-title">----</div>
						<div className="details-right-creator flex">
							<div className="details-right-creator-img"><img src="./assets/t8.png" /></div>
							<span>@ATTA</span>
							<div className="details-right-creator-edition">{chEnTextHtml[languageType].version}</div>
						</div>
						<div className="countmoneybox">
							<p className="moneryridebox">
								{chEnTextHtml[languageType].price}
								<span className="order-price-busd">BUSD 0 </span>
							</p>
							<p className="countetcbox">
								<img src="./assets/multiply.png" alt="" />
								<span className="purchase_num">1</span>
								=
							</p>
						</div>
						<div className="details-right-price flex">
							<span className="order-price-busd busdPrice" style={opacitystyle}>BUSD 0</span>
						</div>
						<div className="details-right-btn flex payment-btn-pc" data-status="0" onClick={() => toPay()}>
							{chEnTextHtml[languageType].purchaseNow}
						</div>
						<div className="details-right-time flex">
							<span>{chEnTextHtml[languageType].saleEnds}</span>
							<span className="details-right-time-djs">01 : 05 : 32</span>
						</div>
						<div className="details-right-des order-introduce"></div>
						<div className="details-right-additional">
							<p className="details-right-additional-more none order-content"></p>
						</div>
					</div>
				</div>
				<div className="payment none">
					<div className="payment-container flex">
						<div className="payment-page flex">
							<div className="payment-page-close payment-close-pc" onClick={() => paymentClose()}><img src="./assets/Close.png" />
							</div>
							<div className="payment-page-top none flex">
								<div className="payment-page-right-tit">{chEnTextHtml[languageType].pay}</div>
								<div className="payment-close-mobile"><img src="./assets/Close.png" /></div>
							</div>
							<div className="payment-page-left">
								<div className="payment-page-left-tit order-title">----</div>
								<div className="payment-page-left-creator flex">
									<div className="details-right-creator-img"><img src="./assets/t8.png" /></div>
									<span>@ATTA</span>
									<div className="details-right-creator-edition">{chEnTextHtml[languageType].version}</div>
								</div>
								<div className="payment-page-left-img order-img"><img src="" /></div>
							</div>

							<div className="payment-page-right">
								<div className="payment-page-right-tit">{chEnTextHtml[languageType].pay}</div>
								<div className="payment-page-left-tit none payment-page-left-tit-mobile order-title">----</div>
								<div className="payment-page-left-creator none payment-page-left-creator-mobile flex">
									<div className="details-right-creator-img"><img src="./assets/t8.png" /></div>
									<span>@ATTA</span>
									<div className="details-right-creator-edition">{chEnTextHtml[languageType].version}</div>
								</div>

								<div className="payment-page-right-order none">
									<p className="order-number">Order #：<span>----</span></p>
									<p className="payment-page-right-order-tit">{chEnTextHtml[languageType].paid}</p>
									<p className="payment-page-right-order-je"><span>----</span></p>
									<p className="payment-page-right-order-by"><span>{chEnTextHtml[languageType].byCreditCard}</span></p>
									<p className="payment-page-right-order-card none">----</p>
								</div>
								<div className="payment-page-right-pay flex">
									{
										payTabs.map((item, index) => {
											return <span className="selectedPayMethod == index? 'cur':''" onClick={() => togglePayMethod(index)}>{item}</span>
										})
									}
								</div>
								<div className="payment-page-right-total">
									<p>{chEnTextHtml[languageType].pendingPayment}</p>
									<p className="order-price">
										<span className="order-price-busd none busdPrice">BUSD 0 </span>
									</p>
								</div>
								<div className="payment-page-right-select modify-ipt-fream">
									<form id="payment-form" method="POST" action="https://merchant.com/charge-card">
										<div className="payment-form-ipt">
											<div className="input-container card-number" style={opacitystyle2}>
												<div className="icon-container">
													<img id="icon-card-number" src="./assets/card-icons/card.svg" alt="PAN" />
												</div>
												<div className="card-number-frame"></div>
												<div className="icon-container payment-method">
													<img id="logo-payment-method" />
												</div>
												<div className="icon-container">
													<img id="icon-card-number-error" src="./assets/card-icons/error.svg" />
												</div>
											</div>
											<div className="date-and-code">
												<div>
													<div className="input-container expiry-date">
														<div className="icon-container">
															<img id="icon-expiry-date" src="./assets/card-icons/exp-date.svg" alt="Expiry date" />
														</div>
														<div className="expiry-date-frame"></div>
														<div className="icon-container">
															<img id="icon-expiry-date-error" src="./assets/card-icons/error.svg" />
														</div>
													</div>
												</div>
												<div>
													<div className="input-container cvv">
														<div className="icon-container">
															<img id="icon-cvv" src="./assets/card-icons/cvv.svg" alt="CVV" />
														</div>
														<div className="cvv-frame"></div>
														<div className="icon-container">
															<img id="icon-cvv-error" src="./assets/card-icons/error.svg" />
														</div>
													</div>
												</div>
											</div>
										</div>
										<p className="flex pay-save">
											<input id="save" type="checkbox" />
											<label>{chEnTextHtml[languageType].saveFor}</label>
											{/* <label for="save">{chEnTextHtml[languageType].saveFor}</label> */}
										</p>
										<div style={opacitystyle3}>
											<input id="savetips" type="checkbox" />
											<span>{chEnTextHtml[languageType].purchasing}</span>
										</div>
										<div>
											<div className="pay-button">
												<button id="pay-button" disabled="">{chEnTextHtml[languageType].payment}></button>
											</div>
											<span className="error-message error-message__card-number"></span>
											<span className="error-message error-message__expiry-date"></span>
											<span className="error-message error-message__cvv"></span>
										</div>
									</form>
								</div>
								<div className="payment-page-right-busd none">
									<div className="payment-page-right-busd-tit">{chEnTextHtml[languageType].currentUsing}</div>
									<div className="payment-page-right-busd-con">
										<span className="busd-balance">{chEnTextHtml[languageType].balance}</span>
										<span className="busd-ye">BUSD 0</span>
										<span className="busd-tip none">0</span>
									</div>
								</div>
								<div className="wallet-payment-desc none">{chEnTextHtml[languageType].notStore}</div>
								<div className="payment-page-right-balance" style={opacitystyle3}>
									<input id="saveBalance" onClick={() => toggleBalanceCheck()} type="checkbox" />
									<span>{chEnTextHtml[languageType].purchasing}</span>
								</div>
								<div className="payment-page-right-btn none" style={opacitystyle4}>
									<button id="balanceBtn" onClick={() => payBalance()} disabled="" type="button">{chEnTextHtml[languageType].payment} ></button>
								</div>
								<div className="payment-tips none">
									{chEnTextHtml[languageType].paymenttips}
								</div>
								<div className="payment-page-right-crypto none">
									<button id="cryptoBtn" onClick={() => payCrypto()} disabled="" type="button">{chEnTextHtml[languageType].payment} ></button>
									<p></p>
								</div>
							</div>
						</div>
					</div>
				</div >
				<div className="pre-mask none"></div>
			</div >
			{/* 播放视频 */}
			<div className="video-mask none"></div>
			<div className="video-model none" onClick={()=>closeVideo()}>
				<div className="video-model-container flex">
					<div>
						<img onClick={() => closeVideo()} className="video-close" src="./assets/Close.png" />
						<video autoPlay="autoplay" loop="loop" src="" controls="controls"></video>
					</div>
				</div>
			</div>
			{/* 提交成功 */}
			<div className="hsycms-model-mask" id="mask-success"></div>
			{/* <div className="hsycms-model hsycms-model-success" id="success">
				<div className="hsycms-model-icon">
					<svg width="50" height="50">
						<circle className="hsycms-alert-svgcircle" cx="25" cy="25" r="24" fill="none" stroke="#ffffff" strokeWidth="2"></circle>
						<polyline className="hsycms-alert-svggou" fill="none" stroke="#ffffff" strokeWidth="2.5" points="14,25 23,34 36,18" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className="hsycms-model-text">{chEnTextHtml[languageType].regSuc}</div>
			</div> */}
			{/* 提交失败 */}
			<div className="hsycms-model-mask" id="mask-error"></div>
			{/* <div className="hsycms-model hsycms-model-error" id="error">
				<div className="hsycms-model-icon">
					<svg width="50" height="50">
						<circle className="hsycms-alert-svgcircle" cx="25" cy="25" r="24" fill="none" stroke="#f54655" strokeWidth="2"></circle>
						<polyline className="hsycms-alert-svgca1" fill="none" stroke="#f54655" strokeWidth="2.5" points="18,17 32,35" strokeLinecap="round" strokeLinejoin="round" />
						<polyline className="hsycms-alert-svgca2" fill="none" stroke="#f54655" strokeWidth="2.5" points="18,35 32,17" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className="hsycms-model-text">{chEnTextHtml[languageType].operationFailed}</div>
			</div> */}
		</div >
	)
}
