import friendAvatar from "../../../images/avatar.png";
import info from "../../../images/information.png";
import close from "../../../images/close.png"
import {useSelector} from "react-redux";
//import {useNavigate} from "react-router-dom";


const Header = () => {
    //const navigate = useNavigate();
    const {currentChat} = useSelector((state) => state.chats);
    const {name} = currentChat;
    const users = currentChat.members;
    const friend = users[1].user;

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
            <div className="icons">
                <img src={info} alt=""/>

                <button onClick={handleClose}>
                    <img src={close} alt="" />
                </button>
            </div>
        </div>

    );
}

export default Header;
