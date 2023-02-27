import React from 'react'
import {auth, db, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router'
import videobg from "../assets/tunnel-64814.mp4"

const Login = () => {

    const navigate = useNavigate()


    const signWithGoogle = async () =>{
        const res = await signInWithPopup(auth, provider)
        console.log(res)
        navigate('/main')
    }

  return (
    <div className='login'>
      <video src={videobg} autoPlay loop muted/>
        <h1>START YOUR JOURNEY WITH CRYPTO-MOON</h1>
        <p>EXPLORE THE FUTURE</p>
        <button className='log-btn' onClick={signWithGoogle}>SIGN IN </button>
    </div>
  )
}

export default Login