import doneIcon from "../../../../images/done.png"
import {useDispatch, useSelector} from "react-redux";
import backIcon from "../../../../images/close.png"
import GroupName from "./GroupName";
import {useState} from "react";
import AddUsers from "./AddUsers";
import axios from "axios";
import {createChat} from "../../../../redux/actions/chatActions";


export default function CreateGroup({ setShowNewGroup }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { status } = useSelector((state) => state.chats);
    const [groupName, setGroupName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

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
                        tempArray.push(temp);
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

    const createGroupHandler = async () => {
        if (status !== "loading") {
            let members = [];
            selectedUsers.forEach((member) => {
                members.push(member.value);
            });
            let values = {
                userId: user._id,
                chatName: groupName,
                memberIds: members,
                isGroup: true,
                token: user.token
            };
            let groupChat = await dispatch(createChat(values));
            setShowNewGroup(false);
        }
    };


    return (
        <div className="createGroupAnimation relative flex0030 h-full z-40">

            <div className="mt-5">

                <button
                    className="hover:bg-amber-200 p-1 rounded-full"
                    onClick={() => setShowNewGroup(false)}
                >
                    <img src={backIcon} alt="" style={{ width: '32px', height: '32px' }} />
                </button>

                <GroupName groupName={groupName} setGroupName={setGroupName} />

                <AddUsers
                    searchResults={searchResults}
                    setSelectedUsers={setSelectedUsers}
                    handleSearch={handleSearch}
                />

                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 max-h-fit">
                    <button
                        className="hover:bg-amber-300 p-1 rounded-full"
                        onClick={() => createGroupHandler()}
                    >
                        <div className="icons">
                            <img src={doneIcon} alt="" className="w-12 h-12 rounded-full" />
                        </div>
                    </button>

                </div>


            </div>
        </div>
    );
}