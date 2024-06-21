import dateHandler from "../../utils/msgDate";
import avatar from "../../images/avatar.png"


const Message = ({ message, sender, time, author }) => {

    return (
        <div className={`message relative
        ${author ? "own" : "texts"}
        `}
        >
            <div className="texts flex items-start">

                {!author && message.chatID.isGroup && (
                    <div className="mr-4 flex items-center">
                        <img
                            src={avatar}
                            alt=""
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2">{message.senderID.name}</span>
                    </div>
                )}


                <p className="text-sm pb-4 pr-8">
                    {message.text}
                </p>

                <span className="text-xs text-black">
                    {dateHandler(time)}
                </span>
            </div>

        </div>

    );
}

export default Message;