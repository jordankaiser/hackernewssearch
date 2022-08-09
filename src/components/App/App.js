import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Search from '../Search/Search'
import Home from "../Home/Home";
import History from "../History/History";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/search"  element={<Search />} />
            <Route path="/history"  element={<History/>} />
            <Route path="/"  element={<Home/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
