//import friendAvatar from "../images/gl.png"
import friendAvatar from "../images/avatar.png"
import phoneCall from "../images/phone-call.png"
import videoCall from "../images/video-call.png"
import info from "../images/information.png"
import emojiIcon from "../images/emoji.png"
import attachments from "../images/attachment.png"
import sendButton from "../images/send-button.png"

import EmojiPicker from "emoji-picker-react";
import {useState} from "react";


const ChatWindow = () => {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");


    const handleEmojiClick = e => {
        setText(prevState => prevState + e.emoji)
    };

    console.log(text)


    return (
        <div className="chatWindow">

            <div className="top">
                <div className="user">
                    <img src={friendAvatar} alt="" className=""/>
                    <div className="texts">
                        <span>Andy</span>
                        <p>Last seen 5 days ago</p>
                    </div>
                </div>
                <div className="icons">
                    {/*<img src={phoneCall} alt=""/>
                    <img src={videoCall} alt=""/>*/}
                    <img src={info} alt=""/>
                </div>
            </div>

            <div className="center"></div>

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