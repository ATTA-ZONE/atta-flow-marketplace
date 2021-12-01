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
  const [showMobileMask, setShowMobileMask] = useState(false);
  const [ismobile, setIsmobile] = useState();
  const [chEnTextHtml] = useState({
    "TC": {
      home: "首頁",
      auction: "拍賣",
      COLLECTIONS: "明星藏品",
      specialTool: "無限制電競大會",
      blindbox: "盲盒",
    },
    "EN": {
      home: "HOME",
      auction: "AUCTION",
      COLLECTIONS: "COLLECTIONS",
      specialTool: "INFINITY ESPORTS TOURNAMENT",
      blindbox: "MYSTERY BOX",
    }
  })

  const handleSetShowMobileMask = () => {
    console.log(showMobileMask);
    setShowMobileMask(!showMobileMask)
  }

  const [modalIsOpen, setModalIsOpen] = useState('none');

  useEffect(() => {
    setLanguageType(getCookie("lang") ? getCookie("lang") : 'TC');
    if (window.innerWidth > 900) {
      setIsmobile(false)
    } else {
      setIsmobile(true)
    }
  }, [])

  const handleMouseOver = (e) => {
    setModalIsOpen('block')
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
        showMobileMask || !ismobile ? (<header className="header center-85 header-fixed">
        <div className="header-left">
          <a className="header-left-logo" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer"><img src="https://www.bazhuayu.io/mobile/tc/images/Brand.png" alt='' /></a>
          <img onClick={()=>handleSetShowMobileMask()} className="header-close" src="https://www.bazhuayu.io/mobile/tc/images/Close.png" alt='' />
          
          {
            !showMobileMask ? '' : (<ul className="nav-header">
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
                onMouseLeave={handleMouseOut}>
                <a className="language-tc">FLOW</a>
                <div className="flow-children" style={{ display: modalIsOpen }}>
                  <div onClick={() => history.push('/')}>Home</div>
                  <div onClick={() => history.push('./collection')}>Collections</div>
                </div>
              </li>
            </ul>)
          }

        </div>
        {
          !showMobileMask ? '' : (<div className="header-right">
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
        </div>)
        }
        
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
