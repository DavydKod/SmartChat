//import { useState } from "react";
//import { ReturnIcon, ValidIcon } from "../../../../svg";
//import UnderlineInput from "./UnderlineInput";
//import MultipleSelect from "./MultipleSelect";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
//import ClipLoader from "react-spinners/ClipLoader";
//import { createGroupConversation } from "../../../../features/chatSlice";
import backIcon from "../../../../images/close.png"
import GroupName from "./GroupName";
import {useEffect, useState} from "react";
import AddUsers from "./AddUsers";


export default function CreateGroup({ setShowNewGroup }) {
    const [groupName, setGroupName] = useState("");

    return (
        <div className="createGroupAnimation relative flex0030 h-full z-40">
            {/*Container*/}
            <div className="mt-5">

                <button
                    className=""
                    onClick={() => setShowNewGroup(false)}
                >
                    <img src={backIcon} alt="" style={{ width: '18px', height: '18px' }} />
                </button>

                <GroupName groupName={groupName} setGroupName={setGroupName} />

                <AddUsers />


            </div>
        </div>
    );
}