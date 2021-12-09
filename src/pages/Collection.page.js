import { useState} from 'react'
import "./Collection.page.css"
import useFlowList from '../hooks/use-flowList.hook'
import * as chEnTextHtml from './lang.js'
import { getCookie } from '../utils/utils'
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

  const [chText] = useState({
    'TC': {
      "noResult": "您尚未獲得任何藏品。"
    },
    'EN': {
      "noResult":"You don't have any NFTs yet."
    }
  })
  
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

  const toggleVideoMute = (e) => {
    e.target.style.display='none'
    e.target.parentNode.children[0].style.display='block'
    const video = e.target.parentNode.children[2]
    video.play()
    video.muted=false
  }
  const closeVideo = (e) => {
    e.target.style.display='none'
    e.target.parentNode.children[1].style.display='block'
    const video = e.target.parentNode.children[2]
    video.pause()
    video.muted=true
  }

  const getFormat = (item) => {
    return item.primaryPic.substr(item.primaryPic.lastIndexOf('.') + 1)
  }

  return (
    <>
      {!collection || flowList.list?.pageResult?.records.length < 1 ? (<div className="noResultTip">{chText[lang].noResult}</div>) :
        (<div className="my-assets">
          <ul className="flows-wrap">
            {flowList.list?.pageResult?.records?.map(item => <li key={item.name}>
              <div className="mobilflex">
                {
                  getFormat(item) === 'mp4' ? (<div className="my-assets-left">
                    <img className="collect-voice" onClick={(e)=>closeVideo(e)} src="https://bazhuayu.io/mobile/tc/images/videoEnd.png"/>
                    <img className="collect-voice" onClick={(e)=>toggleVideoMute(e)} src="https://bazhuayu.io/mobile/tc/images/videoPlay.png"/>
                    <video style={{ width: "100%" }} loop="loop" src={formatUrl(item.primaryPic)} muted="muted"></video>
                    <video className="mohu" style={{ width: "100%" }} loop="loop" src={formatUrl(item.primaryPic)}
                      muted="muted"></video>
                  </div>) : (
                    <div className="my-assets-left">
                      <img src={formatUrl(item.primaryPic)} alt='' />
                      <img className="mohu" src={formatUrl(item.primaryPic)} alt='' />
                    </div>
                  )}
                <div className="my-assets-right">
                  <div className="my-assets-right-tit">{item.name}</div>
                  <div className="my-assets-right-creator flex">
                    <div className="details-right-creator-img"><img src="./assets/t8.png" alt='' /></div>
                    <span>@ATTA</span>
                    <div className="my-assets-right-creator-edition">{context[lang].quantity + ': ' + item.totalTokenList.length}</div>
                  </div>
                  <div className="details-right-des-tit">{context[lang].productdescription}</div>
                  {item.introduce ? (<div className="details-right-des" >{item.introduce}</div>) : (<div className="details-right-des">{context[lang].nointroduction}</div>)}
                  {/* <div className="my-assets-right-price">
                  <div className="flex my-assets-right-download"><a className="flex download" onClick={()=>fetchMedia(process.env.REACT_APP_DAPPY_ARTLIST_TEST + item.attachment)}>{context[lang].downloadFile}</a></div>
                </div> */}
                </div>
              </div>
            </li>)}
          </ul>
        </div>)}
    </>
  )
}
