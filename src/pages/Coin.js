import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HistoryChart from '../components/HistoryChart';
import { addDoc, collection, deleteDoc, getDocs, query, where,doc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoginContext } from '../helper/LoginContext'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dna } from  'react-loader-spinner'

const Coin = () => {

    const {user} = useContext(LoginContext)
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    const [likeAmount, setLikeAmount] = useState([])
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("coinId", "==", id))

    const notify = () => toast.success('LIKE WAS COMPLETED!', {
      position:"bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    const addLike = async () =>{
        try{
        const newDoc = await addDoc(likesRef, {userId: user?.uid, coinId: info.id});
        if(user){
            setLikeAmount((prev)=>
            prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid,  likeId: newDoc.id}])
            notify();
        };
      } catch(err){
        console.log(err)
      }
    }

    const removeLike = async () =>{
        try{
            const likeToDeleteQuery = query(likesRef, 
                 where("coinId", "==", id), 
                 where("userId", "==", user.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id)
        await deleteDoc(likeToDelete);
        if(user){
            setLikeAmount((prev)=> prev && prev.filter((like)=> like.likeId !== likeId))
        };
      } catch(err){
        console.log(err)
      }
    }

    const getLikes = async ()=> {
        const data = await getDocs(likesDoc);
        setLikeAmount(data.docs.map((doc)=> ({ userId: doc.data().userId, likeId: doc.id})));
        setLoading(false);
    }

    const hasUserLiked = likeAmount?.find((like)=> like.userId === user?.uid)

    

    const tableContainerSx2 = {
      maxWidth: 1000,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 4,
      borderRadius: 2,
    }


    useEffect(()=>{
        const loadData = async ()=>{
           const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
           console.log(response.data) 
           setInfo(response.data);
        }
        loadData()
        setLoading(false)
     },[]);

     useEffect(()=>{
        getLikes();
     },[])

     const spinner = (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Dna type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
  );

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


  if(info){
    return (
      <div className='single-coin-page'>
        <div className='single-coin-container'>
          <div className="single-coin-info-content">
           <div className="single-coin-info">
             <div className='single-coin-info-title'>
               <img src={info.image.large}/>
               <h1>{info.name}</h1>
               <h3>{info.symbol}</h3>
               <h4>RANK: {info.market_cap_rank}</h4>
             </div>
              <h1 className='single-coin-price'>{info.market_data.current_price.eur.toLocaleString()}€</h1>
            </div>
            </div>
        <TableContainer component={Paper} sx={tableContainerSx2}>
         <Table aria-label="simple table" stickyHeader={true}>
           <TableHead >
               <TableRow sx={{"& th": {fontSize: "1rem", fontWeight: "700", borderBottom: "none"}}}>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>Price</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>1h</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>24h</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>7d</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>30d</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>1y</TableCell>
              </TableRow>
          </TableHead>
          <TableBody  key={info.id} sx={{"tr":{backgroundColor: "grey.900"}}} >
              <TableRow className="coin-container" >
                <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.current_price.eur).toLocaleString()}€</TableCell>
                <TableCell sx={{color:"white"}}>
                { info.market_data.price_change_percentage_1h_in_currency.eur >= 0 ?
                  <div className='green'>{parseFloat(info.market_data.price_change_percentage_1h_in_currency.eur).toFixed(2)}% </div> : <div className='red'>{parseFloat(info.market_data.price_change_percentage_1h_in_currency.eur ).toFixed(2)}% </div>}
                </TableCell>
                <TableCell sx={{color:"white"}}>
                { info.market_data.price_change_percentage_24h_in_currency.eur >= 0 ?
                  <div className='green'>{parseFloat(info.market_data.price_change_percentage_24h_in_currency.eur).toFixed(2)}% </div> : <div className='red'>{parseFloat(info.market_data.price_change_percentage_24h_in_currency.eur ).toFixed(2)}% </div>}
                </TableCell>
                <TableCell sx={{color:"white"}}>
                { info.market_data.price_change_percentage_7d_in_currency.eur >= 0 ?
                  <div className='green'>{parseFloat(info.market_data.price_change_percentage_7d_in_currency.eur).toFixed(2)}% </div> : <div className='red'>{parseFloat(info.market_data.price_change_percentage_7d_in_currency.eur).toFixed(2)}% </div>}
                </TableCell>
                <TableCell sx={{color:"white"}}>
                { info.market_data.price_change_percentage_30d_in_currency.eur >= 0 ?
                  <div className='green'>{parseFloat(info.market_data.price_change_percentage_30d_in_currency.eur).toFixed(2)}% </div> : <div className='red'>{parseFloat(info.market_data.price_change_percentage_30d_in_currency.eur).toFixed(2)}% </div>}
                </TableCell>
                <TableCell sx={{color:"white"}}>
                { info.market_data.price_change_percentage_1y_in_currency.eur >= 0 ?
                  <div className='green'>{parseFloat(info.market_data.price_change_percentage_1y_in_currency.eur).toFixed(2)}% </div> : <div className='red'>{parseFloat(info.market_data.price_change_percentage_1y_in_currency.eur).toFixed(2)}% </div>}
                </TableCell>
              </TableRow>
            </TableBody> 
            </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={tableContainerSx2}>
         <Table aria-label="simple table" stickyHeader={true}>
           <TableHead >
               <TableRow sx={{"& th": {fontSize: "1rem", fontWeight: "700", borderBottom: "none"}}}>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>24 Low</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>24 High</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>Volume</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>Mkt-Cap</TableCell>
               <TableCell sx={{backgroundColor:"#304ffe", color:"white"}}>Total Supply</TableCell>
               </TableRow>
          </TableHead>
          <TableBody  key={info.id} sx={{"tr":{backgroundColor: "grey.900"}}} >
              <TableRow className="coin-container" >
              <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.high_24h.eur).toLocaleString()}€</TableCell>
              <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.low_24h.eur).toLocaleString()}€</TableCell>
              <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.total_volume.eur).toLocaleString()}€</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.market_cap.eur).toLocaleString()}€</TableCell>
                <TableCell sx={{color:"white"}}>{parseFloat(info.market_data.total_supply).toLocaleString()}</TableCell>
              </TableRow>
            </TableBody> 
            </Table>
            </TableContainer>
              <div className='about-coin-container'>
                  <h1>What is {info.name} ?</h1>
                  <p dangerouslySetInnerHTML={{__html: info.description.en}}></p>
                  <div className='heart-container'>
                    <div className='heart-content'>
                      <button className='heart-btn' onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#x1F494;</> : <>&#x1F496;</>}</button> 
                      {likeAmount && <p>{likeAmount.length}</p>}
                    </div>
                  </div>
              </div>   
              <ToastContainer />            
      </div>
        <div className='chart-container'>
          <HistoryChart />
        </div>
      </div>
    ) 
 }
}

export default Coin