import {useSelector} from "react-redux";
import Message from "./Message";


const Center = () => {
    const {currentChat} = useSelector((state) => state.chats);
    const {messages} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);



    return (
        <div className="center">

            {
                messages && messages.map((message)=> (
                    <Message
                        message={message.text}
                        time={message.createdAt}
                        key={message._id}
                        author={user._id===message.senderID._id}/>
                ))
            }

        </div>

    );
}

export default Center;