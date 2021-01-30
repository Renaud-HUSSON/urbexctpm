import axios from "axios"
import { useEffect, useState } from "react"

const useGetData = (url) => {
  const [data, setData] = useState({
    loading: true,
    data: ''
  })

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get(url)
        setData({
          loading: false,
          data: results.data
        })
      }catch(e){}

    })()
  }, [url])

  return data
}

export default useGetData