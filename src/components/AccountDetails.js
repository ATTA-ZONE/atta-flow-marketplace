import React from 'react'

import { useAuth } from '../providers/AuthProvider'
import { useUser } from '../providers/UserProvider'
import './AccountDetails.css'

export default function Wallet() {
  const { user, logOut } = useAuth()
  const { balance, createFUSDVault } = useUser()

  return (
    <div className="wallet__popup">
      <div className="wallet__item">
        👛 {user?.addr}
      </div>
      {!balance ?
        <div className="btn btn-small" onClick={() => createFUSDVault()}>
          ⚠️ Enable FLOW
        </div>
        :
        <div className="wallet__item">
          💰 FLOW: {balance.slice(0, -6)} <a style={{ color: "white" }} href="https://youtu.be/q8vcEGe95js">(Get FLOW)</a>
        </div>
      }
      <div className="btn btn-small" onClick={() => logOut()}>👋 Logout</div>
    </div>
  )
}
