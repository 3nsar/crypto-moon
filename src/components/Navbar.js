import React, { useContext } from 'react'
import { LoginContext } from '../helper/LoginContext'
import { useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useContext(LoginContext)
  const signUserOut = async() =>{
    await signOut(auth)
    navigate('/')
  }
  return (
  <div className='navbar-container'>
    {user && (
      <>

      <h1 onClick={()=>navigate('/main')}>CRYPTO-MOON</h1>

      <ul className='navbar-list'>
          <li onClick={()=>navigate('/chat')}>CHAT</li>
          <li onClick={()=>navigate('/main')}>MARKET</li>
          <li onClick={()=>navigate('/news')}>NEWS</li>
        <button onClick={signUserOut}>LOG OUT</button>
      </ul>
      </>
        )}
    </div>
  )

}

export default Navbar