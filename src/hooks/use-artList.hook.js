import { useEffect, useState } from 'react'

export default function useArtList(url) {
  const [list, setList] = useState([])
  
  useEffect(() => {
    const getList = async () => {
      const res = await fetch(url, { method: 'GET' })
      const listData = await res.json()
      const artList = listData.data
      setList(artList)
    };
    getList()
  }, [url])

  return { list }
}
