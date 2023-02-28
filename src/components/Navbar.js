import React, { useContext, useState } from 'react';
import { LoginContext } from '../helper/LoginContext';
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  const [showNav, setShowNav] = useState(false);

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleNavClick = () => {
    setShowNav(!showNav);
  };

  return (
    <div className='navbar-container'>
      <h1 onClick={() => navigate('/main')}>CRYPTO-MOON</h1>

      <div className='nav-icon' onClick={handleNavClick}>
        <div className={`nav-line ${showNav ? 'nav-line-open' : ''}`} />
        <div className={`nav-line ${showNav ? 'nav-line-open' : ''}`} />
        <div className={`nav-line ${showNav ? 'nav-line-open' : ''}`} />
      </div>

      <ul className={`navbar-list ${showNav ? 'show' : ''}`}>
        <li onClick={() => navigate('/chat')}>CHAT</li>
        <li onClick={() => navigate('/main')}>MARKET</li>
        <li onClick={() => navigate('/news')}>NEWS</li>
        <button onClick={signUserOut}>LOG OUT</button>
      </ul>
    </div>
  );
};

export default Navbar;
