import UserInfo from "./UserInfo";
import SearchBar from "./search/SearchBar";
import Chats from "./chats/Chats";
import {useState} from "react";
import SearchResults from "./search/SearchResults";

const SidePanel = () => {
    const [searchResults, setSearchResults] = useState([]);
    console.log(searchResults);

    return (
        <div className="sidePanel">
            <UserInfo />
            <SearchBar
                searchLength={searchResults.length}
                setSearchResults={setSearchResults}
            />

            {searchResults.length > 0 ? (
                <>
                    <SearchResults
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
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