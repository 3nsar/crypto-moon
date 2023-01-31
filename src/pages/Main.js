import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const Main = () => {
    
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=40&page=1&sparkline=true";
    const [page, setPage] = useState(0);
    const [coins, setCoins] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const emptyRows = page >0 ? Math.max(0,(1 + page)* rowsPerPage - coins.length) : 0;


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
      borderRadius: 2,

    }
   

    
  return (
   
    <TableContainer component={Paper} sx={tableContainerSx}>
        <Table aria-label="simple table" stickyHeader={true}>
         <TableHead >
              <TableRow sx={{"& th": {fontSize: "1rem", fontWeight: "800", borderBottom: "none"}}}>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>#</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>Coin</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>Price</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>24h</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>7d</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>Volume</TableCell>
               <TableCell sx={{backgroundColor:"blue", color:"white"}}>Mkt-Cap</TableCell>
              </TableRow>
          </TableHead>
          {(rowsPerPage > 0
              ? coins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : coins
            ).map((coin)=>(
            <TableBody key={coin.id} sx={{"tr":{backgroundColor: "grey.900"}}} >
              <TableRow className="coin-container" >
                <TableCell sx={{color:"white"}}>{coin.market_cap_rank}</TableCell>
                <TableCell sx={{color:"white"}}> <div className='coin-content'> <img src={coin.image} alt="coin"/>{coin.name} </div></TableCell>
                <TableCell sx={{color:"white"}}>{coin.current_price}€</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.price_change_percentage_24h).toFixed(2)}%</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.price_change_percentage_1h).toFixed(2)}%</TableCell>
                <TableCell sx={{color:"white"}}>{coin.total_volume}€</TableCell>
                <TableCell sx={{color:"white"}}>{coin.market_cap}€</TableCell>
              </TableRow>
            </TableBody>  
              ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
 
      </TableContainer>
      
  )
}

export default Main