import addFriend from "../../../images/add-friend.png";
//import clearIcon from "../../../images/clear-search.png"
import axios from "axios";
//import { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ searchLength, setSearchResults }) => {
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    //const inputRef = useRef(null); // Create a ref for the input element
    //const [show, setShow] = useState(false);

    const handleSearch = async (e) => {
        console.log(e.target.value);
        if (e.key === "Enter") {
            console.log("just clicked");

            try {
                const { data } = await axios.get(
                    `http://localhost:4000/api/user?search=${e.target.value}`,
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
            setSearchResults([]);
        }
    };

    /*const handleInputChange = (e) => {
        if (e.target.value === '') {
            setSearchResults([]); // Clear search results
        }
        setShow(e.target.value !== ''); // Show or hide the clear icon based on input value
    };

    const handleClearInput = () => {
        inputRef.current.value = ''; // Clear the input field
        setSearchResults([]); // Clear search results
        setShow(false); // Hide the clear icon
    };*/

    return (
        <div className="search">
            <div className="searchBar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search"
                    onKeyDown={(e) => handleSearch(e)}
                />
            </div>

            <img src={addFriend} alt="" className="add-chat" />
        </div>
    );
}

export default SearchBar;