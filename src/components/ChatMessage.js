import React, { useContext } from 'react'
import { LoginContext } from '../helper/LoginContext'

function ChatMessage(props){
    const {user} = useContext(LoginContext)
    if(!user) return null;

    const {text, uid, photoURL} = props.messages

    const className = uid === user.uid ? "sent" : "recieved"

    return(
        <div className={className}>
            <img src={photoURL} alt="pic" />
            <p>{text}</p>
        </div>
    )
}

export default ChatMessage
