import React ,{ useEffect,useState} from 'react'
import DappyList from '../components/DappyList'
import Header from '../components/Header'
import { useAuth } from '../providers/AuthProvider'
import { useUser } from '../providers/UserProvider'
import "./Artwork.page.css"

export default function Artwork() {
	const { user } = useAuth()
	const { userDappies, mintDappy ,balance} = useUser()
	const [languageType,setLanguageType] = useState('TC');
	const [payTabs,setPayTabs] = useState(['錢包支付']);
	const [maxbannum,setmaxbannum] = useState(0);
	const [curUserOwned,setcurUserOwned] = useState(0);
	const [oneUserCountLimit,setoneUserCountLimit] = useState(0);
	const [onceCountLimit,setonceCountLimit] = useState(0);
	const [busdPrice,setBusdPrice] = useState(0);
	const [id,setid] = useState("");
	const [prev,setprev] = useState(-1);
	const [success_status,setsuccess_status] = useState(-1);
	const [basicId,setBasicId] = useState(0);
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
			version: "共100版",
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
	useEffect (()=>{
		setLanguageType(getCookie("lang")?getCookie("lang"):'TC');
		if(languageType == "TC"){
			setPayTabs(['錢包支付'])
		}else{
			setPayTabs(['Crypto wallet'])
		}
		initMediaCss();
			
	},[id])
	const initMediaCss = () => {
		var dom = document.body;
		let dom2 = document.querySelector('.details-right-btn');
		// let dom3 = document.querySelector('.payment-close-mobile');
		let dom4 = document.querySelector('.payment');
		let dom5 = document.querySelector('video');
		let dom6 = document.querySelector('.pre-mask');
		// let dom7 = document.querySelector('.payment-page-right-balance');
		var mobile_width = dom.style.width;
		if (mobile_width <= 992) {
			dom2.classList.remove("payment-btn-pc");
			dom2.classList.add("payment-btn-mobile");
			// dom3.onclick = function () {
			// 	dom4.classList.remove("payment-active");
			// 	dom5.classList.remove("video-hidden");
			// }
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
		// dom7.style.display = 'none';
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
		if (!id) {return;}
		const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/info?id=${id}&forceLang=${languageType}`;
		const listData = await fetch(url, { method: 'GET' })
		const res = await listData.json();
		if (res.code == 0) {
			var saleStartTimeMillis = res.data.saleStartTimeMillis; //开始销售时间
			var saleEndTimeMillis = res.data.saleEndTimeMillis; //销售结束时间
			var systemTime = res.data.systemTime; //当前时间
			var geshi = res.data.primaryPic.substr(res.data.primaryPic.lastIndexOf('.') + 1);

			var dom1 = document.querySelector('.detail-media');
			var dom2 = document.querySelector('.order-img');
			var dom4 = document.querySelector('.order-title');
			var dom5 = document.querySelector('.order-price-busd');
			var dom8 = document.querySelector('.order-introduce');
			var dom9 = document.querySelector('.order-content');
			var dom10 = document.querySelector('.details-right-btn');
			var dom11 = document.querySelector('.details-right-time span:first-child');
			var dom12 = document.querySelector('.details-right-time-djs');
			var dom13 = document.querySelector('.details-right-time');
			setBusdPrice(res.data.price);
			setBasicId(res.data.basicId);
			if (geshi == 'mp4') {
				dom1.style.display = 'block';
				var html = `<video style="width:100%;" autoplay="autoplay" loop="loop" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" webkit-playsinline="true" muted="muted" ></video>
					<video class="mohu" style="width:100%;" autoplay="autoplay" loop="loop" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" muted="muted"></video>`;
				dom2.insertAdjacentHTML('beforeend',html);
			} else {
				dom1.style.display = 'none';
				var html = `<img class="bzy-e-list-img" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" >
					<img class="bzy-e-list-img mohu" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + res.data.primaryPic + `" >`;
				dom2.insertAdjacentHTML('beforeend',html);
			}
			dom4.textContent = res.data.name;
			dom5.textContent = 'FLOW ' + moneyFormat(res.data.price);
			if(languageType == "TC"){
				dom8.innerHTML = res.data.introduce == '' ? '暫無介紹' : (res.data.introduce.replace(/;\|;/g, '<br>'));
				dom9.innerHTML = res.data.content == '' ? '暫無更多資訊' : (res.data.content.replace(/;\|;/g, '<br>'));
			}else{
				dom8.innerHTML = res.data.introduce == '' ? 'No introduction' : (res.data.introduce.replace(/;\|;/g, '<br>'));
				dom9.innerHTML = res.data.content == '' ? 'No more information' : (res.data.content.replace(/;\|;/g, '<br>'));
			}
			if (res.data.storage - res.data.soldCount > 0) { //还有库存
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
					dom10.classList.remove('unclick');
					dom10.textContent = chEnTextHtml[languageType].purchaseNow;
					dom10.style.pointerEvents = 'auto';
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
					dom12.style.color = '#cf3737';
					dom10.style.pointerEvents = 'none';
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
		e.stopPropagation();
		document.getElementsByTagName('video')[0].pause();
		var src = document.getElementsByTagName('video')[0].src;
		var dom1 = document.querySelector('.video-model video');
		dom1.src = src;
		document.getElementsByTagName('video')[0].play();
		var dom2 = document.querySelector('.video-mask');
		var dom3 = document.querySelector('.video-model');
		dom2.style.display = 'block';
		dom3.style.display = 'block';
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
	const toPay = async () => {
		let busdPriceprice = busdPrice.toFixed(2);
		if (balance * 1< busdPriceprice * 1) {
			alert('餘額不足');
			return;
		}
		const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/checkItemStatus?commodityId=${id}`;
		const listData = await fetch(url, { method: 'GET' })
		const res = await listData.json();
		var dom1 = document.querySelector('.details-right-btn');
		dom1.textContent = '購買中，請稍等';
		dom1.classList.add('unclick');
		dom1.style.pointerEvents = 'none';
		if (res.code == 0) {
			let address = user?.addr;
			mintDappy(busdPriceprice, address,basicId,getComditInfo);
		}else{
			alert(res.message);
			getComditInfo();
		}
	}
	const closeVideo = () => {
		var dom1 = document.querySelector('.video-mask');
		var dom2 = document.querySelector('.video-model');
		dom1.style.display = 'none';
		dom2.style.display = 'none';
	}
	const opacitystyle = {
		opacity: 1
	};
	return (
		<div id="artDetail">
			<div className="headerpage"></div>
			<div>
				<div className="details center-80 flex">
					<div className="details-left order-img">
						<div onClick={(e) => playVideo(this, e)} className="detail-mask"></div>
						<img className="full-screen detail-media" onClick={() => FullScreen()} src="./assets/fullscreen.png" alt='' />
						<img onClick={() => toggleVideo()} className="voice detail-media" src="./assets/mute.png" alt='' />
					</div>
					<div className="details-right">
						<div className="details-right-tit order-title">----</div>
						<div className="details-right-creator flex">
							<div className="details-right-creator-img"><img src="./assets/t8.png" /></div>
							<span>@ATTA</span>
							<div className="details-right-creator-edition">{chEnTextHtml[languageType].version}</div>
						</div>
						<div className="details-right-price flex">
							<span className="order-price-busd busdPrice" style={opacitystyle}>FLOW 0</span>
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
			{/* 提交失败 */}
			<div className="hsycms-model-mask" id="mask-error"></div>
		</div >
	)
}
