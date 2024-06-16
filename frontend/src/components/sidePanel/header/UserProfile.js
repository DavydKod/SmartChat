

import React from 'react';

const UserProfile = ({ onClose }) => {
    return (
        <div className="p-5 rounded-md shadow-lg relative bg-white">
            <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
            <h2 className="text-2xl mb-4">User Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            {/* Add more user profile information here */}
        </div>
    );
};

export default UserProfile;