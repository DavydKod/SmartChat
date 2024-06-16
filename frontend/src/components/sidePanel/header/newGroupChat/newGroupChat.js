//import { useState } from "react";
//import { ReturnIcon, ValidIcon } from "../../../../svg";
//import UnderlineInput from "./UnderlineInput";
//import MultipleSelect from "./MultipleSelect";
import doneIcon from "../../../../images/done.png"
import { useDispatch, useSelector } from "react-redux";
//import ClipLoader from "react-spinners/ClipLoader";
//import { createGroupConversation } from "../../../../features/chatSlice";
import backIcon from "../../../../images/close.png"
import GroupName from "./GroupName";
import {useEffect, useState} from "react";
import AddUsers from "./AddUsers";
import axios from "axios";
import sendButton from "../../../../images/send-button.png";


export default function CreateGroup({ setShowNewGroup }) {
    const { user } = useSelector((state) => state.user);
    const { status } = useSelector((state) => state.chats);
    const [groupName, setGroupName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSearch = async (e) => {
        console.log(e.target.value);
        setSearchResults([]);
        if (e.target.value && e.key === "Enter") {
            console.log("just clicked");

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
                            label: user.name + " " + "@"+user.tag,
                            avatar: ""
                        };
                        tempArray.push(temp);
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
    console.log("selec", selectedUsers);




    return (
        <div className="createGroupAnimation relative flex0030 h-full z-40">
            {/*Container*/}
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
                    <button className="hover:bg-amber-300 p-1 rounded-full">
                        <div className="icons">
                            <img src={doneIcon} alt="" className="w-12 h-12 rounded-full" />
                        </div>
                    </button>

                </div>


            </div>
        </div>
    );
}