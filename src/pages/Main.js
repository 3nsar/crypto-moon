import axios from 'axios';
import React, { useEffect, useState } from 'react'

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=5&page=1&sparkline=true";

const Main = () => {
    const [coins, setCoins] = useState([])

    useEffect(()=>{
      const loadingCoins = async ()=>{
        const response = await axios.get(url)
        console.log(response.data)
        setCoins(response.data)
      }
      loadingCoins()
    },[])

    
  return (
    <div>
        {coins.map((coin)=>(
            <div className='coin-container' key={coin.id}>
              <img src={coin.image} alt="coin"/>
              <p>{coin.name}</p>
            </div>

        ))}
    </div>
  )
}

export default Main