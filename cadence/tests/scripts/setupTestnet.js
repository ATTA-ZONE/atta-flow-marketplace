import t from '@onflow/types'
import { buildAndExecScript, buildAndSendTrx, fclInit } from './helper/index.js'
import { accountAddr, network } from './helper/constants.js'
import { user1Addr, user2Addr, user1Authz, user2Authz } from './helper/authz.js'

import fcl from '@onflow/fcl'


export const main = async () => {
  fclInit()
   // query ATTANFT total supply
   const res = await buildAndExecScript('getUserNFTs', [fcl.arg('0xf8d6e0586b0a20c7', t.Address)])
   console.log('total: ', res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
