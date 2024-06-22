import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import AddUsersToChat from "./AddUsersToChat";
import Switch from "react-switch";
import GroupName from "../../sidePanel/header/newGroupChat/GroupName";
import {deleteChat} from "../../../redux/actions/chatActions";


const ChatInfo = ({ onClose, setShowChatInfo }) => {
    const dispatch = useDispatch();
    const { currentChat } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);
    const [groupName, setGroupName] = useState("");
    const oldAdmins = currentChat.admins;
    const adminIds = oldAdmins.map(admin => admin._id);
    const chatMembers = currentChat.members.map(member => member.user);
    const initUsers = currentChat.members.map(member => member.user).filter(member => member._id !== user._id);

    const [users, setUsers] = useState(initUsers);
    const [admins, setAdmins] = useState(adminIds);
    const [changes, setChanges] = useState({});

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // user role
    const userRole = currentChat.members.find(member => member.user._id === user._id).role;

    // for private chats
    let friend;
    if (!currentChat.isGroup) {
        friend = chatMembers[0]._id === user._id ? chatMembers[1] : chatMembers[0];
    }

    const owner = chatMembers[0];

    const handleRoleChange = async (userId) => {

        const newRole = admins.includes(userId) ? 'user' : 'admin';
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

        } catch (error) {}

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

        } catch (error) {}
    };

    const handleDeleteChat = async () => {

        const values = {
            chatID: currentChat._id,
            token: user.token
        }

        await dispatch(deleteChat(values));
        setShowChatInfo(false);

        /*try {
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
        setShowChatInfo(false);*/

    };

    const handleChangeGroupName = async () => {
        try {
            await axios.put(
                `http://localhost:4000/api/chat/updateName`,
                {
                    chatId: currentChat._id,
                    newName: groupName,
                },

                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        } catch (error) {}
        setShowChatInfo(false);

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div ref={modalRef} className="p-8 rounded-lg shadow-xl relative bg-white w-96 h-auto mx-auto mt-10">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>

                {currentChat.isGroup ? (
                    <>
                        <h2 className="text-2xl mb-4 font-semibold">{currentChat.name}</h2>
                        <p className="mb-2">Number of users: {users.length + 1}</p>
                        <p className="mb-4">Chat owner: {owner.name + " @" + owner.tag}</p>
                    </>
                ) : (
                    <h2 className="text-2xl mb-4 font-semibold">Personal chat with {friend.name}</h2>
                )}

                {(userRole === "owner" || userRole === "admin") && currentChat.isGroup ? (
                    <>
                        <GroupName groupName={groupName} setGroupName={setGroupName} />

                        <button
                            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                            onClick={handleChangeGroupName}
                        >
                            Change Group Name
                        </button>
                    </>
                ) : (
                    ""
                )}

                <div className="users-list mb-6">
                    <div className="user-row header font-semibold mb-2">
                        <span>User</span>
                        {userRole === "owner" && currentChat.isGroup && <span>Admin</span>}
                        {(userRole === "owner" || userRole === "admin") && currentChat.isGroup && <span>Delete</span>}
                    </div>
                    {users.map(user => (
                        <div key={user._id} className="user-row flex justify-between mb-2">
                            <span>{user.name + " @" + user.tag }</span>
                            {userRole === "owner" && currentChat.isGroup && (
                                <Switch
                                    onChange={() => handleRoleChange(user._id)}
                                    checked={changes[user._id] ? changes[user._id] === 'admin' : admins.includes(user._id)}
                                    offColor="#888"
                                    onColor="#0d6efd"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                />
                            )}
                            {(userRole === "owner" || userRole === "admin") && currentChat.isGroup && (
                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            )}
                        </div>
                    ))}
                </div>

                {(userRole === "owner" || userRole === "admin") && currentChat.isGroup && (
                    <AddUsersToChat setShowChatInfo={setShowChatInfo} />
                )}

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                        onClick={() => setShowChatInfo(false)}
                    >
                        Close
                    </button>
                    {(currentChat.isGroup && userRole === "owner") || !currentChat.isGroup ? (
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            onClick={handleDeleteChat}
                        >
                            Delete Chat
                        </button>
                    ) : (
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            onClick={() => handleDeleteUser(user._id)}
                        >
                            Leave Chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatInfo;

