import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coin from './pages/Coin';
import { LoginContext } from './helper/LoginContext';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './config/firebase'
import Login from './pages/Login';
import Chat from './pages/Chat';
import News from './pages/News';

function App() {
  
const [user] = useAuthState(auth)

  return (
    <div className='App'>
  <LoginContext.Provider value={{user}}>
   <Router >
      {user && <Navbar />}
      <Routes>
       <Route exact path="/" element={user == null ? <Login /> : <Main />}/> 
       <Route path="/coin/:id" element={<Coin />}/> 
       <Route exact path="/main" element={<Main /> }/>
       <Route exact path="/chat" element={<Chat /> }/>
       <Route exact path="/news" element={<News /> }/>
      </Routes>  
    </Router>
  </LoginContext.Provider>  

    </div>
  );
}

export default App;
