import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useSelector} from "react-redux";
import SocketContext from "./context/Context";

const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

function App() {
    const { user } = useSelector((state) => state.user);
    const { token } = user;

  return (
      <div>
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/chat" element={
                        token ? <Home socket={socket} /> : <Navigate to="/" />
                    }></Route>
                </Routes>
            </Router>
        </SocketContext.Provider>

      </div>
  );
}

export default App;
