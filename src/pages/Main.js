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
import { useNavigate } from 'react-router'
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';


const Main = () => {
    
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=40&page=1&sparkline=true";
    const [page, setPage] = useState(0);
    const [coins, setCoins] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const [coinSearch,setCoinSearch] = useState("")
    const [order, setOrder] = useState("ASC")
    const [sorted, setSorted] = useState({sorted: "market_cap_rank", reversed: false})


    const sorting = (val)=>{
      if(order ==="ASC"){
        const sorted = [...coins].sort((a,b)=> 
        a[val].toLowerCase() > b[val].toLowerCase() ? 1 : -1
        );
        setCoins(sorted)
        setOrder("DSC")
      }
      if(order ==="DSC"){
        const sorted = [...coins].sort((a,b)=> 
        a[val].toLowerCase() < b[val].toLowerCase() ? 1 : -1
        );
        setCoins(sorted)
        setOrder("ASC")
      }
    };


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

    
    const sortById = ()=>{
     setSorted({sorted: "market_cap_rank", reversed: !sorted.reversed});
     const coinsCopy = [...coins];
      coinsCopy.sort((coinA, coinB)=>{
        if(sorted.reversed){
          return coinA.market_cap_rank - coinB.market_cap_rank
        }
         return coinB.market_cap_rank - coinA.market_cap_rank
      });
      setCoins(coinsCopy);
      console.log(coins)
    };

    const sortBy24h = ()=>{
      setSorted({sorted: "price_change_percentage_24h", reversed: !sorted.reversed});
      const coinsCopy = [...coins];
       coinsCopy.sort((coinA, coinB)=>{
         if(sorted.reversed){
           return coinA.price_change_percentage_24h - coinB.price_change_percentage_24h
         }
          return coinB.price_change_percentage_24h - coinA.price_change_percentage_24h
       });
       setCoins(coinsCopy);
       console.log(coins)
     };

     const sortByVolume = ()=>{
      setSorted({sorted: "total_volume", reversed: !sorted.reversed});
      const coinsCopy = [...coins];
       coinsCopy.sort((coinA, coinB)=>{
         if(sorted.reversed){
           return coinA.total_volume - coinB.total_volume
         }
          return coinB.total_volume - coinA.total_volume
       });
       setCoins(coinsCopy);
       console.log(coins)
     };

     const sortByMktCap = ()=>{
      setSorted({sorted: "market_cap", reversed: !sorted.reversed});
      const coinsCopy = [...coins];
       coinsCopy.sort((coinA, coinB)=>{
         if(sorted.reversed){
           return coinA.market_cap - coinB.market_cap
         }
          return coinB.market_cap - coinA.market_cap
       });
       setCoins(coinsCopy);
       console.log(coins)
     };

     const sortByPrice = ()=>{
      setSorted({sorted: "current_price", reversed: !sorted.reversed});
      const coinsCopy = [...coins];
       coinsCopy.sort((coinA, coinB)=>{
         if(sorted.reversed){
           return coinA.current_price - coinB.current_price
         }
          return coinB.current_price - coinA.current_price
       });
       setCoins(coinsCopy);
       console.log(coins)
     };

    const tableContainerSx = {
      //width: "max-content",
      maxWidth: 1150,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 5,
      borderRadius: 2,
      marginBottom: 4

    }

  return (
   <div>
      <div className="input-bar">
        <input  type="text" placeholder="Search" onChange={(e)=> setCoinSearch(e.target.value)}/>
      </div>
    <TableContainer component={Paper} sx={tableContainerSx}>
        <Table aria-label="simple table" stickyHeader={true}>
         <TableHead >
              <TableRow sx={{"& th": {fontSize: "1rem", fontWeight: "800", borderBottom: "none"}}}>
               <TableCell onClick={sortById} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>#</TableCell>
               <TableCell onClick={()=>sorting("name")} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>Coin {order ==="ASC" ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
               <TableCell onClick={sortByPrice} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>Price {sorted.reversed === false ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
               <TableCell onClick={sortBy24h} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>24h {sorted.reversed === false ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>7d {sorted.reversed === false ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
               <TableCell onClick={sortByVolume} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>Volume {sorted.reversed === false ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
               <TableCell onClick={sortByMktCap} sx={{backgroundColor:"#304ffe", color:"white",cursor:"pointer"}}>Mkt-Cap {sorted.reversed === false ? <FiArrowUpCircle/> : <FiArrowDownCircle/>}</TableCell>
              </TableRow>
          </TableHead>
          
          {( rowsPerPage > 0
              ? coins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : coins
            ).filter((val)=>{
              if(coinSearch ===""){
                  return val
              }else if (val.name.toLowerCase().includes(coinSearch.toLowerCase())){
                  return val
              }

          })
            .map((coin)=>(
            <TableBody onClick={()=> navigate(`/coin/${coin.id}`)} key={coin.id} sx={{"tr":{backgroundColor: "grey.900", cursor:"pointer"}}} >
              <TableRow className="coin-container" >
                <TableCell sx={{color:"white"}}>{coin.market_cap_rank}</TableCell>
                <TableCell sx={{color:"white"}}> <div className='coin-content'> <img src={coin.image} alt="coin"/>{coin.name} </div></TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.current_price).toLocaleString()}€</TableCell>
                <TableCell sx={{color:"white"}}>
                { coin.price_change_percentage_24h >= 0 ?
                  <div className='green'>{parseFloat(coin.price_change_percentage_24h).toFixed(2)}% </div> : <div className='red'>{parseFloat(coin.price_change_percentage_24h).toFixed(2)}% </div>}
                  </TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.price_change_percentage_1h).toFixed(2)}%</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.total_volume).toLocaleString()}€</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(coin.market_cap).toLocaleString()}€</TableCell>
              </TableRow>
            </TableBody>  
              ))}
        </Table>
        <TablePagination
          sx={{backgroundColor: "grey.900", color:"white"}}
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={coins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}

        />
 
      </TableContainer>
    </div>
      
  )
}

export default Main