//import friendAvatar from "../images/gl.png"
import friendAvatar from "../../images/avatar.png"
import phoneCall from "../../images/phone-call.png"
import videoCall from "../../images/video-call.png"
import info from "../../images/information.png"
import emojiIcon from "../../images/emoji.png"
import attachments from "../../images/attachment.png"
import sendButton from "../../images/send-button.png"

import EmojiPicker from "emoji-picker-react";
import {useEffect, useState} from "react";
import Header from "./Header";
import Center from "./Center";
import {useDispatch, useSelector} from "react-redux";
import {getChatMessages} from "../../redux/actions/chatActions";


const ChatWindow = () => {
    const dispatch = useDispatch();
    const {currentChat, messages} = useSelector((state) => state.chats);
    const {user} = useSelector((state) => state.user);
    const values = {
        token: user.token,
        chatID: currentChat?._id,
    };

    useEffect(() => {
        if (currentChat?._id) {
            dispatch(getChatMessages(values));
        }
    }, [currentChat]);
    console.log("msg: ", messages);

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");


    const handleEmojiClick = e => {
        setText(prevState => prevState + e.emoji)
    };

    console.log(text)


    return (
        <div className="chatWindow">

            <Header />

            <Center />

            <div className="bottom">
                <div className="icons">
                    <img src={attachments} alt="" />
                </div>
                <input type="text"
                       placeholder="Say hello"
                       value={text}
                       onChange={e=>setText(e.target.value)}/>

                <div className="emoji">
                    <img src={emojiIcon}
                         alt=""
                         onClick={()=>setOpen(prevState => !prevState)}
                    />
                    <div className="emojiPicker">
                        <EmojiPicker open={open} onEmojiClick={handleEmojiClick}/>
                    </div>

                </div>
                <button>
                    <div className="icons">
                        <img src={sendButton} alt=""/>
                    </div>
                </button>
            </div>

        </div>
    );
}

export default ChatWindow;