import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HistoryChart from './HistoryChart';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoginContext } from '../helper/LoginContext'
const Coin = () => {

    const {user} = useContext(LoginContext)
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    const [likeAmount, setLikeAmount] = useState(null)
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("coinId", "==", id))
    

    const addLike = async () =>{
        await addDoc(likesRef, {userId: user.uid, coinId: info.id});
    }

    const getLikes = async ()=> {
        const data = await getDocs(likesDoc);
        setLikeAmount(data.docs.length)
    }

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

     useEffect(()=>{
        getLikes();
     },[])

  if(info){
      
    return(
        
        <div>
            <img src={info.image.large}/>
            <h1>{info.name}</h1>
            <h1>{info.id}</h1>
            <h1>Rank: {info.coingecko_rank}</h1>
            <button onClick={addLike}>LIIKEEE</button> {likeAmount && <p>likes: {likeAmount}</p>}
            <h1>What is {info.name} ?</h1>
            <div className='' dangerouslySetInnerHTML={{__html: info.description.en}}></div>

            <HistoryChart /> 
            
        </div>
    ) 
}
}

export default Coin