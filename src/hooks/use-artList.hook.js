import { useEffect, useState } from 'react'

export default function useArtList() {
  const [list, setList] = useState([])
  
  const url = `${process.env.REACT_APP_DAPPY_ARTLIST_TEST}/list?current=1&pageSize=20&channelId=1`
  
  useEffect(() => {
    const getList = async () => {
      const res = await fetch(url, { method: 'GET' })
      const listData = await res.json()
      const artList = listData.data?.pageResult?.records
      setList(artList)
    }
    getList()
  }, [])

  return { list }
}
