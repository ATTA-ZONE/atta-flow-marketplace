import t from '@onflow/types'
import fcl from '@onflow/fcl'
import { fclInit, buildAndSendTrx, buildAndExecScript } from './helper/index.js'
import { accountAddr } from './helper/constants.js'
import { user1Addr, user2Addr, user1Authz, user2Authz } from './helper/authz.js'

const main = async () => {
  fclInit()

  // query ATTANFT total supply
  const total = await buildAndExecScript('getTotalSupply')
  console.log('total: ', total)

  // query ATTANFT base URI
  const URI = await buildAndExecScript('getBaseURI')
  console.log('URI: ', URI)

  // query ATTANFT mint price
  const price = await buildAndExecScript('getMintPrice')
  console.log('price: ', price)

  // query ATTANFT is pause
  const pauseFlag = await buildAndExecScript('getIsPause')
  console.log('pauseFlag: ', pauseFlag)

  // check user's collection
  let checkFlag = await buildAndExecScript('checkNFTCollection', [fcl.arg(accountAddr, t.Address)])
  console.log('checkFlag: ', checkFlag)

  if (!checkFlag) {
    // init user's collection resource
    const initRes = await buildAndSendTrx('initCollection')
    console.log('initRes: ', initRes)
  }

  // admin mint nft
  const mintStatus = await buildAndSendTrx('adminMinfNFT', [fcl.arg(accountAddr, t.Address)])
  console.log('mintStatus: ', mintStatus)

  // query user's nft ids

  const ids = await buildAndExecScript('getUserNFTIds', [fcl.arg(accountAddr, t.Address)])
  console.log('ids:', ids)

  // query nft data

  const nftData = await buildAndExecScript('getNFTData', [
    fcl.arg(accountAddr, t.Address),
    fcl.arg(ids[0], t.UInt64),
  ])

  const { id, metadata } = nftData
  console.log('id: ', id, ' metadata: ', metadata)

  // query contract vault balance
  const vaultBal = await buildAndExecScript('getVaultBal')
  console.log('vaultBal: ', vaultBal)

  // user query flow balance
  const beforeBal = await buildAndExecScript('getFlowBalance', [fcl.arg(accountAddr, t.Address)])
  console.log('beforeBal: ', beforeBal)

  // admin set price
  const setPriceRes = await buildAndSendTrx('adminSetPrice', [fcl.arg('5.0', t.UFix64)])
  console.log('setPriceRes: ', setPriceRes)

  // admin open contract
  const setPauseRes = await buildAndSendTrx('adminSetPause', [fcl.arg(false, t.Bool)])
  console.log('setPauseRes: ', setPauseRes)

  // user buy nft without charge
  const buyRes = await buildAndSendTrx('buyNFT', [
    fcl.arg('5.1', t.UFix64),
    fcl.arg(accountAddr, t.Address),
  ])
  console.log('buyRes: ', buyRes)

  // query user's nft ids
  const afterIds = await buildAndExecScript('getUserNFTIds', [fcl.arg(accountAddr, t.Address)])
  console.log('ids:', afterIds)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
