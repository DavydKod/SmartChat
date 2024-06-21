import React, {useEffect, useState} from "react";
import Header from "./header/Header";
import Center from "./Center";
import {useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../redux/actions/chatActions";
import Bottom from "./bottom/Bottom";
import UserProfile from "../sidePanel/header/UserProfile";
import CreateGroup from "../sidePanel/header/newGroupChat/newGroupChat";
import SearchBar from "../sidePanel/search/SearchBar";
import SearchResults from "../sidePanel/search/SearchResults";
import Chats from "../sidePanel/chats/Chats";
import ChatInfo from "./header/ChatInfo";



const ChatWindow = () => {

    const [showChatInfo, setShowChatInfo] = useState(false);

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

    const handleClose = () => {
        setShowChatInfo(false);
    };


    return (
        <div className="chatWindow">

            <Header setShowChatInfo={setShowChatInfo} />


            {showChatInfo ? (
                <ChatInfo
                    onClose={handleClose}
                    setShowChatInfo={setShowChatInfo} />
            ) : (
                <>
                    <Center />
                </>
            )}

            <Bottom />

        </div>
    );
}

export default ChatWindow;