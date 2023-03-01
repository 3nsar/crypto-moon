import React, { useContext, useState } from 'react'
import { LoginContext } from '../helper/LoginContext'
import { useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';



const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useContext(LoginContext)
  const [showNav, setShowNav] = useState(false);

  const signUserOut = async() =>{
    await signOut(auth)
    navigate('/')
  }

  const handleNavClick = () => {
    setShowNav(!showNav);
  };


  return (
  <div className='navbar-container'>
    {user && (
      <>

      <h1 onClick={()=>navigate('/main')}>CRYPTO-MOON</h1>

      <div className='nav-icon' onClick={handleNavClick}>
      {showNav ? <AiOutlineClose fontSize="25px"/> : <FaBars fontSize="25px"/>}
      </div>


      <ul className={`navbar-list ${showNav ? 'show' : ''}`}>
          <li onClick={()=>navigate('/chat')}>CHAT</li>
          <li onClick={()=>navigate('/main')}>MARKET</li>
          <li onClick={()=>navigate('/news')}>NEWS</li>
          <li>
          <button onClick={signUserOut}>LOG OUT</button>
          </li>
      </ul>
      </>
        )}
    </div>
  )

}

export default Navbar