import UserInfo from "./sidePanel/UserInfo";
import SearchBar from "./sidePanel/SearchBar";
import ChatList from "./sidePanel/ChatList";
import Chats from "./sidePanel/chats/Chats";

const SidePanel = () => {

    return (
        <div className="sidePanel">
            <UserInfo />
            <SearchBar />
            <Chats />
            {/*<ChatList />*/}
        </div>

    );
}

export default SidePanel;