import axios from 'axios';
import React, { useEffect, useState } from 'react'

const News = () => {
  const url = 'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';
  const [news, setNews] = useState([])

  useEffect(()=>{
    const loadingCoins = async ()=>{
      const response = await axios.get(url)
      console.log(response.data)
      setNews(response.data)
    }
    loadingCoins()
  },[])

  return (
    <div>News</div>
  )
}

export default News