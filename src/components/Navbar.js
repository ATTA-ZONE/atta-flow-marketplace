import React,{ useState} from 'react'
import useCurrentUser from '../hooks/use-current-user.hook'
import { useHistory } from "react-router-dom"
import { useUser } from '../providers/UserProvider'

import "./Navbar.css"

export default function Navbar() {
  const history = useHistory()
  const [user, loggedIn, tools] = useCurrentUser()
  const { balance, createFUSDVault } = useUser()
  const { collection, createCollection } = useUser()

  const [modalIsOpen,setModalIsOpen] = useState('none');

  const handleMouseOver = (e) => {
    setModalIsOpen('block')
  }

  const handleMouseOut = () => {
    setModalIsOpen('none')
  }
  return (
    <>
      <header className="header center-85 flex header-fixed">
        <div className="header-left flex">
          <a className="header-left-logo" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer"><img src="https://www.bazhuayu.io/mobile/tc/images/Brand.png" alt='' /></a>
          <ul className="nav-header flex">
            <li>
              <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/index.html" rel="noreferrer">首頁</a>
            </li>
            <li>
              <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/blindbox.html" rel="noreferrer">盲盒</a>
            </li>
            <li>
              <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/artwork.html?id=1" rel="noreferrer">明星藏品</a>
            </li>
            <li>
              <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/auctionDetails.html?id=5" rel="noreferrer">拍賣</a>
            </li>
            <li>
              <a className="language-tc" target="_blank" href="https://www.bazhuayu.io/mobile/tc/specialitem.html" rel="noreferrer">無限制電競大會</a>
            </li>
            <li className="current" onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseOut}>
              <a className="language-tc">FLOW</a>
              <div className="flow-children" style={{ display: modalIsOpen }}>
                <div onClick={() => history.push('/')}>Home</div>
                <div onClick={() => history.push('./collection')}>Collections</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="header-right flex">
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
            <span className="language-change-en">EN</span>
            <span style={{ margin: '0 16px' }}>|</span>
            <span className="language-change-ch">繁</span>
          </p>
        </div>
      </header>
    </>
  )
}
