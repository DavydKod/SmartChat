import friendAvatar from "../../../images/avatar.png";


const Chat = ({convo}) => {


    return (
        <li className="">

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>{convo.name}</span>
                    <p>{convo.lastMessage.text}</p>
                </div>

                {/*Right*/}
                <div className="add-chat">
                    <span className="add-chat">
                        {convo.lastMessage?.createdAt}
                    </span>
                </div>
            </div>


        </li>

);
}

export default Chat;