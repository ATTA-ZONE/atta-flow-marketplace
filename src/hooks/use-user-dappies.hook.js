import { useEffect, useReducer } from 'react'
import { mutate, query, tx } from '@onflow/fcl'

import { LIST_USER_DAPPIES } from '../flow/list-user-dappies.script'
import { MINT_DAPPY } from '../flow/mint-dappy.tx'
import { userDappyReducer } from '../reducer/userDappyReducer'
import { useTxs } from '../providers/TxProvider'
import DappyClass from '../utils/DappyClass'

export default function useUserDappies(user, collection,createCollection, getFUSDBalance) {
  const [state, dispatch] = useReducer(userDappyReducer, {
    oading: false,
    error: false,
    data: []
  })
  const { addTx, runningTxs } = useTxs()

  useEffect(() => {
    const fetchUserDappies = async () => {
      dispatch({ type: 'PROCESSING' })
      try {
        let res = await query({
          cadence: LIST_USER_DAPPIES,
          args: (arg, t) => [arg(user?.addr, t.Address)]
        })
        let mappedDappies = []

        for (let key in res) {
          const element = res[key]
          let dappy = new DappyClass(element.templateID, element.dna, element.name, element.price, key)
          mappedDappies.push(dappy)
        }

        dispatch({ type: 'SUCCESS', payload: mappedDappies })
      } catch (err) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetchUserDappies()
    //eslint-disable-next-line
  }, [])

  const mintDappy = async (amount, flowAddress,flowBasicId) => {
    if (!collection) {
      createCollection();
      // alert("You need to enable the collection first. Go to the tab Collection")
      return
    }
    if (runningTxs) {
      alert("Transactions are still running. Please wait for them to finish first.")
      return
    }
    try {
      let res = await mutate({
        cadence: MINT_DAPPY,
        limit: 9999,
        args: (arg, t) => [arg(amount, t.UFix64),arg(flowAddress, t.Address),]
      })
      addTx(res)
      let tokenidarr = await tx(res).onceSealed();
      let templateID = {flowAddress:flowAddress,flowBasicId : flowBasicId};
      tokenidarr.events.forEach(item=>{
        if (item.type == "A.e62308aba7b05365.ATTANFT.UserMinted") {
          templateID.tokenId = item.data.id;
          templateID.price = item.data.price;
        }
      })
      // await addDappy(templateID)
      await getFUSDBalance()
    } catch (error) {
      console.log(error)
    }
  }

  const addDappy = async (templateID) => {
    try {
      let res = await query({
        cadence: LIST_USER_DAPPIES,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      })
      const dappies = Object.values(res)
      const dappy = dappies.find(d => d?.templateID === templateID)
      const newDappy = new DappyClass(dappy.templateID, dappy.dna, dappy.name)
      dispatch({ type: 'ADD', payload: newDappy })
    } catch (err) {
      console.log(err)
    }
  }

  const batchAddDappies = async (dappies) => {
    try {
      let res = await query({
        cadence: LIST_USER_DAPPIES,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      })
      const allDappies = Object.values(res)
      const dappyToAdd = allDappies.filter(d => dappies.includes(d?.templateID))
      const newDappies = dappyToAdd.map(d => new DappyClass(d.templateID, d.dna, d.name))
      for (let index = 0; index < newDappies.length; index++) {
        const element = newDappies[index];
        dispatch({ type: 'ADD', payload: element })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    ...state,
    mintDappy,
    addDappy,
    batchAddDappies
  }
}
