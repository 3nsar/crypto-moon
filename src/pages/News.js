import axios from 'axios';
import React, { useEffect, useState } from 'react'

const News = () => {
  const url = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json';

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
              <img src={item.urlToImage} alt="pic" />
               <div className='news-info'>
                   <h1>{item.title.length > 35 ? item.title.slice(0,35)+"..." : item.title}</h1>
                   <p>{item.description.length > 90 ? item.description.slice(0,90) +"..." : item.description}</p>
               </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default News