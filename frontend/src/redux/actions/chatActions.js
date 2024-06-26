import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getChats = createAsyncThunk(
    'chats/getChats',
    async ({ token, userId }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/chat//userChats/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createChat = createAsyncThunk(
    'chats/create',
    async (values, thunkAPI) => {
        const {token, userId, memberIds, chatName, isGroup} = values
        try {
            const response = await axios.post(
                `http://localhost:4000/api/chat/createChat/${userId}`,
                {
                    memberIds,
                    isGroup,
                    chatName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const openChat = createAsyncThunk(
    'chats/open',
    async (values, thunkAPI) => {
        const {token, chatId} = values
        try {
            const response = await axios.post(
                `http://localhost:4000/api/chat/openChat`,
                {
                    chatId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getChatMessages = createAsyncThunk(
    'chat/getMessages',
    async (values, thunkAPI) => {
        const {token, chatID} = values
        try {
            const response = await axios.get(
                `http://localhost:4000/api/message/getMessages/${chatID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async ({ token, chatID, message, content }, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/message/sendMessage',
                { chatID, message, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteChat = createAsyncThunk(
    'chat/delete',
    async ({ token, chatID }, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/chat/deleteChat/${chatID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
