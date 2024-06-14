import {createSlice} from "@reduxjs/toolkit";
import {createChat, getChatMessages, getChats, sendMessage} from "../actions/chatActions";




const initialState = {
    status: "idle",
    error: null,
    chats: [],
    currentChat: {},
    messages: [],
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
            })

            .addCase(createChat.pending, (state) => {
                    state.status = 'loading';
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentChat = action.payload;
                state.error = null;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getChatMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getChatMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(getChatMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = [...state.messages, action.payload];
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const {setCurrentChat} = chatSlice.actions;

export default chatSlice.reducer;