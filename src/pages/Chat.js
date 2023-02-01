import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection, getDocs, limitToLast, orderBy, query, where } from 'firebase/firestore';

const Chat = () => {
    const [messages, setMessages] = useState("")
    const messagesRef = collection(db,"messages")
    const queryRef = query(messagesRef, orderBy("createdAt", "desc"),limitToLast())

  return (
    <div>Chat</div>
  )
}

export default Chat