import Contact from "./Contact";


const SearchResults = ({ searchResults, setSearchResults, setSearchPerformed }) => {


    return (
        <div className="chatList">
            {/*<div className="user">
                <h1 className="ml-1 border-b">Contacts</h1>
            </div>*/}
            {/*Results*/}
            <ul>
                {
                    searchResults && searchResults.map((user)=>
                    <Contact
                        contact={user}
                        key={user._id}
                        setSearchResults={setSearchResults}
                        setSearchPerformed={setSearchPerformed}
                    />
                    )
                }
            </ul>
        </div>


    )
}

export default SearchResults;