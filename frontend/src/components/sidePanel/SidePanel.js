import UserInfo from "./header/UserInfo";
import SearchBar from "./search/SearchBar";
import Chats from "./chats/Chats";
import React, {useRef, useState} from "react";
import SearchResults from "./search/SearchResults";
import CreateGroup from "./header/newGroupChat/newGroupChat";

const SidePanel = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showNewGroup, setShowNewGroup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null); // Create a ref for the input element

    console.log(searchResults);

    return (
        <div className="sidePanel">
            <UserInfo setShowNewGroup={setShowNewGroup}/>

            {showNewGroup ? (
                <CreateGroup setShowNewGroup={setShowNewGroup} />
            ) : (
                <>
                    <SearchBar
                        setSearchResults={setSearchResults}
                        inputRef={inputRef}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />

                    {searchResults.length > 0 ? (
                        <SearchResults
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            inputRef={inputRef}
                            setInputValue={setInputValue}
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