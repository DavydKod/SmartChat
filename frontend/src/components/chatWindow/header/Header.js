import friendAvatar from "../../../images/avatar.png";
import info from "../../../images/information.png";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import MenuChat from "./MenuChat";

const Header = ( { setShowChatInfo } ) => {
    const [showChatMenu, setShowChatMenu] = useState(false);
    const {currentChat} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);
    const {name} = currentChat;
    const users = currentChat.members;

    // for private chats
    let friend;
    if (!currentChat.isGroup) {
        friend = users[0].user._id === user._id ? users[1].user : users[0].user;
    }

    if (Object.keys(currentChat).length === 0) {
        return null;
    }

    return (
        <div className="top">

            <div className="user">
                <img src={friendAvatar} alt="" className=""/>
                <div className="texts">
                    <span>{currentChat.isGroup ? name : friend.name}</span>
                </div>
            </div>

            <div className="icons relative" onClick={() => setShowChatMenu((prev) => !prev)}>
                <button>
                    <img src={info} alt=""/>
                </button>
                {showChatMenu && (
                    <MenuChat setShowChatMenu={setShowChatMenu}
                              setShowChatInfo={setShowChatInfo}
                    />
                )}

            </div>

        </div>

    );
}

export default Header;
