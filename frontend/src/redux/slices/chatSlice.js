import {createSlice} from "@reduxjs/toolkit";
import {createChat, deleteChat, getChatMessages, getChats, openChat, sendMessage} from "../actions/chatActions";
import { signOut } from './userInfoSlice';
import {useSelector} from "react-redux";


const initialState = {
    status: "idle",
    error: null,
    chats: [],
    currentChat: {
        admins: []
    },
    messages: [],
};

export const chatSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        setCurrentChat:(state, action) => {
            state.currentChat = action.payload;

            // Extract admins from members
            const admins = action.payload.members.filter(member => member.role === 'admin');
            state.currentChat.admins = admins.map(admin => admin.user);
        },
        updateMessages: (state, action) => {
            // msg
            let chat = state.currentChat;
            console.log("chatid", chat._id);
            if (chat._id === action.payload.chatID._id) {
                state.messages = [...state.messages, action.payload];
            }

            // chats
            let currentChat = {...action.payload.chatID,
                lastMessage: action.payload,
            };
            let newChats = [...state.chats].filter(
                (chat) => chat._id !== currentChat._id
            );
            newChats.unshift(currentChat);
            state.chats = newChats;
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

                // Extract admins from members
                const admins = action.payload.members.filter(member => member.role === 'admin');
                state.currentChat.admins = admins.map(admin => admin.user);
                state.error = null;
            })
            .addCase(createChat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(openChat.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(openChat.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentChat = action.payload;

                // Extract admins from members
                const admins = action.payload.members.filter(member => member.role === 'admin');
                state.currentChat.admins = admins.map(admin => admin.user);
                state.error = null;
            })
            .addCase(openChat.rejected, (state, action) => {
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
                let currentChat = {...action.payload.chatID,
                    lastMessage: action.payload,
                };
                let newChats = [...state.chats].filter(
                    (chat) => chat._id !== currentChat._id
                );
                newChats.unshift(currentChat);
                state.chats = newChats;
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Reset chat state on signOut
            .addCase(signOut, (state) => {
                state.status = "idle";
                state.error = null;
                state.chats = [];
                state.currentChat = { admins: [] };
                state.messages = [];
            })

            .addCase(deleteChat.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                state.status = 'succeeded';

            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const {setCurrentChat, updateMessages} = chatSlice.actions;

export default chatSlice.reducer;