import userAvatar from '../../../images/avatar.png';
import moreIcon from "../../../images/menu.png";
import React, {useState} from "react";
import DropMenu from "./DropMenu";
import {useSelector} from "react-redux";

const UserInfo = ( { setShowNewGroup, setUserPr, deleteUser }) => {
    const {user} = useSelector((state) => state.user);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className="userInfo">

                <div className="user">
                    <img src={userAvatar} alt="" className="w-12 h-12 rounded-full object-cover"/>
                    <h2>{user.name}</h2>
                </div>

                <li className="icons relative" onClick={() => setShowMenu((prev) => !prev)}>
                    <button className="">
                        <img src={moreIcon} alt=""/>
                    </button>
                    {showMenu ? <DropMenu
                        setShowNewGroup={setShowNewGroup}
                        setUserPr={setUserPr}
                        deleteUser={deleteUser}
                    /> : null}
                </li>

            </div>

        </>

    );
}

export default UserInfo;


