import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HistoryChart from './HistoryChart';
import { addDoc, collection, deleteDoc, getDocs, query, where,doc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoginContext } from '../helper/LoginContext'

const Coin = () => {

    const {user} = useContext(LoginContext)
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    const [likeAmount, setLikeAmount] = useState([])
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("coinId", "==", id))
    

    const addLike = async () =>{
        try{
        const newDoc = await addDoc(likesRef, {userId: user?.uid, coinId: info.id});
        if(user){
            setLikeAmount((prev)=>
            prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid,  likeId: newDoc.id}])
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
    }

    const hasUserLiked = likeAmount?.find((like)=> like.userId === user?.uid)

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
            <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? "DISLIKE" :"LIIKEEE"}</button> {likeAmount && <p>likes: {likeAmount.length}</p>}
            <h1>What is {info.name} ?</h1>
            <div className='' dangerouslySetInnerHTML={{__html: info.description.en}}></div>

            <HistoryChart /> 
            
        </div>
    ) 
}
}

export default Coin