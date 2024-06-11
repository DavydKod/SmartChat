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