import {combineReducers} from "@reduxjs/toolkit";
import userInfoSlice from "../slices/userInfoSlice";

const rootReducer = combineReducers({
    user: userInfoSlice,
})

export default rootReducer;