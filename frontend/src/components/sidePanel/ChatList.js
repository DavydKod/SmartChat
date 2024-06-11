//import friendAvatar from "../../images/gl.png"
import friendAvatar from "../../images/avatar.png"
const ChatList = () => {

    return (
        <div className="chatList">

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Mike</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Andrew</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Vlad</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Henry</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>John</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Andy</span>
                    <p>Hello!</p>
                </div>
            </div>

            <div className="item">
                <img src={friendAvatar} alt=""/>
                <div className="texts">
                    <span>Alex</span>
                    <p>Hello!</p>
                </div>
            </div>

        </div>

    );
}

export default ChatList;