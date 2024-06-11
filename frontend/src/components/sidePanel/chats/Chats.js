import { useSelector } from "react-redux";
import Chat from "./Chat";


const Chats = () => {
    const { chats } = useSelector((state) => state.chats);

    return (
        <div className="chatList">
            <ul>
                {chats && chats.map((convo) => (
                    <Chat convo={convo} key={convo._id} />
                ))}
            </ul>



        </div>

    );
}

export default Chats;