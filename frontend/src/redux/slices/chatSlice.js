import {createSlice} from "@reduxjs/toolkit";
import {getChats} from "../actions/chatActions";




const initialState = {
    status: "idle",
    error: null,
    chats: [],
    currentChat: {},
};

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setCurrentChat:(state, action) => {
            state.currentChat = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getChats.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(getChats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chats = action.payload;
                state.error = null;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const {setCurrentChat} = chatSlice.actions;

export default chatSlice.reducer;