import {useDispatch} from "react-redux";
import { signOut } from "../../../redux/slices/userInfoSlice";
import UserProfile from "./UserProfile";
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import {useEffect, useState} from "react";



const MenuDrop = ({ setShowNewGroup, setUserPr }) => {
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(signOut());
    };

    return (

        <div className="absolute right-1 mt-8 z-50 bg-white shadow-lg rounded-md w-52">
            <ul>

                <li
                    className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-t-md"
                    onClick={() => setUserPr(true)}
                >
                    <span>Profile</span>
                </li>




                <li
                    className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white"
                    onClick={() => setShowNewGroup(true)}
                >
                <span>Create group</span>
                </li>

                <li
                    className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-b-md"
                    onClick={handleLogout}
                >
                    <span>Logout</span>
                </li>
            </ul>
        </div>



    );
};

export default MenuDrop;
