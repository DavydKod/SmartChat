


const Message = ({ message, author }) => {



    return (
        <div className={`message relative
        ${author ? "own" : "texts"}
        `}
        >
            <div className="texts">
                <p>{message}</p>

                <span className="text-xs text-black">
                    1 min ago
                </span>
            </div>

        </div>

    );
}

export default Message;