import Contact from "./Contact";


const SearchResults = ({ searchResults }) => {


    return (
        <div className="chatList">
            {/*<div className="user">
                <h1 className="ml-1 border-b">Contacts</h1>
            </div>*/}
            {/*Results*/}
            <ul>
                {
                    searchResults && searchResults.map((user)=>
                    <Contact contact={user} key={user._id}/>
                    )
                }
            </ul>
        </div>


    )
}

export default SearchResults;