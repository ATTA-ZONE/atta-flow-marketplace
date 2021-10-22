import { useEffect, useState } from 'react'
import useCurrentUser from '../hooks/use-current-user.hook'
import {LIST_DAPPY_TEMPLATES} from '../flow/get-user-collections.script'
import { query } from '@onflow/fcl'

export default function useCollections() {
  const [token, setToken] = useState()
  const [user] = useCurrentUser()

  useEffect(() => {
    const getList = async () => {

      let res = await query({
        cadence: LIST_DAPPY_TEMPLATES,
        args: user?.addr
      })
      setToken(res)
    };
    getList()
  }, [])
  return token
}