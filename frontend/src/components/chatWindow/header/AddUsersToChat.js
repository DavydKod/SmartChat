import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import axios from "axios";
import AddUsers from "../../sidePanel/header/newGroupChat/AddUsers";
import doneIcon from "../../../images/done.png";

export default function AddUsersToChat( {setShowChatInfo} ) {
    const { user } = useSelector((state) => state.user);
    const { currentChat } = useSelector((state) => state.chats);
    const { status } = useSelector((state) => state.chats);

    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const chatMembers = currentChat.members.map(member => member.user._id);

    const handleSearch = async (e) => {
        setSearchResults([]);
        if (e.target.value && e.key === "Enter") {

            try {
                const { data } = await axios.get(
                    `http://localhost:4000/api/user?search=${e.target.value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                if (data.length > 0) {
                    let tempArray = [];
                    data.forEach(user => {
                        let temp = {
                            value: user._id,
                            label: user.name + " @"+user.tag,
                            avatar: ""
                        };
                        if (!chatMembers.includes(temp.value)) {
                            tempArray.push(temp);
                        }

                    });
                    setSearchResults(tempArray);
                } else {
                    setSearchResults([]);
                }

            } catch (error) {}
        } else {
            setSearchResults([]);
        }
    };

    const addMembersHandler = async () => {
        if (status !== "loading") {
            let members = [];
            selectedUsers.forEach((member) => {
                members.push(member.value);
            });
            let values = {
                userId: user._id,
                memberIds: members,
                token: user.token
            };

            try {
                const { data } = await axios.post(
                    `http://localhost:4000/api/chat/addMembers`,
                    {
                        chatId: currentChat._id,
                        memberIds: members
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

            } catch (error) {
                console.log(error.response.data.error.message);
            }

        }
        setShowChatInfo(false);

    };


    return (
        <div className="">

            <div className="mt-5">

                <AddUsers
                    searchResults={searchResults}
                    setSelectedUsers={setSelectedUsers}
                    handleSearch={handleSearch}
                />

                <button
                    className="hover:bg-amber-300 p-1 rounded-full"
                    onClick={() => addMembersHandler()}
                >Add
                    <div className="icons">
                            <img src={doneIcon} alt="" className="w-12 h-12 rounded-full" />
                        </div>
                </button>

            </div>
        </div>
    );
}