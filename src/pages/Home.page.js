import React, {useState} from 'react'
import "./Home.page.css"
import useArtList from '../hooks/use-artList.hook'
import { moneyFormat, getCookie, setCookie } from '../utils/utils'

export default function Home() {
  const lang = getCookie("lang") || 'TC'
  if (!lang) {
    setCookie('lang', 'TC')
  }

  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/list?current=1&pageSize=20&channelId=1&lang=${getCookie("lang")}`
  const list = useArtList(url)

  const [artworkText] = useState({
    'TC': {
      "noResult": "暫無搜索結果",
      "sellOut": "已售罄",
      "purchaseNow": "立即購買",
      "preSale": "即将開售",
      "salesClosed": "銷售已結束",
      "bannerInfo": "TYLOO IEM EXLUSIVE NFT 系列以 IEM 大賽中 TYLOO 各個隊員的精彩擊殺集錦為內容製成，此 NFT 收集了5位战队成员的精彩擊殺瞬間，以具有品牌屬性的動態視頻為標準製成了 TYLOO IEM 賽事奪冠紀念 NFT。"
    },
    'EN': {
      "noResult":"There is nothing here",
      "sellOut": "Sold out",
      "purchaseNow": "Purchase Now",
      "preSale": "Coming soon",
      "salesClosed": "Sales ended",
      "bannerInfo": "The TYLOO IEM EXLUSIVE NFT series is made with the killings highlights of the TYLOO players in the IEM competition. To commemorate TYLOO's championship, these NFTs are unique showdown of each of the five team members' killing highlights during the tournament by integrating motion graphics with brand attributes."
    }
  })
  const records = list.list?.pageResult?.records || [];
  let html = '';
  const systemTime = list.list?.systemTime;

  if (records?.length === 0) {
    html += `<li class="nothing-artwork">
					<div>${artworkText[lang].noResult}</div></li>`;
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
        html += '<li>';
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

        html += `
									<div class="bzy-e-list-info-creator flex">
										<div><img src="https://www.bazhuayu.io/mobile/tc/images/t8.png"></div>
										<span>@ATTA</span>
                    <span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>
									</div>`;
        html += `</div></a></li>`;

      } else if (timeStatus === 1) {

        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `
									<div class="bzy-e-list-info-creator flex">
                  <div>
                    <img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" />
                    <span>@ATTA</span>
                  </div>
                  <span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].preSale}  -></span>
									</div>`;
        html += `</div></div></a></li>`;

      } else if (timeStatus === 2) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;

        html += `
									<div class="bzy-e-list-info-creator flex">
                  <div>
                    <img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" />
                    <span>@ATTA</span>
                  </div>
                  <span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>
									</div>`;
        html += `</div></div></a></li>`;
      } else if (timeStatus === 3) {
        html += `<div class="bzy-e-list-info">
									<div class="bzy-e-list-info-tit">`+ v.name + `</div>
									<div class="bzy-e-list-info-price flex">
										
										<span>FLOW `+ moneyFormat(v.price) + ` </span>
									</div>`;
        html += `
									<div class="bzy-e-list-info-creator flex">
                  <div>
                    <img src="https://www.bazhuayu.io/mobile/tc/images/t8.png" />
                    <span>@ATTA</span>
                  </div>
                  <span class="bzy-e-list-info-btn ljgmbtn">${artworkText[lang].purchaseNow}  -></span>
									</div>`;
        html += `</div></div></a></li>`;
      };
    });
  }

  return (
    <>
      <div className="flow-banner">
        <img src="./assets/banner.png" alt=''/>
        <span className='flow-banner-title'>TYLOO IEM EXCLUSIVE NFT</span>
        <div className='flow-banner-head'>{artworkText[lang].bannerInfo}</div>
      </div>
      <div className="bzy-e center-85">
        <ul dangerouslySetInnerHTML={{ __html: html }} className="bzy-e-list">
        </ul>
      </div>
    </>
  )
}
