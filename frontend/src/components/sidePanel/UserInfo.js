import userAvatar from '../../images/avatar.png';
import moreIcon from "../../images/menu.png"
import React from "react";


const UserInfo = () => {

    return (
        <div className="userInfo">
            <div className="user">
                <img src={userAvatar} alt="Description" className="w-12 h-12 rounded-full object-cover"/>
                <h2>Alex</h2>
            </div>
            <div className="icons">
                <img src={moreIcon} alt=""/>
            </div>

        </div>
    );
}

export default UserInfo;