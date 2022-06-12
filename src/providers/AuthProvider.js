import React, { createContext, useContext } from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'
import { getCookie, setCookie } from '../utils/utils'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();
  const lang = getCookie("lang") || 'TC';

  const changeLang = (str) => {
    setCookie('lang', str)
    window.location.reload()
  }

  if (!user || !loggedIn) return (
    <div className="app">
      <div>
        <img src='https://www.bazhuayu.io/mobile/tc/images/Brand.png' style={{ paddingTop: '140px' }} width="200px" alt="Dappy" />
      </div>
      <div
        style={{ display: "inline-block", marginTop: '100px', marginBottom: '20px' }}
        className="btn btn-bg rounded"
        onClick={() => tools?.logIn()}>
        Sign in with Blocto
      </div>
      {
        lang == "TC" ?
          <p style={{ fontSize: '14px' }}>對Blocto錢包不熟悉？點擊 <a style={{ color: '#9567ff' }} href='https://bbzx2018.feishu.cn/docs/doccnWw7iPRq3JxQYNbaEhUDhUf'>這裡</a> 了解。</p>
          :
          <p style={{ fontSize: '14px' }}>Unfamiliar with Blocto? Click <a style={{ color: '#9567ff' }} href='https://bbzx2018.feishu.cn/docs/doccnWw7iPRq3JxQYNbaEhUDhUf'>here</a> to know more.</p>
      }
      <p style={{fontWeight: 600,
    fontSize: '14px',marginTop:'30px'}}>
        <a onClick={() => changeLang('EN')} className="language-change-en">EN</a>
        <span style={{ margin: '0 16px' }}>|</span>
        <a onClick={() => changeLang('TC')} className="language-change-ch">中文</a>
      </p>
    </div>
  )

  return (
    <AuthContext.Provider value={{
      user,
      loggedIn,
      ...tools
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
