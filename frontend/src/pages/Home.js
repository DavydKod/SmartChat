import SidePanel from "../components/sidePanel/SidePanel";
import ChatWindow from "../components/chatWindow/ChatWindow";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChats} from "../redux/actions/chatActions";
import Welcome from "../components/chatWindow/Welcome";


const Home = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {currentChat} = useSelector((state) => state.chats)
    console.log(currentChat)

    // get user chats
    useEffect(() => {
        if (user?.token) {
            const userId = user._id;
            console.log(userId);
            dispatch(getChats({token: user.token, userId }));
        }
    }, [user, dispatch])

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-custom-image">
            {/* ChatWindow App container below. Background above. */}
            <div className="flex w-[90vw] h-[90vh] bg-[rgba(255,255,255,0.50)] shadow-lg rounded-[12px] p-8 backdrop-blur-saturate border-custom">
                <SidePanel />
                {currentChat._id ? <ChatWindow /> : <Welcome />}
                {/*<ChatWindow />*/}
            </div>
        </div>
    );
}

export default Home;
