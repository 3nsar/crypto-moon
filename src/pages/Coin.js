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
    <div> <h1>{info.name}</h1></div>
  )
}

export default Coin