import React, { createContext, useContext} from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'
import Header from '../components/Header'
import { getCookie } from '../utils/utils'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();
  const lang = getCookie("lang") || 'TC';
  const stylecss = {
    marginTop: '20px',
    fontSize: '14px',
    color: '#ccc'
  }
  if (!user || !loggedIn) return (
    <div className="app">
      <Header/>
      <div
        style={{ display: "inline-block",marginTop: '100px' }}
        className="btn btn-bg rounded"
        onClick={() => tools?.logIn()}>
        Sign in with Blocto
      </div>
      {
        lang == "TC" ?
        <p style={stylecss}>对Blocto钱包不熟悉？点击 <a style={stylecss} href='https://bbzx2018.feishu.cn/docs/doccnWw7iPRq3JxQYNbaEhUDhUf'>URL</a> 了解。</p>
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
