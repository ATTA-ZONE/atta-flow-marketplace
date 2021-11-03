import React, { createContext, useContext } from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'
import Header from '../components/Header'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser()

  if (!user || !loggedIn) return (
    <div className="app">
      <Header/>
      <div
        style={{ display: "inline-block",marginTop: '100px' }}
        className="btn btn-bg rounded"
        onClick={() => tools?.logIn()}>
        Sign In to start
      </div>
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
