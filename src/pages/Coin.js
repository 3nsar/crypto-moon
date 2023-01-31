import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HistoryChart from './HistoryChart';


const Coin = () => {
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    useEffect(()=>{
     const loadData = async ()=>{
         setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log(response.data) 
        setInfo(response.data);
        setLoading(false)
     }
     loadData()
  },[]);
  


    return(  
      <div className='singlecoin-container'>
        <div className='singlecoin-title'> 
           <img src={info.image.large}/>
           <h1>{info.name}</h1>
           <h1>Rank: {info.coingecko_rank}</h1>
        </div>
        <h1>What is {info.name}</h1>
        <div className='singlecoin-text' dangerouslySetInnerHTML={{__html: info.description.en}}/>
        <HistoryChart/>
     </div>
    )
}

export default Coin