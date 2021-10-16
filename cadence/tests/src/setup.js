import t from '@onflow/types'
import fcl from '@onflow/fcl'
import dotenv from 'dotenv'
import { accountAddr } from '../scripts/helper/constants.js'
// import { checkTrxSealed } from './utils'
import { user1Authz, user2Authz, user1Addr, user2Addr } from '../scripts/helper/authz'
import { buildAndExecScript, fclInit, buildAndSendTrx } from '../scripts/helper/index'

const baseURI = 'https://onflow.org/'

export const adminTest = async () =>
  describe('Contract setup test case', () => {
    beforeAll(() => {
      dotenv.config()
      return fclInit()
    })

    test('init account collection resource ', async () => {
      // check resource
      let check = await buildAndExecScript('checkNFTCollection', [fcl.arg(accountAddr, t.Address)])
      expect(check).toBe(false)

      const res = await buildAndSendTrx('initCollection', [])
      expect(res.status).toBe(4)

      check = await buildAndExecScript('checkNFTCollection', [fcl.arg(accountAddr, t.Address)])
      expect(check).toBe(true)
    })

    test('admin set base uri test', async () => {
      let uri = await buildAndExecScript('getBaseURI', [])
      expect(uri).toBe('')

      const res = await buildAndSendTrx('adminSetBaseURI', [fcl.arg(baseURI, t.String)])
      expect(res.status).toBe(4)

      uri = await buildAndExecScript('getBaseURI', [])
      expect(uri).toBe(baseURI)
    })

    test('admin set price test', async () => {
      let price = await buildAndExecScript('getMintPrice', [])
      expect(Number(price)).toBe(0)

      const res = await buildAndSendTrx('adminSetPrice', [fcl.arg('3.0', t.UFix64)])
      expect(res.status).toBe(4)

      price = await await buildAndExecScript('getMintPrice', [])
      expect(Number(price)).toBe(3)
    })

    test('admin set pause test', async () => {
      let flag = await buildAndExecScript('getIsPause', [])
      expect(flag).toBe(true)

      const res = await buildAndSendTrx('adminSetPause', [fcl.arg(false, t.Bool)])
      expect(res.status).toBe(4)

      flag = await buildAndExecScript('getIsPause', [])
      expect(flag).toBe(false)
    })

    test('admin mint nft to himself test', async () => {
      let totalSupply = await buildAndExecScript('getTotalSupply', [])
      expect(totalSupply).toBe(0)

      const res = await buildAndSendTrx('adminMinfNFT', [fcl.arg(accountAddr, t.Address)])

      expect(res.status).toBe(4)

      totalSupply = await buildAndExecScript('getTotalSupply', [])
      expect(totalSupply).toBe(1)

      const nftData = await buildAndExecScript('getNFTData', [
        fcl.arg(accountAddr, t.Address),
        fcl.arg(0, t.UInt64),
      ])
      const { id, metadata } = nftData
      expect(id).toBe(0)
      expect(metadata.test).toBe('test')
    })

    test('buy nft and withdraw vault test', async () => {
      let totalSupply = await buildAndExecScript('getTotalSupply', [])
      expect(totalSupply).toBe(1)

      let flowBal = await buildAndExecScript('getFlowBalance', [fcl.arg(accountAddr, t.Address)])

      let res = await buildAndSendTrx('buyNFT', [
        fcl.arg('5.0', t.UFix64),
        fcl.arg(accountAddr, t.Address),
      ])
      expect(res.status).toBe(4)

      let flowBalAfter = await buildAndExecScript('getFlowBalance', [
        fcl.arg(accountAddr, t.Address),
      ])

      expect(Number(flowBal)).toBe(Number(flowBalAfter) + 5)

      let vaultBal = await buildAndExecScript('getVaultBal', [])

      expect(Number(vaultBal)).toBe(5)

      totalSupply = await buildAndExecScript('getTotalSupply', [])
      expect(totalSupply).toBe(2)

      // withdraw
      const withdrawRes = await buildAndSendTrx('adminWithdrawVault', [fcl.arg('5.0', t.UFix64)])
      expect(withdrawRes.status).toBe(4)

      let balFinal = await buildAndExecScript('getFlowBalance', [fcl.arg(accountAddr, t.Address)])

      expect(Number(balFinal)).toBe(Number(flowBal))

      let vaultBalFinal = await buildAndExecScript('getVaultBal', [])
      expect(Number(vaultBalFinal)).toBe(0.0)

      let ids = await buildAndExecScript('getUserNFTIds', [fcl.arg(accountAddr, t.Address)])

      expect(ids.length).toBe(2)
    })
  })
