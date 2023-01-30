import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

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
        <Table variant="dark" className="coin-container">
             <thead>
              <tr>
               <th>#</th>
               <th>Coin</th>
               <th>Price</th>
               <th>24h</th>
               <th>Volume</th>
               <th>Mkt-Cap</th>
              </tr>
            </thead>
            {coins.map((coin)=>(
            <tbody key={coin.id}>
              <tr>
                <td>{coin.market_cap_rank}</td>
                <td><img src={coin.image} alt="coin"/>{coin.name}</td>
                <td>{coin.current_price}€</td>
                <td>{parseFloat(coin.price_change_percentage_24h).toFixed(2)}%</td>
                <td>{coin.total_volume}€</td>
                <td>{coin.market_cap}€</td>
              </tr>
            </tbody>  
              ))}
        </Table>
  )
}

export default Main