import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";
import dateHandler from "../../../utils/msgDate"
import SocketContext from "../../../context/Context";


function Chat ({chat, socket}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)
    const users = chat.members;

    const memberIds = users.map(member => member.user._id).filter(id => id !== user._id);

    // for private chats
    const friend = users[0].user._id === user._id ? users[1].user : users[0].user;

    const values = {
        token: user.token,
        userId: user._id,
        memberIds: memberIds,
        chatName: chat.name,
        isGroup: chat.isGroup
    };

    const openChat = async () => {
        await dispatch(createChat(values));
        socket.emit("open chat", chat._id)
    };


    return (
        <li
            onClick={() => openChat()}
            className="">

            <div className="item flex justify-between items-start p-4 border-b border-gray-300">
                <div className="flex items-start">
                    <img src={friendAvatar} alt="Friend Avatar" className="w-12 h-12 rounded-full mr-4"/>
                    <div className="texts">
                    <span className="block font-bold text-lg">
                        {chat.isGroup ? chat.name : friend.name}
                    </span>
                        <p style={{color: 'black', fontSize: '16px'}}>
                            {chat.lastMessage?.text.length > 20
                                ? `${chat.lastMessage?.text.substring(0, 20)}...`
                                : chat.lastMessage?.text}
                        </p>
                    </div>
                </div>
                <div className="date-time-container">
                <span style={{color: 'black', fontSize: '14px'}}>
                    {chat.lastMessage?.createdAt ? dateHandler(chat.lastMessage?.createdAt) : ""}
                </span>
                </div>
            </div>

        </li>

    );
}

const ChatSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Chat {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default ChatSocket;