import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const Coin = () => {
  const [info, setInfo] = useState("");
  const { id } = useParams();

  useEffect(()=>{
    const loadData = async ()=>{
       const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
       console.log(response.data) 
       setInfo(response.data);
    }
    loadData()
 },[]);
 
  return (
    <div className='singlecoin-container'>
        <div className='singlecoin-title'> 
           <img src={info.image.large}/>
           <h1>{info.name}</h1>
           <h1>Rank: {info.coingecko_rank}</h1>
        </div>
        <h1>What is {info.name}</h1>
        <div className='singlecoin-text' dangerouslySetInnerHTML={{__html: info.description.en}}/>
    </div>
  )
}

export default Coin