import emojiIcon from "../../../images/emoji.png";
import EmojiPicker from "emoji-picker-react";
import sendButton from "../../../images/send-button.png";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../redux/actions/chatActions";
import SocketContext from "../../../context/Context";

function Bottom ( {socket}) {
    const dispatch = useDispatch();
    const { currentChat } = useSelector((state)=>state.chats)
    const { user } = useSelector((state)=>state.user)
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [cursorPosition, setCursorPosition] = useState();
    const inputRef = useRef(null);

    const inputHandler = e => {
        setText(e.target.value);
    }

    const handleEmojiClick = (e) => {
        const ref = inputRef.current;
        ref.focus();
        const cursorPosition = ref.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPosition);
        const textAfterCursor = text.substring(cursorPosition);
        const newText = textBeforeCursor + e.emoji + textAfterCursor;
        setText(newText);
        setCursorPosition(textBeforeCursor.length + e.length);
    };

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let textMessage = await dispatch(sendMessage({
            message: text,
            chatID: currentChat._id,
            token: user.token,
            content: [],
        } ));
        const membersIds = currentChat.members.map(member => member.user._id);
        socket.emit("send message", textMessage.payload, membersIds);
        setText("");
    };


    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="bottom">

            <input
                type="text"
                placeholder="Type a message"
                value={text}
                onChange={inputHandler}
                ref={inputRef}
            />

            <div className="emoji">
                <img
                    src={emojiIcon}
                    alt=""
                    onClick={() => setOpen((prevState) => !prevState)}
                />
                {open && (
                    <div className="emojiPicker">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>

            <button type="submit">
                <div className="icons">
                    <img src={sendButton} alt="" />
                </div>
            </button>

        </form>
    );
}

const BottomSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Bottom {...props} socket={socket} />}
    </SocketContext.Consumer>
);

export default BottomSocket;