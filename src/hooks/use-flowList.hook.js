import { useEffect, useState } from 'react'

export default function useFlowList(url, data) {
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      const res = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      const listData = await res.json()
      const artList = listData.data
      setList(artList)
    };
    getList()
  }, [url, data])

  return { list }
}
