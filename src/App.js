import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Main/> }/> 
      </Routes>
      </Router>
      <Main/>
    </div>
  );
}

export default App;
