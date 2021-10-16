import t from '@onflow/types'
import fcl from '@onflow/fcl'

import dotenv from 'dotenv'
import { accountAddr, network } from '../scripts/helper/constants.js'
import { sleep } from '../scripts/helper/index.js'
import { user1Authz, user2Authz, user1Addr, user2Addr } from '../scripts/helper/authz'
import { buildAndExecScript, fclInit, buildAndSendTrx } from '../scripts/helper/index'

// user test case ,must init env with run node scripts/setupEnv.js first
export const useCase = async () =>
  describe('user test cases', () => {
    beforeAll(() => {
      dotenv.config()
      return fclInit()
    })

    test('user set use admin funcs failed', async () => {
      const setBaseURI = await buildAndSendTrx(
        'adminSetBaseURI',
        [fcl.arg('test', t.String)],
        user1Authz(),
      )
      expect(setBaseURI).toBeNull()

      const setPrice = await buildAndSendTrx(
        'adminSetPrice',
        [fcl.arg('test', t.String)],
        user1Authz(),
      )
      expect(setPrice).toBeNull()

      const setPause = await buildAndSendTrx(
        'adminSetPause',
        [fcl.arg(false, t.Bool)],
        user1Authz(),
      )
      expect(setPause).toBeNull()

      const mintRes = await buildAndSendTrx(
        'adminMinfNFT',
        [fcl.arg(accountAddr, t.Address)],
        user1Authz(),
      )
      expect(mintRes).toBeNull()
    })

    test('check domain collection with user1Authz and user2Authz', async () => {
      let check = await buildAndExecScript('checkNFTCollection', [fcl.arg(user1Addr, t.Address)])
      expect(check).toBe(true)

      check = await buildAndExecScript('checkNFTCollection', [fcl.arg(user2Addr, t.Address)])
      expect(check).toBe(true)
    })

    test('user buy nft while pause then fail', async () => {
      const res = await buildAndSendTrx('adminSetPause', [fcl.arg(true, t.Bool)])
      expect(res.status).toBe(4)

      const buyRes = await buildAndSendTrx(
        'buyNFT',
        [fcl.arg('5.0', t.UFix64), fcl.arg(user1Addr, t.Address)],
        user1Authz(),
      )

      expect(buyRes).toBeNull()
    })

    test('user buy nft while payment not enough then fail', async () => {
      const res = await buildAndSendTrx('adminSetPause', [fcl.arg(false, t.Bool)])
      expect(res.status).toBe(4)

      const res1 = await buildAndSendTrx('adminSetPrice', [fcl.arg('5.1', t.UFix64)])
      expect(res1.status).toBe(4)

      const buyRes = await buildAndSendTrx(
        'buyNFT',
        [fcl.arg('5.0', t.UFix64), fcl.arg(user1Addr, t.Address)],
        user1Authz(),
      )
      expect(buyRes).toBeNull()
    })

    test('user buy nft test', async () => {
      let bal = await buildAndExecScript('getFlowBalance', [fcl.arg(user1Addr, t.Address)])

      const buyRes = await buildAndSendTrx(
        'buyNFT',
        [fcl.arg('5.1', t.UFix64), fcl.arg(user1Addr, t.Address)],
        user1Authz(),
      )
      expect(buyRes.status).toBe(4)

      let afterBal = await buildAndExecScript('getFlowBalance', [fcl.arg(user1Addr, t.Address)])
      expect(Number(bal)).toBe(Number(afterBal) + 5.1)

      // without charge
      const buyMoreRes = await buildAndSendTrx(
        'buyNFT',
        [fcl.arg('6.0', t.UFix64), fcl.arg(user1Addr, t.Address)],
        user1Authz(),
      )
      expect(buyMoreRes.status).toBe(4)

      let finalBal = await buildAndExecScript('getFlowBalance', [fcl.arg(user1Addr, t.Address)])
      expect(Number(afterBal)).toBe(Number(finalBal) + 6)

      let vaultBal = await buildAndExecScript('getVaultBal', [])

      expect(Number(vaultBal)).toBe(11.1)

      let ids = await buildAndExecScript('getUserNFTIds', [fcl.arg(user1Addr, t.Address)])

      console.log(ids)

      expect(ids.length).toBe(2)
    })

    test('user transfer nft test', async () => {
      const transRes = await buildAndSendTrx(
        'transferNFT',
        [fcl.arg(3, t.UInt64), fcl.arg(user2Addr, t.Address)],
        user1Authz(),
      )
      expect(transRes.status).toBe(4)

      let ids = await buildAndExecScript('getUserNFTIds', [fcl.arg(user1Addr, t.Address)])

      console.log(ids, 'user1')

      expect(ids.length).toBe(1)
      expect(ids[0]).toBe(2)

      ids = await buildAndExecScript('getUserNFTIds', [fcl.arg(user2Addr, t.Address)])

      expect(ids.length).toBe(1)
      expect(ids[0]).toBe(3)
    })

    test('user buy nft when price is 0.0 fail', async () => {
      const priceRes = await buildAndSendTrx('adminSetPrice', [fcl.arg('0.0', t.UFix64)])
      expect(priceRes.status).toBe(4)

      const buyRes = await buildAndSendTrx(
        'buyNFT',
        [fcl.arg('10.0', t.UFix64), fcl.arg(accountAddr, t.Address)],
        user1Authz(),
      )
      expect(buyRes).toBeNull()
    })
  })
