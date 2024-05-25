import UserInfo from "./sidePanel/UserInfo";
import SearchBar from "./sidePanel/SearchBar";
import ChatList from "./sidePanel/ChatList";

const SidePanel = () => {

    return (
        <div className="sidePanel">
            <UserInfo />
            <SearchBar />
            <ChatList />
        </div>

    );
}

export default SidePanel;