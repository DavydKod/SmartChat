import axios from "axios";
import clearIcon from "../../../images/clear.png"
import { useSelector } from "react-redux";
import {useRef, useState} from "react";

const SearchBar = ({ searchLength, setSearchResults }) => {
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const inputRef = useRef(null); // Create a ref for the input element
    const [inputValue, setInputValue] = useState('');

    const handleSearch = async (e) => {
        console.log(e.target.value);
        if (e.target.value && e.key === "Enter") {
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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value === '') {
            setSearchResults([]);
        }
    };

    const handleClearInput = () => {
        inputRef.current.value = '';
        setInputValue('');
        setSearchResults([]);
    };

    return (
        <div className="search">
            <div className="searchBar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search"
                    onKeyDown={(e) => handleSearch(e)}
                    onChange={(e) => handleInputChange(e)}
                    ref={inputRef}
                    style={{ flex: 1, paddingLeft: '5px', paddingRight: '30px' }}
                />
                {inputValue && (
                    <img
                        src={clearIcon}
                        alt="Clear"
                        onClick={handleClearInput}
                        style={{
                            position: 'absolute',
                            right: '5px',
                            cursor: 'pointer',
                            width: '32px',
                            height: '32px'
                        }}
                    />
                )}
            </div>

            {/*<img src={addFriend} alt="" className="add-chat" />*/}
        </div>
    );
}

export default SearchBar;