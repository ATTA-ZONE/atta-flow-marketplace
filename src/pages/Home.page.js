import React from 'react'
import "./Home.page.css"
import useArtList from '../hooks/use-artList.hook'
import { moneyFormat, getCookie, setCookie } from '../utils/utils'

export default function Home() {
  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/list?current=1&pageSize=20&channelId=1&lang=${getCookie("lang")}`
  const list = useArtList(url)

  const lang = getCookie("lang")
  if (!lang) {
    setCookie('lang', 'TC')
  }
  const artworkText = {
    'TC': {
      "noResult": "暫無搜索結果",
      "sellOut": "已售罄",
      "purchaseNow": "立即購買",
      "preSale": "預售",
      "salesClosed": "銷售已結束"
    },
    'EN': {
      "noResults":"There is nothing here",
      "sellOut": "Sold out",
      "purchaseNow": "Purchase Now",
      "preSale": "Pre-sale",
      "salesClosed": "Sales ended"
    }
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

        html += `<video class="bzy-e-list-img" src="` + process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.primaryPic + `" ></video>`;
      } else {
        html += `<li><a class="artwork-mask" href="${'artwork?id=' + v.id}"><div class="artwork-mask-wrap"></div>`;
        html += `<img class="bzy-e-list-img" src="` + (v.secondPic ? process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.secondPic : process.env.REACT_APP_DAPPY_ARTLIST_TEST + v.secondPic) + `" >`;
      }
      if (timeStatus === 0) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;

        html += `<div class="bzy-e-list-info-sale flex">
										<span style="color:#CF3737;">${artworkText[lang].sellOut}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png"></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;

      } else if (timeStatus === 1) {

        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `<div class="bzy-e-list-info-sale flex">
										<span>${artworkText[lang].preSale}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;

      } else if (timeStatus === 2) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;

        html += `
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>`;
        html += `</div></div></a></li>`;
      } else if (timeStatus === 3) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `<div class="bzy-e-list-info-sale flex">
										<span>${artworkText[lang].salesClosed}</span>
									</div>
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" ></div>
										<span>@ATTA</span>
									</div>
									<div class="flex btnbox">
										<span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>`;
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
