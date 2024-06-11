import addFriend from "../../../images/add-friend.png";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({searchLength, setSearchResults}) => {

    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const [show, setShow] = useState(false);

    const handleSearch = async (e) => {
        console.log(e.target.value);
        if (e.key === "Enter") {
            console.log("just clicked")
            try {
                const { data } = await axios.get(
                    `http://localhost:4000/api/search?search=${e.target.value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setSearchResults(data);
            } catch (error) {
                console.log(error.response.data.error.message);
            }
        } else {
            setSearchResults([])
        }
    };



    return (
        <div className="search">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search"
                    onKeyDown={(e) => handleSearch(e)}
                />
            </div>

            <img src={addFriend} alt="" className="add-chat"/>
        </div>

    );
}

export default SearchBar;