import UserInfo from "./header/UserInfo";
import SearchBar from "./search/SearchBar";
import Chats from "./chats/Chats";
import React, {useState} from "react";
import SearchResults from "./search/SearchResults";
import CreateGroup from "./header/newGroupChat/newGroupChat";

const SidePanel = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showNewGroup, setShowNewGroup] = useState(false);

    console.log(searchResults);

    return (
        <div className="sidePanel">
            <UserInfo setShowNewGroup={setShowNewGroup}/>

            {showNewGroup ? (
                <CreateGroup setShowNewGroup={setShowNewGroup} />
            ) : (
                <>
                    <SearchBar
                        searchLength={searchResults.length}
                        setSearchResults={setSearchResults}
                    />

                    {searchResults.length > 0 ? (
                        <SearchResults
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                        />
                    ) : (
                        <Chats />
                    )}
                </>
            )}
        </div>
    );

}

export default SidePanel;