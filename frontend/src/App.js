import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useSelector} from "react-redux";

function App() {
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    console.log(user)
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/chat" element={
                token ? <Home /> : <Navigate to="/" />
            }></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
