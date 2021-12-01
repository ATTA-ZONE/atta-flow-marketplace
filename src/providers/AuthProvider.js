import React, { createContext, useContext } from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'
import { getCookie } from '../utils/utils'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();
  const lang = getCookie("lang") || 'TC';
  const stylecss = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#9567ff'
  }
  if (!user || !loggedIn) return (
    <div className="app">
      <div>
        <img src='https://www.bazhuayu.io/mobile/tc/images/Brand.png' style={{ paddingTop: '140px' }} width="200px" alt="Dappy" />
      </div>
      <div
        style={{ display: "inline-block", marginTop: '100px' }}
        className="btn btn-bg rounded"
        onClick={() => tools?.logIn()}>
        Sign in with Blocto
      </div>
      {
        lang == "TC" ?
          <p style={stylecss}>對Blocto錢包不熟悉？點擊 <a style={stylecss} href='https://bbzx2018.feishu.cn/docs/doccnWw7iPRq3JxQYNbaEhUDhUf'>這裡</a> 了解。</p>
          :
          <p style={stylecss}>Unfamiliar with Blocto? Click <a style={stylecss} href='https://bbzx2018.feishu.cn/docs/doccnWw7iPRq3JxQYNbaEhUDhUf'>here</a> to know more.</p>
      }
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
