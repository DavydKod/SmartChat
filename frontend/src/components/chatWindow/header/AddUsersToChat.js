import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import axios from "axios";
import {createChat} from "../../../redux/actions/chatActions";
import backIcon from "../../../images/close.png";
import GroupName from "../../sidePanel/header/newGroupChat/GroupName";
import AddUsers from "../../sidePanel/header/newGroupChat/AddUsers";
import doneIcon from "../../../images/done.png";

export default function AddUsersToChat() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { currentChat } = useSelector((state) => state.chats);
    const { status } = useSelector((state) => state.chats);

    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const chatMembers = currentChat.members.map(member => member.user._id);
    console.log("chatMembers",chatMembers);
    //const users = usersRoles.map(member => member.user)

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
                        console.log("temp",temp);
                        if (!chatMembers.includes(temp.value)) {
                            tempArray.push(temp);
                        }

                    });
                    setSearchResults(tempArray);
                } else {
                    setSearchResults([]);
                }

            } catch (error) {
                console.log(error.response.data.error.message);
            }
        } else {
            setSearchResults([]);
        }
    };

    /*const addMembersHandler = async () => {
        if (status !== "loading") {
            let members = [];
            selectedUsers.forEach((member) => {
                members.push(member.value);
            });
            let values = {
                userId: user._id,
                chatName: groupName,
                memberIds: members,
                token: user.token
            };
            let updatedChat = await dispatch(createChat(values));
        }
    };*/


    return (
        <div className="">
            {/*Container*/}
            <div className="mt-5">

                {/*<button
                    className="hover:bg-amber-200 p-1 rounded-full"
                    onClick={() => setShowNewGroup(false)}
                >
                    <img src={backIcon} alt="" style={{ width: '32px', height: '32px' }} />
                </button>*/}

                {/*<GroupName groupName={groupName} setGroupName={setGroupName} />*/}

                <AddUsers
                    searchResults={searchResults}
                    setSelectedUsers={setSelectedUsers}
                    handleSearch={handleSearch}
                />

                <button
                    className="hover:bg-amber-300 p-1 rounded-full"
                >Add
                    {/*<div className="icons">
                            <img src={doneIcon} alt="" className="w-12 h-12 rounded-full" />
                        </div>*/}
                </button>

                {/*<div className=" bottom-1/3 left-1/2 -translate-x-1/2 max-h-fit">


                </div>*/}


            </div>
        </div>
    );
}