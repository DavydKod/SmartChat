import {useEffect} from "react";
import Header from "./header/Header";
import Center from "./Center";
import {useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../redux/actions/chatActions";
import Bottom from "./bottom/Bottom";


const ChatWindow = () => {
    const dispatch = useDispatch();
    const {currentChat, messages} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);
    const values = {
        token: user.token,
        chatID: currentChat?._id,
    };

    useEffect(() => {
        if (currentChat?._id) {
            dispatch(getChatMessages(values));
        }
    }, [dispatch, currentChat]);
    console.log("msg: ", messages);


    return (
        <div className="chatWindow">

            <Header />

            <Center />

            <Bottom />

        </div>
    );
}

export default ChatWindow;