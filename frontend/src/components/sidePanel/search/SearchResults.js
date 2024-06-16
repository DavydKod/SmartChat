import Contact from "./Contact";

const SearchResults = ({ searchResults, setSearchResults, inputRef, setInputValue }) => {

    return (
        <div className="chatList">
            <ul>
                {
                    searchResults && searchResults.map((user)=>
                    <Contact
                        contact={user}
                        key={user._id}
                        setSearchResults={setSearchResults}
                        inputRef={inputRef}
                        setInputValue={setInputValue}
                    />
                    )
                }
            </ul>
        </div>


    )
}

export default SearchResults;