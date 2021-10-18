import React ,{ useState } from 'react'
import DappyList from '../components/DappyList'
import Header from '../components/Header'
import { useUser } from '../providers/UserProvider'
import "./Artwork.page.css"

export default function Artwork() {
	const { collection, createCollection, deleteCollection, userDappies } = useUser()
	const [languageType] = useState('TC');
	const [payTabs] = useState(['錢包支付']);
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
			version: "第1版，共150版",
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
			version: "Edition 1 of 150",
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
		maxbannum: 0,
		busdPrice: 0,
		selectarr: [],
		accountBalance: 0,
		hkdPrice: 0,
		curUserOwned: 0,
		oneUserCountLimit: 0,
		onceCountLimit: 0,
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
		let self = this
		let str = '';
		if (type == 1) {
			if (self.selectarr.length < 2) {
				// tips(this.chEnTextHtml[this.languageType].least);
			} else {
				self.selectarr.pop();
			}
		}
		if (type == 2) {
			if (self.selectarr[self.selectarr.length - 1] < self.maxbannum) {
				if (self.curUserOwned + self.selectarr.length >= self.oneUserCountLimit) {
					// tips(this.chEnTextHtml[this.languageType].reached);
					return;
				}
				if (self.selectarr.length >= self.onceCountLimit) {
					// tips(this.chEnTextHtml[this.languageType].limit);
					return;
				}
				self.selectarr.push(self.selectarr[self.selectarr.length - 1] + 1);
			} else {
				if (self.selectarr.length == 1) {
					// tips(this.chEnTextHtml[this.languageType].moment);
				} else {
					// tips(this.chEnTextHtml[this.languageType].quantity);
				}
			}
		}
		self.selectarr.forEach((item, index) => {
			if (index != 0) {
				str += '、';
			}
			str += item;
		})
		// $('.busdPrice').text('BUSD ' + moneyFormat(self.busdPrice * self.selectarr.length));
		// $(".purchase_num").text(self.selectarr.length);
		// $('.selectarrnum').text(str);
		// $('.busd-tip').text('-' + self.busdPrice * self.selectarr.length);
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
						<div onClick={(e) => this.playVideo(this, e)} className="detail-mask"></div><img className="full-screen detail-media"
							onClick={() => this.FullScreen()} src="./assets/fullscreen.png" /><img onClick={() => this.toggleVideo()} className="voice detail-media"
								src="./assets/mute.png" />
					</div>
					<div className="details-right">
						<div className="details-right-tit order-title">----</div>
						<div className="details-right-creator flex">
							<div className="details-right-creator-img"><img src="./assets/t8.png" /></div>
							<span>@ATTA</span>
							<div className="details-right-creator-edition">{chEnTextHtml[languageType].version}</div>
						</div>
						<div className="checknumbox">
							<div className="purchasenumbox">
								<button onClick={() => this.changenum(1)}><img src="./assets/jian.png" alt="" /></button>
								<span className="purchase_num">1</span>
								<button onClick={() => this.changenum(2)}><img src="./assets/jia.png" alt="" /></button>
							</div>
							<p className="selectnumbox">
								{chEnTextHtml[languageType].select}
								<span className="selectarrnum">1</span>
								{chEnTextHtml[languageType].versionTxt}
							</p>
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
						<div className="details-right-btn flex payment-btn-pc" data-status="0" onClick={() => this.toPay()}>
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
							<div className="payment-page-close payment-close-pc" onClick={() => this.paymentClose()}><img src="./assets/Close.png" />
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
											return <span className="selectedPayMethod == index? 'cur':''" onClick={() => this.togglePayMethod(index)}>{item}</span>
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
									<input id="saveBalance" onClick={() => this.toggleBalanceCheck()} type="checkbox" />
									<span>{chEnTextHtml[languageType].purchasing}</span>
								</div>
								<div className="payment-page-right-btn none" style={opacitystyle4}>
									<button id="balanceBtn" onClick={() => this.payBalance()} disabled="" type="button">{chEnTextHtml[languageType].payment} ></button>
								</div>
								<div className="payment-tips none">
									{chEnTextHtml[languageType].paymenttips}
								</div>
								<div className="payment-page-right-crypto none">
									<button id="cryptoBtn" onClick={() => this.payCrypto()} disabled="" type="button">{chEnTextHtml[languageType].payment} ></button>
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
			<div className="video-model none" onClick={()=>this.closeVideo()}>
				<div className="video-model-container flex">
					<div>
						<img onClick={() => this.closeVideo()} className="video-close" src="./assets/Close.png" />
						<video autoPlay="autoplay" loop="loop" src="" controls="controls"></video>
					</div>
				</div>
			</div>
			{/* 提交成功 */}
			<div className="hsycms-model-mask" id="mask-success"></div>
			<div className="hsycms-model hsycms-model-success" id="success">
				<div className="hsycms-model-icon">
					<svg width="50" height="50">
						<circle className="hsycms-alert-svgcircle" cx="25" cy="25" r="24" fill="none" stroke="#ffffff" strokeWidth="2"></circle>
						<polyline className="hsycms-alert-svggou" fill="none" stroke="#ffffff" strokeWidth="2.5" points="14,25 23,34 36,18" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className="hsycms-model-text">{chEnTextHtml[languageType].regSuc}</div>
			</div>
			{/* 提交失败 */}
			<div className="hsycms-model-mask" id="mask-error"></div>
			<div className="hsycms-model hsycms-model-error" id="error">
				<div className="hsycms-model-icon">
					<svg width="50" height="50">
						<circle className="hsycms-alert-svgcircle" cx="25" cy="25" r="24" fill="none" stroke="#f54655" strokeWidth="2"></circle>
						<polyline className="hsycms-alert-svgca1" fill="none" stroke="#f54655" strokeWidth="2.5" points="18,17 32,35" strokeLinecap="round" strokeLinejoin="round" />
						<polyline className="hsycms-alert-svgca2" fill="none" stroke="#f54655" strokeWidth="2.5" points="18,35 32,17" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className="hsycms-model-text">{chEnTextHtml[languageType].operationFailed}</div>
			</div>
		</div >
	)
}
