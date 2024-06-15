import {useDispatch} from "react-redux";
import { signOut } from "../../redux/slices/userInfoSlice";
//import {useState} from "react";
import UserProfile from "./UserProfile";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const MenuDrop = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="absolute right-1 mt-8 z-50 bg-white shadow-lg rounded-md w-52">
                <ul>
                    <li className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-t-md">
                        <Popup
                            trigger={<button className="w-full text-left">Profile</button>}
                            modal
                            nested
                        >
                            {close => (
                                <div className="modal">
                                    <UserProfile onClose={close} />
                                </div>
                            )}
                        </Popup>
                    </li>
                    <li className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white">
                        <span>Create group</span>
                    </li>
                    <li
                        className="py-3 pl-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-b-md"
                        onClick={() => dispatch(signOut())}
                    >
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MenuDrop;
