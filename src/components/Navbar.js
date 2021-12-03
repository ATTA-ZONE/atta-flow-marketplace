import React, { useState, useEffect } from 'react'
import useCurrentUser from '../hooks/use-current-user.hook'
import { useHistory } from "react-router-dom"
import { useUser } from '../providers/UserProvider'
import { setCookie, getCookie } from '../utils/utils'

import "./Navbar.css"

export default function Navbar() {
  const history = useHistory()
  const [user, loggedIn, tools] = useCurrentUser()
  const { balance, createFUSDVault } = useUser()
  const { collection, createCollection } = useUser()
  const [languageType, setLanguageType] = useState('TC');
  const [showmobilemask, setShowmobilemask] = useState(false);
  const [ismobile, setIsmobile] = useState();
  const [ishidedom, setIshidedom] = useState(false);
  const [chEnTextHtml] = useState({
    "TC": {
      home: "首頁",
      auction: "拍賣",
      COLLECTIONS: "明星藏品",
      specialTool: "無限制電競大會",
      blindbox: "盲盒",
      flow: "Flow NFT",
      flownft: "天禄战队NFT",
      Collections : "我的Flow藏品"
    },
    "EN": {
      home: "HOME",
      auction: "AUCTION",
      COLLECTIONS: "COLLECTIONS",
      specialTool: "INFINITY ESPORTS TOURNAMENT",
      blindbox: "MYSTERY BOX",
      flow: "Flow NFT",
      flownft: "Tyloo NFTs",
      Collections : "My Flow Collections"
    }
  })

  const handleSetShowMobileMask = () => {
    setShowmobilemask(!showmobilemask);
  }

  const [modalIsOpen, setModalIsOpen] = useState('none');

  useEffect(()=>{
    setLanguageType(getCookie("lang") ? getCookie("lang") : 'TC');
    fyfun();
  })

  window.addEventListener('resize',()=>{
    fyfun();
  })
  const fyfun = () =>{
    if (window.innerWidth > 900) {
      setIsmobile(false) 
    } else {
      setIsmobile(true)
    }
    setShowmobilemask(false) 
  }
  const handleMouseOver = (e) => {
    setModalIsOpen('block')
    if (window.innerWidth > 900) {
      setIshidedom(false);
    }else{
      setIshidedom(true);
    }
    console.log(ishidedom);
  }

  const handleMouseOut = () => {
    setModalIsOpen('none')
  }

  const changeLang = (str) => {
    setCookie('lang', str)
    window.location.reload()
  }

  return (
    <>
      {
        showmobilemask || !ismobile ? (<header className="header center-85 header-fixed">
        <div className="header-left">
          <a className="header-left-logo" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer"><img src="https://www.bazhuayu.io/mobile/tc/images/Brand.png" alt='' /></a>
          <img onClick={()=>handleSetShowMobileMask()} className="header-close" src="https://www.bazhuayu.io/mobile/tc/images/Close.png" alt='' />
          
          <ul className="nav-header">
              <li>
                <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer">{chEnTextHtml[languageType].home}</a>
              </li>
              <li>
                <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/blindbox.html" rel="noreferrer">{chEnTextHtml[languageType].blindbox}</a>
              </li>
              <li>
                <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/artwork.html?id=1" rel="noreferrer">{chEnTextHtml[languageType].COLLECTIONS}</a>
              </li>
              <li>
                <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/auctionDetails.html?id=5" rel="noreferrer">{chEnTextHtml[languageType].auction}</a>
              </li>
              <li>
                <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/specialitem.html" rel="noreferrer">{chEnTextHtml[languageType].specialTool}</a>
              </li>
              <li className="current" onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseOut} style={{height : ishidedom ? '100px' : 'auto'}}>
                <a className="language-tc">{chEnTextHtml[languageType].flow}</a>
                <div className="flow-children" style={{ display: modalIsOpen }}>
                  <div onClick={() => history.push('/')}>{chEnTextHtml[languageType].flownft}</div>
                  <div onClick={() => history.push('./collection')}>{chEnTextHtml[languageType].Collections}</div>
                </div>
              </li>
            </ul>
        </div>
        <div className="header-right">
          {!user || !loggedIn ? (<div className="header-dl flex"><span className="header-right-login flex" onClick={() => tools?.logIn()}>登入</span></div>) : ''}
          <div className="wallet__item">
            👛 {user?.addr}
          </div>
          {!collection ?
            <div className="wallet__item" onClick={() => createCollection()}>⚠️ Enable Collection</div> : <></>
          }
          {!balance ?
            <div className="btn btn-small" onClick={() => createFUSDVault()}>
              ⚠️ Enable FLOW
            </div>
            :
            <div className="wallet__item">
              💰 FLOW: {balance.slice(0, -6)}
            </div>
          }

          <p className="switchlanguagebox">
            <a onClick={() => changeLang('EN')} className="language-change-en">EN</a>
            <span style={{ margin: '0 16px' }}>|</span>
            <a onClick={() => changeLang('TC')} className="language-change-ch">繁</a>
          </p>
        </div>
      </header>):(
        <div className="mobile-head">
          <a className="mobile-head-logo" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer"><img src="https://www.bazhuayu.io/mobile/tc/images/Brand.png" alt='' /></a>
          <img onClick={()=>handleSetShowMobileMask()} className="header-close" src="https://www.bazhuayu.io/mobile/tc/images/menu.png" alt='' />
        </div>
      )
      }
    </>
  )
}
