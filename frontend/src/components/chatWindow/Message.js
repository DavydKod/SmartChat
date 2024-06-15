import dateHandler from "../../utils/msgDate";


const Message = ({ message, time, author }) => {



    return (
        <div className={`message relative
        ${author ? "own" : "texts"}
        `}
        >
            <div className="texts">
                <p>{message}</p>

                <span className="text-xs text-black">
                    {dateHandler(time)}
                </span>
            </div>

        </div>

    );
}

export default Message;