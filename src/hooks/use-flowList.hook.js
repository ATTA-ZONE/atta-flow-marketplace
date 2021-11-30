import { useEffect, useState } from 'react'
import { LIST_DAPPY_TEMPLATES } from '../flow/get-user-collections.script'
import { query } from '@onflow/fcl'
import {getCookie} from '../utils/utils'
import useCurrentUser from '../hooks/use-current-user.hook'
import { useUser } from '../providers/UserProvider'

export default function useFlowList(url) {
  const [list, setList] = useState([])
  const [user] = useCurrentUser()
  const { collection } = useUser()

  useEffect(() => {
    const getList = async () => {
      if (!user?.addr) return
      if (!collection) return
      let ids = await query({
        cadence: LIST_DAPPY_TEMPLATES,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      })
      const postData = {
        current: 1,
        pageSize: 20,
        lang: getCookie("lang") || 'TC',
        tokenIds: ids
      }
      const res = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(postData),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      const listData = await res.json()
      const artList = listData.data
      setList(artList)
    };
    getList()
  }, [url, user?.addr])

  return { list }
}
