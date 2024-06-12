import friendAvatar from "../../images/avatar.png";
import info from "../../images/information.png";
import {useSelector} from "react-redux";


const Header = () => {
    const {currentChat} = useSelector((state) => state.chats);
    const {name} = currentChat;

    return (
        <div className="top">
            <div className="user">
                <img src={friendAvatar} alt="" className=""/>
                <div className="texts">
                    <span>{name}</span>
                    <p>Last seen 5 days ago</p>
                </div>
            </div>
            <div className="icons">
                {/*<img src={phoneCall} alt=""/>
                    <img src={videoCall} alt=""/>*/}
                <img src={info} alt=""/>
            </div>
        </div>

    );
}

export default Header;
