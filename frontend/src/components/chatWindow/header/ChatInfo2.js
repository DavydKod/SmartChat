import {useSelector} from "react-redux";
import React, {useState} from "react";
import userAvatar from "../../../images/avatar.png";
import moreIcon from "../../../images/menu.png";
import DropMenu from "../../sidePanel/header/DropMenu";


const ChatInfo2 = ({ setShowChatInfo }) => {

    const [name, setName] = useState('John Doe');
    const [tag, setTag] = useState('johndoe123');
    const [email, setEmail] = useState('johndoe@example.com');
    const [isEditable, setIsEditable] = useState(false);

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div className="p-8 rounded-lg shadow-xl relative bg-white max-w-lg mx-auto mt-20">
            <h2 className="text-3xl mb-6 text-center font-semibold">User Profile</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={!isEditable}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tag</label>
                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={!isEditable}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={!isEditable}
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    onClick={toggleEditMode}
                >
                    {isEditable ? 'Save' : 'Edit'}
                </button>

                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                    onClick={() => setShowChatInfo(false)}
                >
                    Close
                </button>

                {/*<button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    onClick={deleteUser}
                >
                    Delete User
                </button>*/}
            </div>
        </div>
    );
};

export default ChatInfo2;