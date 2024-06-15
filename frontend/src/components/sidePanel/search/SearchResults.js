import Contact from "./Contact";

const SearchResults = ({ searchResults, setSearchResults }) => {

    return (
        <div className="chatList">
            <ul>
                {
                    searchResults && searchResults.map((user)=>
                    <Contact
                        contact={user}
                        key={user._id}
                        setSearchResults={setSearchResults}
                    />
                    )
                }
            </ul>
        </div>


    )
}

export default SearchResults;