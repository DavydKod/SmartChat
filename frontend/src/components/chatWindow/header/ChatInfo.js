import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import AddUsers from "../../sidePanel/header/newGroupChat/AddUsers";
import AddUsersToChat from "./AddUsersToChat";
import Switch from "react-switch";


const ChatInfo = ({}) => {
    const { currentChat } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    console.log("user", user);
    const oldAdmins = currentChat.admins;
    const adminIds = oldAdmins.map(admin => admin._id);
    const chatMembers = currentChat.members.map(member => member.user);
    const initUsers = currentChat.members.map(member => member.user).filter(member => member._id !== user._id);


    const [users, setUsers] = useState(initUsers);
    const [admins, setAdmins] = useState(adminIds);
    const [changes, setChanges] = useState({});

    // user role
    const userRole = currentChat.members.find(member => member.user._id === user._id).role;
    //console.log("curr",userRole)
    //const currentUserRole = currentMember ? currentMember.role : 'user';


    console.log("admins", currentChat.admins)
    const usersRoles = currentChat.members;

    console.log("users",users)
    const owner = chatMembers[0];

    const handleRoleChange = async (userId) => {
        console.log("here");

        const newRole = admins.includes(userId) ? 'user' : 'admin';
        console.log("id: role",userId, newRole);
        setChanges(prevChanges => ({
            ...prevChanges,
            [userId]: newRole
        }));

        // Update local admin list
        if (admins.includes(userId)) {
            setAdmins(prevAdmins => prevAdmins.filter(adminId => adminId !== userId));
        } else {
            setAdmins(prevAdmins => [...prevAdmins, userId]);
        }
        console.log("adm",admins);

        try {
            await axios.put(
                `http://localhost:4000/api/chat/updateRole`,
                {
                    chatId: currentChat._id,
                    userId: userId,
                    role: newRole
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

        } catch (error) {
            console.log(error);
        }

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

    const handleDeleteUser = async (userId) => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));

        try {
            await axios.put(
                `http://localhost:4000/api/chat/deleteUser`,
                {
                    chatId: currentChat._id,
                    userId: userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteChat = async () => {
        try {
            await axios.delete(
                `http://localhost:4000/api/chat/deleteChat/${currentChat._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleLeaveChat = () => {

    };




    return (
        <div className="popup">
            <div className="popup-inner">
                <h2 className="chat-name">{currentChat.name}</h2>
                <p className="user-count">Number of users: {users.length + 1}</p>
                <p className="owner">Chat owner: {owner.name}</p>
                <div className="users-list">
                    <div className="user-row header">
                        <span>User</span>
                        {userRole === "owner" && <span>Admin</span>}
                        {(userRole === "owner" || userRole === "admin") && <span>Delete</span>}
                    </div>
                    {users.map(user => (
                        <div key={user._id} className="user-row">
                            <span>{user.name}</span>
                            {userRole === "owner" && (
                                <Switch
                                    onChange={() => handleRoleChange(user._id)}
                                    checked={changes[user._id] ? changes[user._id] === 'admin' : admins.includes(user._id)}
                                    offColor="#888"
                                    onColor="#0d6efd"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            )}
                            {(userRole === "owner" || userRole === "admin") && (
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            )}
                        </div>
                    ))}
                </div>
                {(userRole === "owner" || userRole === "admin") && (
                    <>
                        <button className="submit-button" onClick={handleSubmit}>Submit Changes</button>
                        <AddUsersToChat


                        />
                    </>

                )}

                <div className="chat-actions">
                    {(currentChat.isGroup && userRole === "owner") || !currentChat.isGroup ? (
                        <button className="delete-chat-button" style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '20px'
                        }} onClick={handleDeleteChat}>
                            Delete Chat
                        </button>
                    ) : (
                        <button className="leave-chat-button" style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '20px'
                        }} onClick={() => handleDeleteUser(user._id)}>
                            Leave Chat
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ChatInfo;

