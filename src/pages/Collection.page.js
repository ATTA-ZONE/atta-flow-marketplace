import "./Collection.page.css"
import Header from '../components/Header'
import useFlowList from '../hooks/use-flowList.hook'
import * as chEnTextHtml from './lang.js'
import { getIntroduce, getCookie } from '../utils/utils'
import { useUser } from '../providers/UserProvider'

export default function Collection() {
  const { collection } = useUser()
  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/v2/flow/commodity/getFlowNFTInfo`
  const context = chEnTextHtml.chEnTextHtml
  const lang = getCookie("lang") || 'TC'

  const flowList = useFlowList(url)

  const formatUrl = (str) => {
    return process.env.REACT_APP_DAPPY_ARTLIST_TEST + str
  }

  const fetchMedia = (url) => {
    fetch(url).then((res) => {
      res.blob().then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const filename = url;
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      });
    });
  }

  const getFormat = (item) => {
    return item.primaryPic.substr(item.primaryPic.lastIndexOf('.') + 1)
  }

  return (
    <>
      <Header
        title={<>My<span className="highlight">Dappies</span></>}
        subtitle={<>Here are the <span className="highlight">Dappies and Packs</span> you have collected</>}
      />
      {!collection? '':
      (<div className="my-assets">
        <ul className="flows-wrap">
          {flowList.list?.pageResult?.records?.map(item => <li key={item.name}>
            <div className="flex between mobilflex">
              <>
                {
                  getFormat(item) === 'mp4' ? (<div className="my-assets-left">
                    <video style={{ width: "100%" }} autoPlay="autoplay" loop="loop" src={formatUrl(item.primaryPic)} muted="muted"></video>
                    <video className="mohu" style={{ width: "100%" }} autoPlay="autoplay" loop="loop" src={formatUrl(item.primaryPic)}
                      muted="muted"></video>
                  </div>) : (
                    <div className="my-assets-left">
                      <img src={formatUrl(item.primaryPic)} alt='' />
                      <img className="mohu" src={formatUrl(item.primaryPic)} alt='' />
                    </div>
                  )}
              </>
              <div className="my-assets-right">
                <div className="my-assets-right-tit">{item.name}</div>
                <div className="my-assets-right-creator flex">
                  <div className="details-right-creator-img"><img src="./images/t8.png" alt='' /></div>
                  <span>@ATTA</span>
                  <div className="my-assets-right-creator-edition">{context[lang].quantity + ': ' + item.totalTokenList.length}</div>
                </div>
                <div className="details-right-des-tit">{context[lang].productdescription}</div>
                <div className="details-right-des" v-html="getIntroduce(item,'desc',context[lang].nointroduction)">
                </div>
                <div className="details-right-additional">
                  <p className="details-right-additional-more order-content" dangerouslySetInnerHTML={{ __html: getIntroduce(item, 'detail', context[lang].noinformation) }}>
                  </p>
                </div>
                <div className="my-assets-right-price">
                  <div className="flex my-assets-right-download"><a className="flex download" onClick={()=>fetchMedia(process.env.REACT_APP_DAPPY_ARTLIST_TEST + item.attachment)}>{context[lang].downloadFile}</a></div>
                </div>
              </div>
            </div>
          </li>)}
        </ul>
      </div>)}
    </>
  )
}
