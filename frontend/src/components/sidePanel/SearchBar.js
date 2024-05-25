import addFriend from "../../images/add-friend.png";


const SearchBar = () => {

    return (
        <div className="search">
            <div className="searchBar">
                <input type="text" placeholder="Search"/>
            </div>
            <img src={addFriend} alt="" className="add-chat"/>
        </div>

    );
}

export default SearchBar;