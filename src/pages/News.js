import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Dna, Triangle } from  'react-loader-spinner'



const News = () => {
  const url = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json';

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const loadingNews = async ()=>{
      const response = await axios.get(url)
      console.log(response.data)
      setNews(response.data.articles)
    }
    loadingNews()
    setLoading(false)
  },[])

  if (loading) {
    return(
    <div className='loading-spinner'>
    <Dna
      visible={true}
      height="120"
      width="120"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    /> 
    </div> 
    )
  }

  
  return (
    <div>
      {news.map((item)=>{
        return(
          <a href={item.url} target="_blank">
          <div className='news-container'>
            <div className='news-content'>
              <img src={item.urlToImage} alt="pic" />
               <div className='news-info'>
                   <h1>{item.title.length > 35 ? item.title.slice(0,35)+"..." : item.title}</h1>
                   <p>{item.description.length > 90 ? item.description.slice(0,90) +"..." : item.description}</p>
                  
               </div>
            </div>
            
          </div>
          </a>
        )
      })}
    </div>
   
  )
}

export default News