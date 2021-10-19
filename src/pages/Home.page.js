import React from 'react'
import "./Home.page.css"
import useArtList from '../hooks/use-artlist.hook'
import { moneyFormat } from '../utils/utils'

export default function Home() {
  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/list?current=1&pageSize=20&channelId=1`
  const list = useArtList(url)

  const artworkText = {
    "noResult": "暫無搜索結果",
    "xdd": "徐冬冬 牛N.X潮玩 NFT限量版",
    "sellOut": "已售罄",
    "purchaseNow": "立即購買",
    "preSale": "預售",
    "salesClosed": "銷售已結束",
    "ban": "第",
    "ban2": "版",
    "bidding": "當前競價：",
    "endtime": "拍賣剩餘時間：",
    "starttime": "拍賣開始時間：",
  }
  const records = list.list?.pageResult?.records || [];
  let html = '';
  const systemTime = list.list?.systemTime;

  if (records?.length === 0) {
    html += `<li class="nothing-artwork">
					<div>暫無搜索結果</div></li>`;
  } else {
    records?.forEach(function (v, i) {
      let timeStatus = 0;
      const geshi = v.primaryPic.substr(v.primaryPic.lastIndexOf('.') + 1);

      if (v.storage - v.soldCount > 0) {   //有库存
        if (systemTime < v.saleStartTimeMillis) {
          timeStatus = 1;    //未到销售时间
        } else if (systemTime >= v.saleStartTimeMillis && systemTime <= v.saleEndTimeMillis) {
          timeStatus = 2;  //在销售时间内
        } else {
          timeStatus = 3;   //过了销售时间
        };

      } else {
        timeStatus = 0;    //没有库存
      }
      if (geshi === 'mp4') {
        html += '<li><i></i>';
        html += `<a href="${'artwork?id=' + v.id}" class="artwork-mask videoPlay" ><div class="artwork-mask-wrap"></div>`;

        html += `<img class="bzy-e-list-img" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.secondPic + `" >`;
      } else {
        html += `<li><a class="artwork-mask" href="${'artwork?id=' + v.id}"><div class="artwork-mask-wrap"></div>`;
        html += `<img class="bzy-e-list-img" src="` + (v.secondPic ? process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.secondPic : process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.primaryPic) + `" >`;
      }
      if (timeStatus === 0) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">

										<span>BUSD `+ moneyFormat(v.price) + ` </span>
									</div>`;

        html += `<div class="bzy-e-list-info-sale flex">
										<span style="color:#CF3737;">${artworkText.sellOut}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png"></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;

      } else if (timeStatus === 1) {

        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>BUSD `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `<div class="bzy-e-list-info-sale flex">
										<span>${artworkText.preSale}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;

      } else if (timeStatus === 2) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>BUSD `+ moneyFormat(v.price) + ` </span>
									</div>`;

        html += `
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;
      } else if (timeStatus === 3) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>BUSD `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `<div class="bzy-e-list-info-sale flex">
										<span>${artworkText.salesClosed}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText.purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;
      };
    });
  }

  return (
    <div className="bzy-e center-85">
      <ul dangerouslySetInnerHTML={{ __html: html }} className="bzy-e-list">
      </ul>
    </div>
  )
}
