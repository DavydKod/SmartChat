import friendAvatar from "../../../images/avatar.png";
import info from "../../../images/information.png";
import close from "../../../images/close.png"
import {useSelector} from "react-redux";
import React, {useState} from "react";
import MenuChat from "./MenuChat";


const Header = () => {
    //const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const {currentChat} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);
    const {name} = currentChat;
    const users = currentChat.members;
    const friend = users[0].user._id === user._id ? users[1].user : users[0].user;

    if (Object.keys(currentChat).length === 0) {
        return null;
    }

    const handleClose = () => {
        console.log('Closing chat...');
    };

    return (
        <div className="top">

            <div className="user">
                <img src={friendAvatar} alt="" className=""/>
                <div className="texts">
                    <span>{currentChat.isGroup ? name : friend.name}</span>
                    <p>Online</p>
                </div>
            </div>

            <div className="icons relative" onClick={() => setShowMenu((prev) => !prev)}>
                <button>
                    <img src={info} alt=""/>
                </button>
                {showMenu ? <MenuChat /> : null}

                <button onClick={handleClose}>
                    <img src={close} alt="" />
                </button>
            </div>

        </div>

    );
}

export default Header;
