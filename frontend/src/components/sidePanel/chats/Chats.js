import { useSelector } from "react-redux";
import Chat from "./Chat";


const Chats = () => {
    const { chats, currentChat } = useSelector((state) => state.chats);

    return (
        <div className="chatList">
            <ul>
                {chats && chats
                    .filter((c) => c.lastMessage || c._id === currentChat._id)
                    .map((convo) => (
                    <Chat chat={convo} key={convo._id} />
                ))}
            </ul>



        </div>

    );
}

export default Chats;