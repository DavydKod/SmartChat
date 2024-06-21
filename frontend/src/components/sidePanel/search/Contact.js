import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";
import SocketContext from "../../../context/Context";

function Contact ( { socket, contact, setSearchResults, inputRef, setInputValue }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)

    const values = {
        userId: user._id,
        memberIds: [contact._id],
        token: user.token,
    };

    const openChat = async () => {
        let foundChat = await dispatch(createChat(values));
        socket.emit("open chat", foundChat.payload._id)
        setSearchResults([]);
        inputRef.current.value = '';
        setInputValue('');
    };

    return (
        <li
            onClick={() => openChat()}
            className="">

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>{contact.name}</span>
                </div>
            </div>
        </li>
    )

}

const ContactSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Contact {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ContactSocket;