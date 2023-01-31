import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/material';
const Main = () => {
    const [coins, setCoins] = useState([])
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=15&page=1&sparkline=true";


    useEffect(()=>{
      const loadingCoins = async ()=>{
        const response = await axios.get(url)
        console.log(response.data)
        setCoins(response.data)
      }
      loadingCoins()
    },[])

    const tableContainerSx = {
      width: "max-content",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 5,
      borderRadius: 2
    }
   

    
  return (
    <TableContainer component={Paper} sx={tableContainerSx}>
        <Table  aria-label="simple table">
         <TableHead>
              <TableRow>
               <TableCell >#</TableCell>
               <TableCell >Coin</TableCell>
               <TableCell>Price</TableCell>
               <TableCell >24h</TableCell>
               <TableCell >7d</TableCell>
               <TableCell >Volume</TableCell>
               <TableCell >Mkt-Cap</TableCell>
              </TableRow>
          </TableHead>
            {coins.map((coin)=>(
            <TableBody key={coin.id}>
              <TableRow className="coin-container">
                <TableCell >{coin.market_cap_rank}</TableCell>
                <TableCell ><img src={coin.image} alt="coin"/>{coin.name}</TableCell>
                <TableCell >{coin.current_price}€</TableCell>
                <TableCell >{parseFloat(coin.price_change_percentage_24h).toFixed(2)}%</TableCell>
                <TableCell >{parseFloat(coin.price_change_percentage_1h).toFixed(2)}%</TableCell>
                <TableCell >{coin.total_volume}€</TableCell>
                <TableCell >{coin.market_cap}€</TableCell>
              </TableRow>
            </TableBody>  
              ))}
        </Table>
      </TableContainer>
    
  )
}

export default Main