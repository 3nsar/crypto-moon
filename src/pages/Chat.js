import React, { useEffect, useState, useContext, useRef } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection, getDocs, limitToLast, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import {useCollection} from "react-firebase-hooks/firestore"
import { LoginContext } from '../helper/LoginContext'

const Chat = () => {
    const messagesRef = collection(db,"messages")
    const queryRef = query(messagesRef, orderBy("createdAt", "desc"),limitToLast())
    const [messages]= useCollection(queryRef, {idField: "id"})
    const [formValue, setFormValue] = useState("")
    const {user} = useContext(LoginContext)
    const scrollTo = useRef(null)

    const sendMessage = async (e) =>{
        e.preventDefault()

        if(!user || !formValue) return

        const payload ={text: formValue, createdAt: serverTimestamp(), uid: user.uid, photoURL: user.photoURL}
        await addDoc(messagesRef,payload)

        setFormValue("")
    }

    useEffect(()=>{
        scrollTo.current.scrollIntoView({behavior:"smooth"})
    })

  return (
    <div className='messages-content'>
        <div className="messages">
            <div ref={scrollTo}></div>
            {messages && messages.docs.map(msg => <ChatMessage key={msg.id} messages={msg.data()}/>)}
        </div>
        <form>
            <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}/>
            <button onClick={(e)=> sendMessage(e)}>Send</button>
        </form>
    </div>
  )
}

function ChatMessage(props){
    const {user} = useContext(LoginContext)
    if(!user) return

    const {text, uid, photoURL} = props.messages

    const className = uid === user.uid ? "sent" : "recieved"

    return(
        <div className={className}>
            <img src={photoURL} alt="pic" />
            <p>{text}</p>
        </div>
    )
}



export default Chat