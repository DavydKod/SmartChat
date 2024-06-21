import SidePanel from "../components/sidePanel/SidePanel";
import ChatWindow from "../components/chatWindow/ChatWindow";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChats} from "../redux/actions/chatActions";
import Welcome from "../components/chatWindow/Welcome";
import SocketContext from "../context/Context";
import {updateMessages} from "../redux/slices/chatSlice";


function Home( {socket} )  {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {currentChat} = useSelector((state) => state.chats)

    useEffect(() => {
        socket.emit("connection", user._id);
    }, [user]);

    // get user chats
    useEffect(() => {
        if (user?.token) {
            const userId = user._id;
            dispatch(getChats({token: user.token, userId }));
        }
    }, [user, dispatch]);

    useEffect(() => {
        const handleMessage = (message) => {
            dispatch(updateMessages(message));
        };

        socket.on("receive message", handleMessage);

        return () => {
            socket.off("receive message", handleMessage); // Clean up the event listener
        };
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-custom-image">

            <div className="flex w-[90vw] h-[90vh] bg-[rgba(255,255,255,0.50)] shadow-lg rounded-[12px] p-8 backdrop-blur-saturate border-custom">
                <SidePanel />
                {currentChat._id ? <ChatWindow /> : <Welcome />}

            </div>
        </div>
    );
}

const HomeSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Home {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default HomeSocket;
