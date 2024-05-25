import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useSelector} from "react-redux";

function App() {
    const { user } = useSelector((state) => state.user);
    console.log(user)
  return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/chat" element={<Home />}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
