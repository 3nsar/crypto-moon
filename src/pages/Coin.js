import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HistoryChart from './HistoryChart';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LoginContext } from '../helper/LoginContext'
const Coin = () => {

    const {user} = useContext(LoginContext)
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    const [likesAmount, setLikesAmount] = useState(0)

    const likesRef = collection(db,"likes")
    const likesDoc = query(likesRef, where ("userId","==",user.uid))
    
    
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

    const addLike = async () =>{
        await addDoc(likesRef, {userId: user.uid, coinId: info.id})
    }

    const getLikes = async ()=>{
        const data = await getDocs(likesDoc)
        setLikesAmount(data.docs.length)
    }

    useEffect(()=>{
        getLikes()
    },[])

  

  if(info){
      
    return(
        
        <div>
            <img src={info.image.large}/>
            <h1>{info.name}</h1>
            <h1>{info.id}</h1>
            <h1>Rank: {info.coingecko_rank}</h1>
            <h1>What is {info.name} ?</h1>
            <div className='' dangerouslySetInnerHTML={{__html: info.description.en}}></div>
            <button onClick={addLike}> LIKE +</button>
            <p>Likes: {likesAmount}</p>
            <HistoryChart />
            
        </div>
    ) 
}
}

export default Coin