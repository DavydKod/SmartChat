import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";
import dateHandler from "../../../utils/msgDate"


const Chat = ({chat}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)
    const users = chat.members;
    const friend = users[1].user;
    console.log("friend", friend)
    const receiverId = friend._id;
    console.log("receiverId", receiverId)


    const values = {
        userId: user._id,
        receiverId: receiverId,
        token: user.token,
    };

    const openChat=()=>{
        dispatch(createChat(values))
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

export default Chat;