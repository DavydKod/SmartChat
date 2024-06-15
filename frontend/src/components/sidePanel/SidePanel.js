import UserInfo from "./UserInfo";
import SearchBar from "./search/SearchBar";
import ChatList from "./ChatList";
import Chats from "./chats/Chats";
import {useState} from "react";
import SearchResults from "./search/SearchResults";

const SidePanel = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    console.log(searchResults);

    return (
        <div className="sidePanel">
            <UserInfo />
            <SearchBar
                searchLength={searchResults.length}
                setSearchResults={setSearchResults}
                setSearchPerformed={setSearchPerformed}
            />

            {searchPerformed ? (
                <>
                    <SearchResults
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        setSearchPerformed={setSearchPerformed}
                    />
                </>
            ) : (
                <>
                    <Chats />
                </>
            )}
        </div>
    );
}

export default SidePanel;