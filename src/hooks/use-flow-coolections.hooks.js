import { useEffect, useState } from 'react'

import {LIST_DAPPY_TEMPLATES} from '../flow/get-user-collections.script'
import { query } from '@onflow/fcl'

export default function useCollections(addr) {
  const [token, setToken] = useState()

  useEffect(() => {
    console.log(LIST_DAPPY_TEMPLATES);
    const getList = async () => {
      try {
        let res = await query({
          cadence: LIST_DAPPY_TEMPLATES,
          args: (arg, t) => [arg(addr, t.UInt64)]
        })
        setToken(res)
      } catch (err) {
        console.log(err,'======');
      }
    };
    getList()
  }, [addr])
  return token
}