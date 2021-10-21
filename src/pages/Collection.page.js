import React from 'react'
import Header from '../components/Header'
import useFlowList from '../hooks/use-flowList.hook'
import * as chEnTextHtml from './lang.js'
import { getIntroduce } from '../utils/utils'
import useCollections from '../hooks/use-flow-coolections.hooks'

export default function Collection() {
  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/getFlowNFTInfo`

  const postData = {
    current: 1,
    pageSize: 20,
    lang: 'TC',
    tokenIds: []
  }
  const context = chEnTextHtml.chEnTextHtml
  const lang = 'TC'
  //const flowList = useFlowList(url, postData)

  const data = useCollections()
  console.log(data,'=-===');
  const flowList = []
  const getFormat = (item) => {
    return item.primaryPic.substr(item.primaryPic.lastIndexOf('.') + 1)
  }

  return (
    <>
      <Header
        title={<>My<span className="highlight">Dappies</span></>}
        subtitle={<>Here are the <span className="highlight">Dappies and Packs</span> you have collected</>}
      />

      <ul>
        {flowList?.map(item => <li>
          <div className="flex between mobilflex">
            <>
              {
                getFormat(item) === 'mp4' ? (<div class="my-assets-left">
                  <video style={{ width: "100%" }} autoplay="autoplay" loop="loop" src={item.primaryPic} muted="muted"></video>
                  <video class="mohu" style={{ width: "100%" }} autoplay="autoplay" loop="loop" src={item.primaryPic}
                    muted="muted"></video>
                </div>) : (
                  <div class="my-assets-left">
                    <img src={item.primaryPic} alt='' />
                    <img class="mohu" src={item.primaryPic} alt='' />
                  </div>
                )}
            </>
            <div class="my-assets-right">
              <div class="my-assets-right-tit">{item.name}</div>
              <div class="my-assets-right-creator flex">
                <div class="details-right-creator-img"><img src="./images/t8.png" alt='' /></div>
                <span>@ATTA</span>
                <div class="my-assets-right-creator-edition">{context[lang].common + item.endEdition + context[lang].ban}</div>
              </div>
              <div class="details-right-des-tit">{context[lang].productdescription}</div>
              <div class="details-right-des" v-html="getIntroduce(item,'desc',context[lang].nointroduction)">
              </div>
              <div class="details-right-additional">
                <p class="details-right-additional-more order-content" dangerouslySetInnerHTML={{ __html: getIntroduce(item, 'detail', context[lang].noinformation) }}>
                </p>
              </div>
              <div class="my-assets-right-price">
              </div>

            </div>
          </div>
        </li>)}
      </ul>
    </>
  )
}
