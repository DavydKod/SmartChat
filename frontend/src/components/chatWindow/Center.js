import {useSelector} from "react-redux";
import Message from "./Message";
import {useEffect, useRef} from "react";


const Center = () => {
    const {messages} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);
    const chatEnd = useRef();

    useEffect(() => {
        scroll();
    }, [messages]);
    const scroll = () => {
        chatEnd.current.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <div className="center">

            {
                messages && messages.map((message)=> (
                    <Message
                        message={message}
                        sender={message.senderID}
                        time={message.createdAt}
                        key={message._id}
                        author={user._id===message.senderID._id}/>
                ))
            }

            <div className="mt-2" ref={chatEnd}></div>

        </div>

    );
}

export default Center;