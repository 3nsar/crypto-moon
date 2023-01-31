import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coin from './pages/Coin';

function App() {
  return (
    <div className='App'>
   <Router >
      <Navbar />
      <Routes>
       <Route exact path="/" element={<Main/> }/>
       <Route path="/coin/:id" element={<Coin />}/> 
      </Routes>
      
    </Router>
    </div>
    
  );
}

export default App;
