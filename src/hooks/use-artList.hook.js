import {
  useState,
  useEffect
} from 'react'

export const useGetArtList = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState

  useEffect(() => {
    const url = process.env.REACT_APP_DAPPY_ARTLIST_TEST + '/list'
    const postdata = {
      current: 1,
      pageSize: 20,
      channelId: 1
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url,postdata);
        console.log(response);
        setData(response)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  })

  setLoading(false)
  return data

}