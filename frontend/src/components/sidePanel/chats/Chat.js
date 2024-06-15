import friendAvatar from "../../../images/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {createChat} from "../../../redux/actions/chatActions";


const Chat = ({convo}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.user)
    const users = convo.members;
    const receiverId = users[0].user._id === user._id ? users[1].user._id : users[0].user._id;

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

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>{convo.name}</span>
                    <p>{convo.lastMessage?.text.length>20 ? `${convo.lastMessage?.text.substring(0,20)}...`
                        : convo.lastMessage?.text}</p>
                </div>

                {/*Right*/}
                <div className="texts">
                    <p className="flex-end mt-8 ml-10">
                        {convo.lastMessage?.createdAt}
                    </p>
                </div>
            </div>


        </li>

    );
}

export default Chat;