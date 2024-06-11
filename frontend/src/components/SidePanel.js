import UserInfo from "./sidePanel/UserInfo";
import SearchBar from "./sidePanel/search/SearchBar";
import ChatList from "./sidePanel/ChatList";
import Chats from "./sidePanel/chats/Chats";
import {useState} from "react";
import SearchResults from "./sidePanel/search/SearchResults";

const SidePanel = () => {
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults)

    return (
        <div className="sidePanel">
            <UserInfo />
            <SearchBar
                searchLength={searchResults.length}
                setSearchResults={setSearchResults}
            />
            {searchResults.length > 0 ? (
                <>
                    <SearchResults searchResults={searchResults}/>
                </>
            ) : (
                <>
                    <Chats />
                    {/*<ChatList />*/}
                </>
            )}

        </div>

    );
}

export default SidePanel;