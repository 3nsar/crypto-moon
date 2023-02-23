import axios from 'axios';
import React, { useEffect, useState } from 'react'

const News = () => {
  const url = 'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';
  const [news, setNews] = useState([])

  useEffect(()=>{
    const loadingNews = async ()=>{
      const response = await axios.get(url)
      console.log(response.data)
      setNews(response.data.articles)
    }
    loadingNews()
  },[])

  return (
    <div>
      {news.map((item)=>{
        return(
          <div className='news-container'>
            <div className='news-content'>
              <img src={item.urlToImage} alt="pic" height={200} />
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              {/*<button>{item.url}</button> */}
              <button>READ MORE</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default News