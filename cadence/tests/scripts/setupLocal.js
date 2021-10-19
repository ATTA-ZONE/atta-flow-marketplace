import t from '@onflow/types'
import { buildAndExecScript, buildAndSendTrx, fclInit } from './helper/index.js'
import { accountAddr, network } from './helper/constants.js'
import { user1Addr, user2Addr, user1Authz, user2Authz } from './helper/authz.js'

import fcl from '@onflow/fcl'

export const mintFlowToken = async (address, amount) => {
  await buildAndSendTrx('mintFlow', [fcl.arg(address, t.Address), fcl.arg(amount, t.UFix64)])
}

export const main = async () => {
  fclInit()
  if (network === 'local') {
    // const res = await buildAndSendTrx('initFlowVault', [], user1Authz())
    // const res1 = await buildAndSendTrx('initFlowVault', [], user2Authz())

    await mintFlowToken(user1Addr, '1000.00000000')
    await mintFlowToken(user2Addr, '1000.00000000')
    const balance = await buildAndExecScript('getFlowBalance', [fcl.arg(user2Addr, t.Address)])
    console.log(balance)

    await buildAndSendTrx('initCollection', [], user1Authz())
    await buildAndSendTrx('initCollection', [], user2Authz())

  } else {
    console.error('local emulator only ')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
