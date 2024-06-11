import {combineReducers} from "@reduxjs/toolkit";
import userInfoSlice from "../slices/userInfoSlice";
import chatSlice from "../slices/chatSlice";

const rootReducer = combineReducers({
    user: userInfoSlice,
    chats: chatSlice,
})

export default rootReducer;