import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import AddUsers from "../../sidePanel/header/newGroupChat/AddUsers";
import AddUsersToChat from "./AddUsersToChat";


const ChatInfo = ({}) => {
    const { currentChat } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const oldAdmins = currentChat.admins;
    const adminIds = oldAdmins.map(admin => admin._id);

    const [admins] = useState(adminIds);
    const [changes, setChanges] = useState({});

    // user role
    const userRole = currentChat.members.find(member => member.user._id === user._id).role;
    //console.log("curr",userRole)
    //const currentUserRole = currentMember ? currentMember.role : 'user';


    console.log("admins", currentChat.admins)
    const usersRoles = currentChat.members;
    const users = usersRoles.map(member => member.user)
    console.log("users",users)
    const owner = users[0];

    const handleRoleChange = (userId, isAdmin) => {
        setChanges(prevChanges => ({
            ...prevChanges,
            [userId]: isAdmin
        }));
        console.log("sc", changes);
    };

    const handleSubmit = () => {
        // Update the admins list based on changes
        let updatedAdmins = [...admins];

        Object.keys(changes).forEach(userId => {
            if (changes[userId] && !updatedAdmins.includes(userId)) {
                updatedAdmins.push(userId); // Add to admins
            } else if (!changes[userId] && updatedAdmins.includes(userId)) {
                updatedAdmins = updatedAdmins.filter(adminId => adminId !== userId); // Remove from admins
            }
        });
        console.log("upd adm",updatedAdmins);

        // Send the updated list of admins to the backend
        /*axios.put('/api/admins', { admins: updatedAdmins }).then(response => {
            console.log('Admins updated successfully:', response);
        }).catch(error => {
            console.error('Error updating admins:', error);
        });*/
    };

    const handleDeleteUser = () => {

        };


    console.log("adm",adminIds);

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2 className="chat-name">{currentChat.name}</h2>
                <p className="user-count">Number of users: {users.length}</p>
                <p className="owner">Chat owner: {owner.name}</p>
                <div className="users-list">
                    <div className="user-row header">
                        <span>User</span>
                        {userRole==="owner" && <span>Admin</span>}
                        {(userRole==="owner" || userRole==="admin") && <span>Delete</span>}
                    </div>
                    {users.map(user => (
                        <div key={user._id} className="user-row">
                            <span>{user.name}</span>
                            {userRole==="owner" && (
                                <input
                                    type="checkbox"
                                    checked={changes[user._id] ?? admins.includes(user._id)}
                                    onChange={(e) => handleRoleChange(user._id, e.target.checked)}
                                />
                            )}
                            {(userRole==="owner" || userRole==="admin") && (
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            )}
                        </div>
                    ))}
                </div>
                {(userRole==="owner" || userRole==="admin") && (
                    <>
                        <button className="submit-button" onClick={handleSubmit}>Submit Changes</button>
                        <AddUsersToChat


                        />
                    </>

                )}
            </div>
        </div>
    );
};

export default ChatInfo;

