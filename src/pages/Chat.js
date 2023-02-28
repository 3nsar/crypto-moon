import React, { useEffect, useState, useContext, useRef } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection, getDocs, limitToLast, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import {useCollection} from "react-firebase-hooks/firestore"
import { LoginContext } from '../helper/LoginContext'
import { SiRocketdotchat } from 'react-icons/si';
import coolPic from "../assets/happy.png"
import Picker, {EmojiClickData, EmojiStyle} from 'emoji-picker-react';
import ChatMessage from '../components/ChatMessage';

const Chat = () => {
    const messagesRef = collection(db,"messages")
    const queryRef = query(messagesRef, orderBy("createdAt", "desc"),limitToLast())
    const [messages]= useCollection(queryRef, {idField: "id"})
    const {user} = useContext(LoginContext)
    const scrollTo = useRef(null)

    const [formValue, setFormValue] = useState("")
    const [showPicker, setShowPicker] = useState(false);



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
    
                <div className="chat-btn-container">
                    <div className="chat-btn-content">
                     <img
                        className="emoji-icon"
                        src={coolPic}
                        onClick={() => setShowPicker(val => !val)}
                      />
                      <input placeholder=" Write here..." value={formValue} onChange={(e)=> setFormValue(e.target.value)}/>
                      <button onClick={(e)=> sendMessage(e)}><SiRocketdotchat size="35px" color='white'/></button>
                    </div>
                      <div className='picker'>               
                       {showPicker && <Picker
                        pickerStyle={{ width: '100%' }}
                        emojiStyle={EmojiStyle.APPLE}
                        height={320}
                        onEmojiClick={(emojiObject)=> setFormValue((prevMsg)=> prevMsg + emojiObject.emoji)}
                        />
                      }
                    </div> 
                </div>
            </form>
        </div>
    )
}

export default Chat
