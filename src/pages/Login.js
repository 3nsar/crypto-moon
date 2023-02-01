import React from 'react'
import {auth, db, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router'

const Login = () => {

    const navigate = useNavigate()

    const signWithGoogle = async () =>{
        const res = await signInWithPopup(auth, provider)
        console.log(res)
        navigate('/main')
    }

  return (
    <div className='login'>
        <h1>Sign in with Google</h1>
        <button className='log-btn' onClick={signWithGoogle}>Sign in with Google <>&#x1F310;</></button>
    </div>
  )
}

export default Login