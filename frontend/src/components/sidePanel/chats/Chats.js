import { useSelector } from "react-redux";
import Chat from "./Chat";


const Chats = () => {
    const { chats, currentChat } = useSelector((state) => state.chats);

    return (
        <div className="chatList">
            <ul>
                {chats && chats
                    .filter((c) => c.lastMessage || c._id === currentChat._id || c.isGroup)
                    .map((chat) => (
                    <Chat chat={chat} key={chat._id} />
                ))}
            </ul>

        </div>

    );
}

export default Chats;